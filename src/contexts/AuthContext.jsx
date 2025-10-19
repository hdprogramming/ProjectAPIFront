import axios from 'axios';
import React, { createContext, useContext, useState,useEffect } from 'react';
export const domain="http://localhost:5098/api"
// 1. Context objesini oluştur
// createContext'e başlangıç değeri olarak bir obje veriyoruz
// Bu obje, bileşenlerin tüketeceği veriyi ve fonksiyonları içerir.
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: domain,
    // Diğer ayarlar...
});
const AuthContext = createContext({
  isLogin: false,  
});

// Context'i sağlamak (provide etmek) için bileşen
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [Token,setToken]=useState(null);
  const [UserID,setUserID]=useState(null);
  // isLogin durumunu tersine çeviren fonksiyon
  const Login =async (user) => {
    let state=false;
    await axios.post(domain+"/Auth/login",user,state).then
    ((response)=>{
      if(response.data)
      {
     setToken(response.data.token);
     setUserID(response.data.userID);
     setIsLogin(true);
     state=true;
    }}
    );
  return state;
  
  };
   const Logoff = () => {
    setIsLogin(false);
    setToken(null);
     setUserID(null);
  };
   useEffect(() => {
        const interceptor = api.interceptors.request.use(
            (config) => {
                if (Token) {
                    // Bu Access Token'ı ekler, Refresh Token'ı DEĞİL
                    config.headers.Authorization = `Bearer ${Token}`;
                }
                return config;
            },
            // ... (hata yönetimi)
        );
        return () => api.interceptors.request.eject(interceptor);
    }, [Token]);
    api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 401 hatası ve henüz tekrar denememişsek
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 1. Yeni Access Token alma isteği
                // Axios, bu isteğe HttpOnly Cookie içindeki Refresh Token'ı otomatik ekler!
                const refreshResponse = await axios.post(`${domain}/Auth/refresh-token`); 
                
                const newAccessToken = refreshResponse.data.Token;
                
                // 2. Yeni Access Token'ı state'e kaydet
                setToken(newAccessToken); 

                // 3. Orijinal isteğin başlığını güncelle
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // 4. Orijinal isteği tekrarla
                return api(originalRequest);
                
            } catch (refreshError) {
                // Refresh Token da süresi dolduysa veya geçersizse: Logoff
                console.error("Refresh Token Başarısız. Kullanıcı çıkış yapıyor.", refreshError);
                Logoff();
                // Kullanıcıyı Login sayfasına yönlendir
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
  // Context'in sağlayacağı (value) değer
  const value = {
    isLogin,
    UserID,
    Token,
    Login,
    Logoff,
    api,
  };

  return (
    // 2. Context.Provider ile değeri uygula
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Context'i tüketmek için özel bir Hook (Opsiyonel ama önerilir)
// Bu Hook, kullanımı Child bileşenlerde daha temiz hale getirir.
export const useAuth = () => {
  return useContext(AuthContext);
};

// Hem AuthProvider'ı hem de useAuth hook'unu dışa aktar
export default AuthContext;