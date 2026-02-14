import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useActor } from '@/hooks/useActor';
import { useNavigate } from '@tanstack/react-router';
import { Loader2, AlertCircle } from 'lucide-react';
import { getWorkspaceRoles, getRoleRoute, hasRoleRoute } from '@/utils/internalRoleRouting';
import { toast } from 'sonner';

// Extended interface for superadmin and role check methods
interface ExtendedActor {
  hasSuperadmin(): Promise<boolean>;
  claimSuperadmin(): Promise<boolean>;
  checkRoleAndStatus(): Promise<{ role: string; isActive: boolean }>;
}

export default function InternalLogin() {
  const { login, clear, identity, loginStatus } = useInternetIdentity();
  const { actor } = useActor();
  const navigate = useNavigate();
  const [checkingRole, setCheckingRole] = useState<Record<string, boolean>>({});
  const [hasSuperadmin, setHasSuperadmin] = useState<boolean | null>(null);
  const [claimingSuper, setClaimingSuper] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  // Check if superadmin exists when actor is available
  useEffect(() => {
    if (actor) {
      const extendedActor = actor as unknown as ExtendedActor;
      extendedActor.hasSuperadmin()
        .then(setHasSuperadmin)
        .catch(() => setHasSuperadmin(null));
    }
  }, [actor]);

  const handleLogin = async () => {
    if (isAuthenticated) {
      await clear();
      setHasSuperadmin(null);
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
      }
    }
  };

  const handleClaimSuperadmin = async () => {
    if (!actor || !isAuthenticated) return;
    
    setClaimingSuper(true);
    setClaimError(null);
    
    try {
      const extendedActor = actor as unknown as ExtendedActor;
      const success = await extendedActor.claimSuperadmin();
      if (success) {
        // Refresh hasSuperadmin state
        const newStatus = await extendedActor.hasSuperadmin();
        setHasSuperadmin(newStatus);
        toast.success('Superadmin claimed successfully');
      } else {
        setClaimError('Superadmin sudah di-claim');
      }
    } catch (error: any) {
      setClaimError(error.message || 'Gagal claim superadmin');
    } finally {
      setClaimingSuper(false);
    }
  };

  const handleWorkspaceClick = async (roleKey: string) => {
    if (!actor || !isAuthenticated) {
      toast.error('Silakan login terlebih dahulu');
      return;
    }

    setCheckingRole((prev) => ({ ...prev, [roleKey]: true }));

    try {
      const extendedActor = actor as unknown as ExtendedActor;
      const { role, isActive } = await extendedActor.checkRoleAndStatus();

      // Check if user is inactive
      if (!isActive) {
        toast.error('Akun Anda belum aktif. Menunggu persetujuan admin.', {
          duration: 5000,
        });
        setCheckingRole((prev) => ({ ...prev, [roleKey]: false }));
        return;
      }

      // Check if role matches the clicked workspace
      if (role !== roleKey) {
        toast.error(`Silakan klik workspace sesuai dengan role Anda: ${role}`, {
          duration: 5000,
        });
        setCheckingRole((prev) => ({ ...prev, [roleKey]: false }));
        return;
      }

      // Role matches and is active - navigate to dashboard
      const route = getRoleRoute(roleKey);
      if (route) {
        navigate({ to: route });
      } else {
        toast.info('Dashboard belum tersedia untuk role ini', {
          duration: 3000,
        });
        setCheckingRole((prev) => ({ ...prev, [roleKey]: false }));
      }
    } catch (error: any) {
      const errorMessage = error.message || String(error);
      if (errorMessage.includes('User profile not found')) {
        toast.error('Profil tidak ditemukan. Silakan daftar terlebih dahulu.', {
          duration: 5000,
        });
      } else {
        toast.error(errorMessage, {
          duration: 5000,
        });
      }
      setCheckingRole((prev) => ({ ...prev, [roleKey]: false }));
    }
  };

  const workspaceRoles = getWorkspaceRoles();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <Card className="shadow-lg rounded-3xl border-0">
          <CardHeader className="space-y-6 pt-8 pb-4">
            <div className="flex justify-center">
              <img src="/assets/asistenku-icon.png" height="28" alt="Asistenku" />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900">Masuk Internal</h1>
              <p className="text-sm text-gray-600">Untuk Tim Asistenku</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            <div className="space-y-4">
              <Button
                className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-6"
                onClick={handleLogin}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login Internet Identity'}
              </Button>
            </div>

            {/* Claim Superadmin Card - only show when no superadmin exists */}
            {hasSuperadmin === null && isAuthenticated && (
              <div className="flex justify-center py-2">
                <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
              </div>
            )}

            {hasSuperadmin === false && isAuthenticated && (
              <Card className="rounded-2xl border-2 border-amber-400 bg-amber-50 shadow-md">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Claim Superadmin
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Hanya bisa sekali. Setelah di-claim, card ini hilang.
                    </p>
                  </div>
                  <Button
                    className="w-full rounded-xl bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={handleClaimSuperadmin}
                    disabled={!isAuthenticated || claimingSuper}
                  >
                    {claimingSuper ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Claiming...
                      </>
                    ) : (
                      'Claim Superadmin'
                    )}
                  </Button>
                  {claimError && (
                    <p className="text-xs text-red-600 text-center">
                      {claimError}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {workspaceRoles.map((role) => (
                <Card
                  key={role.key}
                  className="rounded-2xl border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {role.label}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">Masuk ke workspace</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-teal-600 text-teal-600 hover:bg-teal-50"
                      onClick={() => handleWorkspaceClick(role.key)}
                      disabled={!isAuthenticated || checkingRole[role.key]}
                    >
                      {checkingRole[role.key] ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Checking...
                        </>
                      ) : (
                        'Workspace'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
