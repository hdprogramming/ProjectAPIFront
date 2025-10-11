// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import {IconsTable,DEFAULT_ICON} from '../utils/ExperimentIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import styles from '../pages/styles/Home.module.css'
const getExperimentIcon = (iconName) => {
    return IconsTable[iconName] || DEFAULT_ICON;
};
const Home = ({experiments}) => {
  return (
    <div className={styles['Window']}>
     <div className={styles['Window-Header']}><label>Projeler </label><span className={styles['Window-Header-Minimalize']}>-</span></div>
      
      <div className={styles["Project"]}>{experiments.map((exp)=>{
        return <div className={styles['item']}> 
          <Link to={`/deneyler/${exp.id}`} ><FontAwesomeIcon icon={getExperimentIcon(exp.icon)} className={styles['item-icon']} />
          <p>{exp.title}</p>
          </Link></div>
      })}
      </div>
    </div>
  );
};

export default Home;