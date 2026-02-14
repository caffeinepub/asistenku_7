import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useActor } from '@/hooks/useActor';
import { Loader2 } from 'lucide-react';

const roles = [
  { name: 'Admin', key: 'admin' },
  { name: 'Asistenmu', key: 'asistenmu' },
  { name: 'Concierge', key: 'concierge' },
  { name: 'Strategic Partner', key: 'strategicpartner' },
  { name: 'Manajer', key: 'manajer' },
  { name: 'Finance', key: 'finance' },
  { name: 'Management', key: 'management' },
];

// Extended interface for superadmin methods
interface ExtendedActor {
  hasSuperadmin(): Promise<boolean>;
  claimSuperadmin(): Promise<{ ok: boolean; message: string }>;
}

export default function InternalLogin() {
  const { login, clear, identity, loginStatus } = useInternetIdentity();
  const { actor } = useActor();
  const [preparingWorkspace, setPreparingWorkspace] = useState<Record<string, boolean>>({});
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
      const result = await extendedActor.claimSuperadmin();
      if (result.ok) {
        // Refresh hasSuperadmin state
        const newStatus = await extendedActor.hasSuperadmin();
        setHasSuperadmin(newStatus);
      } else {
        setClaimError(result.message);
      }
    } catch (error: any) {
      setClaimError(error.message || 'Gagal claim superadmin');
    } finally {
      setClaimingSuper(false);
    }
  };

  const handleWorkspaceClick = (roleKey: string) => {
    setPreparingWorkspace((prev) => ({
      ...prev,
      [roleKey]: true,
    }));
  };

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

            {hasSuperadmin === false && (
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
              {roles.map((role) => (
                <Card
                  key={role.key}
                  className="rounded-2xl border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {role.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">Masuk ke workspace</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-teal-600 text-teal-600 hover:bg-teal-50"
                      onClick={() => handleWorkspaceClick(role.key)}
                      disabled={!isAuthenticated}
                    >
                      Workspace
                    </Button>
                    {preparingWorkspace[role.key] && (
                      <p className="text-xs text-gray-500 text-center">
                        Workspace sedang dipersiapkan.
                      </p>
                    )}
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
