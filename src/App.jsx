import './App.css'

import './components/project-item/Project-item'

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/profile';
import Navbar from './components/navbar/navbar';
import ExperimentList from './pages/ExperimentList';
import NewExperiment from './pages/NewExperiment';
import ModExperiment from './pages/ModExperiment';
import DelExperiment from './pages/DelExperiment';
import ViewProject from './pages/ViewProject';
import { AuthProvider } from './contexts/AuthContext';
import LoginWindow from './pages/Login';
import LogoffWindow from './pages/Logoff';
import { FetchUtilsProvider } from './contexts/FetchUtils';


function App() {
  // Liste ve listeyi güncelleme fonksiyonu (setter) App'te tutulur
  
  return (
    <>
    <AuthProvider>
      <FetchUtilsProvider>
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
            <Route path="/deney/" element={<ViewProject  />} /> 
            <Route path="/deney/yeni" element={<NewExperiment  />} /> {/* Yeni proje ekleme */}
            <Route path="/deney/mod/" element={<ModExperiment />} /> {/* Yeni proje güncelleme */}
            <Route path="/deney/del/" element={<DelExperiment  />} /> {/* Yeni proje güncelleme */}
            {/* 4. Opsiyonel: Eşleşen bir rota bulunamazsa (404 Not Found) gösterilir. */}
            <Route path="*" element={<h2 style={{ color: 'red' }}>404 - Sayfa Bulunamadı</h2>} />

          </Routes>
        </div>
      </div></FetchUtilsProvider></AuthProvider>
    </>
  )
}

export default App
