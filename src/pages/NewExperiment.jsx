 
import ProjectForm from '../components/ProjectForm/ProjectForm';
import styles from '../pages/styles/NewExperiment.module.css'
const NewExperiment = ({onAdd}) => { 
 
  return(
    <div className={styles.NewExperiment}>
        <ProjectForm onAdd={onAdd} />
        
        </div> 
)
};

export default NewExperiment;