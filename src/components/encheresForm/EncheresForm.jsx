import React, { useContext, useState } from 'react';
import '../encheresForm/encheresForm.css';
import { UserContext } from '../context/Contexts';


const EncheresForm = () => {
  const { categories} = useContext(UserContext);
  console.log(categories)

  const [article, setArticle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  //const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
   // setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="form-container">
      <h2>Nouvelle vente</h2>
      <form className='formEnchere' onSubmit={handleSubmit}>
        <div className="form-row">
          <label className='labelEncheresForm' htmlFor="article">Article :</label>
          <input
            type="text"
            id="article"
            value={article}
            onChange={(event) => setArticle(event.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="category">Catégorie :</label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="category1">Catégorie 1</option>
            <option value="category2">Catégorie 2</option>
            <option value="category3">Catégorie 3</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="image">Photo de l'article :</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <div className="form-row">
          <label htmlFor="price">Mise à prix :</label>
          <button type="button" onClick={() => setPrice(price - 1)}>
            -
          </button>
          <input type="number" id="price" value={price} readOnly />
          <button type="button" onClick={() => setPrice(price + 1)}>
            +
          </button>
        </div>
        <div className="form-row">
          <label htmlFor="startDate">Début de l'enchère :</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="endDate">Fin de l'enchère :</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>

        {/* TODO afficher l'adresse */}

        <div className="form-row">
          <button className='btnEncheresForm' type="submit">Enregistrer</button>
        </div>
        <div className="form-row">
          <button className='btnEncheresForm' type="submit">Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default EncheresForm;
