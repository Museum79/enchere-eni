import React, { useContext, useEffect, useState } from 'react'
import '../main/main.css'
import axios from 'axios'
import Card from '../card/Card';
import { UserContext } from '../context/Contexts';
const Main = () => {

    const {categories } = useContext(UserContext);
    const {articles, setArticles} = useContext(UserContext);
    const [user, setUser] = useState();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showMyAuctions, setShowMyAuctions] = useState(false);



    const handleCategorySelect = (event) => {
        const category = event.target.value;
        setSelectedCategory(category === "" ? null : category); 
      
    }

  //  useEffect (()=> {
  //      axios.get("http://localhost:8888/users/userDetails").then((response)=> {
  //          setUser(response.data) 
  //          console.log(response.data) 
  //     })
  //  },[])
  //    
//
  //  const handleRadio=()=> {
  //      
  //      setShowMyAuctions(true);
//
  //      
  //  }

 //   const getUser=()=> {
 //       axios.get("http://localhost:8888/users/userDetails").then((response)=> {
 //           setUser(response.data) 
 //           console.log(response.data) 
 //      })
 //   }
    
    const filteredArticles = selectedCategory ? articles.filter((article) => article.articleCategorie === selectedCategory) : articles;
   // const filteredAuctions = showMyAuctions ? filteredArticles.filter((article) => article.vendeur.id === user.id) : filteredArticles;

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
                        return(<option key= {categorie.id} value={categorie.libelle}>{categorie.libelle}</option>)
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
        {/*<div className='my-auctions-container'>
            <div className='my-auctions-label'>Mes enchères :</div>
            <div className='my-auctions-radios'>
              <label>
                <input
                  type='radio'
                  value='achats'
                  checked={!showMyAuctions}
                  onChange={() => setShowMyAuctions(false)}
                />
                Mes achats
              </label>
              <label>
                <input
                  type='radio'
                  value='ventes'
                  checked={showMyAuctions}
                  onChange={() => setShowMyAuctions(true)}
                />
                Mes ventes
              </label>
            </div>
                </div>*/}
  </div>
  <div className='cardarticle-container'>
  {filteredArticles.map((article,index)=> {
                return (<Card key = {index}article={article}/>)
            })}

  </div>
  
                
  </>
  

  )
}

export default Main;
