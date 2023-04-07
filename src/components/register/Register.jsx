import axios from "axios";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { AUTH_TOKEN_KEY } from "../../App";
import { useNavigate } from "react-router-dom";

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
      const bearerToken = response?.headers?.authorization;
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        sessionStorage.setItem(AUTH_TOKEN_KEY,jwt)
      }
      navigate('/home',{replace:true});
    }).catch((error) => {
      console.log(error)
    })
    };
    const handleCancel = () => {
      //setFormData({});
      reset();
      };
      return (
      <div>
        <h1>Profil</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Pseudo:
            <input {...register("pseudo", { required: true } ) } placeholder = "pseudo" />
            {errors.pseudo && <span>champs vide</span>}
            </label>
            <br />
            <label>
              Nom:
            <input {...register("nom", { required: true } ) } placeholder = "Nom" />
            {errors.nom && <span>champs vide</span>}
            </label>
            <br /> 
            <label>
              Prénom :
            <input {...register("prenom", { required: true } ) } placeholder = "Prénom" />
              {errors.prenom && <span>champs vide</span>}
            </label>
            <br />
            <label>
              Email:
            <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder = "email"/>
              {errors.email?.type === "required" && <span>champ vide</span>}
              {errors.email?.type === "pattern" && <span>email non valide</span>}
            </label>
             <br />
            <label>
              Téléphone :
            <input {...register("telephone", { required: true, pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }) } placeholder = "telephone" type = "tel" />
            {errors.Télephone && <span>champs vide</span>}
            {errors.Télephone?.type === "pattern" && <span>
              cela doit etre un numero</span>} </label>
              <br />
              <label>
                Rue :
              <input {...register("adresse.rue", { required: true } ) } placeholder = "nom de rue" type = "text" />
              {errors.rue && <span>le numéro est requis</span>}
              </label>
              <br />
              <label>
              Code Postale :
              <input {...register("adresse.codePostal", { required: true,minLength: 5, maxLength: 5, pattern: "[0-9]{5}" } ) } placeholder = "Code Postale" />
              {errors.codePostal && <span>le numéro est requis</span>}
              {errors.codePostal?.type === "pattern" && <span>le code doit etre un code a 5 chiffre</span>}
              </label>
              <br />
              <label>
              Ville :
              <input {...register("adresse.ville", { required: true } ) } placeholder = "nom de ville"/>
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
                    </div>
                    );
                  }
                export default Register;