// Home.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {IconsTable,DEFAULT_ICON} from '../utils/ExperimentIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import styles from '../pages/styles/Home.module.css'
import useFetchSim from '../utils/useFetchSim';
import StatusRenderer from '../utils/StatusRenderer';
import useExperiment from '../utils/useExperiment';
import { useLocation } from 'react-router-dom';
const getExperimentIcon = (iconName) => {
    return IconsTable[iconName] || DEFAULT_ICON;
};
const Home = () => {
  const {isLoading,error,GetProjects}=useExperiment();
  const [experiments,setExperiments]=useState([]);
  const location = useLocation();
  let exp=null;
  useEffect(()=>{
    async function FetchProjects()
    {
      exp=await GetProjects();
      setExperiments(exp);
    }
    if(exp===null)
      FetchProjects();
  },[])
 

  const statusContent = (
    <StatusRenderer 
      isLoading={isLoading} 
      error={error} 
      loadingMessage="Deneyler Yükleniyor..." // Mesajı dinamik olarak veriyoruz
      // errorMessage'i opsiyonel bırakabiliriz.
    />
  );
  
  // 2. Eğer yükleniyor veya hata varsa, sadece durumu göster
  if (isLoading || error) {
      return statusContent;
  }       
  return (
    <div className={styles['Window']}>
     <div className={styles['Window-Header']}><label>Projeler </label><span className={styles['Window-Header-Minimalize']}>-</span></div>
      
      <div className={styles["Project"]}>{experiments.map((exp)=>{
        return <div key={`DeneyNo${exp.id}`} className={styles['item']}> 
          <Link to={`/deneyler/${exp.id}`} ><FontAwesomeIcon icon={getExperimentIcon(exp.icon)} className={styles['item-icon']} />
          <p>{exp.title}</p>
          </Link></div>
      })}
      </div>
    </div>
  );
};

export default Home;