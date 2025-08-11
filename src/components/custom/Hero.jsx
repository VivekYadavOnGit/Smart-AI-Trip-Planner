import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


function Hero() {
  return (
    <section
      className="relative w-full h-[90vh] flex flex-col justify-center items-center text-black bg-no-repeat bg-cover bg-center object-cover"
      style={{
        backgroundImage: `url("/HeroSection.png")`,
      }}
    >

      <div className="flex flex-col item-center mx-55 gap-9">
        <h2 className="text-[50px] font-extrabold text-center mt-16 text-white">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI: <br/> Personalized Trip Planning Made Easy
        </span>
       </h2>
          

        <Link to="/create-trip">
          <Button className="bg-[#f56551] text-wh ite px-6 py-2 font-semibold hover:bg-yellow-700 transition">
            Create Trip
          </Button>
          </Link>
        
      </div>
    </section>
  );
}

export default Hero