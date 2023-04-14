import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [articles, setArticle ] = useState([]);
  const [categories, setCategories] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, articles, categories, setArticle, setCategories }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
