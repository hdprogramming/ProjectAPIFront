import ProjectForm from '../components/ProjectForm/ProjectForm';
import styles from '../pages/styles/NewExperiment.module.css'
import { useParams } from 'react-router-dom';
const ModExperiment = ({onUpdate,getExperimentById}) => { 
  const params=useParams();
  const { id } = useParams();
  let project = getExperimentById(id);
  return(
    <div className={styles.NewExperiment}>
        <ProjectForm onUpdate={onUpdate} project={project}/>        
        </div> 
)
};

export default ModExperiment;