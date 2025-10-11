// ProductDetail.js

import React from 'react';
import useFetchSim from '../utils/useFetchSim';
import StatusRenderer from '../utils/StatusRenderer';
   // API'den gelebilecek bir kullanıcı objesi simülasyonu
const FAKE_USER_DATA = {
    name: "Gemini Asistanı",
    email: "gemini@ai.com",
    bio: "React projelerinize profesyonel bir yaklaşım sunarım.",
    joined: "2023-10-27"
};

const Profile = () => {
    // 1. Veri ve Yükleme Durumları İçin State Tanımlama
    const [userData, isLoading,errors] = useFetchSim(FAKE_USER_DATA);  
    // 3. Yükleme Durumuna Göre Kullanıcıya Geri Bildirim
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