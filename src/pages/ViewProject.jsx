import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { Link } from 'react-router-dom'; 
import useFetchSim from "../utils/useFetchSim";
import styles from '../pages/styles/ViewProject.module.css'
import StatusRenderer from "../utils/StatusRenderer";
const ViewProject=({ getExperimentById })=>{
    const params=useParams(); 
    const id=params.id;
    const [experiment,isLoading,error]=useFetchSim(getExperimentById(id));
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
       <Link to="/">Geri Dön</Link>
     </div>
    );
};
export default ViewProject;