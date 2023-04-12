import React, { useContext, useState } from 'react'
import { UserContext } from '../context/Contexts';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DisplayArticle = () => {
  const { id } = useParams();
  const { articles } = useContext(UserContext);
  const {user} = useContext(UserContext);
  const articleId = parseInt(id);
  const [bid,setBid]  = useState(false);
  const [montant,setMontant]  = useState(false);
  console.log(user)


  const article = articles.find((article) => article.id === articleId);

 const handleSubmit=()=> {
  axios.post(`http://localhost:8888/encheres/${article.id}`,null,{
    params:{
      montant:150
    }
  }).then((response)=> {
        console.log(response.data)
    })
  }
  const validateBid=()=> {
   if(article?.enchere.montantEnchere) {
   user.credit > article?.enchere.montantEnchere & montant > article?.enchere.montantEnchere   && setBid(true)
   } else {
    user.credit > article?.prixInitial & montant > article?.prixInitial   && setBid(true)
   }
  }

const meilleureOffre = article?.enchere.montantEnchere ? `${article?.enchere.montantEnchere } points par
 ${article?.enchere.acheteur }`  : `Pas d'offre`

  return (
    <div>
      <div>
      <h2>{article.nomArticle}</h2>
      <p>Déscription: {article.description}</p>
      <p>Catégorie: {article.articleCategorie}</p>
      <p>Meilleure offre: {meilleureOffre} </p>
      <p>Mise à prix: {article.prixInitial} points</p>
      <p>Date de fin: {article.dateFinEncheres}</p>
      <p>Adresse de retrait: {article.retrait.ville}</p>
      <p>Vendu par: {article.vendeur.pseudo}</p>
      <button onClick={handleSubmit}>Enchérir</button>
    </div>
    </div>
  )
}

export default DisplayArticle
