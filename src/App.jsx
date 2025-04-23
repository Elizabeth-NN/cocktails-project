
import { Routes,Route} from 'react-router'
import Home from './pages/Home'
import CocktailsPage from './pages/CocktailsPage'
import About from './pages/About'
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar'
import CocktailDetails from './components/CocktailDetails'

function App() {
  

  return (
   <>
   <Routes>
   <Route path="/" element={<NavBar />}>
      <Route path="/" element={<Home />} />
      <Route path="/cocktails" element={<CocktailsPage />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} /> {/* 404 page */}
      <Route path="/cocktails/:id" element={<CocktailDetails />} />
      </Route>
    </Routes>
   </>
  )
}

export default App
