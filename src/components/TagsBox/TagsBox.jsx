import { useEffect, useState } from "react";
import styles from '../TagsBox/tagsbox.module.css';

// Yeni prop'lar: value ve onChange (react-hook-form'dan geliyor)
const TagsBox = ({ name, TagsIDs, value, onChange }) => { 
    const [Tags, setTags] = useState([]);
    
    // NOT: value prop'u artık ID dizisi (örn: [101, 103]) olacak.
    // Ancak component'in göstermesi için tam etiket nesnelerine ihtiyacımız var.
    // Bu nedenle, value'daki ID'leri kullanarak Tags listesinden tam nesneleri bulmalıyız.
    
    // Gösterilecek tam nesnelerin dizisini oluştur.
    const selectedTagsObjects = Tags.filter(t => (value || []).includes(t.id));
    

    // TagsIDs'yi Tags durumuna aktar.
    useEffect(() => {
        console.log(value);
        if (Array.isArray(TagsIDs)) {
            setTags(TagsIDs);
        }
    }, [TagsIDs]);

    // HTML <select> elemanında değişiklik olduğunda (onChange) çağrılır.
    const onSelect = (e) => {
        const selectedTagId = Number(e.target.value); 
        
        // Seçilen ID daha önce eklenmemişse devam et (value bir ID dizisi olduğu için kontrolü ona göre yapmalıyız)
        if (! (value || []).includes(selectedTagId)) {
            
            // Mevcut ID dizisine yeni ID'yi ekle
            const newSelectedTagsIDs = [...(value || []), selectedTagId];
            
            // ANAHTAR KISIM: SADECE ID DİZİSİNİ useForm'a (Controller/onChange prop'u aracılığıyla) gönder.
            if (typeof onChange === 'function') {
                onChange(newSelectedTagsIDs); 
            }
        }
    };
    
    // Etiketi kaldırma fonksiyonu.
    const removeTag = (idToRemove) => {
        // ID'si silinmek istenen etiketle eşleşmeyenleri filtreleyerek yeni bir ID dizisi oluştur.
        const updatedTagsIDs = (value || []).filter(id => id !== idToRemove);
        
        // ANAHTAR KISIM: SADECE ID DİZİSİNİ useForm'a gönder.
        if (typeof onChange === 'function') {
             onChange(updatedTagsIDs);
        }
    };

    return (
        <div>
            <label>{name}:</label>
            <div className={styles["MainBox"]}>
                {/* Gösterim için tam nesneler dizisini kullan */}
                {selectedTagsObjects.map(st => (
                    <div 
                        key={st.id} 
                        className={styles.TagsBox}
                        onClick={() => removeTag(st.id)} // Kaldırma işlemi ID üzerinden
                    >
                        {st.name} 
                        <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>&times;</span>
                    </div>
                ))}
                
                <select className={styles.select} onChange={onSelect} value="">
                    <option value="">Etiket Seçiniz</option>
                    {/* Sadece seçili olmayan etiketleri göster */}
                    {Tags.filter(t => !(value || []).includes(t.id)).map(t => (
                        <option key={t.id} value={t.id}>
                            {t.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
export default TagsBox;