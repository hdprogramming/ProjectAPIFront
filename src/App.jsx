import './App.css'

import './components/project-item/Project-item'

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Navbar from './components/navbar/navbar';
import ExperimentList from './pages/ExperimentList';
import NewExperiment from './pages/NewExperiment';
import { useState } from 'react';
import ModExperiment from './pages/ModExperiment';
import DelExperiment from './pages/DelExperiment';
let initialExperiments = [
  {
    id: 1,
    icon: null, // "none" yerine genellikle null veya boş string kullanılır
    title: "Plazma Fizik Deneyi",
    description: "Yüksek enerji yoğunluğunda plazma üretimi, kararlılığı ve manyetik hapsi incelenmiştir. Deneyde helyum gazı kullanılmıştır.",
    isAlive: true, // Deneyin aktif olarak takip edildiğini belirtir
    date: "2025-09-15",
    status: "Tamamlandı"
  },
  {
    id: 2,
    icon: 'atom',
    title: "Kuantum Algoritma Testi",
    description: "Küçük ölçekli kuantum bilgisayarlar üzerinde Shor ve Grover algoritmalarının performans karşılaştırması yapıldı. Örnek veri seti rastgele oluşturulmuştur.",
    isAlive: true,
    date: "2023-02-23",
    status: "Devam Ediyor"
  },
  {
    id: 3,
    icon: 'flask',
    title: "Nanomalzeme Sentezi",
    description: "Kimyasal buhar biriktirme (CVD) yöntemiyle grafen oksit (GO) sentezi ve karakterizasyonu hedeflenmektedir. Isı ve basınç parametreleri optimize edilmiştir.",
    isAlive: true,
    date: "2025-12-22",
    status: "Planlandı"
  },
  {
    id: 4,
    icon: 'rocket',
    title: "Yüksek İtici Güç Denemesi",
    description: "Yeni nesil katı yakıtlı roket motoru bileşenlerinin yanma verimliliği test edildi. Motor 5 saniye boyunca çalıştırılmıştır.",
    isAlive: false, // Arşivlenmiş veya iptal edilmiş deney
    date: "2025-08-11",
    status: "İptal Edildi"
  }
];
function App() {
  // Liste ve listeyi güncelleme fonksiyonu (setter) App'te tutulur
  const [experiments, setExperiments] = useState(initialExperiments);
  const getExperimentById = (id) => {
    // find() metodu, koşulu sağlayan İLK öğeyi döndürür.
    return experiments.find(experiment => {
      // ID'lerin tipini kontrol edin (biri string, diğeri number olabilir). 
      // Güvenli karşılaştırma için == veya String/Number dönüşümü kullanabilirsiniz.
      return experiment.id == id;
    });
  };
  // Yeni deney ekleme fonksiyonu
  const handleAddExperiment = (newExp) => {
    // Yeni ID oluştur ve listeye ekle
    const newId = experiments.length > 0 ? Math.max(...experiments.map(e => e.id)) + 1 : 1;
    setExperiments(prevExps => [
      ...prevExps,
      { ...newExp, id: newId }
    ]);
  };
  const handleUpdateExperiment = (newExp) => {
    // setExperiments'a bir fonksiyon (updater function) gönderiyoruz.
    // Bu, her zaman en güncel (oldExp) state'i almamızı sağlar.
    setExperiments(oldExp => {
      return oldExp.map(experiment => {
        // Kontrolü newExp.id ile yaparız:
        if (experiment.id === newExp.id) {
          // Direkt newExp'i döndürebiliriz:
          return newExp;
        }
        return experiment;
      });
    });

  };
  const handleDeleteExperiment = (id) => {
    // setExperiments'a en güncel state'i almak için updater fonksiyonu gönderiyoruz.
    setExperiments(oldExp => {

      // 1. Array.prototype.filter() metodu kullanılır.
      //    Bu metod, geriye sadece koşulu (return true) sağlayan öğeleri döndürerek
      //    yeni bir dizi oluşturur.
      return oldExp.filter(experiment => {

        // 2. Silinmesini İstemediğimiz öğeleri döndürüyoruz.
        //    Yani, ID'si, silmek istediğimiz ID'ye EŞİT OLMAYAN her şeyi döndür.
        return Number(experiment.id) != Number(id);
      });
    });
  };
  return (
    <>
      <div className="App" >
        <Navbar />

        {/* <Routes> içine tanımladığımız tüm <Route> bileşenleri
        gözetim altında tutulur ve URL'ye göre eşleştirilir.
      */}
        <div className="MainContentArea">
          <Routes>

            {/* 1. Statik Rota: Tam "/" yolu eşleştiğinde <Home> gösterilir. */}
            <Route path="/" element={<Home />} />

            {/* 2. Statik Rota: "/hakkimizda" yolu eşleştiğinde <About> gösterilir. */}
            <Route path="/hakkimizda" element={<About />} />

            {/* 3. Dinamik Rota: "/urunler/" ile başlayan, ardından 
           herhangi bir değeri (ID'yi) yakalayan rota.
           Bu değeri <ProductDetail> bileşeni useParams ile kullanır. */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/deneyler" element={<ExperimentList experiments={experiments} />} /> {/* Tüm listeyi gösterir */}
            <Route path="/deney/yeni" element={<NewExperiment onAdd={handleAddExperiment} />} /> {/* Yeni proje ekleme */}
            <Route path="/deney/mod/:id" element={<ModExperiment onUpdate={handleUpdateExperiment} getExperimentById={getExperimentById} />} /> {/* Yeni proje güncelleme */}
            <Route path="/deney/del/:id" element={<DelExperiment onDelete={handleDeleteExperiment} />} /> {/* Yeni proje güncelleme */}
            {/* 4. Opsiyonel: Eşleşen bir rota bulunamazsa (404 Not Found) gösterilir. */}
            <Route path="*" element={<h2 style={{ color: 'red' }}>404 - Sayfa Bulunamadı</h2>} />

          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
