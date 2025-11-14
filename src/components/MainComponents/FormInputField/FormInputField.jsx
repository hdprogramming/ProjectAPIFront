
import styles from '../FormInputField/FormInputField.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendar} from '@fortawesome/free-solid-svg-icons'; ;
// Fonksiyonel bileşen prop'ları alıyor.
// Artık tip kontrolü yok, sadece gelen prop'ları kullanıyoruz.

const FormInputField = ({
  labeltext,
  checktext,
  name,
  value,
  type,
  options,
  register,
  errors,
  validationRules,
}) => {
  // Hata objesinde, bu alanın adına karşılık gelen bir hata var mı kontrol et
  const error = errors[name];
  let element; // Render edilecek elementi tutacak değişken

  // type'a göre hangi HTML elementinin oluşturulacağına karar veriyoruz
  switch (type) {
    case 'textarea':
      element = (
        <textarea
          className={styles.textarea}
          id={name}          
        
          {...register(name, validationRules)}
        >
          
          </textarea>
      );
      break;

    case 'select':
      // 'opions' yazım hatasını 'options' olarak düzelttiğimizi varsayıyorum
      element = (
        <select
          id={name}
          className={styles.select}
          {...register(name, validationRules)}
        >
          {/* Options listesi (Label/Value objeleri geliyorsa bu yapı daha sağlamdır) */}
          {options && options.length > 0 ? (
            options.map((option) => (
              <option
                key={option.value || option}
                value={option.value || option}>
                {option.label || option}
              </option>
            ))
          ) : (
            <option value="null">none</option>
          )}
        </select>
      );
      break;
     case 'date':
      element = (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <input
            id={name}
            type="date"
            className={styles.customdateinput} // Kendi CSS sınıfımızı ekleyelim
            {...register(name, validationRules)}
          />
          {/* Özel simgemiz */}
          <span
            className={styles.datepickericon}
            onClick={() => {
              // input elementine referans alıp programatik olarak açmak için
              // useRef veya farklı bir yöntem kullanılabilir.
              // Şimdilik sadece görsel bir simge olduğunu varsayalım.
            }}>
            <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
          </span>
        </div>
      );
      break;
    case 'checkbox':
  element = (
    <label className={styles['custom-checkbox-container']}>
      {/* Gizli input */}
      <input
        id={name}
        type='checkbox'
        {...register(name, validationRules)}
      />
      {/* Görsel kutu */}
      <span className={styles['checkmark']}></span>
      {/* Onay kutusu metni */}
      {checktext}
    </label>
  );
  break;
      // Varsayılan durum: 'text', 'number', 'email', 'password' vb. standart input'lar
    case 'text':
    case 'number':
    case 'email':
    case 'password':
    
    default:
      element = (
        <input
          id={name}
          type={type}
          value={value}
          {...register(name, validationRules)}
        />
      );
      break;
  }
  return (
    <div style={{ marginBottom: '15px' }}>
      {labeltext && <label htmlFor={name}>{labeltext}:</label>}

      {element}

      

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