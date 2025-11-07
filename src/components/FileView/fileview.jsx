   import { useEffect, useState } from 'react';

   import FileElement from '../FileElement/FileElement';
import useExperiment from '../../utils/useExperiment';
import ImageUploader from '../ImageUploader/ImageUploader';
import Modal from '../Modal/Modal';   
import { FaImage } from 'react-icons/fa';
const CustomButton=()=>{
  return(
    
<button style={{border:'none',display:'flex',flexDirection:'column',
  alignItems:'center'
}}><img width='60px' src='../src/assets/imageadd.png'/>
<label>Resim Yükle</label>
</button>

  )
}

   const FileView=({defaultFiles})=>{
    const {GetFiles}=useExperiment();
  const [isSelected,setSelected]=useState(0);
  const [Files, setUserFiles] = useState([]);
   async function FetchUserFiles() {
            const response = await GetFiles();
            if (response)
                setUserFiles(response);
            else {
                console.log("User Files dosyaları getirilemedi");
            }
        }
  useEffect(()=>{
    FetchUserFiles();
  },[])
  const handleFileDelete = (fileIdToDelete) => {
    // State'i güncelleme işlemi (örneğin bir dosyayı silme)
    setUserFiles(prevList => prevList.filter(file => file.id !== fileIdToDelete));
    
    // setFileList çağrıldığı anda ParentComponent yeniden render edilir.
  };
  return (
   <div style={{width:'40vw'}}>
      <div style={{borderBottom:'1px solid #04ff00ff'}}>
             <label>Dosyalarınız</label>
        </div>       
  <div style={{
    height:'300px',overflow:'auto'}} >

 
  <div style={{ 
    marginLeft:'25px',   
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    padding: '10px',
    overflowY:'visible'
  }}>
   <Modal wndtitle="Dosya Yükle" custombutton={<CustomButton/>}>{(onClose)=>(
    <ImageUploader onSuccess={()=>{
      FetchUserFiles();
      onClose();
    }}></ImageUploader>
   )}</Modal>
   {Files.map(f=>{
        return <FileElement src={f.url} name={f.name} id={f.id} setSelected={setSelected} onDelete={handleFileDelete}></FileElement>
       })}

  </div>
</div></div>
 )
}
export default FileView;