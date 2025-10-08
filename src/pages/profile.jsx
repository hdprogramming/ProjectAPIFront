// ProductDetail.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
   // API'den gelebilecek bir kullanıcı objesi simülasyonu
const FAKE_USER_DATA = {
    name: "Gemini Asistanı",
    email: "gemini@ai.com",
    bio: "React projelerinize profesyonel bir yaklaşım sunarım.",
    joined: "2023-10-27"
};

const Profile = () => {
    // 1. Veri ve Yükleme Durumları İçin State Tanımlama
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // 2. Bileşen Yüklendiğinde (mount) Veri Çekme İşlemini Başlatma
    useEffect(() => {
        // Normalde burada fetch('https://api.siteniz.com/profile/1') yapılırdı.
        
        // Simülasyon: 1.5 saniyelik bir gecikme ile veriyi yüklüyoruz
        setTimeout(() => {
            setUserData(FAKE_USER_DATA); // Veriyi state'e kaydet
            setIsLoading(false);      // Yükleme bitti
        }, 800); 
    }, []); // Boş dizi ([]) sayesinde sadece BİR KEZ çalışır (bileşen yüklendiğinde).

    // 3. Yükleme Durumuna Göre Kullanıcıya Geri Bildirim
    if (isLoading) {
        return <h2 style={{ color: 'yellow' }}>Profil yükleniyor...</h2>;
    }

    // 4. Veri Yüklendikten Sonra İçeriği Gösterme
    return (
        <div style={{ width:'50%',padding: '20px', border: '1px solid #00ff66' }}>
            <h1>Kullanıcı Profili</h1>
            <p><strong>Adı:</strong> {userData.name}</p>
            <p><strong>E-posta:</strong> {userData.email}</p>
            <p><strong>Hakkında:</strong> {userData.bio}</p>
            <p><strong>Katılım Tarihi:</strong> {userData.joined}</p>
        </div>
    );
};


export default Profile;