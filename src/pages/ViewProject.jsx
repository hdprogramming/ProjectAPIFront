import { useParams } from "react-router-dom";
import { useEffect,useState,useContext } from "react";
import { Link } from 'react-router-dom'; 
import styles from '../pages/styles/ViewProject.module.css'
import StatusRenderer from "../utils/StatusRenderer";
import { useAuth } from "../contexts/AuthContext";
import { useLocation} from "react-router-dom";
const ViewProject=()=>{
    const location=useLocation();
    const id=location.state?.id;
    const { isLogin, api } = useAuth();
    const [isLoading,setIsLoading]=useState(true);
    const [experiment,setExperiment]=useState(null);
    const [error,setError]=useState(null);
    useEffect(()=>{
        const FetchProject=async(id)=>{
          try {
            const response=await api.get("projects/"+id);
          if(response&&response.data)
          {
             setExperiment(response.data);
             setIsLoading(false);
          }
          } catch (error) {
            setError(error);
          }
          
        }
      FetchProject(id);
      setIsLoading(true);
    },[api,id])
    // 1. Durumu render et
  const statusContent = (
    <StatusRenderer 
      isLoading={isLoading} 
      error={error} 
      loadingMessage="Deney Yükleniyor..." // Mesajı dinamik olarak veriyoruz
      // errorMessage'i opsiyonel bırakabiliriz.
    />
  );
  
  // 2. Eğer yükleniyor veya hata varsa, sadece durumu göster
  if (isLoading || error) {
      return statusContent;
  }       
   
    return (
     <div className={styles.ExperimentContent}>
       <h2>{experiment.title} </h2> 
       <p><div dangerouslySetInnerHTML={{__html: experiment.content}}></div></p>
       {isLogin&&<div style={{ display:'flex',flexDirection:'row-reverse',marginTop: '10px'}}>
                       <Link to={`/deney/del/`} state={{id:experiment.id}}  className={styles.DelLink}>
                            Sil
                        </Link>
                        <Link to={`/deney/modifycontent/`} state={{id:experiment.id,content:experiment.content}} className={styles.ModLink}>
                            Düzenle
                        </Link>
                        
                    </div>}
       <Link to="/">Geri Dön</Link>
     </div>
    );
};
export default ViewProject;