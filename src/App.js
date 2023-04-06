import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import EncheresForm from './components/encheresForm/EncheresForm';


function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/encheresForm" element={<EncheresForm/>}/>
        {/* <Route exact path="/error" element={<Error/>}/> */}
    </Routes>
    </Router>
  );
}

export default App;
