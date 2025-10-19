import { useParams } from "react-router-dom";
import { useEffect,useState,useContext } from "react";
import { Link } from 'react-router-dom'; 
import useFetchSim from "../utils/useFetchSim";
import styles from '../pages/styles/ViewProject.module.css'
import StatusRenderer from "../utils/StatusRenderer";
import { useAuth } from "../contexts/AuthContext";

const ViewProject=()=>{
    const params=useParams(); 
    const id=params.id;
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
       <p>{experiment.content}</p>
       {isLogin&&<div style={{ display:'flex',flexDirection:'row-reverse',marginTop: '10px'}}>
                       <Link to={`/deney/del/${experiment.id}`} className={styles.DelLink}>
                            Sil
                        </Link>
                        <Link to={`/deney/mod/${experiment.id}`} className={styles.ModLink}>
                            Düzenle
                        </Link>
                        
                    </div>}
       <Link to="/">Geri Dön</Link>
     </div>
    );
};
export default ViewProject;