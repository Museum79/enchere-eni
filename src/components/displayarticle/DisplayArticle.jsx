import React, { useContext } from 'react'
import { UserContext } from '../context/Contexts';
import { useParams } from 'react-router-dom';

const DisplayArticle = () => {
  const { id } = useParams();
  const { articles } = useContext(UserContext);
  const articleId = parseInt(id);

  const article = articles.find((article) => article.id === articleId);



  return (
    <div>
      <h2>{article.nomArticle}</h2>
    </div>
  )
}

export default DisplayArticle
