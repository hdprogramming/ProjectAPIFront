   import { useEffect, useState } from 'react';

   import FileElement from '../FileElement/FileElement';
import useExperiment from '../../utils/useExperiment';
   
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
   <div >
      <div style={{borderBottom:'1px solid #04ff00ff'}}>
             <label>Dosyalarınız</label>
        </div>       
  <div style={{
    height:'300px',overflow:'auto'}} >

 
  <div style={{    
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    padding: '10px',
    overflowY:'visible'
  }}>

   {Files.map(f=>{
        return <FileElement src={f.url} name={f.name} id={f.id} setSelected={setSelected} onDelete={handleFileDelete}></FileElement>
       })}

  </div>
</div></div>
 )
}
export default FileView;