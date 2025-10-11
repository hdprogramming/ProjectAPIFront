// Navbar.js

import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
const Navbar = () => {

 const [scrolled,setScrolled]=useState(false);
 const handleScrolled=()=>{
  const offset=window.scrollY;
 if(offset>50)
 {
  setScrolled(true);
 }else setScrolled(false);
 }
 useEffect(()=>{
 window.addEventListener('scroll',handleScrolled);
 return () => {
      window.removeEventListener('scroll', handleScrolled);
    };
 },[])
 const navbarClasses = `${styles.Navbar} ${scrolled ? styles.NavbarScrolled : ''}`;
  return (
    <nav className={navbarClasses}>
      
         <div className={styles.navLogo}>
            <Link to="/"  >
        <img width='50px'src='./public/logo.png'></img>
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
      <Link to="/profile" >
        Profil
      </Link>
      <Link to="/deneyler" >
        Deneyler
      </Link>
      </div>
     
       
    </nav>
  );
};

export default Navbar;