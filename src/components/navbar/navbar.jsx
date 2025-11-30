// Navbar.js

import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { useScroll } from '../../contexts/ScrollContext';
const Navbar = () => {
 const { isLogin} = useAuth();
 const ScrollY=useScroll();
 const isScrolled = ScrollY > 50;
 const navbarClasses = `${styles.Navbar} ${isScrolled ? styles.NavbarScrolled : ''}`;
  return (
    <nav className={navbarClasses}>
      
         <div className={styles.navLogo}>
            <Link to="/"  >
        <img width='50px'src='../public/Logo.png'></img>
        <div  >Project Explorer</div>
      </Link>
        </div>
        <div className={styles.navLinks}>
      <Link to="/"  >
        Ana Sayfa
      </Link>
      <Link to="/hakkimizda" >
        Hakkımızda
      </Link>
      {/* Dinamik bir URL'e yönlendiren bir örnek bağlantı */}
      
      {isLogin?<>
      <Link to="/profile" >
        Profil
      </Link>
      <Link to="/deneyler" >
        Deneyler
        </Link> 
        <Link to="/logout" >
        Çıkış Yap
        </Link>
        </>       
        :<Link to="/login">Giriş Yap</Link>}
       
      </div>
   
       
    </nav>
  );
};

export default Navbar;