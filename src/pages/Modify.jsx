import { useLocation,Navigate, useNavigate } from 'react-router-dom';
import { EditorComponent } from '../components/EditorModal/EditorModal';
import '../components/EditorModal/styles.css'
import useExperiment from '../utils/useExperiment';
import StatusRenderer from '../utils/StatusRenderer';
const ModifyPage=()=>{
    const {isLoading,
        error,ModifyContent} = useExperiment();
    const location = useLocation();
    const Navigate=useNavigate();
  const id=location.state?.id;
  const content=location.state?.content;
  const onClose=()=>{
         Navigate("/");
  }
  const onSave=async(exp)=>{
    const success=await ModifyContent(id,exp);
    if(success)
        Navigate("/deney/",{state:{id:id}});
  }
  const statusContent = (
    <StatusRenderer 
      isLoading={isLoading} 
      error={error} 
      loadingMessage="Deney Kaydediliyor..." // Mesajı dinamik olarak veriyoruz
      // errorMessage'i opsiyonel bırakabiliriz.
    />
  );
  
  // 2. Eğer yükleniyor veya hata varsa, sadece durumu göster
  if (error) {
      return statusContent;
  }       
return(
    <div className='modal-content'>
          <EditorComponent initialContent={content} onClose={onClose} onSave={onSave}/>
    </div>    
)
}
export default ModifyPage;