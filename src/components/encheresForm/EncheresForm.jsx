import React, { useState, useContext } from 'react';
import '../encheresForm/encheresForm.css';
import axios from "axios";
import { UserContext } from '../context/Contexts';
import { Link, useNavigate } from 'react-router-dom';


const EncheresForm = () => {


  const { categories } = useContext(UserContext);

  const [nomArticle, setNomArticle] = useState('');
  const [description, setDescription] = useState('');
  const [articleCategorie, setArticleCategories] = useState('');
  const [dateDebutEncheres, setDebutEncheres] = useState('');
  const [dateFinEncheres, setDateFinEncheres] = useState('');
  const [prixInitial, setPrixInitial] = useState(0);

  const navigate = useNavigate();


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
      navigate('/home', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="form-container">
      <h2 className='titreEnchereForm'>Nouvelle vente</h2>
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
          <button type='button' className="btnPrice" onClick={() => setPrixInitial(prixInitial + 1)}>
            +
          </button>

          <input type="number" id="price" min={1} value={prixInitial} />

          <button type='button' className="btnPrice" onClick={() => setPrixInitial(Math.max(prixInitial - 1, 0))}>
            -
          </button>
        </div>

        <div className="form-row">
          <label className='labelEnchereForm' htmlFor="startDate">Début de l'enchère :</label>
          <input
            type="date"
            className="DateEnchereForm"
            value={dateDebutEncheres}
            onChange={(event) => setDebutEncheres(event.target.value)}/>
        </div>

        <div className="form-row">
          <label className='labelEnchereForm' htmlFor="endDate">Fin de l'enchère :</label>
          <input
            type="date"
            className="DateEnchereForm"
            value={dateFinEncheres}
            onChange={(event) => setDateFinEncheres(event.target.value)}/>
        </div>

        <div className='BtnEnchereDiv'>
            <Link className='btnEncheresForm' type="submit">Enregistrer</Link>
            <Link className='btnEncheresForm' type="submit" to="/home" >Annuler</Link>
        </div>
      </form>
    </div>
  );
};

export default EncheresForm;
