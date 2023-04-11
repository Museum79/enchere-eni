import React from 'react';
import '../main/main.css';

const Main = () => {
  return (
    <div className="container">
      <h2 className='titreEnchere' >Liste des enchères</h2>
        <div className="category-container">
          <label className="labelFiltre">Catégorie :</label>
          <select className="select">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="search-container">
          <label className="labelFiltre">Filtres :</label>
          <input className="inputFiltre" type="text"></input>
          <button className="btnSearch">Rechercher</button>
        </div>
      </div>

  );
};

export default Main;
