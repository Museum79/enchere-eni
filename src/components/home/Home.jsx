import React from 'react';
import Main from '../main/Main';
import Header from '../header/Header';

const Home = ({ isAuthenticated }) => {
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <Main />
      
    </>
  )
}

export default Home;
