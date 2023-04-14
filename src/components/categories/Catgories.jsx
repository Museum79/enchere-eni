import axios from "axios"
import { useContext, useState } from "react"
import { UserContext } from "../context/Contexts";

const Catgories = () => {
    const [category,setCategory] = useState('')
    const {categories,setCategories } = useContext(UserContext);
    const [forceUpdate, setForceUpdate] = useState(false); // Etat local pour forcer la mise à jour


    const handleSubmit=()=> {
        axios.post(`http://localhost:8888/categories/add`,{
            libelle:category
        }).then((response)=> {
            console.log(response)
            setForceUpdate(!forceUpdate); 
        })
    }
    const handleDelete = (categoryToDelete) => {
        console.log(categoryToDelete)
        axios.delete(`http://localhost:8888/categories/delete/${categoryToDelete}`,{
        }).then((response)=> {
            console.log(response)
            setCategories(categories.filter(category => category !== categoryToDelete))
            setForceUpdate(!forceUpdate); 
        })
       
    }
    console.log(categories)
  return (
    <div>
    <form onSubmit={handleSubmit}>
        <label>
            Catégorie:
            <input value={category} onChange={(e)=>setCategory(e.target.value)}/>
        </label>
        <button type="submit">Ajouter une nouvelle catégorie</button> {/* Ajouter l'attribut type="submit" sur le bouton */}
    </form>
    <ul>
                {categories?.map((categorie, index) => (
                    <li key={index}>
                        {categorie.libelle}
                        <button onClick={() => handleDelete(categorie.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
</div>
  )
}

export default Catgories
