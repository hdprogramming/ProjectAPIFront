import { useParams } from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom'; 
import styles from '../pages/styles/DelExperiment.module.css'
import useExperiment from '../utils/useExperiment';
const DelExperiment = () => { 
    // const params = useParams(); // Zaten altta `id`'yi aldığınız için buna gerek yok.
      const location = useLocation();
      const navigate=useNavigate();
        const id=location.state?.id;
    const {isLoading,error,deleteProject,GetProjects} =useExperiment(id);
    // "Evet" butonuna basılınca çalışacak fonksiyon
    const handleDelete = async() => {
        const isConfirmed = window.confirm(
            'Bu deneyi kalıcı olarak silmek istediğinizden emin misiniz?'
        );
        if (isConfirmed) {
            deleteProject();
        }
        // Silme onaylansın veya onaylanmasın, kullanıcıyı yönlendir
        let experiments=await GetProjects();
          navigate('/deneyler',{state:{experiments,error,isLoading}});
    };  

    // "Hayır" butonuna basılınca çalışacak fonksiyon
    const handleCancel = async() => {
        // Doğrudan Deney Listesi sayfasına yönlendir
        
          navigate('/deneyler');
    };

    return(
        <div className={styles.DelExperiment}>
            {/* Formu sadece görsel olarak kullanabiliriz veya kaldırabiliriz. 
                Burada butonları <form> etiketi dışında da tutabilirsiniz. 
                Eğer form etiketi içinde tutacaksanız, butonları type="button" yapıp onClick kullanın. 
                Type="submit" kullanırsanız sayfa yenileme riski doğar.*/}
            
            <div className={styles.DelMessage}>Projenizi Silmek <br />istediğinizden emin misiniz?</div>
            <p>
                {/* 1. Evet Butonu: Silme işlemini başlatır */}
                <button type="button" className={styles.button} onClick={handleDelete}>Evet</button>
                {/* 2. Hayır Butonu: Sadece yönlendirme yapar */}
                <button type="button" className={styles.button} onClick={handleCancel}>Hayır</button>
            </p>
        </div> 
    );
};

export default DelExperiment;