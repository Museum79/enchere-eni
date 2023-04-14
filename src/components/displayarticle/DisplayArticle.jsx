import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/Contexts';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './displayArticle.css';


const DisplayArticle = () => {
  const { id } = useParams();
  const { articles } = useContext(UserContext);
  const [user,setUser] = useState();
  const articleId = parseInt(id);
  const [bid,setBid]  = useState(false);
  const [finEnchere,setFinEnchere]  = useState(false);

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

 const date = new Date();
 const todaysDate = date.toISOString().slice(0, 10);
 const dateFin = ()=> {
 if (todaysDate >=  article.dateDebutEncheres  && todaysDate < article.dateFinEncheres){
  return true;

 }else if  (todaysDate < article.dateDebutEncheres || todaysDate > article.dateFinEncheres) {
  return false
 }
 }
 console.log(user?.id)
  //console.log(article.vendeur.id)
// console.log(article.enchere.id)


  return (
    <div className='formDisplayContainer'>
      <div>
        {user  && todaysDate >= article.dateFinEncheres ? 
        user?.id === article.enchere.id ?(<h2>Vouz avez remporté la vente</h2>):(<h2>{article.enchere.acheteur} à remporté la vente</h2>)
        :(<h2>Détails de la vente</h2>)}
       <h2 className='formeDisplayTitle'>{article.nomArticle}</h2>
      <p className='formDisplayP'>Déscription: {article.description}</p>
      <p className='formDisplayP'>Catégorie: {article.articleCategorie}</p>
      <p className='formDisplayP'>Meilleure offre: {meilleureOffre} </p>
      <p className='formDisplayP'>Mise à prix: {article.prixInitial} points</p>
      <p className='formDisplayP'>Date de fin: {article.dateFinEncheres}</p>
      <p className='formDisplayP'>Adresse de retrait: {article.retrait.ville}</p>
      <p className='formDisplayP'>Vendu par: {article.vendeur.pseudo}</p>
      
      {user && todaysDate >= article.dateFinEncheres ?
      user?.id === article.enchere.id ? `Téléphone : ${article.vendeur.telephone}` :
      user?.id === article.vendeur.id ? <button>Retrait éfféctué</button> : null 
      :
      user ? 

       <>
       <button className='btnDisplayEnchere' type="button" onClick={() => setMontant(montant + 1)} disabled={!bid || !limitCredit || !dateFin() }>
            +
          </button>
        <input className='formDisplayInput' type="number" id="price" value={montant} readOnly disabled={!bid }/>
          <button className='btnDisplayEnchere' type="button" onClick={() => setMontant(montant - 1)} disabled={!bid || !limitCredit || !dateFin()}>
            -
          </button>
          <br></br>
          <bouton  className='formDisplaySubmit' onClick={handleSubmit} disabled={!bid || !limitCredit || !dateFin()}>Enchérir</bouton>
          {!limitCredit && <p>tu peux pas faire d offre</p>}
      </>
      : null
      
        }

    </div>
    <duv>
    <Link to='/home'>Retour à l'acceuil</Link>
    </duv>
    </div>
  )
}

export default DisplayArticle
