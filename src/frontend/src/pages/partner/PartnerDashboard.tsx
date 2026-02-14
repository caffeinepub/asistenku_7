import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-border/40 bg-white">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex-1" />
          <h1 className="flex-1 text-center text-xl font-medium text-foreground">
            Ruang tumbuh dan tanggung jawabmu.
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
            <CardTitle className="text-2xl">Ringkasan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-border/50 bg-muted/30 p-6">
                <p className="text-sm text-muted-foreground">
                  Earnings bulan ini
                </p>
                <p className="mt-2 text-3xl font-bold text-foreground">Rp0</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-muted/30 p-6">
                <p className="text-sm text-muted-foreground">
                  Total task selesai
                </p>
                <p className="mt-2 text-3xl font-bold text-foreground">0</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-muted/30 p-6">
                <p className="text-sm text-muted-foreground">Level partner</p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  junior
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-muted/20 p-6">
              <p className="text-base font-medium text-foreground">
                Rate per jam kamu: Rp35.000
              </p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-muted/20 p-6">
              <p className="text-sm text-foreground/80">
                Terima kasih telah menjadi bagian dari perubahan.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid w-full grid-cols-2 gap-2 md:grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="task-masuk">Task Masuk</TabsTrigger>
            <TabsTrigger value="task-berjalan">Task Berjalan</TabsTrigger>
            <TabsTrigger value="riwayat">Riwayat</TabsTrigger>
            <TabsTrigger value="wallet">Wallet & Withdraw</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Informasi Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Nama</Label>
                  <div className="rounded-xl border border-border/50 bg-muted/20 p-4 text-foreground">
                    -
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <div className="rounded-xl border border-border/50 bg-muted/20 p-4 text-foreground">
                    -
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    WhatsApp
                  </Label>
                  <div className="rounded-xl border border-border/50 bg-muted/20 p-4 text-foreground">
                    -
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Domisili
                  </Label>
                  <div className="rounded-xl border border-border/50 bg-muted/20 p-4 text-foreground">
                    -
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Keahlian
                  </Label>
                  <div className="rounded-xl border border-border/50 bg-muted/20 p-4 text-foreground">
                    -
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Task Masuk Tab */}
          <TabsContent value="task-masuk">
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Belum ada task masuk.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Task Berjalan Tab */}
          <TabsContent value="task-berjalan">
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Belum ada task berjalan.</p>
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

          {/* Wallet & Withdraw Tab */}
          <TabsContent value="wallet">
            <div className="space-y-6">
              {/* Balance Card */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Saldo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-foreground">Rp0</p>
                </CardContent>
              </Card>

              {/* Withdraw Rules */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Aturan Withdraw</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground">
                    Minimum withdraw adalah 10 jam.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pengajuan diproses maksimal 1x24 jam pada jam kerja, dan
                    maksimal 2 hari kerja saat antrian padat.
                  </p>
                </CardContent>
              </Card>

              {/* Withdraw Form */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Ajukan Withdraw</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (rupiah)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Masukkan jumlah"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="rounded-xl"
                    />
                    <p className="text-sm text-destructive">
                      Minimum withdraw adalah 10 jam.
                    </p>
                  </div>
                  <Button disabled className="w-full rounded-xl">
                    Ajukan Withdraw
                  </Button>
                </CardContent>
              </Card>

              {/* Status Labels */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Status Withdraw</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/20 p-4">
                    <span className="text-sm font-medium text-foreground">
                      menunggu
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/20 p-4">
                    <span className="text-sm font-medium text-foreground">
                      diproses
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/20 p-4">
                    <span className="text-sm font-medium text-foreground">
                      selesai
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
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
