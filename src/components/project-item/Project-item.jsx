import styles from './ProjectItem.module.css'; // Opsiyonel: Kendi CSS dosyanızı import edebilirsiniz
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

 import { useProjectIconContext } from '../ProjectForm/ProjectForm';  

 
const ProjectItem = ({ icon}) => { 
  let name=icon.iconName.replace('fa-', '');
  const { selectedIcon,setSelectedIcon} = useProjectIconContext(); 
  const handleClick = () => {
        // Parent'taki state'i güncelliyoruz
        setSelectedIcon(name); 
          
    };
    const isSelected = selectedIcon && (selectedIcon === name);
    const iconStyle={
      backgroundColor:isSelected?"#005500aa":"transparent",
      border:isSelected?"1px #00ffa988 dashed":"1px solid transparent",
      color:isSelected&&"#00ffa9"
    };
  return (
   <div className={styles.projectitem} onClick={handleClick} style={iconStyle}>             
      <FontAwesomeIcon icon={icon} className={styles.itemicon} />
      <span className={styles.itemtext}>
        {name}       
      </span>
    </div>
  );
};

export default ProjectItem;