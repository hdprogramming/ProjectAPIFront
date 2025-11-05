import { useState, useRef, useEffect } from 'react';
import styles from '../FileElement/filelement.module.css';
import useExperiment from '../../utils/useExperiment';


// Varsayılan olarak size prop'u eklendi
// Yeni adın kaydedilmesi için 'onRename' veya 'onChange' gibi bir prop eklenmesi *önerilir*
const FileElement = ({ src, name, id, setSelected,onDelete, size = '50px' }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBigImage, setBigImage] = useState(false);
  const [Edit, setEdit] = useState(false);
  const [currentName, setCurrentName] = useState(name); // Dosya adını state'te tutalım
  const {RenameFile,DeleteFile}=useExperiment();
  // label elementine erişmek için useRef kullanalım
  const nameLabelRef = useRef(null);

  // Edit (Yeniden Adlandırma) durumu değiştiğinde çalışacak kısım
  useEffect(() => {
    // Edit true olduğunda (Yeniden Adlandır'a tıklandığında)
    if (Edit && nameLabelRef.current) {
      nameLabelRef.current.focus(); // label'ı otomatik odakla
    }
  }, [Edit]);

  // Sağ tık olayını ele alan fonksiyon
  const handleContextMenu = (e) => {

    e.preventDefault();
    setIsMenuOpen(true);
  };

  // Mouse ayrılınca menüyü kapatmak için
  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  // Yeniden Adlandırma (Edit) modundan çıkmak için genel işleyici
  const handleEditBlur = (e) => {
    // 1. Yeni adı state'e kaydet (veya API/üst bileşene gönder)
    const newName = e.currentTarget.textContent;
    setCurrentName(newName);
    RenameFile(id,newName);
     FetchData();
    // **ÖNEMLİ:** Buraya, dosya adını kalıcı olarak
    // kaydetme (örneğin bir API çağrısı veya üst bileşene prop ile gönderme) 
    // mantığınızı eklemelisiniz.

    // 2. Edit modunu kapat
    setEdit(false);
  };

  // Kullanıcı Enter'a bastığında düzenlemeyi bitirsin (isteğe bağlı)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Yeni satır oluşmasını engelle
      e.currentTarget.blur(); // Odaklanmayı kaybet (bu da handleEditBlur'ı tetikler)
    }
  };
  const handleDelete=()=>{
    if(confirm("Resim silinsinmi?"))
      {
        DeleteFile(id);
     onDelete(id);
      }
  }

  return (
    <div
       id={"div"+id}
      className={styles.FileElementMain}
      onClick={() => {
        setSelected(id);
        setEdit(false); // Normal tıklamada edit modunu kapat
      }}
      onContextMenu={handleContextMenu}
      onMouseLeave={handleMouseLeave}

    >
      {isBigImage && (
        <div className={styles.BigImageContainer} >
          <span className={styles.CloseBtn} onClick={() => {
            setBigImage(false);
          }}>X</span>
          <img
            id={"Image" + id}
            src={src}
            onDoubleClick={() => {
              setBigImage(false);
            }}
          /></div>
      )}
      <div className={styles.img}
      >
        <img
          style={{ width: size, height: size }}
          id={"Image" + id}
          src={src}
          onDoubleClick={() => { setBigImage(true) }}
        />

        {isMenuOpen && (
          <div className={styles.FileSelector} onClick={(e) => e.stopPropagation()}>
            <a onClick={() => {
              setBigImage(true);
              setIsMenuOpen(false);
            }}>Büyüt</a>           
            <a onClick={() => {
              setEdit(true); // Edit modunu aç
              setIsMenuOpen(false);
            }}>Yeniden Adlandır</a>
            <a onClick={handleDelete}>Sil</a>
          </div>
        )}

        <label
          ref={nameLabelRef} // Ref'i label'a atadık
          contentEditable={Edit} // Edit true ise düzenlenebilir
          style={{
            width: '90px',
            textAlign:'center',
             textOverflow: 'ellipsis',
             overflow: 'hidden', 
            border: Edit ? '1px solid #00ffbb' : 'none',
          }}
          htmlFor={"Image" + id}
          onBlur={handleEditBlur} // Odaklanma kaybolduğunda (dışarı tıklanınca) adı kaydet ve modu kapat
          onKeyDown={handleKeyDown} // Enter'a basıldığında düzenlemeyi bitir
        >
          {currentName} {/* Prop'tan gelen adı değil, state'teki adı göster */}
        </label>
      </div>
    </div>
  )
}
export default FileElement;