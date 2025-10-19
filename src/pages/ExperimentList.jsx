import React, { useState, useEffect,useContext } from 'react';
import { Link } from 'react-router-dom'; // Detay sayfasına gitmek için
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {IconsTable,DEFAULT_ICON} from '../utils/ExperimentIcons';
import styles from '../pages/styles/ExperimentList.module.css'
import useFetchSim from '../utils/useFetchSim';
import StatusRenderer from '../utils/StatusRenderer';
import { useAuth } from '../contexts/AuthContext';
const getExperimentIcon = (iconName) => {
    return IconsTable[iconName] || DEFAULT_ICON;
};
const ExperimentList = () => {
    const {api,Token,UserID} = useAuth();
    const [experiments, setExperiments] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // 👈 BURASI TRUE OLMALI
    const [error, setError] = useState(null);
    useEffect(()=>{
        
          const fetchData = async () => {
        try {
                // Burada 401 hatası (Token süresi doldu) oluşursa, 
                // hata yakalama bloğuna atlar.
                const response = await api.get("/Projects"); 
               if (response && response.data) {
    // response.data'da veri varsa direkt atama yapılır
    setExperiments(response.data);
    setIsLoading(false);
} else {
    // Veri gelmezse veya boş gelirse boş dizi ayarlanır
    setExperiments([]); 
}
            } catch (err) {
                // Hata oluştuğunda (Örn: 401, 404, Ağ Hatası)
                console.error("Proje yüklenirken hata oluştu:", err);
                // Burada kullanıcıya hata mesajını gösterebilirsin.
                // setError(err.message); 
                // setExperiments(null) kalır.
            }
        
    };
    fetchData();
    },[api])   

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

            {/* Deneyleri Listeleme */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                 {experiments.map((exp) => (
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