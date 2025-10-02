import React, {useState,useEffect,useRef,useContext,createContext } from "react";
import IconsBox from "../IconsBox/IconsBox";
import "../ProjectNew/ProjectNew.css"
import FormInputField from "../MainComponents/FormInputField/FormInputField";
import { useForm } from 'react-hook-form';
export const ProjectContext = createContext(null);
export const useProjectIconContext = () => useContext(ProjectContext);
const ProjectNew = () => {  
  const [selectedIcon,setSelectedIcon] = useState("microchip");
 
  const hiddenIconInputRef = useRef(null); 
 const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // TypeScript tipleri olmadan çağırdık
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
    <form onSubmit={handleSubmit(onSubmit)}>  
      
    <div className="MainWindow">
      <IconsBox  />
      <div className="Contents">
       <FormInputField
        labeltext="Proje Adı"
        name="projectName"
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
        name="projectDescription"
        type="textarea"
        register={register}
        errors={errors}        
        
      />
      <FormInputField
        labeltext="Proje Yayındamı?"
        name="projectIsAlive"
        type="checkbox"
        checktext="Evet"
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

export default ProjectNew;