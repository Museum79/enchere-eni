import React, { useContext } from 'react';
import { UserContext } from '../context/Contexts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { AUTH_TOKEN_KEY } from '../../App';

const EditProfile = () => {
  const { user } = useContext(UserContext);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  //const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios.patch('http://localhost:8888/users/update',null, {
      params: {
        pseudo: data.pseudo !== user.pseudo ?data.pseudo: null,
        nom: data.nom !== user.nom ? data.nom: null,
        prenom: data.prenom!== user.prenom ? data.prenom: null,
        email: data.email!== user.email ? data.email: null,
        telephone: data.telephone!== user.telephone ? data.telephone: null,
        adresseRue: data.rue!== user.rue ? data.rue: null,
        adresseCodePostal: data.codePostal!== user.codePostal ? data.codePostal: null,
        adresseVille: data.ville!== user.ville ? data.ville: null,
        motDePasse:data.motDePasse
      }
     
      },
      //motDePasse: data.motDePasse
    ).then(response => {
      const bearerToken = response.headers?.authorization;
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') { 
        const jwt = bearerToken.slice(7, bearerToken.length);
        sessionStorage.removeItem(AUTH_TOKEN_KEY, jwt);
        sessionStorage.setItem(AUTH_TOKEN_KEY, jwt);
      }
      navigate('/home',{replace:true});
    }).catch((error) => {
      console.log(error)
    })
    };
    const handleCancel = () => {
      navigate('/home',{replace:true});
      };
    const handleDelete = () => {
      axios.delete('http://localhost:8888/users/delete').then(response =>{
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
      })
      navigate('/login',{replace:true});
      };
      const disabled = !user.administrateur? true: false;
      return (
      <div>
        <h1>Modifier mon profile</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Pseudo:
            <input {...register("pseudo", { required: true } ) } defaultValue={user.pseudo}/>
            {errors.pseudo && <span>champs vide</span>}
            </label>
            <br />
            <label>
              Nom:
            <input {...register("nom", { required: true,disabled:disabled  } ) } defaultValue={user.nom} />
            {errors.nom && <span>champs vide</span>}
            </label>
            <br /> 
            <label>
              Prénom :
            <input {...register("prenom", { required: true,disabled:disabled } ) } defaultValue={user.prenom} />
              {errors.prenom && <span>champs vide</span>}
            </label>
            <br />
            <label>
              Email:
            <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} defaultValue={user.email}/>
              {errors.email?.type === "required" && <span>champ vide</span>}
              {errors.email?.type === "pattern" && <span>email non valide</span>}
            </label>
             <br />
            <label>
              Téléphone :
            <input {...register("telephone", { required: true, pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }) }  type = "tel" defaultValue={user.telephone} />
            {errors.Télephone && <span>champs vide</span>}
            {errors.Télephone?.type === "pattern" && <span>
              cela doit etre un numero</span>} </label>
              <br />
              <label>
                Rue :
              <input {...register("rue", { required: true } ) } defaultValue={user.adresse.rue} type = "text" />
              {errors.rue && <span>le numéro est requis</span>}
              </label>
              <br />
              <label>
              Code Postale :
              <input {...register("codePostal", { required: true,minLength: 5, maxLength: 5, pattern: "[0-9]{5}" } ) } defaultValue={user.adresse.codePostal} />
              {errors.codePostal && <span>le numéro est requis</span>}
              {errors.codePostal?.type === "pattern" && <span>le code doit etre un code a 5 chiffre</span>}
              </label>
              <br />
              <label>
              Ville :
              <input {...register("ville", { required: true } ) } defaultValue={user.adresse.ville}/>
              {errors.ville && <span>la ville est requise</span>} </label>
              <label>
                Mot de passe:
                <input {...register("motDePasse", { required: true, minLength: 8, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, })} type="password" />
                {errors.motDePasse?.type === "required" && <span>mot de apsse obligatoire</span>}
                {errors.motDePasse?.type === "minLength" && <span>le mot de passe doit contenir au minimum 8 caractère</span>}
                {errors.motDePasse?.type === "pattern" && <span>Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial</span>}
                </label>
                <br />
                <label>
                  Confirmation:
                  <input {...register("comfirmPassword", { required: true, validate:(value)=> value === watch("motDePasse"), })} type="password" />
                  {errors.confirmPassword?.type === "validate" && <p>les mots de passes ne sont pas identique</p>}
                  </label>
                  <br />
                  <button type="submit">Enregistrer</button>
                  <button type="button" onClick={handleCancel}>
                    Annule
                  </button>
                    </form>
                    <button type="button" onClick={handleDelete}>
                    Supprimer mon compte
                  </button>
                    </div>
                    );
};

export default EditProfile;
