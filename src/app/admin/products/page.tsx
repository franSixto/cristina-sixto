import { getProducts, deleteProduct } from '@/actions/product-actions';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-taupe-dark">
          Gestionar Productos
        </h1>
        <Link href="/admin/products/new">
          <Button>
            <Plus size={20} className="mr-2" /> Nuevo Producto
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-sand/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-sand/10 text-taupe-dark font-serif">
              <tr>
                <th className="p-4">Imagen</th>
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
                  <td className="p-4 w-24">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-sand/20">
                      {product.image && (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  </td>
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
                      <Link href={`/admin/products/${product.id}`}>
                        <button className="p-2 text-taupe hover:text-terracotta transition-colors">
                          <Edit size={18} />
                        </button>
                      </Link>
                      <form action={async () => {
                        'use server';
                        await deleteProduct(product.id);
                      }}>
                        <button
                          type="submit"
                          className="p-2 text-taupe hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-taupe">
                    No hay productos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
