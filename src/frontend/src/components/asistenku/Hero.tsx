import { Button } from '@/components/ui/button';

export default function Hero() {
  const scrollToLayanan = () => {
    const layananSection = document.getElementById('layanan-section');
    if (layananSection) {
      layananSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-6">
        {/* Hero Image */}
        <div className="flex justify-center mb-12 md:mb-16">
          <img 
            src="/assets/heroimage.png" 
            alt="Hero" 
            className="w-full md:max-w-[780px] max-w-[92%] rounded-3xl shadow-lg"
          />
        </div>
        
        {/* Hero Text */}
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Kerja tetap berjalan. Hidup tetap tenang.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Kami menjaga setiap layanan agar tetap berjalan dengan kualitas terbaik.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
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
      </div>
    </section>
  );
}
