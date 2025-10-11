import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { Link } from 'react-router-dom'; 
import styles from '../pages/styles/ViewProject.module.css'
const ViewProject=({ getExperimentById })=>{
     const [experiment,setExperiment] =useState([]);
     const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
    const params=useParams();
    const id=params.id;
   useEffect(() => {
           // Gerçek API isteği (GET /api/experiments)
           const fetchExperiments = async () => {
               try {
                   // *** GERÇEK API UCU BURAYA GELECEK ***
                   // const response = await fetch('/api/experiments');
                   // const data = await response.json();
                   
                   // SIMÜLASYON: 1 saniye bekleyip sahte veriyi yüklüyoruz
                   await new Promise(resolve => setTimeout(resolve, 1000));
                   
                   setExperiment(getExperimentById(id));
                   setIsLoading(false);
   
               } catch (err) {
                   setError("Deneyler yüklenirken bir hata oluştu.");
                   setIsLoading(false);
               }
           };
   
           fetchExperiments();
       }, []); // Bileşen yüklendiğinde bir kez çalışır
       
       if (isLoading) {
           return <h2 style={{ color: 'yellow' }}>Deney listesi yükleniyor...</h2>;
       }
   
       if (error) {
           return <h2 style={{ color: 'red' }}>Hata: {error}</h2>;
       }
    
    return (
     <div className={styles.ExperimentContent}>
       <h2>{experiment.title} </h2> 
       <p>{experiment.content}</p>
       <Link to="/">Geri Dön</Link>
     </div>
    );
};
export default ViewProject;