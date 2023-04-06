import { useState } from "react";
import { useForm } from "react-hook-form";


function Register() {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({});

  const onSubmit = (data) => {
    setFormData (data);
  };
  const handleCancel = () => {
    setFormData({});
    reset();

  };
  return (
    <div>
      <h1>Profil</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Pseudo:
          <input {...register("Pseudo", { required: true } ) } placeholder = "pseudo" />
          {errors.Pseudo && <span>champs vide</span>}
        </label>
        <br />
        <label>
          Nom:
          <input {...register("Nom", { required: true } ) } placeholder = "Nom" />
          {errors.Nom && <span>champs vide</span>}
        </label>
        <br />
        <label>
         Prénom :
          <input {...register("Prénom", { required: true } ) } placeholder = "Prénom" />
          {errors.Prénom && <span>champs vide</span>}
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
          <input {...register("Téléphone", { required: true, pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }) } placeholder = "téléphone" type = "tel" />
          {errors.Télephone && <span>champs vide</span>}
          {errors.Télephone?.type === "pattern" && <span>cela doit etre un numero</span>}
        </label>
        <br />
        <label>
        Rue  :
          <input {...register("Rue", { required: true } ) } placeholder = "nom de rue" type = "text" />
          {errors.Rue && <span>le numéro est requis</span>}
        </label>
        <br />
        <label>
        Code Postale :
          <input {...register("CodePostale", { required: true,minLength: 5, maxLength: 5, pattern: "[0-9]{5}" } ) } placeholder = "Code Postale"  />
          {errors.CodePostale && <span>le numéro est requis</span>}
          {errors.CodePostale?.type === "pattern" && <span>le code doit etre un code a 5 chiffre</span>}
        </label>
        <br />
        <label>
        Ville :
          <input {...register("ville", { required: true  } ) } placeholder = "nom de ville"/>
          {errors.ville && <span>la ville est requise</span>}
          
        </label>
        <label>
          Mot de passe:
          <input {...register("password", { required: true, minLength: 8, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, })} type="password" />
          {errors.password?.type === "required" && <span>mot de apsse obligatoire</span>}
          {errors.password?.type === "minLength" && <span>le mot de passe doit contenir au minimum 8 caractère</span>}
          {errors.password?.type === "pattern" && <span>Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial</span>}
        </label>
        <br />
        <label>
          Confirmation:
          <input {...register("comfirmPassword", { required: true, validate:(value)=> value === watch("password"), })} type="password" />
          {errors.confirmPassword?.type === "validate" && <p>les mots de passes ne sont pas identique</p>}
        </label>
        <br />
        <button type="submit">Enregistrer</button>
        <button type="button" onClick={handleCancel}> Annuler</button>
      </form>
      {Object.keys(formData).length > 0 && (
        <div>
          <h2>inscription reussie !</h2>
          <p>Pseudo: {formData.Pseudo}</p>
          <p>Nom: {formData.Nom}</p>
          <p>Prénom: {formData.Prénom}</p>
          <p>email: {formData.email}</p>
          <p>téléphone: {formData.Téléphone}</p>
          <p>Rue: {formData.Rue}</p>
          <p>Code postal: {formData.Nom}</p>
          <p>ville {formData.ville}</p>
          <p>Password: {formData.password}</p>
        </div>
      )}
    </div>
  );
      }
      export default Register;
