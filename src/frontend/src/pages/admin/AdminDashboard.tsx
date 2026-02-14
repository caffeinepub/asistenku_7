import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-border/40 bg-white">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex-1" />
          <h1 className="flex-1 text-center text-xl font-medium text-foreground">
            Menjaga sistem tetap stabil.
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
          <TabsList className="mb-6 grid w-full grid-cols-2 gap-2 md:grid-cols-5">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="layanan">Layanan</TabsTrigger>
            <TabsTrigger value="task">Task</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="log">Log</TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Sedang dipersiapkan.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layanan">
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Sedang dipersiapkan.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="task">
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Sedang dipersiapkan.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals">
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
