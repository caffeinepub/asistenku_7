import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useActor } from "@/hooks/useActor";
import { Loader2, RefreshCw } from "lucide-react";
import type { Principal } from "@dfinity/principal";
import type { UserProfile } from "@/backend";

interface ExtendedActor {
  listAllUsers(): Promise<Array<{ userId: Principal; profile: UserProfile }>>;
  setUserActiveStatus(target: Principal, active: boolean): Promise<boolean>;
  getSuperadminPrincipal(): Promise<Principal | null>;
}

interface UserRow {
  principal: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export default function SuperadminDashboard() {
  const [activeTab, setActiveTab] = useState("user-summary");
  const { actor, isFetching: actorFetching } = useActor();
  
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [superadminPrincipal, setSuperadminPrincipal] = useState<string | null>(null);
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);

  // Fetch superadmin principal
  useEffect(() => {
    if (actor) {
      const extendedActor = actor as unknown as ExtendedActor;
      extendedActor.getSuperadminPrincipal()
        .then((principal) => {
          if (principal) {
            setSuperadminPrincipal(principal.toString());
          }
        })
        .catch(() => setSuperadminPrincipal(null));
    }
  }, [actor]);

  // Fetch users when tab is "status-user" and actor becomes ready
  useEffect(() => {
    if (activeTab === "status-user" && actor && !actorFetching) {
      fetchUsers();
    }
  }, [activeTab, actor, actorFetching]);

  const fetchUsers = async () => {
    if (!actor) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const extendedActor = actor as unknown as ExtendedActor;
      const result = await extendedActor.listAllUsers();
      
      const userList: UserRow[] = result.map(({ userId, profile }) => ({
        principal: userId.toString(),
        name: profile.name,
        email: profile.email,
        role: profile.role,
        isActive: profile.isActive,
      }));
      
      setUsers(userList);
    } catch (err: any) {
      setError(err.message || "Gagal memuat daftar user");
    } finally {
      setLoading(false);
    }
  };

  const formatPrincipal = (principal: string) => {
    if (principal.length <= 20) return principal;
    return principal.slice(0, 8) + "..." + principal.slice(-6);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const pendingUsers = users.filter(
    (u) =>
      (u.role === "client" || u.role === "partner") &&
      u.isActive === false
  );

  const handleToggleStatus = async (user: UserRow) => {
    if (!actor) return;

    setUpdatingUser(user.principal);
    
    try {
      const { Principal } = await import("@dfinity/principal");
      const targetPrincipal = Principal.fromText(user.principal);

      const extendedActor = actor as unknown as ExtendedActor;
      await extendedActor.setUserActiveStatus(targetPrincipal, true);

      await fetchUsers();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingUser(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-border/40 bg-white">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex-1" />
          <h1 className="flex-1 text-center text-xl font-medium text-foreground">
            Asistenku dalam kendali penuh.
          </h1>
          <div className="flex flex-1 justify-end">
            <Button variant="ghost" className="text-foreground">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid w-full grid-cols-2 gap-2 md:grid-cols-4">
            <TabsTrigger value="user-summary">User Summary</TabsTrigger>
            <TabsTrigger value="status-user">Status User</TabsTrigger>
            <TabsTrigger value="audit">Audit</TabsTrigger>
            <TabsTrigger value="log">Log</TabsTrigger>
          </TabsList>

          <TabsContent value="user-summary">
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Sedang dipersiapkan.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status-user">
            <Card className="shadow-md">
              <CardContent className="py-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Daftar User</h2>
                  <Button
                    onClick={fetchUsers}
                    disabled={loading || !actor}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    Refresh
                  </Button>
                </div>

                {error && (
                  <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {loading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                  </div>
                ) : pendingUsers.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground">
                    Tidak ada user pending ditemukan.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>No</TableHead>
                          <TableHead>Principal</TableHead>
                          <TableHead>Nama</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {pendingUsers.map((user, index) => (
                          <TableRow key={user.principal}>
                            <TableCell>{index + 1}</TableCell>

                            <TableCell className="font-mono text-xs space-y-1">
                              <div>{formatPrincipal(user.principal)}</div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCopy(user.principal)}
                                >
                                  Copy Principal
                                </Button>
                              </div>
                            </TableCell>

                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>

                            <TableCell>
                              <Badge variant="secondary">
                                {user.role}
                              </Badge>
                            </TableCell>

                            <TableCell>
                              <Badge variant="outline">
                                Pending
                              </Badge>
                            </TableCell>

                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                onClick={() => handleToggleStatus(user)}
                                disabled={updatingUser === user.principal}
                              >
                                {updatingUser === user.principal ? (
                                  <>
                                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                    Mengaktifkan...
                                  </>
                                ) : (
                                  "Aktifkan"
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit">
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Sedang dipersiapkan.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="log">
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Sedang dipersiapkan.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-white py-6">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>PT. Asistenku Digital Indonesia. Semua Hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
