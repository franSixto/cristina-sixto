'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { Plus, Eye } from 'lucide-react';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { ProductModal } from './product-modal';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    addToCart(product);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      customClass: {
        popup: 'colored-toast'
      }
    });
    
    Toast.fire({
      icon: 'success',
      title: 'Agregado al carrito',
      background: '#F7F2EB',
      color: '#4A3B2A',
      iconColor: '#C27C59'
    });
  };

  return (
    <>
      <div 
        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-sand/20 flex flex-col h-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Container */}
        <div className="relative aspect-4/5 bg-sand/20 overflow-hidden">
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay with "Quick View" icon on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
            <div className="bg-white/90 p-3 rounded-full text-taupe-dark shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <Eye size={24} />
            </div>
          </div>
          
          {/* Status Badge */}
          {product.status === 'pedido' && (
            <div className="absolute top-3 left-3 bg-cream/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-taupe-dark shadow-sm z-10">
              Por encargo
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="mb-2">
            <span className="text-xs uppercase tracking-wider text-taupe font-medium">
              {product.category}
            </span>
            <h3 className="text-xl font-serif font-bold text-taupe-dark mt-1 group-hover:text-terracotta transition-colors">
              {product.name}
            </h3>
          </div>

          <p className="text-sm text-taupe/80 line-clamp-2 mb-4 flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-sand/20">
            <span className="text-lg font-bold text-terracotta">
              ${product.price.toLocaleString()}
            </span>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Agregar al carrito"
            >
              <Plus size={20} />
            </Button>
          </div>
        </div>
      </div>

      <ProductModal 
        product={product} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
