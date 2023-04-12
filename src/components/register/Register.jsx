import axios from "axios";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { AUTH_TOKEN_KEY } from "../../App";
import { useNavigate } from "react-router-dom";
import '../register/register.css'

function Register() {
  
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  //const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios.post('http://localhost:8888/users/signup', {
      pseudo: data.pseudo,
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      telephone: data.telephone,
      adresse: {
        rue: data.adresse.rue,
        codePostal: data.adresse.codePostal,
        ville: data.adresse.ville
      },
      motDePasse: data.motDePasse
    }).then(response => {
      /*const bearerToken = response?.headers?.authorization;
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        sessionStorage.setItem(AUTH_TOKEN_KEY,jwt)
      }*/
      navigate('/login',{replace:true});
    }).catch((error) => {
      console.log(error)
    })
    };
    const handleCancel = () => {
      //setFormData({});
      reset();
      };
/*12avril2023Sylvain??*/

      return (
        
      <div className="pageRegister">
        <div className="containerRegister">
        <div className="form-title" to="/home"><h1>Formulaire d'inscription</h1></div>
        <form className="formRegister" onSubmit={handleSubmit(onSubmit)}>
          
            <div className="containerLogin">
          <div className="formLogin">
            <label>Pseudo:</label>
            <input className="formLoginInput" {...register("pseudo", { required: true } ) } placeholder = "pseudo" />
            {errors.pseudo && <span>champs vide</span>}
          </div>

          <div className="formLogin">
            <label>Nom:</label>
            <input className="formLoginInput" {...register("nom", { required: true } ) } placeholder = "Nom" />
            {errors.nom && <span>champs vide</span>}
          </div>

          <div className="formLogin">
            <label>Prénom :</label>
            <input  className="formLoginInput"{...register("prenom", { required: true } ) } placeholder = "Prénom" />
            {errors.prenom && <span>champs vide</span>}
          </div>
          <div className="formLogin">
            <label>Email:</label>
            <input className="formLoginInput" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder = "email"/>
            {errors.email?.type === "required" && <span>champ vide</span>}
            {errors.email?.type === "pattern" && <span>email non valide</span>}
          </div>

          <div className="formLogin">
            <label>Téléphone :</label>
            <input className="formLoginInput" {...register("telephone", { required: true, pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }) } placeholder = "telephone" type = "tel" />
            {errors.Télephone && <span>champs vide</span>}
            {errors.Télephone?.type === "pattern" && <span>cela doit être un numéro</span>} 
          </div>

          <div className="formLogin">
            <label>Rue :</label>
            <input className="formLoginInput" {...register("adresse.rue", { required: true } ) } placeholder = "nom de rue" />
            {errors.rue && <span>le numéro est requis</span>}
          </div>

          <div className="formLogin">
            <label>Code Postal :</label>
            <input className="formLoginInput" {...register("adresse.codePostal", { required: true, minLength: 5, maxLength: 5, pattern: "[0-9]{5}" } ) } placeholder = "Code Postal" />
            {errors.codePostal && <span>le numéro est requis</span>}
            {errors.codePostal?.type === "pattern" && <span>le code doit être un code à 5 chiffres</span>}
          </div>

          <div className="formLogin">
            <label>Ville :</label>
            <input className="formLoginInput" {...register("adresse.ville", { required: true } ) } placeholder = "nom de ville"/>
            {errors.ville && <span>la ville est requise</span>} 
          </div>

          <div className="formLogin">
            <label>Mot de passe :</label>
            <input className="mdpRegister" {...register("motDePasse", { required: true, minLength: 12,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/gm, })} type="password" />
            {errors.motDePasse?.type === "required" && <span>mot de passe obligatoire</span>}
            {errors.motDePasse?.type === "minLength" && <span>le mot de passe doit contenir au minimum 12 caractères</span>}
            {errors.motDePasse?.type === "pattern" && <span>Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial</span>}
          </div>

          <div className="formLogin">
            <label>Confirmation :</label>
            <input className="cmdpRegister" {...register("comfirmPassword", { required: true, validate:(value)=> value === watch("motDePasse"), })}
            type="password" />
            {errors.confirmPassword?.type === "validate" && <p>les mots de passe ne sont pas identiques</p>}
          </div>
          <button className="btnRegister" type="submit">Enregistrer</button>
          <button className="btnRegister" type="button" onClick={handleCancel}>Annuler</button>
          </div>
        </form>
        </div>
      </div>
            );
          }
    export default Register;