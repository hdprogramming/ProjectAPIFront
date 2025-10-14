import React, { useEffect } from 'react'; // useEffect'i import etmeyi unutmayın
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom'; 


const LogoffWindow = () => {
    const navigate = useNavigate();
    const { Logoff } = useAuth(); // Sadece Logoff'a ihtiyacınız var
    
    // **useEffect HOOK'unu Kullanın**
    useEffect(() => {
        // Bu kod, bileşen ekrana yüklendikten hemen sonra çalışır

        const timer = setTimeout(() => {
            // 1. Kullanıcıyı sistemden çıkar
            Logoff(); 
            
            // 2. Anasayfaya yönlendir
            navigate("/", { replace: true }); 
            // { replace: true } eklemek iyi bir pratiktir, 
            // böylece kullanıcı "Geri" tuşuyla LogoffWindow sayfasına geri dönemez.
        }, 800); 

        // Temizleme (Cleanup) Fonksiyonu:
        // Bileşen ekrandan ayrılırsa, zamanlayıcıyı temizler
        return () => clearTimeout(timer); 

    // Boş bağımlılık dizisi [], kodun sadece BİR KERE (mount edildiğinde) çalışmasını sağlar
    }, [Logoff, navigate]); 
    // NOT: Logoff ve navigate fonksiyonları stabil olduğu için bu dizide kalmaları önerilir.

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}> 
            <h1>Çıkış Yapılıyor...</h1>
            <p>Anasayfaya Yönlendiriliyorsunuz...</p>
        </div>
    )
}
export default LogoffWindow;