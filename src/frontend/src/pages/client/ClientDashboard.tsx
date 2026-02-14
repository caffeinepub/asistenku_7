import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function ClientDashboard() {
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  const phases = [
    "permintaan_baru",
    "on_progress",
    "qa_asistenku",
    "review_client",
    "revisi",
    "selesai",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-border/40 bg-white">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex-1" />
          <h1 className="flex-1 text-center text-xl font-medium text-foreground">
            Ruang kendali kamu.
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
        {/* Summary Card */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary Numbers */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border/50 bg-muted/30 p-6">
                <div className="text-4xl font-bold text-foreground">0</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Task berjalan
                </div>
              </div>
              <div className="rounded-2xl border border-border/50 bg-muted/30 p-6">
                <div className="text-4xl font-bold text-foreground">0</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Task selesai
                </div>
              </div>
            </div>

            {/* Status Text */}
            <div className="space-y-3 rounded-2xl border border-border/50 bg-muted/20 p-6">
              <p className="text-sm leading-relaxed text-foreground/80">
                Tim sedang membantu kamu menyelesaikan proses ini.
              </p>
              <p className="text-sm leading-relaxed text-foreground/80">
                Beberapa hal telah selesai sesuai dengan arahan kamu.
              </p>
            </div>

            {/* Personal Notes */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-foreground">
                Catatan pribadiku
              </h3>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tulis catatan pribadi di sini..."
                className="min-h-[120px] resize-none rounded-2xl border-border/60 bg-amber-50/30 text-foreground shadow-sm transition-colors focus:bg-amber-50/50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid w-full grid-cols-3 gap-2 lg:grid-cols-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="layanan">Layanan</TabsTrigger>
            <TabsTrigger value="task">Task</TabsTrigger>
            <TabsTrigger value="riwayat">Riwayat</TabsTrigger>
            <TabsTrigger value="tiket">Tiket</TabsTrigger>
            <TabsTrigger value="hub">Hub Concierge Anda</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Informasi Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Nama
                  </div>
                  <div className="rounded-xl border border-border/50 bg-muted/20 p-4 text-foreground">
                    -
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Email
                  </div>
                  <div className="rounded-xl border border-border/50 bg-muted/20 p-4 text-foreground">
                    -
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    WhatsApp
                  </div>
                  <div className="rounded-xl border border-border/50 bg-muted/20 p-4 text-foreground">
                    -
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Layanan Tab */}
          <TabsContent value="layanan">
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  Belum ada layanan aktif.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Task Tab */}
          <TabsContent value="task">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Task Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {phases.map((phase) => (
                  <div key={phase} className="space-y-3">
                    <h3 className="text-base font-medium text-foreground">
                      {phase}
                    </h3>
                    <div className="rounded-xl border border-border/50 bg-muted/20 p-4 text-sm text-muted-foreground">
                      Belum ada task.
                    </div>
                  </div>
                ))}

                {/* Warning Box */}
                <Alert className="border-amber-200 bg-amber-50/50">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-sm text-amber-900">
                    Dengan klik selesai, kamu menyetujui hasil dan pembayaran
                    kepada Tim Asistenku.
                  </AlertDescription>
                </Alert>

                {/* Selesai Button */}
                <div className="flex justify-end">
                  <Button disabled className="rounded-xl">
                    Selesai
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Riwayat Tab */}
          <TabsContent value="riwayat">
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Belum ada riwayat.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tiket Tab */}
          <TabsContent value="tiket">
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Belum ada tiket.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hub Concierge Anda Tab */}
          <TabsContent value="hub">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Hub Concierge Anda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-2xl border border-border/50 bg-muted/20 p-6">
                  <h3 className="mb-2 text-lg font-medium text-foreground">
                    Kontak Concierge
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Hubungi concierge Anda untuk bantuan lebih lanjut.
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full rounded-xl md:w-auto"
                  size="lg"
                >
                  <a
                    href="https://wa.me/628817743613"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ngobrol dulu di WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            Asistenku © 2026 PT Asistenku Digital Indonesia
          </p>
        </div>
      </footer>
    </div>
  );
}
