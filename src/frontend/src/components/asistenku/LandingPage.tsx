import Header from './Header';
import Hero from './Hero';
import LayananSection from './LayananSection';
import JoinTeamSection from './JoinTeamSection';
import Penutup from './Penutup';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <LayananSection />
      <JoinTeamSection />
      <Penutup />
      <Footer />
    </div>
  );
}
