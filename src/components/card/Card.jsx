import { useEffect, useState } from 'react';
import { AUTH_TOKEN_KEY } from '../../App';
import './card.css';
import { Link } from 'react-router-dom';
import moment from 'moment';


const Card = ({article}) => {

    const [isConnected, setIsConnected] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(()=> {
      const token = sessionStorage.getItem(AUTH_TOKEN_KEY); 
      setIsConnected(token ? true : false);
    }, [isConnected]);

    const handleOpenModal = () => {
      setModalIsOpen(true);
    };

    const handleCloseModal = () => {
      setModalIsOpen(false);
    };


    const actualPrice = article?.enchere?.montantEnchere ? article?.encheres?.montantEnchere : article?.prixInitial
    
  return (
    <>
      <div className='cardarticle-container' onClick={handleOpenModal}>
        <div className="cardarticle">
          <div className="cardarticle-image">
            <img src="" alt="Article" />
          </div>
          <div className="cardarticle-content">
            <h3 className="cardarticle-title"><Link to={`/displayarticle/${article.id}`}>{article.nomArticle}</Link> </h3>
            <div className="cardarticle-details">
              <p className="cardarticle-price">Prix : {actualPrice} points</p>
              <p className="cardarticle-date">Fin de l'enchère: {article?.dateDebutEncheres}</p>
              <p className="cardarticle-vendeur">{isConnected ?(<Link to={`/profile/${article?.vendeur?.id}`}>Vendeur: {article?.vendeur?.pseudo}</Link>):(`Vendeur: ${article.vendeur.pseudo}`)} </p>
            </div>
          </div>
        </div>
      </div>
      {/*modalIsOpen && (
        <div className="modalEnchere">
          <div className="modalEnchere-content">
            <h2>{article.nomArticle}</h2>
            <p>{article.description}</p>
            <p>Prix: {article.enchere.montantEnchere} points</p>
            <p className='modalEnchere-Fin'>Fin de l'enchère: {article.dateDebutEncheres}</p>
            <input className='inputEnchere'></input>
            <button className=''>valider</button>
            <button className='btnModal' onClick={handleCloseModal}>Fermer</button>
          </div>
        </div>
      )*/}
    </>
  )
}

export default Card;
