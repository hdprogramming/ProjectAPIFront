import React, { useState, useEffect, Suspense } from 'react';
import styles from './imageuploader.module.css'; // Stilleri yandaki dosyadan çekeceğiz
import CustomCheckBox from '../MainComponents/CustomCheckBox/CustomCheckBox';
import useExperiment from '../../utils/useExperiment';
import StatusRenderer from '../../utils/StatusRenderer';
function ImageUploader({onAddImage,setKeepRatio,setImageUrl}) {
  const [fileName, setFileName] = useState('Henüz dosya seçilmedi...');
  // 1. Önizleme URL'i için state (Bu zaten doğruydu)
  const [previewSrc, setPreviewSrc] = useState(null); 
  const {isLoading,error,UploadImage}=useExperiment();
  const [disableButton,setState]=useState(true);
  // 2. Asıl 'File' nesnesini saklamak için state
  // (Not: Değişken adını 'File' yerine 'file' yaptım, 
  // 'File' JavaScript'in yerleşik bir adıdır, kafa karıştırmasın)
  const [file, setFile] = useState(null);
const handleUpdateClick=async()=>{
   let imageurl=await UploadImage(file.name,file);
   setImageUrl(imageurl);
   setState(false);
   
}
  // 3. Hafıza temizleme (Bu zaten doğruydu)
  useEffect(() => {
    return () => {
      if (previewSrc) {
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, [previewSrc]);

  
  const handleFileChange = (event) => {
    if (previewSrc) {
      URL.revokeObjectURL(previewSrc);
    }

    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFileName(selectedFile.name);

      if (selectedFile.type.startsWith('image/')) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewSrc(objectUrl);
        setFile(selectedFile);
      }
      
    } else {
      setFileName('Henüz dosya seçilmedi...');
      setPreviewSrc(null);
      setFile(null);
    }
  };
    const statusContent = (
    <StatusRenderer 
      isLoading={isLoading} 
      error={error} 
      loadingMessage="Deney Yükleniyor..." // Mesajı dinamik olarak veriyoruz
      // errorMessage'i opsiyonel bırakabiliriz.
    />
  );
  
  // 2. Eğer yükleniyor veya hata varsa, sadece durumu göster
      
  return (
    <Suspense fallback={()=>{return statusContent}}>
    <div className={styles['file-upload-area']}>
      
      {/* ÇÖZÜM BURADA: 
        Resmi sadece 'previewSrc' doluysa göster
        ve 'src' özelliğini doğrudan state'e bağla.
      */}
      {previewSrc && (
        <img 
          src={previewSrc} 
          alt="Önizleme" 
          width="200px" 
          height="200px"
          style={{ objectFit: 'cover' }} // Resmin düzgün görünmesi için
        />
      )}

     
      <span className={styles['filename']}>{fileName}</span>
      
      <input
        type="file"
        id="dosya-sec"
        className={styles['realfile-input']}
        onChange={handleFileChange}
        accept="image/*" // Kullanıcının sadece resim seçmesini sağla
      />

      <label>Resim Yükle:</label>
      <div>
      <label htmlFor="dosya-sec" className={styles['button']}>
        Dosya Seç
      </label>
      <label  className={styles['button']} onClick={handleUpdateClick}>
        Upload
      </label>
</div>
<CustomCheckBox name={"Ratio"} checktext={"En/Boy oranı korunsun"} setValue={setKeepRatio}></CustomCheckBox>
   <button className={styles['button']} disabled={disableButton} onClick={onAddImage}>Ekle</button>
    </div>
  </Suspense>);
}

export default ImageUploader;