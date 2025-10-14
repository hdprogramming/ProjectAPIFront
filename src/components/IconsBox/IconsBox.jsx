
import styles from './IconsBox.module.css'; 
import { IconsTable } from '../../utils/ExperimentIcons';
import ProjectItem from '../project-item/Project-item';
 const Icons= Object.keys(IconsTable);
const IconsBox = () => {  

  return (
    <div>     
      
    <div className={styles.IconsBox}>
      <div className={styles.IconsHead}>Icon Seçiniz</div><div className={styles.Icons}>
     {/* Dizideki her bir ikon için ProjectItem bileşeni oluşturuyoruz */}
      {Icons.map((key) => {
        const icon=IconsTable[key];
        return (<ProjectItem key={key} icon={icon}  />)
      })}  
      </div>    
       </div>
      
       </div>
  );
};

export default IconsBox;