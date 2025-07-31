import React from 'react';
import { Link } from 'react-router-dom';


function Hero() {
  return (
    <section
      className="relative w-full h-[90vh] flex flex-col justify-center items-center text-black bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url("/HeroSection.png")`,
      }}
    >

      <div className="z-10 text-center px-4">
        <h2 className="text-4xl md:text-6xl font-bold tracking-widest mb-4 bg-gradient-to-l from-rose-500 to-indigo-700 bg-clip-text text-transparent">TRAVEL</h2>
        <p className="max-w-xl mx-auto text-base md:text-lg text-gray-200 mb-8">
          Discover the world with personalized travel plans, smart suggestions, and real-time weather updates.
          Your adventure starts here!
        </p>

       
          

        <Link to="/create-trip">
          <button className="bg-yellow-600 text-white px-6 py-2 font-semibold hover:bg-yellow-700 transition">
            Create Trip
          </button>
          </Link>
        
      </div>
    </section>
  );
}

export default Hero