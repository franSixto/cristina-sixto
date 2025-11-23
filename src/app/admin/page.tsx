'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { products as initialProducts } from '@/data/products';
import { Product } from '@/types';
import { Trash2, Edit, Plus } from 'lucide-react';
import Swal from 'sweetalert2';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    if (email === 'cristina@example.com' && password === 'macrame123') {
      setIsAuthenticated(true);
      Swal.fire({
        icon: 'success',
        title: 'Bienvenida Cristina',
        text: 'Has ingresado al panel de administración',
        timer: 2000,
        showConfirmButton: false,
        background: '#F7F2EB',
        color: '#4A3B2A'
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

  const handleDelete = (id: string) => {
    Swal.fire({
      title: '¿Estás segura?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#C27C59',
      cancelButtonColor: '#A68B6F',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      background: '#F7F2EB',
      color: '#4A3B2A'
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts(products.filter((p) => p.id !== id));
        Swal.fire({
          title: '¡Borrado!',
          text: 'El producto ha sido eliminado.',
          icon: 'success',
          confirmButtonColor: '#C27C59',
          background: '#F7F2EB',
          color: '#4A3B2A'
        });
      }
    });
  };

  if (!isAuthenticated) {
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
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-taupe-dark">
          Gestionar Productos
        </h1>
        <Button>
          <Plus size={20} className="mr-2" /> Nuevo Producto
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-sand/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-sand/10 text-taupe-dark font-serif">
              <tr>
                <th className="p-4">Producto</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Precio</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/10">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-sand/5">
                  <td className="p-4">
                    <div className="font-medium text-taupe-dark">{product.name}</div>
                    <div className="text-xs text-taupe truncate max-w-[200px]">
                      {product.description}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-taupe">{product.category}</td>
                  <td className="p-4 font-medium text-terracotta">
                    ${product.price.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'disponible'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-taupe hover:text-terracotta transition-colors">
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-taupe hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <p className="text-center text-sm text-taupe mt-8 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
        Nota: Esta es una demostración de la interfaz. En la versión final, los cambios se guardarán en una base de datos.
      </p>
    </div>
  );
}
