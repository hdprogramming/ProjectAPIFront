// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import {IconsTable,DEFAULT_ICON} from '../utils/ExperimentIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import styles from '../pages/styles/Home.module.css'
import useFetchSim from '../utils/useFetchSim';
import StatusRenderer from '../utils/StatusRenderer';
const getExperimentIcon = (iconName) => {
    return IconsTable[iconName] || DEFAULT_ICON;
};
const Home = ({experiments}) => {
  const [fexperiments,isLoading,error]=useFetchSim(experiments);
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
      
      <div className={styles["Project"]}>{fexperiments.map((exp)=>{
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