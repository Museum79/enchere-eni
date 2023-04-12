import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './profile.css';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../context/Contexts';

const Profile = () => {
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = id ? `http://localhost:8888/users/${id}`: `http://localhost:8888/users/userDetails`
    axios.get(url)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id, setUser]);

  if (error) {
    return <div>Une erreur est survenue: {error.message}</div>;
  }

  if (!user) {
    return <div>Chargement en cours...</div>;
  }

  const {  pseudo, nom, prenom, email, telephone, adresse } = user;

  return (
    <div className="profile-container">
      <div className="cardprofile">
        <h2>Informations utilisateur</h2>
        <ul>
          <li>
            <strong>Pseudo:</strong> <span>{pseudo}</span>
          </li>
          <li>
            <strong>Nom:</strong> <span>{nom}</span>
          </li>
          <li>
            <strong>Prénom:</strong> <span>{prenom}</span>
          </li>
          {!id && 
          <>
          <li>
              <strong>Email:</strong> <span>{email}</span>
          </li>
           <li>
              <strong>Téléphone:</strong> <span>{telephone}</span>
          </li> </> }
         

          <li>
            <strong>Adresse:</strong>{" "}
            <span>
            {!id ? `${adresse.rue } ${adresse.codePostal } ${adresse.ville }`:`${adresse.codePostal } ${adresse.ville }`}
            </span>
          </li>
        </ul>
        {!id && <div className="button-container">
          <Link to={`/editprofile`} className="button">
            Modifier le profil
          </Link>
        </div>}
        
      </div>

    </div>
  );
};

export default Profile;
