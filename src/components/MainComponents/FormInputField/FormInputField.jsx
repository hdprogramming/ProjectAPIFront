import React from 'react';
import '../FormInputField/FormInputField.css'

// Fonksiyonel bileşen prop'ları alıyor.
// Artık tip kontrolü yok, sadece gelen prop'ları kullanıyoruz.
const FormInputField = ({
  labeltext,
  checktext,
  name,
  type,
  register,
  errors,
  validationRules,
}) => {
  // Hata objesinde, bu alanın adına karşılık gelen bir hata var mı kontrol et
  const error = errors[name];
const isTextarea = type === 'textarea';
  return (
    <div style={{ marginBottom: '15px' }}>
      {labeltext&&<label htmlFor={name}>{labeltext}:</label>}
      {
      isTextarea?(
        <textarea className='textarea'
        id={name}        
        // Prop olarak gelen register fonksiyonunu kullanıyoruz
        // name ve validationRules'ı kullanarak alanı RHF'ye kaydediyoruz
        {...register(name, validationRules)}   
      />
        
      ):(
        <input
        id={name}
        type={type}
        // Prop olarak gelen register fonksiyonunu kullanıyoruz
        // name ve validationRules'ı kullanarak alanı RHF'ye kaydediyoruz
        {...register(name, validationRules)}   
      />
        
      )
      }
      
     {checktext && <label>{checktext}</label>}     
      
      {/* Hata prop'u varsa hata mesajını gösteriyoruz */}
      {error && (
        <p style={{ color: 'red', fontSize: '12px' }}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormInputField;