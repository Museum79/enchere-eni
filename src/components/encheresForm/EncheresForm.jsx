import React, { useState, useEffect } from 'react';
import '../encheresForm/encheresForm.css';
import axios from "axios";


const EncheresForm = () => {

  const [article, setArticle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  //const [image, setImage] = useState(null);

  
  const handleImageChange = (event) => {
   // setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      article,
      description,
      category,
      price,
      startDate,
      endDate,
    };
    console.log(data)
    try {
      const response = await axios.post(
        'http://localhost:8888/encheres',
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8888/categories/all')
      .then(response => setCategory(response.data))
      .catch(error => console.log(error));
  }, []);

  
  return (
    <div className="form-container">
      <h2>Nouvelle vente</h2>
      <form className='formEnchere' onSubmit={handleSubmit}>
        <div className="form-row">
          <label className='labelEnchereForm' htmlFor="article">Article :</label>
          <input
            type="text"
            id="article"
            value={article}
            onChange={(event) => setArticle(event.target.value)}
          />
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
          id="category"
          value={category.join(',')}
          onChange={(event) => setCategory(event.target.value.split(','))}
        >
          <option value="">Sélectionnez une catégorie</option>
          {category.map(category =>
            <option key={category.id} value={category.libelle}>{category.libelle}</option>
          )}
        </select>

        </div>
        <div className="form-row">
          <label className='labelEnchereForm' htmlFor="image">Photo de l'article :</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <div className="form-row">
          <label className='labelEnchereForm' htmlFor="price">Mise à prix :</label>
          <button type="button" onClick={() => setPrice(price - 1)}>
            -
          </button>
          <input type="number" id="price" value={price} readOnly />
          <button type="button" onClick={() => setPrice(price + 1)}>
            +
          </button>
        </div>
        <div className="form-row">
          <label className='labelEnchereForm' htmlFor="startDate">Début de l'enchère :</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>
        <div className="form-row">
          <label className='labelEnchereForm' htmlFor="endDate">Fin de l'enchère :</label>
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
