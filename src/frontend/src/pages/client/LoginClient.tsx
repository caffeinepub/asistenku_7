import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';

export default function LoginClient() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-lg rounded-3xl border-0">
        <CardHeader className="space-y-6 pt-8 pb-4">
          <div className="flex justify-center">
            <img src="/assets/asistenku-icon.png" height="28" alt="Asistenku" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">Masuk</h1>
            <p className="text-sm text-gray-600">Untuk Client Asistenku</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          <div className="space-y-4">
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-6"
              onClick={() => {}}
            >
              Login Internet Identity
            </Button>
            <p className="text-xs text-center text-gray-500">
              Simulasi UI (belum terhubung).
            </p>
            
            <Button
              variant="outline"
              className="w-full rounded-xl py-6"
              onClick={() => {}}
            >
              Ruang kerja
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">Belum punya akun?</span>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full text-teal-600 hover:text-teal-700 hover:bg-teal-50"
            onClick={() => navigate({ to: '/client/register' })}
          >
            Daftar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
