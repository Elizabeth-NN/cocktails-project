

import { Link, Outlet } from 'react-router-dom';

function NavBar() {
  return (
    <>
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
         
          <img 
            src="../public/logo.png" 
            alt="Maji-Mazuri Logo" 
            className="h-8 w-8" 
          />
          <span className="text-xl font-bold text-amber-800">
            Maji-Mazuri Cocktails
          </span>
        </div>
        
        <nav className="flex gap-6">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-amber-600 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/cocktails" 
            className="text-gray-700 hover:text-amber-600 transition-colors"
          >
            Cocktails
          </Link>
          <Link 
            to="/about" 
            className="text-gray-700 hover:text-amber-600 transition-colors"
          >
            About
          </Link>
          <Link 
            to="/orders" 
            className="text-gray-700 hover:text-amber-600 transition-colors"
          >
            Orders
          </Link>
        </nav>
      </div>
      
      
      
    </header>
    
    <Outlet /> 
    </>
  );
}

export default NavBar;