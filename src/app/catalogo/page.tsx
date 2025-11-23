import { products } from '@/data/products';
import { ProductCard } from '@/components/catalog/product-card';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CatalogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const { category } = await searchParams;
  
  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  const categories = ['Todos', 'Deco Pared', 'Porta Macetas', 'Accesorios'];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-taupe-dark mb-4">
          Catálogo
        </h1>
        <p className="text-taupe max-w-xl mx-auto">
          Explora todas las piezas disponibles. Cada una es única y hecha a mano.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => {
          const isActive = cat === 'Todos' ? !category : category === cat;
          const href = cat === 'Todos' ? '/catalogo' : `/catalogo?category=${cat}`;
          
          return (
            <Link
              key={cat}
              href={href}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
                isActive
                  ? 'bg-terracotta text-white shadow-md'
                  : 'bg-sand/20 text-taupe-dark hover:bg-sand/40'
              )}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
    </div>
  );
}
