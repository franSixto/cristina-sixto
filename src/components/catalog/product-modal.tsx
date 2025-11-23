'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import Swal from 'sweetalert2';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  // Combine main image and gallery
  const images = [product.image, ...(product.gallery || [])];

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-cream w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full text-taupe-dark hover:text-terracotta transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image Slider Section */}
        <div className="w-full md:w-1/2 bg-sand/20 relative flex items-center justify-center min-h-[300px] md:min-h-[500px]">
          <div className="relative w-full h-full aspect-square md:aspect-auto">
            <Image
              src={images[currentImageIndex]}
              alt={`${product.name} - Vista ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 p-2 bg-white/80 rounded-full text-taupe-dark hover:bg-white hover:text-terracotta transition-all shadow-sm"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 p-2 bg-white/80 rounded-full text-taupe-dark hover:bg-white hover:text-terracotta transition-all shadow-sm"
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-terracotta w-4' : 'bg-white/60 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <div className="mb-6">
            <span className="text-sm uppercase tracking-wider text-taupe font-medium">
              {product.category}
            </span>
            <h2 className="text-3xl font-serif font-bold text-taupe-dark mt-2">
              {product.name}
            </h2>
            <div className="mt-4 text-2xl font-bold text-terracotta">
              ${product.price.toLocaleString()}
            </div>
          </div>

          <div className="space-y-6 flex-1">
            <div>
              <h3 className="font-bold text-taupe-dark mb-2">Descripción</h3>
              <p className="text-taupe leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.dimensions && (
              <div>
                <h3 className="font-bold text-taupe-dark mb-2">Dimensiones</h3>
                <p className="text-taupe">{product.dimensions}</p>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-bold text-taupe-dark mb-2">Colores Disponibles</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <span key={color} className="px-3 py-1 bg-sand/30 rounded-full text-sm text-taupe-dark">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-sand/30">
            <Button onClick={handleAddToCart} className="w-full py-6 text-lg" size="lg">
              <Plus className="mr-2" /> Agregar al Carrito
            </Button>
            {product.status === 'pedido' && (
              <p className="text-xs text-center text-taupe mt-3">
                * Este producto se realiza por encargo. El tiempo de entrega se coordina por WhatsApp.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
