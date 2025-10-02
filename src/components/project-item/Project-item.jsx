import FormInputField from '../MainComponents/FormInputField/FormInputField';
import './ProjectItem.css'; // Opsiyonel: Kendi CSS dosyanızı import edebilirsiniz
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { useProjectIconContext } from '../ProjectNew/ProjectNew';  
const ProjectItem = ({ name,icon}) => { 
  const { setSelectedIcon} = useProjectIconContext(); 
  const handleClick = () => {
        // Parent'taki state'i güncelliyoruz
        setSelectedIcon(name); 
    };
  return (
   <div className="project-item" onClick={handleClick}>             
      <FontAwesomeIcon icon={icon} className="item-icon" />
      <span className="item-text">
        {name}       
      </span>
    </div>
  );
};

export default ProjectItem;