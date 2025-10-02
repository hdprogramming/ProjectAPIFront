
import './IconsBox.css'; // Opsiyonel: Kendi CSS dosyanızı import edebilirsiniz
import ProjectItem from '../project-item/Project-item';
import { faPlug,faMicrochip,faMagnet,  faRecycle, faBatteryFull, faCalculator,faBolt, faSliders } from '@fortawesome/free-solid-svg-icons';

const IconsBox = () => {
    const Icons=[faPlug, faMicrochip, faMagnet,faRecycle,faBolt,faBatteryFull,faSliders,faCalculator];

 
  return (
    <div>
       <div className='IconsBox-Header'>Icon Seçiniz</div>
    <div className="Icons-Box" >
     {/* Dizideki her bir ikon için ProjectItem bileşeni oluşturuyoruz */}
      {Icons.map((icon, index) => (  
        <ProjectItem key={index} icon={icon} name={icon.iconName.replace('fa-', '')} />
      ))}      
       </div>
      
       </div>
  );
};

export default IconsBox;