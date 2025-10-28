import { useState, useEffect, useRef, useContext, createContext } from "react";
import IconsBox from "../IconsBox/IconsBox";
import EditorModal from '../EditorModal/EditorModal';
import styles from "./ProjectForm.module.css"
import FormInputField from "../MainComponents/FormInputField/FormInputField";
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import TagsBox from "../TagsBox/TagsBox"
import { useFetchUtils } from "../../contexts/FetchUtils";

export const ProjectContext = createContext(null);
export const useProjectIconContext = () => useContext(ProjectContext);
const getTodayDate = () => {
  const today = new Date();
  // Ay ve günün başına sıfır ekleyelim (tek haneli ise)
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Ay 0'dan başlar, bu yüzden +1
  const day = String(today.getDate()).padStart(2, '0');

  // YYYY-MM-DD formatını döndür
  return `${year}-${month}-${day}`;
};
const ProjectForm = ({ onAdd, onUpdate, project }) => {
  const isEditing = !!project;
  const ProjectHead = isEditing ? "Düzenleme" : "Yeni";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinalPage, setFinalPage] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(project?.icon?project.icon:"microchip");
  const {StatusMessages,Categories}=useFetchUtils();
  const navigate = useNavigate(); // Yönlendirme için hook
  const hiddenIconInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    control,
  } = useForm({
    defaultValues: {
      // project objesi varsa, project.title'ı al, yoksa boş string kullan.
      id: isEditing ? project.id : '',
      icon:isEditing?project.icon:"vial",
      title: isEditing ? project.title : '',
      description: isEditing ? project.description : '',
      content: isEditing ? project.content : '',
      isAlive: isEditing ? project.isAlive : true,
      status: isEditing ? project.Status : 'Devam Ediyor...',
      statusID: isEditing ? project.statusID : 1,
      date: isEditing ? project.date : getTodayDate(),
      categoryIds: isEditing ? project.categoryIds : []
    },
  }); // TypeScript tipleri olmadan çağırdık
  const setIconAndHiddenRef = (iconData) => {
    // 1. Icon State'ini güncelle
    setSelectedIcon(iconData);

    // 2. Ref'i GÜNCELLE: Gizli input'a veriyi yaz
    if (hiddenIconInputRef.current) {
      // İkon objesini JSON string'ine dönüştürüp input'a yaz
      hiddenIconInputRef.current.value = JSON.stringify(iconData);
    }
  };

  // (C) Context Değeri: Child'a sadece eylem fonksiyonunu veriyoruz
  const contextValue = {
    selectedIcon: selectedIcon,
    setSelectedIcon: setIconAndHiddenRef // Child'ın kullanacağı fonksiyon

    // selectedIcon'u göndermeye gerek yok, sadece aksiyonu gönderiyoruz
  };
  const onSubmit = async (data) => {
    // Veriler otomatik olarak toplanır

    const finalData = { ...data, icon: selectedIcon };
    const jsonString = JSON.stringify(finalData, null, 2);
    console.log('Gönderilen Final Veri:', jsonString);
    let success = false;
    if (!isEditing)
      success = await onAdd(finalData);
    else
      success = await onUpdate(finalData);
    // 3. Kullanıcıyı Deney Listesi sayfasına yönlendir
    if (success) {
      navigate('/deneyler');
    }
    else
    {
      alert("Kayıt işleminde hata oluştu");
    }

  };
  const onClick = async (event) => {
    event.preventDefault();
    // 2. Sadece ilk sayfanın alanlarını (title, description, isAlive, date, status, icon) doğrula
    // 'icon' alanı gizli olduğu ve 'title' alanı zorunlu olduğu için sadece onları doğrulamak yeterli olabilir.
    // Ancak tüm ilk sayfa alanlarını (title, description, isAlive, date, status) doğrulamak daha güvenlidir.
    // Alan isimlerini bir dizi olarak trigger'a veriyoruz.
    const fieldsToValidate = ['title', 'description', 'isAlive', 'date', 'status'];
    const isValid = await trigger(fieldsToValidate);

    // 3. Doğrulama başarılıysa ikinci sayfaya geç
    if (isValid) {
      setFinalPage(true);
    } else {
      // Hata varsa bir şey yapabilirsiniz (örneğin scroll'u en üste taşımak)
      console.log('Doğrulama hatası! İkinci sayfaya geçilemedi.');
    }

  }
  const onBackClick = async (event) => {
    event.preventDefault();
    setFinalPage(false);
  }
  useEffect(() => {
    if (hiddenIconInputRef.current && selectedIcon) {
      // İkon objesini string'e (JSON) dönüştürüp input'a yazıyoruz
      hiddenIconInputRef.current.value = JSON.stringify(selectedIcon);
    }   
    
  }, [selectedIcon]);

  return (
    <ProjectContext.Provider value={contextValue}>
      <form onSubmit={handleSubmit(onSubmit)} >
        <input
          type="hidden" // Gizli input
          {...register("id")} // RHF'ye kaydediyoruz
        />   <div className={styles.FormBoxHeader}> <h2>{ProjectHead}</h2></div>

        <div className={styles.MainWindow} style={{ display: !isFinalPage ? 'flex' : 'none' }}>
          <IconsBox />
          <div className={styles.Contents}>
            <FormInputField
              labeltext="Proje Adı"
              name="title"
              type="text"
              register={register}
              errors={errors}
              // Kuralları doğrudan JS objesi olarak gönderiyoruz
              validationRules={{
                required: 'Proje adı zorunludur!',
                minLength: { value: 3, message: 'Minimum 3 karakter olmalı.' }
              }}
            />
            <FormInputField
              labeltext="Proje Açıklaması"
              name="description"
              type="textarea"
              register={register}
              errors={errors}
            />
            <Controller
              name="categoryIds" // Form state'inde bu verinin tutulacağı key
              control={control} // useForm'dan gelen control objesi
              // Varsayılan boş bir dizi ile başlat.
              rules={{ required: "En az bir etiket seçmelisiniz." }}
              render={({ field }) => (
                // field objesi içinde value, onChange, onBlur bulunur.
                <TagsBox
                  name="Konu Etiketleri"
                  TagsIDs={Categories}
                  // TagsBox'ın beklediği value ve onChange prop'larını field'dan alıp veriyoruz.
                  value={field.value} // Seçili etiket dizisi
                  onChange={field.onChange} // useForm state'ini güncelleyecek callback
                />
              )}
            />
            {errors.tags && <p style={{ color: 'red' }}>{errors.tags.message}</p>}
            <FormInputField
              labeltext="Proje Yayındamı?"
              name="isAlive"
              type="checkbox"
              checktext="Evet"
              register={register}
              errors={errors}
            />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <input
              type="hidden" // Görünmez yapar
              ref={hiddenIconInputRef} // Manuel erişim için ref atadık
              // RHF'ye kaydediyoruz. data objesinde bu isimle yer alacak.
              {...register('icon')}
            />
            
            <button type="button" onClick={onClick}>İlerle</button></div>
        </div>
        <div className={styles.SecondWindow} style={{ display: isFinalPage ? 'flex' : 'none' }}>
         <div className={styles.formFieldContainer}> {/* Stiller için bir sarmalayıcı */}
            <label>Proje İçeriği</label>

            {/* RHF'nin 'content' alanını kontrol etmek için Controller kullanıyoruz */}
            <Controller
              name="content"
              control={control}
              rules={{ required: 'Proje içeriği zorunludur.' }}
              render={({ field, fieldState }) => (
                <>
                  {/* 1. İçeriğin bir önizlemesini gösteriyoruz (textarea yerine) */}
                  <div
                    className={styles.contentPreview} // (Bunu CSS'e ekleyeceğiz)
                    dangerouslySetInnerHTML={{ __html: field.value || '<p>İçerik girmek için editörü açın...</p>' }}
                  />

                  {/* 2. Modal'ı açacak olan buton */}
                  <button
                    type="button" // Formu submit etmemesi önemli!
                    className={styles.openEditorBtn} // (Bunu CSS'e ekleyeceğiz)
                    onClick={(e) => {
                      e.preventDefault();
                      setIsModalOpen(true);
                    }}
                  >
                    İçeriği Düzenle
                  </button>
                  
                  {/* 3. Hata Mesajı */}
                  {fieldState.error && (
                    <p className={styles.errorMessage}>{fieldState.error.message}</p>
                  )}
                  
                  {/* 4. Modal'ın kendisi. 
                    RHF'den (field) gelen veriyi modal'a bağlıyoruz.
                  */}
                  <EditorModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    initialContent={field.value} // RHF'deki mevcut 'content'i editöre yükle
                    onSave={(newContent) => {
                      field.onChange(newContent); // RHF'nin 'content' state'ini güncelle
                      setIsModalOpen(false);      // Modalı kapat
                    }}
                  />
                </>
              )}
            />
          </div>
          <FormInputField
            labeltext="Tarih"
            name="date"
            type="date"
            register={register}
            errors={errors}
          />
          <FormInputField
            labeltext="Durum"
            name="statusID"
            type="select"            
            options={StatusMessages.map(s => ({
              label: s.name,
              value: s.id
            }))}
            register={register}
            errors={errors}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <button onClick={onBackClick}>Geri Dön</button>
            <input type="submit"  ></input>
          </div>
        </div></form></ProjectContext.Provider>
  );
};

export default ProjectForm;