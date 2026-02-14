import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Header from './Header';
import JoinTeamSection from './JoinTeamSection';
import Penutup from './Penutup';
import Footer from './Footer';

export default function LandingPage() {
  const [openCard, setOpenCard] = useState<string | null>(null);

  const scrollToLayanan = () => {
    const layananSection = document.getElementById('layanan');
    if (layananSection) {
      layananSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleCard = (id: string) => {
    setOpenCard(openCard === id ? null : id);
  };

  const faseLayanan = [
    {
      id: 'tenang',
      emoji: '🧘',
      title: 'Tenang',
      description: 'Untuk kebutuhan dasar yang tetap terkendali.',
    },
    {
      id: 'rapi',
      emoji: '🗂️',
      title: 'Rapi',
      description: 'Struktur kerja lebih tertata dan stabil.',
    },
    {
      id: 'fokus',
      emoji: '🎯',
      title: 'Fokus',
      description: 'Eksekusi lebih dalam dengan prioritas jelas.',
    },
    {
      id: 'jaga',
      emoji: '🛡️',
      title: 'Jaga',
      description: 'Kontrol menyeluruh untuk tanggung jawab besar.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Hero Text */}
            <div className="flex-1 text-center md:text-left space-y-6 md:space-y-8">
              <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight">
                Kerja tetap berjalan. Hidup tetap tenang.
              </h1>
              
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Asistenku adalah sistem pendampingan dalam pengaturan delegasi tugas.
              </p>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Kami menjaga setiap layanan agar tetap berjalan dengan kualitas terbaik.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center md:items-start md:justify-start justify-center gap-4 pt-4">
                <Button 
                  onClick={scrollToLayanan}
                  size="lg"
                  className="text-base px-8 py-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
                >
                  Pilih Layanan
                </Button>
                
                <a 
                  href="https://wa.me/628817743613"
                  className="text-base text-gray-600 hover:text-gray-900 underline underline-offset-4 transition-colors"
                >
                  Ngobrol dulu
                </a>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="w-full md:w-[40%] flex justify-center md:justify-end">
              <img 
                src="/assets/heroimage.png" 
                alt="Hero" 
                className="w-full max-w-[400px] md:max-w-full rounded-3xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bagaimana Kami Mendampingi Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Bagaimana Kami Mendampingi
            </h2>
            
            <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed">
              <p>Sampaikan kebutuhan Anda.</p>
              <p>Asistenmu menyusunnya menjadi brief yang jelas dan terstruktur.</p>
              <p>Partner yang tepat dipilih dan dikelola.</p>
              <p>Hasil diperiksa sebelum sampai ke Anda.</p>
            </div>
            
            <div className="pt-6">
              <p className="text-lg md:text-xl text-gray-900 font-medium leading-relaxed">
                Anda tidak lagi mengelola orang dan proses. Anda hanya mengelola keputusan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tepat Tanpa Kehilangan Waktu Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Tepat Tanpa Kehilangan Waktu
            </h2>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Kami menjaga ketepatan. Dalam kebutuhan mendesak, struktur kami memungkinkan pekerjaan dijalankan secara paralel tanpa kehilangan kontrol.
            </p>
          </div>
        </div>
      </section>

      {/* Micro-authority block - Konversi */}
      <section className="py-8">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-sm text-gray-600 leading-snug">
            Struktur kami menjaga keseimbangan antara kualitas dan ketepatan.
          </p>
          <p className="text-sm text-gray-600 italic leading-snug">
            Konversi unit layanan ditentukan melalui standar kerja yang terukur.
            Anda tidak perlu menghitung, menegosiasikan, atau memikirkan angka di level eksekusi.
          </p>
        </div>
      </section>

      {/* Unit Layanan Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Konversi unit layanan tidak ditentukan secara sembarangan.
            </p>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Anda tidak perlu menghitung, menegosiasikan, atau memikirkan angka di level eksekusi.
            </p>
          </div>
        </div>
      </section>

      {/* Fase Layanan (Pricing) Section */}
      <section id="layanan" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {faseLayanan.map((fase) => (
              <div
                key={fase.id}
                className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-all border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleCard(fase.id)}
                  className="w-full px-8 py-8 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="text-4xl mb-2">{fase.emoji}</div>
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {fase.title}
                      </h3>
                      <p className="text-base text-gray-600 leading-relaxed">
                        {fase.description}
                      </p>
                    </div>
                    <ChevronDown 
                      className={`w-6 h-6 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                        openCard === fase.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openCard === fase.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-8 pb-8 pt-2 space-y-6 border-t border-gray-100">
                    <p className="text-xl font-bold text-gray-900">
                      Rp 3.500.000 untuk alokasi 22 Unit Layanan
                    </p>
                    
                    <p className="text-base text-gray-600 leading-relaxed">
                      Untuk kebutuhan dengan skala yang lebih besar, struktur layanan dapat dikurasi bersama Concierge kami.
                    </p>
                    
                    <Button 
                      asChild
                      className="w-full rounded-2xl py-6 text-base shadow-md hover:shadow-lg transition-all"
                    >
                      <a href="https://wa.me/628817743613" target="_blank" rel="noopener noreferrer">
                        Hubungi Concierge Kami
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <JoinTeamSection />
      <Penutup />
      <Footer />
    </div>
  );
}
