import CTA from './components/cta';
import Feature from './components/features';
import FooterLandingPage from './components/footer';
import Hero from './components/hero';
import { Navbar } from './components/navbar/navbar';

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <div className="flex flex-col items-center pt-24">
        <Hero />
        <Feature />
        <CTA />
      </div>
      <FooterLandingPage />
    </main>
  );
};

export default HomePage;
