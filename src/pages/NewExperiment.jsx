 
import ProjectForm from '../components/ProjectForm/ProjectForm';
import styles from '../pages/styles/NewExperiment.module.css'
import useExperiment from '../utils/useExperiment';
const NewExperiment = () => { 
 const {saveProject}=useExperiment();
 const onAdd=async(newExp)=>{
    const success=await saveProject(newExp,true);
    return success;
 }
  return(
    <div className={styles.NewExperiment}>
        <ProjectForm onAdd={onAdd} />
        
        </div> 
)
};

export default NewExperiment;