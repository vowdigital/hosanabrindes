import { useCampaignTracking } from './hooks/useCampaignTracking'
import { Header } from './components/Header'
import { MotionController } from './components/MotionController'
import { Hero } from './sections/Hero'
import { Authority } from './sections/Authority'
import { Products } from './sections/Products'
import { AcrylicFeature } from './sections/AcrylicFeature'
import { Production } from './sections/Production'
import { Needs } from './sections/Needs'
import { Portfolio } from './sections/Portfolio'
import { FinalCTA } from './sections/FinalCTA'
import { FAQSection } from './sections/FAQSection'
import { Footer } from './sections/Footer'
import { StructuredData } from './components/StructuredData'
import './styles/components.css'
import './styles/sections.css'
import './styles/responsive.css'

function App() {
  useCampaignTracking()

  return (
    <>
      <StructuredData />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <MotionController>
        <main id="conteudo">
          <Hero />
          <Authority />
          <Products />
          <AcrylicFeature />
          <Production />
          <Needs />
          <Portfolio />
          <FinalCTA />
          <FAQSection />
        </main>
        <Footer />
      </MotionController>
    </>
  )
}

export default App
