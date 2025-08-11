import './App.css'
import '@/index.css'
import Hero from '@/components/custom/Hero.jsx'
import { Button } from "@/components/ui/button"
import PopularDestinations from './components/custom/PopularDestinations'
import FAQSections from './components/custom/FAQSections'

function App() {
  return (
    <>
      {/* Main Hero Section */}
      <Hero/>
      {/* Popular Destinations Section */}
      <PopularDestinations/>
      {/* FAQ Section */}
      <FAQSections/>
      
    </>
  )
}

export default App