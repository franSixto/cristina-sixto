'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - En producción esto debería usar Supabase Auth
    if (email === 'cristina@example.com' && password === 'macrame123') {
      Swal.fire({
        icon: 'success',
        title: 'Bienvenida Cris',
        text: 'Has ingresado al panel de administración',
        timer: 1500,
        showConfirmButton: false,
        background: '#F7F2EB',
        color: '#4A3B2A'
      }).then(() => {
        router.push('/admin/products');
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de acceso',
        text: 'Credenciales incorrectas (prueba: cristina@example.com / macrame123)',
        confirmButtonColor: '#C27C59',
        background: '#F7F2EB',
        color: '#4A3B2A'
      });
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-sand/20">
        <h1 className="text-2xl font-serif font-bold text-taupe-dark mb-6 text-center">
          Panel de Administración
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-taupe-dark mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-sand focus:outline-none focus:border-terracotta"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-taupe-dark mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-sand focus:outline-none focus:border-terracotta"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full">
            Ingresar
          </Button>
        </form>
        <p className="text-xs text-center text-taupe mt-4">
          Credenciales demo: cristina@example.com / macrame123
        </p>
      </div>
    </div>
  );
}
