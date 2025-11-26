'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/catalog/product-card';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/section';

export function CatalogSection() {
  const [category, setCategory] = useState<string | null>(null);
  
  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  const categories = ['Todos', 'Deco Pared', 'Porta Macetas', 'Accesorios', 'Insumos', 'Decoración'];

  return (
    <Section id="catalogo">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-taupe-dark mb-4">
          Catálogo
        </h2>
        <p className="text-taupe max-w-xl mx-auto">
          Explora todas las piezas disponibles. Cada una es única y hecha a mano.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => {
          const isActive = cat === 'Todos' ? !category : category === cat;
          
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat === 'Todos' ? null : cat)}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
                isActive
                  ? 'bg-terracotta text-white shadow-md'
                  : 'bg-sand/20 text-taupe-dark hover:bg-sand/40'
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-taupe">
            <p>No se encontraron productos en esta categoría.</p>
          </div>
        )}
      </div>
    </Section>
  );
}
