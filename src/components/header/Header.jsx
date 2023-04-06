import React from 'react';
import { Link } from 'react-router-dom';
import '../header/header.css';


const Header = () => {
  return (
    <div className="header-container">
      <Link className='title' to='/home'><h1>ENI - Enchères</h1></Link>
      <Link className='login' to="/login">Se connecter</Link>
      <Link className='register' to="/register">S'inscrire</Link>
      <Link className='encheresForm' to="/encheresForm">Vendre un article</Link>
      <Link className='deconnexion' to="/home">Déconnexion</Link>
    </div>
  );
};

export default Header;


