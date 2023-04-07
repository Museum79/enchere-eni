import React from 'react'
import '../main/main.css'

const Main = () => {

  return (

    <div className='container'>
        <div>
            <h2>Liste des enchères</h2>
            </div>
                <div className='filter-container'>
                <div className='category-container'>
                    <label>Catégorie :</label>
                    <select className='select'>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    </select>
                </div>
            <div>
                <label>Filtres :</label>
                <input className='inputFiltre' type='text'></input>
                <button>Rechercher</button>
            </div>
        </div>

  </div>
  

  )
}

export default Main

