import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from "../../App";
import '../header/header.css';
import axios from 'axios';

const Header = () => {


  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(token ? true : false);
  }, []);


  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(false);
    // redirige l'utilisateur vers la page de connexion
    navigate('/home', { replace: true });
  };


  return (

    <div className="header-container">
      <Link className='title' to='/home'>
          <img src='./logoENIEncheres.png' alt='ENI - Enchères' onClick={() => window.location.reload()} />
      </Link>
      {!isAuthenticated && <Link className='login' to="/login">Se connecter</Link>}
      {!isAuthenticated && <Link className='register' to="/register">S'inscrire</Link>}

      {isAuthenticated  ? (
        <>
          <Link className='deconnexion' onClick={handleLogout} to="/home">Déconnexion</Link>
          <Link className='encheresForm' to="/encheresForm">Vendre un article</Link>
          <Link className='encheresForm' to="/profile">Mon profil</Link>
          <Link className='encheresForm' to="/categories">Gestion des categories</Link>


        </>
      ) : null}
    </div>
  );
};

export default Header;
