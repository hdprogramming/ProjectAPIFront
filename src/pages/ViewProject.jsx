import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import styles from '../pages/styles/ViewProject.module.css'
import StatusRenderer from "../utils/StatusRenderer";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { ProjectIdProvider } from "../utils/ProjectIDContext";
import { useFetchUtils } from "../contexts/FetchUtils";
const ViewProject = () => {
  const location = useLocation();
  const id = location.state?.id;
  const { isLogin, api } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [experiment, setExperiment] = useState(null);
  const [error, setError] = useState(null);
  const { getCategoryNameById } = useFetchUtils();
  useEffect(() => {
    const FetchProject = async (id) => {
      try {
        const response = await api.get("projects/" + id);
        if (response && response.data) {
          setExperiment(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error);
      }

    }
    FetchProject(id);
    setIsLoading(true);
  }, [api, id])
  function DateParse(date) {
    let ds = String(date).split('-');
    if (ds.length > 0)
      return (ds[2] + "." + ds[1] + "." + ds[0])
    else return date;
  }
  // 1. Durumu render et
  const statusContent = (
    <StatusRenderer
      isLoading={isLoading}
      error={error}
      loadingMessage="Deney Yükleniyor..." // Mesajı dinamik olarak veriyoruz
    // errorMessage'i opsiyonel bırakabiliriz.
    />
  );

  // 2. Eğer yükleniyor veya hata varsa, sadece durumu göster
  if (isLoading || error) {
    return statusContent;
  }

  return (

    <div className={styles.ExperimentContent}>

      <div style={{ display: 'flex', justifyContent: 'right', marginBottom: '20px' }}>

        <Link to="/">Geri Dön</Link>
      </div>
      <h2 className={styles.ExperimentTitle}>{experiment.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: experiment.content }}></div>
      <div style={{ display: 'flex', alignContent: 'right' }}>
        {experiment.categoryIds.map(cat => {
          return <label className={styles.TagsBox}>{getCategoryNameById(cat)}</label>
        })}</div>
      <div style={{ display: 'flex', justifyContent: 'right', marginTop: '10px' }}>
        {isLogin && <div>
          <Link to={`/deney/modifycontent/`} state={{ id: experiment.id, content: experiment.content }} className={styles.ModLink}>
            Düzenle
          </Link>
          <Link to={`/deney/del/`} state={{ id: experiment.id }} className={styles.DelLink}>
            Sil
          </Link>
        </div>}
      </div>

      {String(experiment.content).length > 1500 && <Link to="/">Geri Dön</Link>}
    </div>
  );
};
export default ViewProject;