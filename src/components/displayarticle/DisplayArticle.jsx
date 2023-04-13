import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/Contexts';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DisplayArticle = () => {
  const { id } = useParams();
  const { articles } = useContext(UserContext);
  const [user,setUser] = useState();
  const articleId = parseInt(id);
  const [bid,setBid]  = useState(false);
  const [montant,setMontant]  = useState(0);


  const article = articles.find((article) => article.id === articleId);

  useEffect(()=> {
    axios.get("http://localhost:8888/users/userDetails").then((response)=> {
         setUser(response.data)
        if(article?.enchere.montantEnchere) {
          response.data.credit > article?.enchere.montantEnchere  && setBid(true)
          } else {
            response.data.credit > article?.prixInitial  && setBid(true)

          }
    })
  },[])
  const limitCredit = user && montant <= user?.credit ? true : false 
  console.log(limitCredit) 
  

 const handleSubmit=()=> {
  axios.post(`http://localhost:8888/encheres/${article.id}`,null,{
    params:{
      montant:montant
    }
  }).then((response)=> {
    console.log(response.data)
    })
  }
  useEffect(() => {
    const actualPrice = article?.enchere.montantEnchere ? article?.enchere.montantEnchere : article.prixInitial
    setMontant(actualPrice)
  }, [article])


const meilleureOffre = article?.enchere.montantEnchere ? `${article?.enchere.montantEnchere } points par
 ${article?.enchere.acheteur }`  : `Pas d'offre`;
 

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
      
      {user &&<>
        <input type="number" id="price" value={montant} readOnly disabled={!bid }/>
          <button type="button" onClick={() => setMontant(montant + 1)} disabled={!bid || !limitCredit}>
            +
          </button>
          <button onClick={handleSubmit} disabled={!bid || !limitCredit}>Enchérir</button>
          {!limitCredit && <p>tu peux pas faire d offre</p>}
      </>
      
        }
    </div>
    </div>
  )
}

export default DisplayArticle
