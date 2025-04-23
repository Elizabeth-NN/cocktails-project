import { useParams } from 'react-router-dom';

 function CocktailDetails() {
  const { id } = useParams(); // Extract `id` from URL
  return <h1>Details for Cocktail #{id}</h1>;
}

export default CocktailDetails