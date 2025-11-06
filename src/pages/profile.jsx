// ProductDetail.js

import { useEffect, useState } from 'react';
import StatusRenderer from '../utils/StatusRenderer';
import { useAuth } from "../contexts/AuthContext";
import useExperiment from "../utils/useExperiment";
import FileView from '../components/FileView/fileview'
const Profile = () => {
    const [UserData, setUserData] = useState();
   
    // 1. Veri ve Yükleme Durumları İçin State Tanımlama
    const { UserID, Logoff } = useAuth();
    
    const { GetUserData, isLoading, errors} = useExperiment();
    function EmailMasker(emailtext)
    {
     return "**"+String(emailtext).slice(2);
    }
    async function FetchUserData(id) {
            const response = await GetUserData(id);
            if (response)
                setUserData(response);
            else {
                Logoff();
            }
        }
       
    useEffect(() => {
        
        FetchUserData(UserID);       
    }, []);
    const statusContent = (
        <StatusRenderer
            isLoading={isLoading}
            error={errors}
            loadingMessage="Profil Yükleniyor..." // Mesajı dinamik olarak veriyoruz
        // errorMessage'i opsiyonel bırakabiliriz.
        />
    );

    // 2. Eğer yükleniyor veya hata varsa, sadece durumu göster
    if (isLoading || errors) {
        return statusContent;
    }
    // 4. Veri Yüklendikten Sonra İçeriği Gösterme
    return (
        <div style={{ display: 'flex', flexDirection: "column", gap: '5px' }}>
            <div style={{ padding: '20px', border: '1px solid #00ff66' }}>

                <h1>Profiliniz</h1>
                <p><strong>Adınız:</strong> {UserData.userName}</p>
                <p><strong>E-posta:</strong> {EmailMasker(UserData.email)}</p>
                <p><strong>Hakkında:</strong> {UserData.bio ? UserData.bio : "yok"}</p>

            </div>
            <div style={{ border: '1px solid #00ff66' }}>
                <FileView >

                </FileView>
            </div>
        </div>
    );
};


export default Profile;