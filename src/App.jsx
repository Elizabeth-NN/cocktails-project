
import { Routes,Route} from 'react-router'
import Home from './pages/Home'
import CocktailsPage from './pages/CocktailsPage'
import About from './pages/About'
import NavBar from './components/NavBar'

import OrdersPage from './pages/OrdersPage'

function App() {
  

  return (
   <>
   <Routes>
   <Route path="/" element={<NavBar />}>
      <Route path="/" element={<Home />} />
      <Route path="/cocktails" element={<CocktailsPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/orders" element={<OrdersPage />} />
      
      </Route>
    </Routes>
   </>
  )
}

export default App
