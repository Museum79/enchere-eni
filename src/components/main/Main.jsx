import React, { useEffect, useState } from 'react'
import '../main/main.css'
import axios from 'axios'
import Card from '../card/Card';
const Main = () => {
    const [categories,setCategories] = useState([]);
    const [articles,setArticles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);



    useEffect(()=> {
        axios.get("http://localhost:8888/categories/all").then((response)=> {
            setCategories(response.data)
        })
    },[])
    useEffect(()=> {
        axios.get("http://localhost:8888/articles/all").then((response)=> {
            setArticles(response.data)
        })
    },[])

    const handleCategorySelect = (event) => {
        const category = event.target.value;
        setSelectedCategory(category === "" ? null : category);
    }
    const filteredArticles = selectedCategory ? articles.filter((article) => article.articleCategorie === selectedCategory) : articles;
  return (
    <>

    <div className='container'>
        <div>
            <h2>Liste des enchères</h2>
            </div>
                <div className='filter-container'>
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
                <label>Filtres :</label>
                <input className='inputFiltre' type='text'></input>
                <button>Rechercher</button>
            </div>
        </div>   
  </div>
  <div className='cardarticle-container'>
  {filteredArticles.map((article,index)=> {
                return (<Card key = {index}article={article}/>)
            })}

  </div>
  
                
  </>
  

  )
}

export default Main

