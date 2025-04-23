import { useEffect, useState } from 'react';
import CocktailList from './CocktailList'


const CocktailGallery = () => {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    // Fetch from json-server
    fetch('http://localhost:3000/cocktails')
      .then(res => res.json())
      .then(data => setCocktails(data));
  }, []);

  return <CocktailList cocktails={cocktails} />;
};

export default CocktailGallery;