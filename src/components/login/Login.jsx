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
    console.log('Response headers:', response.headers);
    return response;
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8888/authenticate`, { email, password });
      const bearerToken = response.headers?.authorization;
      console.log(response)
      console.log('Bearer token:', bearerToken);
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') { 
        const jwt = bearerToken.slice(7, bearerToken.length);
        console.log('JWT:', jwt);
        sessionStorage.setItem(AUTH_TOKEN_KEY, jwt);
        navigate('/home', {replace: true });
      }
    } catch(error){
      setErrorMessage("Erreur d'authentification.");
      console.log(error);
    }
  };

  return (
    <>
    <Link className='titre' to='/home'><h1>ENCHERES-ENI</h1></Link>
      <form  onSubmit={handleSubmit}>
          <div className='bg'>
              <div className="containerLogin">
                  <input type="email" className="formLogin" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Entrer votre adresse mail" required></input>
                  <input  type="password" className="formLogin" value={password} onChange={(event) => setPassword(event.target.value)}  placeholder="Saisissez un mot de passe" required></input>
                  <button type="submit" className="formLogin" id='btn'>Se connecter</button>
                  {errorMessage && <p>{errorMessage}</p>}
                  <a href='https://google.fr' className='forgetMdp'>Récupérer votre mot de passe</a>
                  <Link className='linkSignIn' to='/register'>Pas encore inscrit? cliquez-ici!</Link>
              </div>
          </div>
      </form>
    </>
  );
};

export default Login;
