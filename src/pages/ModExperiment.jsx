import ProjectForm from '../components/ProjectForm/ProjectForm';
import styles from '../pages/styles/NewExperiment.module.css'
import { useParams } from 'react-router-dom';
import useExperiment from '../utils/useExperiment';
const ModExperiment = () => { 
  const { id } = useParams();
   const{experiment,
        isLoading,
        saveProject}=useExperiment(id);

  async function  onUpdate(newExp){
    
      const success=await saveProject(newExp,false);
      return success;  
  }
  
 if (isLoading) {
        return <div className={styles.NewExperiment}>Loading Project Data...</div>; // Show a loading message
    }

    if (!experiment) {
        // This is for the case where loading is done but no project was found (e.g., 404)
        return <div className={styles.NewExperiment}>Project not found.</div>;
    }
  return(
    <div className={styles.NewExperiment}>
        <ProjectForm onUpdate={onUpdate} project={experiment}/>        
        </div> 
)
};

export default ModExperiment;