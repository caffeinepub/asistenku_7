import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

export default function Header() {
  const navigate = useNavigate();

  const handleScrollToLayanan = () => {
    const layananSection = document.getElementById('layanan');
    if (layananSection) {
      layananSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Desktop logo */}
          <div className="hidden md:block">
            <img 
              src="/assets/asistenku-horizontal.png" 
              alt="Asistenku" 
              style={{ height: '32px' }}
              className="h-8"
            />
          </div>
          
          {/* Mobile logo */}
          <div className="block md:hidden">
            <img 
              src="/assets/asistenku-icon.png" 
              alt="Asistenku" 
              style={{ height: '28px' }}
              className="h-7"
            />
          </div>
          
          {/* Navigation buttons */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/client/login' })}
              className="text-gray-700 hover:text-gray-900"
            >
              Masuk
            </Button>
            <Button
              variant="ghost"
              onClick={handleScrollToLayanan}
              className="text-gray-700 hover:text-gray-900"
            >
              Mulai
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/partner/register' })}
              className="text-gray-700 hover:text-gray-900"
            >
              Partner
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
