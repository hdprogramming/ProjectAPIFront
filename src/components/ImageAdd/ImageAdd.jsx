import React, { useState, useEffect, Suspense ,useRef} from 'react';
import styles from './imageadd.module.css'; // Stilleri yandaki dosyadan çekeceğiz
import CustomCheckBox from '../MainComponents/CustomCheckBox/CustomCheckBox';
import useExperiment from '../../utils/useExperiment';
import StatusRenderer from '../../utils/StatusRenderer';
import { useProjectId } from '../../utils/ProjectIDContext';
import {
 
  FaEdit,
  FaTrash
} from 'react-icons/fa';
function ImageAdd({onAddImage,setKeepRatio,setImageUrl}) {
  const [fileName, setFileName] = useState('Henüz dosya seçilmedi...');
  // 1. Önizleme URL'i için state (Bu zaten doğruydu)
  const [previewSrc, setPreviewSrc] = useState(null); 
  const {isLoading,error,UploadImage,GetFiles,DeleteFile,RenameFile}=useExperiment();
  const [disableButton,setState]=useState(true);
  // 2. Asıl 'File' nesnesini saklamak için state
  // (Not: Değişken adını 'File' yerine 'file' yaptım, 
  // 'File' JavaScript'in yerleşik bir adıdır, kafa karıştırmasın)
  const [files,setFiles]=useState([]);
  const [selectedImageFile,setSelectedImageFile]=useState({id:0,"name":"yok"});
  async function GetFilesServer(){
    const fetchedfiles=await GetFiles();
    if(fetchedfiles)
    {
      setFiles(fetchedfiles);
      console.log(fetchedfiles);
    }
      
   }
  useEffect(()=>{
   
   GetFilesServer();
  },[]); 
 
  const [file, setFile] = useState(null);
  const projectid = useProjectId();
  const filenametextbox=useRef();
const handleUpdateClick=async()=>{
  let imagename=filenametextbox.current.value;
  if(imagename==null || imagename=="")
    imagename=file.name;
   let imageurl=await UploadImage(imagename,file,projectid);
   setImageUrl(imageurl);
   setState(false);
   GetFilesServer();
}
  // 3. Hafıza temizleme (Bu zaten doğruydu)
  useEffect(() => {
    return () => {
      if (previewSrc) {
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, [previewSrc]);

  const handleImageFilesChange=(event)=>{
               setPreviewSrc(event.target.value);
                setImageUrl(event.target.value);
                let SelectedItem=event.target.selectedOptions[0];                
                setSelectedImageFile({id:SelectedItem.id,name:SelectedItem.innerText});
                filenametextbox.current.value=SelectedItem.innerText;
                setState(false);
  }
  const handleFileChange = async(event) => {
    if (previewSrc) {
      URL.revokeObjectURL(previewSrc);
    }
     setState(true);
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
  const handleFileDelete=async()=>{
    if(confirm("Silmek istediğinizden Eminmisiniz?"))
    {
      await DeleteFile(selectedImageFile.id);
      await GetFilesServer();
    }
  }
  const handleFileRename=async()=>{
    let RenamedName=filenametextbox.current.value;
    await RenameFile(selectedImageFile.id,RenamedName);
    await GetFilesServer();
  }
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
       <div style={{display:'flex',flexDirection:'row'}}>
       <label htmlFor="dosya-sec" className={styles['button']} >
        Dosya Seç
      </label>
      <label  className={styles['button']} onClick={handleUpdateClick}>
        Upload
      </label></div>


     
      <CustomCheckBox name={"Ratio"} checktext={"En/Boy oranı korunsun"} setValue={setKeepRatio}></CustomCheckBox>
      </div>
      <div style={{display:'flex',flexDirection:'column',width:'400px'}}>
     
       <div style={{display:'flex',flexDirection:'row'}}>
         <label>Yüklenmiş dosyalarınız:</label>
       <select  onChange={handleImageFilesChange}>
       {files.map((f)=>
      {
        return <option id={f.id} value={f.url}>{f.name}</option>
      })}
       </select>
        <button style={{padding:'1px'}} title="Resmin Adını Değiştir" onClick={handleFileRename}><FaEdit/></button>
        <button style={{padding:'1px'}} title="Resmi sil" onClick={handleFileDelete}><FaTrash/></button>
        </div>
      <div >
      <label >Dosya Adı:</label>
       <input type="text" ref={filenametextbox}></input></div>
      </div>
       
 
  </div>
  <button className={styles['button']} disabled={disableButton} onClick={onAddImage}>Ekle</button>

  </Suspense>);
}

export default ImageAdd;