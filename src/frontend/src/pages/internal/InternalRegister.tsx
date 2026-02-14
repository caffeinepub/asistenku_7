import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useActor } from '@/hooks/useActor';
import { Loader2 } from 'lucide-react';
import type { UserProfile } from '@/backend';
import { INTERNAL_ROLES } from '@/utils/internalRoles';

// Extended interface for saveCallerUserProfile
interface ExtendedActor {
  saveCallerUserProfile(profile: UserProfile): Promise<void>;
}

export default function InternalRegister() {
  const navigate = useNavigate();
  const { login, clear, identity, loginStatus, isInitializing } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    whatsapp: '',
    role: '',
  });

  // Check if identity exists and is not anonymous
  const isAuthenticatedNonAnonymous = !!identity && !identity.getPrincipal().isAnonymous();
  const extendedActor = actor ? (actor as unknown as ExtendedActor) : null;
  
  // Compute single readiness state - form is ready when authenticated and actor exists
  const isReady = isAuthenticatedNonAnonymous && !!extendedActor;
  
  // Check if we're still loading auth/actor state
  const isLoadingAuthOrActor = isInitializing || actorFetching || loginStatus === 'logging-in';
  
  const isLoggingIn = loginStatus === 'logging-in';

  // Filter roles to exclude client, partner, and superadmin from dropdown
  const allowedRolesForDropdown = INTERNAL_ROLES.filter(
    (role) => role.key !== 'client' && role.key !== 'partner' && role.key !== 'superadmin'
  );

  const handleLogin = async () => {
    if (isAuthenticatedNonAnonymous) {
      await clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isReady || !extendedActor) {
      setSubmitError('Sistem belum siap. Silakan tunggu sebentar.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const profile: UserProfile = {
        name: formData.nama,
        email: formData.email,
        role: formData.role,
        isActive: false,
      };
      
      await extendedActor.saveCallerUserProfile(profile);
      setSubmitted(true);
    } catch (error: any) {
      const errorMessage = error.message || String(error);
      setSubmitError(errorMessage);
      console.error('Submit error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-lg rounded-3xl border-0">
          <CardHeader className="space-y-6 pt-8 pb-4">
            <div className="flex justify-center">
              <img src="/assets/asistenku-icon.png" height="28" alt="Asistenku" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pb-8 text-center">
            <p className="text-gray-900">
              Terkirim. Menunggu persetujuan.
            </p>
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-6"
              onClick={() => navigate({ to: '/internal/login' })}
            >
              Kembali ke Masuk Internal
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show login gate only when we're sure user is NOT authenticated (not during loading)
  if (!isLoadingAuthOrActor && !isAuthenticatedNonAnonymous) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-lg rounded-3xl border-0">
          <CardHeader className="space-y-6 pt-8 pb-4">
            <div className="flex justify-center">
              <img src="/assets/asistenku-icon.png" height="28" alt="Asistenku" />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900">Pendaftaran Internal</h1>
              <p className="text-sm text-gray-600">Untuk Tim Asistenku</p>
            </div>
          </CardHeader>
          <CardContent className="pb-8">
            <div className="space-y-6">
              <Button
                className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-6"
                onClick={handleLogin}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Logging in...' : 'Login Internet Identity'}
              </Button>
              <div className="text-red-500 text-sm text-center mt-2">
                Anda harus login terlebih dahulu
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-lg rounded-3xl border-0">
        <CardHeader className="space-y-6 pt-8 pb-4">
          <div className="flex justify-center">
            <img src="/assets/asistenku-icon.png" height="28" alt="Asistenku" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">Pendaftaran Internal</h1>
            <p className="text-sm text-gray-600">Untuk Tim Asistenku</p>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="space-y-6">
            {/* Login Button */}
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-6"
              onClick={handleLogin}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Logging in...' : isAuthenticatedNonAnonymous ? 'Logout' : 'Login Internet Identity'}
            </Button>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama</Label>
                <Input
                  id="nama"
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="rounded-xl"
                  disabled={!isReady}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-xl"
                  disabled={!isReady}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="rounded-xl"
                  disabled={!isReady}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                  disabled={!isReady}
                  required
                >
                  <SelectTrigger id="role" className="rounded-xl" disabled={!isReady}>
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    {allowedRolesForDropdown.map((role) => (
                      <SelectItem key={role.key} value={role.key}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Error message */}
              {submitError && (
                <p className="text-sm text-red-600 text-center">
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-6 mt-6"
                disabled={!isReady || submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  'Kirim'
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
