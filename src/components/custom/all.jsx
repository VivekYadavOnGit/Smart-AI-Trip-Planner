import './App.css'
import '@/index.css'

import { Button } from "@/components/ui/button"

function App() {
  return (
    <>
      {/* Main Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white p-8 relative overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-70 animate-bounce"></div>
        <div className="absolute top-1/4 right-16 w-16 h-16 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-80 animate-ping"></div>
        
        {/* Main Content */}
        <div className="text-center z-10 backdrop-blur-sm bg-white/10 rounded-3xl p-12 shadow-2xl border border-white/20">
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent animate-pulse">
            🚀 Smart Trip Planner
          </h1>
          
          <p className="text-xl mb-8 max-w-2xl leading-relaxed font-light">
            Experience the future of travel planning with our revolutionary AI-powered assistant. 
            Transform your wanderlust into perfectly crafted adventures!
          </p>
          
          {/* Button Group */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              🌟 Start Planning
            </Button>
            
            <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
              🗺️ Explore Destinations
            </Button>
          </div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
              <p className="text-sm opacity-90">Smart recommendations tailored just for you</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-sm opacity-90">Plan your entire trip in minutes, not hours</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-sm opacity-90">Curated experiences for unforgettable memories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Section */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-8 animate-pulse">
            Ready for Your Next Adventure?
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['🏖️ Beach', '⛰️ Mountains', '🏙️ Cities', '🏛️ Culture', '🍽️ Food', '🎭 Entertainment'].map((tag, index) => (
              <span 
                key={index}
                className="bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-bold px-6 py-3 rounded-full text-lg shadow-lg transform hover:scale-110 transition-all duration-200 cursor-pointer hover:shadow-2xl"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black px-12 py-6 rounded-full text-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 animate-bounce hover:animate-none">
            🎯 Let's Go!
          </Button>
        </div>
      </div>

      {/* Footer Test Section */}
      <div className="bg-black text-white py-12 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="bg-red-600 p-8 rounded-lg transform hover:rotate-6 transition-transform duration-300">
              <h4 className="font-bold text-xl">RED TEST</h4>
            </div>
            <div className="bg-green-600 p-8 rounded-lg transform hover:-rotate-6 transition-transform duration-300">
              <h4 className="font-bold text-xl">GREEN TEST</h4>
            </div>
            <div className="bg-blue-600 p-8 rounded-lg transform hover:rotate-6 transition-transform duration-300">
              <h4 className="font-bold text-xl">BLUE TEST</h4>
            </div>
            <div className="bg-yellow-600 p-8 rounded-lg transform hover:-rotate-6 transition-transform duration-300">
              <h4 className="font-bold text-xl text-black">YELLOW TEST</h4>
            </div>
          </div>
          
          <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            ✅ If you can see colorful gradients, animations, and hover effects - CSS IS WORKING! 🎉
          </p>
        </div>
      </div>
    </>
  )
}

export default App