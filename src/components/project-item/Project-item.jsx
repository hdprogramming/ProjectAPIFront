import FormInputField from '../MainComponents/FormInputField/FormInputField';
import './ProjectItem.css'; // Opsiyonel: Kendi CSS dosyanızı import edebilirsiniz
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { useProjectIconContext } from '../ProjectNew/ProjectNew';  
const ProjectItem = ({ name,icon}) => { 
  const { selectedIcon,setSelectedIcon} = useProjectIconContext(); 
  const handleClick = () => {
        // Parent'taki state'i güncelliyoruz
        setSelectedIcon(name); 
          
    };
    const isSelected = selectedIcon && (selectedIcon === name);
    const iconStyle={
      backgroundColor:isSelected?"#005500aa":"transparent",
      border:isSelected?"1px green dashed":"1px solid transparent"
    };
  return (
   <div className="project-item" onClick={handleClick} style={iconStyle}>             
      <FontAwesomeIcon icon={icon} className="item-icon" />
      <span className="item-text">
        {name}       
      </span>
    </div>
  );
};

export default ProjectItem;