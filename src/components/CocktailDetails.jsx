import { useParams } from 'react-router-dom';
import CocktailCard from './CocktailCard'

 function CocktailDetails() {
  const { id } = useParams(); // Extract `id` from URL
   const [cocktails, setCocktails] = useState([]);
  
    useEffect(() => {
      // Fetch from json-server
      fetch(`http://localhost:3000/cocktails/${id}`)
        .then(res => res.json())
        .then(data => setCocktails(data));
    }, []);
  return (
   <>
   <h1>Details for #{id}</h1>;
  
   </>
  )
}

export default CocktailDetails