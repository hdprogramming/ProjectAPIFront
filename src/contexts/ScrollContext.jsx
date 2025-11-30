import React, { useState, useEffect, createContext, useContext } from 'react';

// 1. Context'i oluştur
const ScrollContext = createContext();

// 2. Provider Bileşenini oluştur (TÜM MANTIK BURADA)
export function ScrollProvider({ children }) {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  // Olay dinleyiciyi SADECE BİR KEZ BURADA EKLE!
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Temizlemeyi unutma
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Boş dizi sayesinde sadece bir kez çalışır

  // 3. Değeri (scrollY) Context aracılığıyla "yayınla"
  return (
    <ScrollContext.Provider value={scrollY}>
      {children}
    </ScrollContext.Provider>
  );
}

// 4. Değeri okumak için kolay bir custom hook (isteğe bağlı ama önerilir)
export function useScroll() {
  return useContext(ScrollContext);
}