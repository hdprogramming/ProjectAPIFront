// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {


  return (
    <nav className='modern-navbar'>
        <div className="nav-logo">
            <Link to="/" className='Link' >
        LOGO
      </Link>
        </div>
        <div className='nav-links'>
      <Link to="/" className='Link' >
        Ana Sayfa
      </Link>
      <Link to="/hakkimizda" className='Link'>
        Hakkımızda
      </Link>
      {/* Dinamik bir URL'e yönlendiren bir örnek bağlantı */}
      <Link to="/profile" className='Link'>
        Profil
      </Link>
      <Link to="/deneyler" className='Link'>
        Deneyler
      </Link>
      </div>
    </nav>
  );
};

export default Navbar;