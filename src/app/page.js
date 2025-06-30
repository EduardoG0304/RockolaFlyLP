import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import DualForms from '@/components/DualForms';
import Footer from '@/components/Footer';
import Stats from '@/components/Stats';
import MapAnimation from '@/components/MapAnimation';

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-DEFAULT">
      <Header />
      <main>
        <Hero />
        <Stats />
        <MapAnimation/>
        <Features />
       <DualForms/>
      </main>
      <Footer />
    </div>
  );
}