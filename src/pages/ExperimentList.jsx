import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Detay sayfasına gitmek için
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {IconsTable,DEFAULT_ICON} from '../utils/ExperimentIcons';
import styles from '../pages/styles/ExperimentList.module.css'
const getExperimentIcon = (iconName) => {
    return IconsTable[iconName] || DEFAULT_ICON;
};
const ExperimentList = ({ experiments }) => {
   const [experimentsmain,setExperiments] =useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Gerçek API isteği (GET /api/experiments)
        const fetchExperiments = async () => {
            try {
                // *** GERÇEK API UCU BURAYA GELECEK ***
                // const response = await fetch('/api/experiments');
                // const data = await response.json();
                
                // SIMÜLASYON: 1 saniye bekleyip sahte veriyi yüklüyoruz
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                setExperiments(experiments);
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
        <div className={styles.ExperimentList}>
            <h1>Deney Listesi</h1>
            
            {/* Yeni Deney Ekleme Butonu */}
            <Link to="/deney/yeni" className={styles.NewExperimentButton}
            >+ Yeni Deney Ekle
            </Link>

            {/* Deneyleri Listeleme */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                 {experimentsmain.map((exp) => (
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
                        
                       <FontAwesomeIcon icon={getExperimentIcon(exp.icon)}  />
                        
                        <div>
                            {/* BAŞLIK VE DURUM GÖSTERİMİ */}
                            <h3 style={{ margin: '0 0 5px 0', color: '#00ffff' }}>{exp.title}</h3>
                            <p style={{ margin: '0', fontSize: '0.9em' }}>
                                Tarih: **{exp.date}** | 
                                Durum: **{exp.status}** |
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
                        <Link to={`/deneyler/${exp.id}`} style={{ color: '#00ffff', textDecoration: 'none', fontWeight: 'bold' }}>
                            Dökümantasyonu Görüntüle →
                        </Link>
                    </div>
                     <div style={{ display:'flex',flexDirection:'row-reverse',marginTop: '10px' }}>
                       <Link to={`/deney/del/${exp.id}`} className={styles.DelLink}>
                            Sil
                        </Link>
                        <Link to={`/deney/mod/${exp.id}`} className={styles.ModLink}>
                            Düzenle
                        </Link>
                        
                    </div>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default ExperimentList;