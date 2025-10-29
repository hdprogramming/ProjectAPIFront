import styles from "../CustomCheckBox/customcheckbox.module.css";
const CustomCheckBox=({name,checktext,setValue})=>{
    const handleChange = (event) => {
    // event.target.checked -> Bize 'true' veya 'false' değerini verir.
    // Üst component'ten gelen 'onMyChange' fonksiyonunu bu yeni değerle çağırırız.
    setValue(event.target.checked);
  };
    return(
        <label className={styles['custom-checkbox-container']}>
              {/* Gizli input */}
              <input
                id={name}
                type='checkbox'
                onChange={handleChange}              
              />
              {/* Görsel kutu */}
              <span className={styles['checkmark']}></span>
              {/* Onay kutusu metni */}
              {checktext}
            </label>
    )
}
export default CustomCheckBox;