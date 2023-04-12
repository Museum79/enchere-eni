import React, { useState, useContext } from 'react';
import '../encheresForm/encheresForm.css';
import axios from "axios";
import { UserContext } from '../context/Contexts';


const EncheresForm = () => {


  const { categories } = useContext(UserContext);

  const [nomArticle, setNomArticle] = useState('');
  const [description, setDescription] = useState('');
  const [articleCategorie, setArticleCategories] = useState('');
  const [dateDebutEncheres, setDebutEncheres] = useState('');
  const [dateFinEncheres, setDateFinEncheres] = useState('');
  const [prixInitial, setPrixInitial] = useState(0);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      nomArticle,
      description,
      articleCategorie,
      dateDebutEncheres,
      dateFinEncheres,
      prixInitial,
      prixDeVente: 0
    };
    console.log(data)
    try {
      const response = await axios.post(
        'http://localhost:8888/articles/add',
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Nouvelle vente</h2>
      <form className='formEnchere' onSubmit={handleSubmit}>
        <div className="form-row">
          <label className='labelEnchereForm' htmlFor="article">Article :</label>
          <input
            type="text"
            id="article"
            value={nomArticle}
            onChange={(event) => setNomArticle(event.target.value)}/>
        </div>

        <div className="form-row">
          <label className='labelEnchereForm' htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="form-row">
          <label className='labelEnchereForm' htmlFor="category">Catégorie :</label>
          <select
            className='selectEnchereForm'
            value={articleCategorie}
            onChange={(event) => setArticleCategories(event.target.value)}>

            <option value="">Sélectionnez une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.libelle}>
                {category.libelle}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label className='labelEnchereForm' htmlFor="image">Photo de l'article :</label>
          <input type="file" id="image" />
        </div>

        <div className="form-row">
          <label className='labelEnchereForm' htmlFor="price">Mise à prix :</label>
          <button type="button" onClick={() => setPrixInitial(prixInitial - 1)}>
            -
          </button>
          <input type="number" id="price" value={prixInitial} readOnly />
          <button type="button" onClick={() => setPrixInitial(prixInitial + 1)}>
            +
          </button>
        </div>

        <div className="form-row">
          <label className='labelEnchereForm' htmlFor="startDate">Début de l'enchère :</label>
          <input
            type="date"
            id="startDate"
            value={dateDebutEncheres}
            onChange={(event) => setDebutEncheres(event.target.value)}/>
        </div>

        <div className="form-row">
          <label className='labelEnchereForm' htmlFor="endDate">Fin de l'enchère :</label>
          <input
            type="date"
            id="endDate"
            value={dateFinEncheres}
            onChange={(event) => setDateFinEncheres(event.target.value)}/>
        </div>

        {/* TODO afficher l'adresse */}

       
          <button className='btnEncheresForm' type="submit">Enregistrer</button>
          <button className='btnEncheresForm' type="submit">Annuler</button>
      </form>
    </div>
  );
};

export default EncheresForm;
