import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa'; // FontAwesome icons

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Handle email submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      
    }
  };

  return (
    <footer className="bg-amber-600 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        
      <div className="flex items-center gap-2">
         
         <img 
           src="../public/logo.png" 
           alt="Maji-Mazuri Logo" 
           className="h-8 w-8" 
         />
         <span className="text-xl font-bold text-amber-200">
           Maji-Mazuri Cocktails
         </span>
       </div>
        

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-blue-500 transition">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="text-white hover:text-blue-400 transition">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-white hover:text-pink-500 transition">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-white">Join Our Newsletter</h3>
        <p className="text-sm text-gray-400 mt-2">Get the latest Cocktails and tips delivered straight to your inbox!</p>
        <form onSubmit={handleEmailSubmit} className="mt-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-2 w-64 mt-2 text-gray-800 rounded-full"
            required
          />
          <button
            type="submit"
            className="bg-amber-600 text-white px-6 py-2 ml-2 rounded-full hover:bg-red-700 transition"
          >
            {subscribed ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
      </div>

      {/* Back to Top Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
        >
          Back to Top
        </button>
      </div>

      {/* Footer Bottom */}
      <p className="text-xs text-center md:text-right text-gray-500 mt-6">
        © {new Date().getFullYear()} CocktailCraft. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
