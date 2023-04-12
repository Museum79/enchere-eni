import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from "../../App";
import '../login/login.css';
import axios from 'axios';

const Login = ({ isAuthenticates }) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  axios.interceptors.response.use(response => {
    return response;
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8888/authenticate`, { email, password });
      const bearerToken = response.headers?.authorization;
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') { 
        const jwt = bearerToken.slice(7, bearerToken.length);
        sessionStorage.setItem(AUTH_TOKEN_KEY, jwt);
        navigate('/home', { replace: true });
      }
    } catch(error){
      setErrorMessage("Erreur d'authentification.");
      console.log(error);
    }
  };
 

  return (
    <div>
      <form  onSubmit={handleSubmit}>

      <div className="split-screen">
        <div className="left">
            <section className="copy">
                <h1>Vendez vos objets</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nulla, porro quasi illo sapiente impedit molestiae, exercitationem autem tenetur.</p>
            </section>
        </div>
        <div className="right">
            <form className='formLogin'>
                <section className="copy">
                    <h2>Connexion</h2>
                    <Link className="login-container" to="/register">
                        <p>Pas inscrit?
                          <strong>Inscription</strong>
                        </p>
                    </Link>
                </section>
                <div className="input-container email">
                    <label for="email" >Email</label>
                    <input id="email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Entrer votre adresse mail" required/>
                </div>
                <div className="input-container password">
                    <label for="password" >Mot de passe</label>
                    <input id="password" name="password"
                        placeholder="Saisissez un mot de passe"
                        type="password"
                        value={password} onChange={(event) => setPassword(event.target.value)} required/>
                    <i className="far fa-eye-slash"></i>
                </div>
                <div className="input-container cta">
   
                </div>
                <button onClick={handleSubmit} className="signup-btn" type="submit">Entrer
                </button>
                {errorMessage && <p>{errorMessage}</p>}
                <section className="copy legal">
                    <p><span className="small">En continuant, vous
                        acceptez nos <br/><a href="#">Politique de confidentialité</a> &amp; <a href="#">conditions d'utilisation.</a>.</span></p>
                </section>
            </form>
        </div>
    </div>

      </form>
    </div>
  );
};

export default Login;
