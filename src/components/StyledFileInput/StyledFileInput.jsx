import React, { useState,useEffect } from 'react';
import styles from './styledfileinput.module.css'; // Stilleri yandaki dosyadan çekeceğiz

function StyledFileInput({setFile,previewSrc,setPreviewSrc}) {
  // Seçilen dosyanın adını saklamak için bir state (durum) kullanıyoruz.
  const [fileName, setFileName] = useState('Henüz dosya seçilmedi...');

  // ÖNEMLİ: Hafıza sızıntılarını önlemek için
  // component kaldırıldığında veya resim değiştiğinde eski URL'i iptal etmeliyiz.
  useEffect(() => {
    // Bu 'cleanup' (temizleme) fonksiyonu,
    // component unmount olduğunda (sayfadan kaldırıldığında) çalışır.
    return () => {
      if (previewSrc) {
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, [previewSrc]); // Bu effect, previewSrc değiştiğinde güncellenir.

  const handleFileChange = (event) => {
    // Önceki URL'i (varsa) hafızadan temizle
    if (previewSrc) {
      URL.revokeObjectURL(previewSrc);
      setPreviewSrc(null); // Önizlemeyi hemen kaldır
    }

    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);

      // Sadece resim dosyasıysa önizleme oluştur
      if (file.type.startsWith('image/')) {
        // Geçici URL'i oluştur ve state'e ata
        const objectUrl = URL.createObjectURL(file);
        setPreviewSrc(objectUrl);
        setFile(file);
      }
      
    } else {
      setFileName('Henüz dosya seçilmedi...');
      setPreviewSrc(null); // Dosya seçimi iptal edilirse önizlemeyi kaldır
    setFile(null);
    }
  };

  return (
    <div className={styles['file-upload-area']}>
      {/* 1. Dosya adı
          - Metin artık 'fileName' state'inden dinamik olarak gelir. */}
      <span className={styles['filename']}>{fileName}</span>
      {/* 2. Gerçek input (gizli) 
          - onChange olayı handleFileChange fonksiyonunu tetikler. */}
      <input
        type="file"
        id="dosya-sec"
        className={styles['realfile-input']}
        onChange={handleFileChange}
      />

      {/* 3. Sahte buton (label)
          - HTML'deki 'for' yerine React'te 'htmlFor' kullanılır.
          - 'htmlFor' ve 'id' eşleşmesi, bu label'a tıklandığında gizli input'u tetikler. */}
      <label htmlFor="dosya-sec" className={styles['button']}>
        Dosya Seç
      </label>

      
    </div>
  );
}

export default StyledFileInput;