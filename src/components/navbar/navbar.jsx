// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
const Navbar = () => {


  return (
    <nav className={styles.modernNavBar}>
        <div className={styles.navLogo}>
            <Link to="/"  >
        LOGO
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