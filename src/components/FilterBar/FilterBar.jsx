import { useEffect, useState } from "react";
import styles from '../FilterBar/filterbar.module.css';

// children artık bir render prop (bir fonksiyon) olarak işlev görecek
const FilterBar = ({ children, contents }) => {
    const [sortedContent, setSortedContent] = useState([...contents]);
    const [currentSort, setCurrentSort] = useState("LASTDATE_DESC"); // Varsayılan sıralama
    
    // ... parseDate fonksiyonu aynı kalır ...
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('-');
        // YYYY-MM-DD formatı oluşturarak doğru Date objesi elde et
        return new Date(`${year}-${month}-${day}`);
    };
     function parseIsoString(isoString) {
  // JavaScript'in yerleşik Date constructor'ı bu formatı (T ve Z eksik olsa bile) 
  // genellikle başarıyla ayrıştırır, ancak milisaniyeden (ilk 3 basamak)
  // sonraki hassasiyeti (mikrosaniye/nanosaniye) desteklemez.
  const date = new Date(isoString);

  // Oluşturulan Date nesnesinin geçerli olup olmadığını kontrol etmek iyi bir uygulamadır.
  if (isNaN(date.getTime())) {
    console.error("Hata: Geçersiz tarih dizgisi.");
    return null;
  }

  return date;
}

    useEffect(() => {
        try {
            // State mutasyonunu önlemek için diziyi kopyala
        const sortableArray = [...contents]; 
        let sortedArray;
         
        switch (currentSort) {
            case "TITLE_ASC": // A-Z ye doğru
                // Yeni bir sıralı dizi oluşturmak için slice() kullanmak daha güvenli:
                sortedArray = sortableArray.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "TITLE_DESC": // Z-A ya doğru
                sortedArray = sortableArray.sort((a, b) => b.title.localeCompare(a.title));
                break;
                case "LASTDATE_DESC": // Önce En Yeni Tarih
                sortedArray = sortableArray.sort((a, b) => parseIsoString(b.lastdate) - parseIsoString(a.lastdate));
                break;
            case "LASTDATE_ASC": // Önce En Eski Tarih
                sortedArray = sortableArray.sort((a, b) => parseIsoString(a.lastdate) - parseIsoString(b.lastdate));
                break;
                 case "DATE_ASC": // Önce En Eski Tarih
                sortedArray = sortableArray.sort((a, b) => parseDate(a.date) - parseDate(b.date));
                break;
            
            case "DATE_DESC": // Önce En Yeni Tarih
                sortedArray = sortableArray.sort((a, b) => parseDate(b.date) - parseDate(a.date));
                break;
            default:
                sortedArray = sortableArray;
        }

        // Yeni sıralanmış diziyi state'e set et.
        setSortedContent(sortedArray);
        // NOT: sort metodu orijinal diziyi değiştirir. Kopyalama işlemi (yukarıdaki [...contents]) yeterli.
        // Daha temiz bir sıralama için sortableArray.slice().sort(...) da kullanılabilir.
    
        } catch (error) {
            console.log(error);
        }
        }, [currentSort, contents]);

    const handleSortChange = (event) => {
        setCurrentSort(event.target.value);
    };

    return (
        <>
            <div className={styles.FilterHead}>
                <label className={styles['Filter-Label']}>Sıralama:</label><select id="sort-select" className={styles["Filter-Select"]}
                    onChange={handleSortChange} // Değişikliği burada yakalıyoruz
                    value={currentSort}>
                    <option value="TITLE_ASC">Başlığa Göre (A-Z)</option>
                    <option value="TITLE_DESC">Başlığa Göre (Z-A)</option>
                     <option value="LASTDATE_DESC">Değiştirme Tarihine Göre (Önce En Yeni)</option>
                    <option value="LASTDATE_ASC">Değiştirme Tarihine Göre (Önce En Eski)</option>
                    <option value="DATE_DESC">Tarihe Göre (Önce En Yeni)</option>
                    <option value="DATE_ASC">Tarihe Göre (Önce En Eski)</option>
                </select>
            </div>            
            <div className={styles.FilterBar}>
                {typeof children === 'function' ? children(sortedContent) : children}
            </div>
        </>
    )
}

export default FilterBar;