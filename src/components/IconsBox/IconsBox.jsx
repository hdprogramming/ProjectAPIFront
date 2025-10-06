
import './IconsBox.css'; // Opsiyonel: Kendi CSS dosyanızı import edebilirsiniz
import ProjectItem from '../project-item/Project-item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { IconsTable } from '../../utils/ExperimentIcons';
 const Icons= Object.keys(IconsTable);
const IconsBox = () => {  

  return (
    <div>     
       <div className='IconsBox-Header'> <h2>Yeni Proje</h2></div>
    <div className="Icons-Box" >
      <div className='Icons-Head'>Icon Seçiniz</div><div className='Icons'>
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