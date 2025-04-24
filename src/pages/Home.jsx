import React from 'react'
import CocktailGallery from '../components/CocktailGallery'
import About from '../pages/About'
import Footer from '../components/Footer'

function home() {
  return (
    <>
   
    <section className="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white py-20 px-6 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto z-10 relative">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Shake Things Up 🍹
        </h1>
        <p className="text-lg md:text-xl mb-6 font-light">
          Discover, mix, and enjoy the best cocktail recipes — handcrafted for every vibe.
        </p>
      
      </div>

    </section>
    <About/>
    <Footer/>

    </>
  )
}

export default home