import React, { createContext, useContext, useState } from 'react';

// 1. Context objesini oluştur
// createContext'e başlangıç değeri olarak bir obje veriyoruz
// Bu obje, bileşenlerin tüketeceği veriyi ve fonksiyonları içerir.
const AuthContext = createContext({
  isLogin: false,
  
});

// Context'i sağlamak (provide etmek) için bileşen
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  // isLogin durumunu tersine çeviren fonksiyon
  const Login =(user) => {
     const success = (user.email === "deneme@com" && user.pass === "1234");
    setIsLogin(success);
  return success;
  
  };
   const Logoff = () => {
    setIsLogin(false);
  };

  // Context'in sağlayacağı (value) değer
  const value = {
    isLogin,
    Login,
    Logoff,
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