import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from '@tanstack/react-router';

const roles = [
  'admin',
  'asistenmu',
  'concierge',
  'strategicpartner',
  'manajer',
  'finance',
  'management',
];

export default function InternalRegister() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    whatsapp: '',
    role: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
              Pendaftaran terkirim. Menunggu persetujuan.
            </p>
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-6"
              onClick={() => navigate({ to: '/internal/login' })}
            >
              Kembali ke Masuk
            </Button>
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
            <h1 className="text-2xl font-semibold text-gray-900">Daftar Internal</h1>
            <p className="text-sm text-gray-600">Untuk Tim Asistenku</p>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama</Label>
              <Input
                id="nama"
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="rounded-xl"
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
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
                required
              >
                <SelectTrigger id="role" className="rounded-xl">
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role} className="capitalize">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-6 mt-6"
            >
              Kirim
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
