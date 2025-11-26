'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/admin/image-upload';
import { createProduct } from '@/actions/product-actions';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface ProductFormValues {
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  dimensions: string;
  colors: string;
  status: string;
}

export default function NewProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProductFormValues>({
    defaultValues: {
      name: '',
      price: '',
      category: 'Deco Pared',
      description: '',
      image: '',
      dimensions: '',
      colors: '',
      status: 'disponible'
    }
  });

  const imageUrl = watch('image');

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsLoading(true);
      await createProduct(data);
      // La redirección ocurre en el server action, pero por si acaso
      // router.push('/admin/products');
    } catch (error) {
      console.error(error);
      alert('Error al crear el producto');
    } finally {
      setIsLoading(false);
    }
  };

  const setCustomValue = (id: keyof ProductFormValues, value: string) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <Link href="/admin/products" className="text-taupe hover:text-terracotta flex items-center gap-2 mb-4">
          <ArrowLeft size={20} /> Volver al listado
        </Link>
        <h1 className="text-3xl font-serif font-bold text-taupe-dark">
          Nuevo Producto
        </h1>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-sand/20">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-taupe-dark mb-2">
              Imagen Principal
            </label>
            <ImageUpload
              value={imageUrl}
              onChange={(url) => setCustomValue('image', url)}
              disabled={isLoading}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">La imagen es requerida</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-taupe-dark mb-1">Nombre</label>
              <input
                {...register('name', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-sand focus:outline-none focus:border-terracotta"
                placeholder="Ej: Tapiz Macramé"
                disabled={isLoading}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>}
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-medium text-taupe-dark mb-1">Precio</label>
              <input
                type="number"
                {...register('price', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-sand focus:outline-none focus:border-terracotta"
                placeholder="0.00"
                disabled={isLoading}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>}
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-taupe-dark mb-1">Categoría</label>
              <select
                {...register('category', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-sand focus:outline-none focus:border-terracotta bg-white"
                disabled={isLoading}
              >
                <option value="Deco Pared">Deco Pared</option>
                <option value="Porta Macetas">Porta Macetas</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Insumos">Insumos</option>
                <option value="Decoración">Decoración</option>
              </select>
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-taupe-dark mb-1">Estado</label>
              <select
                {...register('status', { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-sand focus:outline-none focus:border-terracotta bg-white"
                disabled={isLoading}
              >
                <option value="disponible">Disponible</option>
                <option value="pedido">Por Encargo</option>
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-taupe-dark mb-1">Descripción</label>
            <textarea
              {...register('description', { required: true })}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-sand focus:outline-none focus:border-terracotta"
              placeholder="Descripción detallada del producto..."
              disabled={isLoading}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dimensiones */}
            <div>
              <label className="block text-sm font-medium text-taupe-dark mb-1">Dimensiones</label>
              <input
                {...register('dimensions')}
                className="w-full px-4 py-2 rounded-lg border border-sand focus:outline-none focus:border-terracotta"
                placeholder="Ej: 50cm x 30cm"
                disabled={isLoading}
              />
            </div>

            {/* Colores */}
            <div>
              <label className="block text-sm font-medium text-taupe-dark mb-1">Colores (separados por coma)</label>
              <input
                {...register('colors')}
                className="w-full px-4 py-2 rounded-lg border border-sand focus:outline-none focus:border-terracotta"
                placeholder="Ej: Crudo, Beige, Terracota"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Guardando...' : 'Crear Producto'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
