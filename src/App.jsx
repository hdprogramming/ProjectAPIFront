import './App.css'

import './components/project-item/Project-item'

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Navbar from './components/navbar/navbar';
import ExperimentList from './pages/ExperimentList';
import NewExperiment from './pages/NewExperiment';
import { createContext,useContext , useState } from 'react';
import ModExperiment from './pages/ModExperiment';
import DelExperiment from './pages/DelExperiment';
import ViewProject from './pages/ViewProject';
import { AuthProvider,useAuth } from './contexts/AuthContext';
import LoginWindow from './pages/Login';
import LogoffWindow from './pages/Logoff';
//Burada örnek deney verileri tanımlıyoruz
let initialExperiments = [
  {
    id: 1,
    icon: null, // "none" yerine genellikle null veya boş string kullanılır
    title: "Plazma Fizik Deneyi",
    description:"",
    content: "Yüksek enerji yoğunluğunda plazma üretimi, kararlılığı ve manyetik hapsi incelenmiştir. Deneyde helyum gazı kullanılmıştır.",
    isAlive: true, // Deneyin aktif olarak takip edildiğini belirtir
    date: "2025-09-15",
    status: "Tamamlandı"
  },
  {
    id: 2,
    icon: 'atom',
    title: "Kuantum Algoritma Testi",
    description:"",
    content: "Küçük ölçekli kuantum bilgisayarlar üzerinde Shor ve Grover algoritmalarının performans karşılaştırması yapıldı. Örnek veri seti rastgele oluşturulmuştur.",
    isAlive: true,
    date: "2023-02-23",
    status: "Devam Ediyor"
  },
  {
    id: 3,
    icon: 'flask',
    title: "Nanomalzeme Sentezi",
    description:"",
    content: "Kimyasal buhar biriktirme (CVD) yöntemiyle grafen oksit (GO) sentezi ve karakterizasyonu hedeflenmektedir. Isı ve basınç parametreleri optimize edilmiştir.",
    isAlive: true,
    date: "2025-12-22",
    status: "Planlandı"
  },
  {
    id: 4,
    icon: 'rocket',
    title: "Yüksek İtici Güç Denemesi",
    description:"",
    content: "Yeni nesil katı yakıtlı roket motoru bileşenlerinin yanma verimliliği test edildi. Motor 5 saniye boyunca çalıştırılmıştır.",
    isAlive: false, // Arşivlenmiş veya iptal edilmiş deney
    date: "2025-08-11",
    status: "İptal Edildi"
  }
];
//description kısmını şimdilik böyle yapıyoruz
initialExperiments.map((exp)=>{
let description=exp.content.substring(0,100);
exp.description=description;
})

function App() {
  // Liste ve listeyi güncelleme fonksiyonu (setter) App'te tutulur
  
  return (
    <>
    <AuthProvider>
      
      <div className="App" >
        <Navbar />
        {/* <Routes> içine tanımladığımız tüm <Route> bileşenleri
        gözetim altında tutulur ve URL'ye göre eşleştirilir.
      */}
        <div className="MainContentArea">
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/hakkimizda" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<LoginWindow />} />
             <Route path="/logout" element={<LogoffWindow />} />
            <Route path="/deneyler" element={<ExperimentList  />} /> {/* Tüm listeyi gösterir */}
            <Route path="/deneyler/:id" element={<ViewProject  />} /> 
            <Route path="/deney/yeni" element={<NewExperiment  />} /> {/* Yeni proje ekleme */}
            <Route path="/deney/mod/:id" element={<ModExperiment />} /> {/* Yeni proje güncelleme */}
            <Route path="/deney/del/:id" element={<DelExperiment  />} /> {/* Yeni proje güncelleme */}
            {/* 4. Opsiyonel: Eşleşen bir rota bulunamazsa (404 Not Found) gösterilir. */}
            <Route path="*" element={<h2 style={{ color: 'red' }}>404 - Sayfa Bulunamadı</h2>} />

          </Routes>
        </div>
      </div></AuthProvider>
    </>
  )
}

export default App
