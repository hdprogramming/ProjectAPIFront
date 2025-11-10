import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom'; // Detay sayfasına gitmek için
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconsTable, DEFAULT_ICON } from '../utils/ExperimentIcons';
import styles from '../pages/styles/ExperimentList.module.css'
import StatusRenderer from '../utils/StatusRenderer';
import useExperiment from '../utils/useExperiment';
import { useFetchUtils } from '../contexts/FetchUtils';
import FilterBar from '../components/FilterBar/FilterBar';
const getExperimentIcon = (iconName) => {
    return IconsTable[iconName] || DEFAULT_ICON;
};
const ExperimentList = () => {
    const { isLoading, error, GetProjects } = useExperiment();
    const [experiments, setExperiments] = useState(null);
    const { getCategoryNameById, getStatusMessageNameById } = useFetchUtils();
    const [currentPage,setCurrentPage]=useState(1);
    const pagelength=5;
    function NextPage()
    {
        setCurrentPage(currentPage+1);
        FetchProjects(currentPage+1,pagelength);
    }
     function BackPage()
    {
        setCurrentPage(currentPage-1);
        FetchProjects(currentPage-1,pagelength);
    }
    async function FetchProjects(page=1,length=10) {
            setExperiments(await GetProjects(page,length));
        }
    useEffect(() => {       
        FetchProjects();
    }, [])

    const statusContent = (
        <StatusRenderer
            isLoading={isLoading}
            error={error}
            loadingMessage="Deneyler Yükleniyor..." // Mesajı dinamik olarak veriyoruz
        // errorMessage'i opsiyonel bırakabiliriz.
        />
    );

    // 2. Eğer yükleniyor veya hata varsa, sadece durumu göster
    if (isLoading || error) {
        return statusContent;
    }

    return (
        <div className={styles.ExperimentList}>
            <h1>Deney Listesi</h1>

            {/* Yeni Deney Ekleme Butonu */}
            <Link to="/deney/yeni" className={styles.NewExperimentButton}
            >+ Yeni Deney Ekle
            </Link>
             {experiments.length<2&& <div>Görüntülenecek proje yok</div>}
            {experiments.length>0&&<FilterBar contents={experiments}>
            {(sortedExperiments) => (
            <ul style={{ listStyle: 'none', padding: 0 }}>
               
                {sortedExperiments.map((exp) => (
                    <li
                        key={exp.id}
                        style={{
                            border: '1px solid #00ff66',
                            marginBottom: '15px',
                            padding: '15px',
                            textAlign: 'left',
                            // isAlive durumuna göre arka plan rengi ayarla
                            backgroundColor: exp.isAlive ? 'rgba(0, 255, 102, 0.1)' : 'rgba(45, 0, 27, 0.3)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <FontAwesomeIcon icon={getExperimentIcon(exp.icon)} />

                            <div>
                                {/* BAŞLIK VE DURUM GÖSTERİMİ */}
                                <h3 style={{ margin: '0 0 5px 0', color: '#00ffff' }}>{exp.title}</h3>
                                <p style={{ margin: '0', fontSize: '0.9em' }}>
                                    Tarih: **{exp.date}** |
                                    Durum: **{getStatusMessageNameById(exp.statusID)}** |
                                    {exp.isAlive ? (
                                        <span style={{ color: '#00ff66', marginLeft: '10px' }}> ✅ Aktif</span>
                                    ) : (
                                        <span style={{ color: 'red', marginLeft: '10px' }}> ❌ Arşivlendi</span>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Deneyin Kısa Açıklaması */}
                        <p style={{ marginTop: '10px', fontSize: '0.9em', color: '#cccccc' }}>
                            {exp.description}...
                        </p>

                        <div style={{ marginTop: '10px' }}>
                            {/* Detay sayfasına yönlendirme */}
                            <Link to={`/deney/`} state={{id:exp.id}} style={{ color: '#00ffff', textDecoration: 'none', fontWeight: 'bold' }}>
                                Dökümantasyonu Görüntüle →
                            </Link>
                            <div className={styles.CategoryBox}>{exp.categoryIds.map(t=>{
                            return <div key={t} className={styles.CategoryBoxes}>{getCategoryNameById(t)}</div>
                            })}
                        </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: '10px' }}>
                            <Link to={`/deney/del/`} state={{id:exp.id}}  className={styles.DelLink}>
                                Sil
                            </Link>
                            <Link to={`/deney/mod/`} state={{id:exp.id}}  className={styles.ModLink}>
                                Düzenle
                            </Link>

                        </div>
                    </li>
                ))}
            </ul>
            )}
            </FilterBar>}
            <div>
               {experiments.length>0&&<button onClick={()=>{NextPage()}}>Daha fazlasını Getir</button>}
           {currentPage>1&&<button onClick={()=>{BackPage()}}>Geri</button>
}</div>
        </div>
    );
};

export default ExperimentList;