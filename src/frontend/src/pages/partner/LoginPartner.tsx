import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';

export default function LoginPartner() {
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
            <p className="text-sm text-gray-600">Untuk Partner Asistenku</p>
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
          </div>

          <Card className="border border-gray-200 rounded-2xl shadow-sm">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-gray-900">Ruang kerja</h3>
                <p className="text-sm text-gray-600">Masuk ke ruang kerja Partner</p>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-xl py-6"
                onClick={() => navigate({ to: '/partner/dashboard' })}
              >
                Masuk ke ruang kerja
              </Button>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              variant="ghost"
              className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
              onClick={() => navigate({ to: '/partner/register' })}
            >
              Belum punya akun? Daftar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
