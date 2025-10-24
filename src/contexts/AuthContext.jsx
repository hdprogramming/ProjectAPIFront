import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
export const domain = "http://localhost:5098/api"
// 1. Context objesini oluştur
// createContext'e başlangıç değeri olarak bir obje veriyoruz
// Bu obje, bileşenlerin tüketeceği veriyi ve fonksiyonları içerir.

const api = axios.create({
  baseURL: domain,
  withCredentials: true,
  // Diğer ayarlar...
});
const AuthContext = createContext({

});
const TOKEN_KEY = 'accessToken';
const USERID_KEY = 'userID';
// Context'i sağlamak (provide etmek) için bileşen
export const AuthProvider = ({ children }) => {
  const initialToken = sessionStorage.getItem(TOKEN_KEY);
  const initialUserID = sessionStorage.getItem(USERID_KEY);
  const [isLogin, setIsLogin] = useState(!!initialToken);
  const [Token, setToken] = useState(initialToken);
  const [UserID, setUserID] = useState(initialUserID);
  const Navigate=useNavigate();
  const Login = async (user) => {
    let state = false;
    await axios.post(domain + "/Auth/login", user, state).then
      ((response) => {
        if (response.data) {
          setToken(response.data.token);
          setUserID(response.data.userID);
          setIsLogin(true);
          sessionStorage.setItem(TOKEN_KEY, response.data.token);
          sessionStorage.setItem(USERID_KEY, response.data.userID);
          state = true;
        }
      }
      );
    return state;

  };
  const Logoff = () => {
    setIsLogin(false);
    setToken(null);
    setUserID(null);
    // Session Storage'ı temizle
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USERID_KEY);
    Navigate("/login");
  };
  
  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      async(config) => {
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
          const refreshResponse = await axios.post(`${domain}/Auth/refresh`);

          const newAccessToken = refreshResponse.data.Token;

          // 2. Yeni Access Token'ı state'e kaydet
          setToken(newAccessToken);
          setIsLogin(true);

          // 3. Orijinal isteğin başlığını güncelle
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          sessionStorage.setItem(TOKEN_KEY, newAccessToken);
          sessionStorage.setItem(USERID_KEY, UserID);
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