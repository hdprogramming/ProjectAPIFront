import React, { useState, useEffect, Suspense ,useRef} from 'react';
import styles from './imageadd.module.css'; // Stilleri yandaki dosyadan çekeceğiz
import CustomCheckBox from '../MainComponents/CustomCheckBox/CustomCheckBox';
import useExperiment from '../../utils/useExperiment';
import StatusRenderer from '../../utils/StatusRenderer';
import { useProjectId } from '../../utils/ProjectIDContext';
import ImageUploader from '../ImageUploader/ImageUploader';
import Modal from '../Modal/Modal';
import {
 
  FaEdit,
  FaTrash
} from 'react-icons/fa';
function ImageAdd({onAddImage,setKeepRatio,setImageUrl}) {

  const {isLoading,error,GetFiles,DeleteFile,RenameFile}=useExperiment();
  const [disableButton,setDisableState]=useState(true);
  // 2. Asıl 'File' nesnesini saklamak için state
  // (Not: Değişken adını 'File' yerine 'file' yaptım, 
  // 'File' JavaScript'in yerleşik bir adıdır, kafa karıştırmasın)
  const [files,setFiles]=useState([]);
  const [selectedImageFile,setSelectedImageFile]=useState({id:0,"name":"yok"});
    const [previewSrc, setPreviewSrc] = useState(null);
    const [selectedItem,setSelectedItem]=useState(0);
  async function GetFilesServer(){
    const fetchedfiles=await GetFiles();
    if(fetchedfiles)
    {
      setFiles(fetchedfiles);      
    }
      
   }
  useEffect(()=>{
   
   GetFilesServer();
  },[]); 
 
  
  const projectid = useProjectId();
  const filenametextbox=useRef();
  
  function handleSuccess()
  {
     setDisableState(false);
   GetFilesServer();     
  }
  const handleImageFilesChange=(event)=>{
               setPreviewSrc(event.target.value);
                setImageUrl(event.target.value);                
                let SelectedItem=event.target.selectedOptions[0];                
                setSelectedImageFile({id:SelectedItem.id,name:SelectedItem.innerText,url:event.target.value});
                filenametextbox.current.value=SelectedItem.innerText;
                setDisableState(false);
  }
  
  const handleFileDelete=async(e)=>{
    e.preventDefault();
    if(confirm("Silmek istediğinizden Eminmisiniz?"))
    {
      await DeleteFile(selectedImageFile.id);
      await GetFilesServer();
    }
  }
  const handleFileRename=async(e)=>{
      e.preventDefault();
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
      <div className={styles['imageadd-area']}>  
       
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
             <label>Resim Ekle</label>
       {previewSrc && (
          <img
            src={previewSrc}
            alt="Önizleme"
            width="150px"
            height="150px"
            style={{ objectFit: 'cover' }} // Resmin düzgün görünmesi için
          />
        )}
      <CustomCheckBox name={"Ratio"} checktext={"En/Boy oranı korunsun"} setValue={setKeepRatio}></CustomCheckBox>
     
      <div style={{display:'flex',flexDirection:'column',width:'400px'}}>
     
       <div style={{display:'flex',flexDirection:'row'}}>
         <label>Yüklenmiş dosyalarınız:</label>
       <select defaultValue={"0"} onChange={handleImageFilesChange}>
       {files.map((f)=>
      {
        return <option id={f.id} value={f.url} selected={f.url==selectedItem | false}>{f.name}</option>
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
      
  
  </div>
  <div className={styles['imageadd-footer']}>
      <Modal btntitle="Resim Yükle" wndtitle="Resim Yükleme Penceresi">
          {(onClose)=>(
               <div >
                  <ImageUploader imagename={null} setSelectedItem={setSelectedItem} projectid={projectid} setImageUrl={setImageUrl} 
                  onSuccess={()=>{
                    handleSuccess();
                    onClose();
                    }}></ImageUploader>
               
               </div>)}
  </Modal>
  <button disabled={disableButton} onClick={onAddImage}>Projeye Ekle</button>
</div>
  </Suspense>);
}

export default ImageAdd;