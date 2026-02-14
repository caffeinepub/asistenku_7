import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AsistenmuDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedPartner, setSelectedPartner] = useState("");
  const [jamEfektif, setJamEfektif] = useState("");
  const [unitTerpakai, setUnitTerpakai] = useState("");
  const [scope, setScope] = useState("");
  const [deadlineInternal, setDeadlineInternal] = useState("");
  const [linkInternal, setLinkInternal] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-border/40 bg-white">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex-1" />
          <h1 className="flex-1 text-center text-xl font-medium text-foreground">
            Terima kasih telah mendampingi dengan profesional.
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
            <CardTitle className="text-2xl">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
              <div className="rounded-2xl border border-border/50 bg-muted/30 p-6">
                <p className="text-3xl font-bold text-foreground">0</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Permintaan Baru
                </p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-muted/30 p-6">
                <p className="text-3xl font-bold text-foreground">0</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Ditolak Partner
                </p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-muted/30 p-6">
                <p className="text-3xl font-bold text-foreground">0</p>
                <p className="mt-2 text-xs text-muted-foreground">QA</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-muted/30 p-6">
                <p className="text-3xl font-bold text-foreground">0</p>
                <p className="mt-2 text-xs text-muted-foreground">Revisi</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-muted/30 p-6">
                <p className="text-3xl font-bold text-foreground">0</p>
                <p className="mt-2 text-xs text-muted-foreground">Selesai</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-muted/30 p-6">
                <p className="text-3xl font-bold text-foreground">0</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Tiket Masuk
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid w-full grid-cols-3 gap-2 md:grid-cols-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="delegasi">Task & Delegasi</TabsTrigger>
            <TabsTrigger value="alltask">All Task</TabsTrigger>
            <TabsTrigger value="tiket">Tiket</TabsTrigger>
            <TabsTrigger value="detail">Detail</TabsTrigger>
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary">
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  Summary detail akan ditampilkan di sini.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Task & Delegasi Tab */}
          <TabsContent value="delegasi">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Task & Delegasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="partner">Pilih Partner</Label>
                  <Select value={selectedPartner} onValueChange={setSelectedPartner}>
                    <SelectTrigger id="partner" className="rounded-xl">
                      <SelectValue placeholder="Pilih partner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="partner1">Partner 1</SelectItem>
                      <SelectItem value="partner2">Partner 2</SelectItem>
                      <SelectItem value="partner3">Partner 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jam">Jam Efektif</Label>
                  <Input
                    id="jam"
                    type="number"
                    placeholder="Masukkan jam efektif"
                    value={jamEfektif}
                    onChange={(e) => setJamEfektif(e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit Terpakai</Label>
                  <Input
                    id="unit"
                    type="number"
                    placeholder="Masukkan unit terpakai"
                    value={unitTerpakai}
                    onChange={(e) => setUnitTerpakai(e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scope">Scope</Label>
                  <Textarea
                    id="scope"
                    placeholder="Deskripsikan scope pekerjaan"
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    className="min-h-[120px] rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline Internal</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={deadlineInternal}
                    onChange={(e) => setDeadlineInternal(e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Link Internal</Label>
                  <Input
                    id="link"
                    type="url"
                    placeholder="https://..."
                    value={linkInternal}
                    onChange={(e) => setLinkInternal(e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button disabled className="rounded-xl">
                    Delegasikan
                  </Button>
                  <Button disabled variant="destructive" className="rounded-xl">
                    Refund
                  </Button>
                  <Button disabled variant="outline" className="rounded-xl">
                    Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Task Tab */}
          <TabsContent value="alltask">
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Belum ada task.</p>
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

          {/* Detail Tab */}
          <TabsContent value="detail">
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  Detail akan ditampilkan di sini.
                </p>
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
