import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

export default function JoinTeamSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Ingin jadi bagian dari Tim Asistenku?
          </h2>
          
          <Button 
            size="lg"
            variant="outline"
            className="text-base px-8 py-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
            onClick={() => navigate({ to: '/partner/register' })}
          >
            Pelajari
          </Button>
        </div>
      </div>
    </section>
  );
}
