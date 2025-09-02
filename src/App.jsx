import './App.css'
import '@/index.css'
import Hero from '@/components/custom/Hero.jsx'
import PopularDestinations from './components/custom/PopularDestinations'
import FAQSections from './components/custom/FAQSections'
import LandingFooter from './components/custom/LandingFooter.jsx'
import FeaturesSection from './components/custom/FeaturesSection'
import LandingHeader from './components/custom/LandingNavbar.jsx'
function App() {
  return (
    <>
      {/* Navbar Section */}
      <LandingHeader/>
      {/* Main Hero Section */}
      <Hero/>
      {/* Popular Destinations Section */}
      <PopularDestinations/>
      {/* Fratures Section */ }
      <FeaturesSection/>
      {/* FAQ Section */}
      <FAQSections/>
      {/* Footer Section */}
      <LandingFooter/>
      
    </>
  )
}

export default App