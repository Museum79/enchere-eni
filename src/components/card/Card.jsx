import { useEffect, useState } from 'react';
import { AUTH_TOKEN_KEY } from '../../App';
import './card.css';
import { Link } from 'react-router-dom';

const Card = ({article}) => {
    const [isConnected,setIsConnected]=  useState(false)

    useEffect(()=> {
      const  token =  sessionStorage.getItem(AUTH_TOKEN_KEY); 
      setIsConnected(token ?true: false)
    },[isConnected])
    
  return (
    <div className="cardarticle">
      <div className="cardarticle-image">
        <img src="" alt="Article" />
      </div>
      <div className="cardarticle-content">
        <h3 className="cardarticle-title">{article.nomArticle}</h3>
        <div className="cardarticle-details">
          <p className="cardarticle-price">Prix : {article.enchere.montantEnchere} points</p>
          <p className="cardarticle-date">Fin de l'enchère: {article.dateDebutEncheres}</p>
          <p className="cardarticle-vendeur">{isConnected ?(<Link to={`/profile/${article.vendeur.id}`}>Vendeur: {article.vendeur.pseudo}</Link>):(`Vendeur: ${article.vendeur.pseudo}`)} </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
