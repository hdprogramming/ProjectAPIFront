import React, { useState, useEffect, Suspense, useRef } from 'react';
import styles from './imageuploader.module.css'; // Stilleri yandaki dosyadan çekeceğiz
import useExperiment from '../../utils/useExperiment';

function ImageUploader({ imagename, setImageUrl, setSelectedItem,projectid, onSuccess}) {
  const [fileName, setFileName] = useState('Henüz dosya seçilmedi...');
  // 1. Önizleme URL'i için state (Bu zaten doğruydu)
  const [previewSrc, setPreviewSrc] = useState(null);
  const [file, setFile] = useState(null);
  const { UploadImage } = useExperiment();
  const handleUpdateClick = async () => {

    if (imagename == null || imagename == "")
      imagename = file.name;
    let imageurl = await UploadImage(imagename, file, projectid);
    setImageUrl&&setImageUrl(imageurl);
    setSelectedItem&&setSelectedItem(imageurl);
    if(onSuccess)
    onSuccess(imageurl);
  }
  // 2. Asıl 'File' nesnesini saklamak için state
  // (Not: Değişken adını 'File' yerine 'file' yaptım, 
  // 'File' JavaScript'in yerleşik bir adıdır, kafa karıştırmasın)


  const handleFileChange = async (event) => {
    if (previewSrc) {
      URL.revokeObjectURL(previewSrc);
    }
    // setState(true);
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

  return (

    <div className={styles['file-upload-area']}>

      <div className={styles['file-body-area']}>
        <label>Resim Yükle:</label>
        {previewSrc && (
          <img
            src={previewSrc}
            alt="Önizleme"
            width="150px"
            height="150px"
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
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <label htmlFor="dosya-sec" className={styles['button']} >
            Dosya Seç
          </label>
          <label className={styles['button']} onClick={handleUpdateClick} >
            Upload
          </label></div>
      </div>
    </div>
  );
}

export default ImageUploader;