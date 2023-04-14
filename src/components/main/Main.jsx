import React, { useContext, useState } from 'react'
import '../main/main.css'
import axios from 'axios'
import Card from '../card/Card';
import { UserContext } from '../context/Contexts';
import { AUTH_TOKEN_KEY } from '../../App';
const Main = () => {
    const {categories } = useContext(UserContext);
    const {articles, setArticles} = useContext(UserContext);
    const [user, setUser] = useState();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showMyAuctions, setShowMyAuctions] = useState(false);
    const [showMesAchats, setShowMesAchats] = useState(false);
    const [showMesVentes, setShowMesVentes] = useState(false);
    const [showMesAchatsEncours, setShowMesAchatsEncours] = useState(false);
    const [showMesAchatOuvertes, setShowMesAchatsOuverts] = useState(false);
    const [showMesAchatRemportee, setShowMesAchatRemportee] = useState(false);
    const date = new Date();
    const todaysDate = date.toISOString().slice(0, 10); 
    const handleCategorySelect = (event) => {
        const category = event.target.value;
        setSelectedCategory(category === "" ? null : category); 
    }
 
 fetch =()=> {
  !user &&  (axios.get("http://localhost:8888/users/userDetails").then((response)=> { setUser(response.data)}))
 }
 fetch();
 const mesAchats = articles.filter((article) => article?.vandeur?.id !== user?.id)
 const mesVentes = articles.filter((article) => article?.vandeur?.id === user?.id)
 const achatOuvertes = mesAchats.filter((mesAchat) =>  todaysDate >= mesAchat?.dateDebutEncheres && todaysDate < mesAchat?.dateFinEncheres) 
 const achatsEncours = achatOuvertes.filter((achatOuvert) => achatOuvert.enchere.id === user?.id)
 const enchereRemporté = articles.filter((article) => article.enchere.id === user?.id && todaysDate >= article.dateFinEncheres && todaysDate >= article.dateDebutEncheres)
 const filteredArticles = selectedCategory ? articles.filter((article) => article.articleCategorie === selectedCategory) : articles;
 const filteredAuctions = 
 showMyAuctions  ? 
   showMesAchats && !showMesAchatOuvertes && !showMesAchatRemportee && !showMesVentes ? mesAchats : 
   showMesAchats && showMesAchatOuvertes && !showMesAchatsEncours?  achatOuvertes
   : 
    (showMesAchatsEncours && showMesAchats && showMesAchatOuvertes) || (showMesAchatsEncours && showMesAchats && !showMesAchatOuvertes) ? 
   achatsEncours : showMesAchatRemportee && showMesAchats ? enchereRemporté
   :
   articles.filter((article) => article?.vendeur.id === user?.id) 
   : showMesVentes && !showMesAchats ? mesVentes
    :
    filteredArticles;
const handleShowMesAchats=()=> {
 !user &&  (axios.get("http://localhost:8888/users/userDetails").then((response)=> { setUser(response.data)}))
  setShowMyAuctions(true)
  setShowMesAchats(true);
  setShowMesVentes(false)
}
const handleShowMesVentes=()=> {
  !user &&  (axios.get("http://localhost:8888/users/userDetails").then((response)=> { setUser(response.data)}))
  setShowMyAuctions(true)
  setShowMesAchats(false);
  setShowMesVentes(true)
}
const handleShowMesAchatsEncours=()=> {
setShowMesAchatsEncours(!showMesAchatsEncours)
}
const handleShowMesAchatsOuvertes=()=> {
  setShowMesAchatsOuverts(!showMesAchatOuvertes)
  }
  const handleShowMesAchatsRemportee=()=> {
    setShowMesAchatRemportee(!showMesAchatRemportee)
    }
console.log(articles)
return (
  <>
      <div className='container'>
          <div>
              <h2 className='titreEnchere'>Liste des enchères</h2>
          </div>
          <div className='category-container'>
              <label>Catégorie :</label>
              <select className='select' onChange={handleCategorySelect}>
                  <option value="">Toutes les catégories</option>
                  {categories.map((categorie) => {
                      return(<option key={categorie.id} value={categorie.libelle}>{categorie.libelle}</option>)
                  })}
              </select>
          </div>
          <div>
              <div className='filter-container'>
                  <label>Filtres :</label>
                  <input className='inputFiltre' type='text'></input>
                  <button className='btnSearch'>Rechercher</button>
              </div>
          </div>
      </div>
      {sessionStorage.getItem(AUTH_TOKEN_KEY)&&
      <div className='my-auctions-container'>
          <div className='my-auctions-radios'>
              <div>
                  <label>
                      <input
                          type='radio'
                          value='achats'
                          checked={showMesAchats}
                          onChange={handleShowMesAchats}
                      />
                      Achats
                  </label>
                  <div>
                      <label>
                          <input
                              type='checkbox'
                              value='enchères ouvertes'
                              checked={showMesAchatOuvertes}
                              onChange={handleShowMesAchatsOuvertes}
                          />
                          enchères ouvertes
                      </label>
                  </div>
                  <div>
                      <label>
                          <input
                              type='checkbox'
                              value='mes encheres en cours'
                              checked={showMesAchatsEncours}
                              onChange={handleShowMesAchatsEncours}
                          />
                          Mes enchères en cours
                      </label>
                  </div>
                  <div>
                      <label>
                          <input
                              type='checkbox'
                              value='enchères remportées'
                              checked={showMesAchatRemportee}
                              onChange={handleShowMesAchatsRemportee}
                          />
                          enchères remportées
                      </label>
                  </div>
              </div>
              <div>
                  <label>
                      <input
                          type='radio'
                          value='ventes'
                          checked={showMesVentes}
                          onChange={handleShowMesVentes}
                      />
                      Ventes
                  </label>
              </div>
          </div>
      </div>
      }
      <div className='cardarticle-container'>
          {filteredAuctions.map((article, index) => {
              return (<Card key={index} article={article}/>)
          })}
      </div>
  </>
);

}
export default Main;