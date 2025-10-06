 
import ProjectNew from '../components/ProjectNew/ProjectNew';
import '../pages/styles/NewExperiment.css'
const NewExperiment = ({onAdd}) => { 
  return(
    <div className='NewExperiment'>
        <ProjectNew onAdd={onAdd}/>
        
        </div> 
)
};

export default NewExperiment;