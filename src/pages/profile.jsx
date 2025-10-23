// ProductDetail.js

import  { useEffect, useState } from 'react';
import StatusRenderer from '../utils/StatusRenderer';
import { useAuth } from "../contexts/AuthContext";
import useExperiment from "../utils/useExperiment";


const Profile = () => {
    const [UserData,setUserData]=useState();
    // 1. Veri ve Yükleme Durumları İçin State Tanımlama
    const {  UserID} = useAuth();
    const {GetUserData,isLoading,errors }=useExperiment();
    useEffect(()=>{
     async function FetchUserData(id) {
        const response=await GetUserData(id);
        if(response)
            setUserData(response);
     }
     FetchUserData(UserID);
    },[]);
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
        <div style={{ width: '50%', padding: '20px', border: '1px solid #00ff66' }}>
            <h1>Kullanıcı Profili</h1>            
            <p><strong>Adı:</strong> {UserData.userName}</p>
            <p><strong>E-posta:</strong> {UserData.email}</p>
            <p><strong>Hakkında:</strong> {UserData.bio?UserData.bio:"yok"}</p>
           
        </div>
    );
};


export default Profile;