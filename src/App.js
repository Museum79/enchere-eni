import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import EncheresForm from './components/encheresForm/EncheresForm';
import Profile from './components/profile/Profile';

import { useContext, useEffect } from 'react';
import axios from 'axios';
import EditProfile from './components/editprofile/EditProfile';
import { UserContext } from './components/context/Contexts';
import DisplayArticle from './components/displayarticle/DisplayArticle';
import Catgories from './components/categories/Catgories';

export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';


function App() {

  const {categories, setCategories} = useContext(UserContext);
  const {articles, setArticles} = useContext(UserContext);


  


  useEffect(()=> {
    axios.get("http://localhost:8888/categories/all").then((response)=> {
        setCategories(response.data)
    })
},[])

useEffect(()=> {
  axios.get("http://localhost:8888/articles/all").then((response)=> {
      setArticles(response.data)
  })
},[])




  useEffect(() => {
    console.log('Intercepteur ajouté');

    axios.interceptors.request.use(
      function (request) {
        console.log('Requête interceptée', request);
        const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
        if (token) {
          request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
      },
      function (error) {
        console.error('Erreur d\'interception de requête', error);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (response) {
        console.log('Réponse interceptée', response);
        return response;
      },
      function (error) {
        console.error('Erreur d\'interception de réponse', error);
        if (error.response.status === 401) {
          console.log('Redirection vers la page de connexion');
          // Rediriger vers la page de connexion
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/encheresForm" element={<EncheresForm/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/profile/:id" element={<Profile/>}/>
        <Route exact path="/editprofile" element={<EditProfile/>}/>
        <Route exact path="/displayarticle/:id" element={<DisplayArticle/>}/>
        <Route exact path="/categories" element={<Catgories/>}/>




        {/* <Route exact path="/error" element={<Error/>}/> */}
    </Routes>
    </Router>
  );
}

export default App;
