import React from 'react'
import { Button } from '@/components/ui/button';

function Header() {
   return (
    <nav className="flex items-center justify-between px-8 py-4  absolute top-0 left-0 right-0 z-10 ">
      <img src="/logo.svg" alt="" className='h-[40px]'/>
      
      <ul className="flex space-x-6 font-medium  text-blue-400">
        <li className="hover:text-yellow-400 cursor-pointer">Home</li>
        <li className="hover:text-yellow-400 text-shadow-md-black cursor-pointer">Explore</li>
        <li className="hover:text-yellow-400 cursor-pointer">Special Plans</li>
        <li className="hover:text-yellow-400 cursor-pointer">About Us</li>
      
      <Button>Log In</Button>
      </ul>
      </nav>
  );
}

export default Header