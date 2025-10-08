import React, {useState,useEffect,useRef,useContext,createContext } from "react";
import IconsBox from "../IconsBox/IconsBox";
import styles from "./ProjectForm.module.css"
import FormInputField from "../MainComponents/FormInputField/FormInputField";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 
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
const ProjectForm = ({onAdd,onUpdate,project}) => { 
  const isEditing = !!project; 
  const ProjectHead=isEditing?"Düzenleme":"Yeni";
  const [selectedIcon,setSelectedIcon] = useState("microchip"); 
    const navigate = useNavigate(); // Yönlendirme için hook
  const hiddenIconInputRef = useRef(null); 
 const { 
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: {
            // project objesi varsa, project.title'ı al, yoksa boş string kullan.
            id:isEditing?project.id:'',
            title: isEditing ? project.title : '', 
            description: isEditing ? project.description : '',
            isAlive:isEditing?project.isAlive:true,
            status:isEditing?project.Status:'Devam Ediyor...',
            date:isEditing?project.date:getTodayDate()
        },}); // TypeScript tipleri olmadan çağırdık
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
 const onSubmit = (data) => {
    // Veriler otomatik olarak toplanır
   
    const finalData = { ...data, icon: selectedIcon };
    const jsonString = JSON.stringify(finalData, null, 2); 
        console.log('Gönderilen Final Veri:', jsonString);
        if(!isEditing)
        onAdd(finalData); 
        else
        onUpdate(finalData);
        // 3. Kullanıcıyı Deney Listesi sayfasına yönlendir
        navigate('/deneyler'); 
  };
 
useEffect(() => {
      if (hiddenIconInputRef.current && selectedIcon) {
          // İkon objesini string'e (JSON) dönüştürüp input'a yazıyoruz
          hiddenIconInputRef.current.value = JSON.stringify(selectedIcon);
        
        }
         console.log(selectedIcon);
  }, [selectedIcon]); 
  return (
    <ProjectContext.Provider value={contextValue}>
    <form onSubmit={ handleSubmit(onSubmit)} >  
      <input 
        type="hidden" // Gizli input
        {...register("id")} // RHF'ye kaydediyoruz
    /> 
    <div className={styles.MainWindow}>
      
      <IconsBox headertext={ProjectHead} />
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
        labeltext="Proje Açıklama"
        name="description"
        type="textarea"
        register={register}
        errors={errors}        
        
      />
      <FormInputField
        labeltext="Proje Yayındamı?"
        name="isAlive"
        type="checkbox"
        checktext="Evet"
        register={register}
        errors={errors} 
      />
      <FormInputField
      labeltext="Tarih"
      name="date"
      type="date"
      register={register}
      errors={errors}
      />
      <FormInputField
      labeltext="Durum"
      name="status"
      type="select"
      options={[
        {label:"Planlandı",value:"Planlandı"},
        {label:"DevamEdiyor...",value:"DevamEdiyor..."},
        {label:"İptal Edildi",value:"İptalEdildi"},
        {label:"Tamamlandı",value:"Tamamlandı"} 
      ]}     
      register={register}
      errors={errors}
      />
      <div style={{
        display:'flex',
        justifyContent: 'flex-end' }}>
       <input type="submit" ></input>
      <input
          type="hidden" // Görünmez yapar
          ref={hiddenIconInputRef} // Manuel erişim için ref atadık
          // RHF'ye kaydediyoruz. data objesinde bu isimle yer alacak.
          {...register('icon')} 
        />
        </div>
      </div>       
       </div></form></ProjectContext.Provider>
  );
};

export default ProjectForm;