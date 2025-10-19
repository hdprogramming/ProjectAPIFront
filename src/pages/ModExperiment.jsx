import ProjectForm from '../components/ProjectForm/ProjectForm';
import styles from '../pages/styles/NewExperiment.module.css'
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
const ModExperiment = () => { 
  const params=useParams();
  const { id } = useParams();
  const [project,SetProject]=useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //let project = getExperimentById(id);
  const {api}=useAuth();
  async function  onUpdate(newExp){
    
      const PutProject=async()=>{
        try{
           SetProject(newExp);
           const response= await api.put("Projects/"+id,newExp);
           if(response)
           {
            console.log(response);
           }
        }
        catch(error)
        {
          console.log(error);
        }
      }
      await PutProject();
      return true;  
  }
  useEffect(()=>{
         const FetchProject=async()=>{
          try{
           const response=await api.get("/Projects/"+id);
          if(response&&response.data)
          {
             SetProject(response.data);
              setIsLoading(false);
          }
            
          }
          catch(error){
            console.log(error);
          }
          finally{
            setIsLoading(false);
          }
          
         }
         setIsLoading(true);
         FetchProject();
        }
  ,[api,id]) 
 if (isLoading) {
        return <div className={styles.NewExperiment}>Loading Project Data...</div>; // Show a loading message
    }

    if (!project) {
        // This is for the case where loading is done but no project was found (e.g., 404)
        return <div className={styles.NewExperiment}>Project not found.</div>;
    }
  return(
    <div className={styles.NewExperiment}>
        <ProjectForm onUpdate={onUpdate} project={project}/>        
        </div> 
)
};

export default ModExperiment;