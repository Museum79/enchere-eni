import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../login/login.css';

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    event.preventDefault();
    console.log(email);
    console.log(password);
    try {
        //const response = await axios.post(`http://localhost:8080/home`, { email, password });
        //console.log(response);

    // redirection vers la page home
    navigate('/home', {replace: true });

    } catch(error){
        setErrorMessage && <p>{errorMessage}</p>
        console.log(error)
    }
};

  return (
    <Fragment>
    <form  onSubmit={handleSubmit}>
        <div className='bg'>
            <div className="containerLogin">
                <input type="email" className="formLogin" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Entrer votre adresse mail" required></input>
                <input  type="password" className="formLogin" value={password} onChange={(event) => setPassword(event.target.value)}  placeholder="Saisissez un mot de passe" required></input>
                <button type="submit" className="formLogin" id='btn'>Se connecter</button>
                <a href='https://google.fr' className='forgetMdp'>Récupérer votre mot de passe</a>
                <Link className='linkSignIn' to='/register'>Pas encore inscrit? cliquez-ici!</Link>
            </div>
        </div>
    </form>
</Fragment >
  );
};

export default Login;
