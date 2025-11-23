'use client';

import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Swal from 'sweetalert2';

export function CartSidebar() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  const handleCheckout = () => {
    const phoneNumber = '5492331401137'; // Updated phone number
    
    Swal.fire({
      title: '¿Enviar pedido?',
      text: "Se abrirá WhatsApp con el detalle de tu pedido para enviárselo a Cristina.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#C27C59',
      cancelButtonColor: '#A68B6F',
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar',
      background: '#F7F2EB',
      color: '#4A3B2A'
    }).then((result) => {
      if (result.isConfirmed) {
        let message = `Hola Cristina, quiero realizar este pedido:\n\n`;
        
        cart.forEach((item) => {
          message += `- ${item.name} (x${item.quantity}): $${(item.price * item.quantity).toLocaleString()}\n`;
        });
        
        message += `\nTotal estimado: $${cartTotal.toLocaleString()}\n\n¿Está disponible?`;
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      }
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300',
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={toggleCart}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-cream shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col',
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="p-6 flex items-center justify-between border-b border-sand/30">
          <h2 className="text-2xl font-serif font-bold text-taupe-dark">Tu Pedido</h2>
          <button onClick={toggleCart} className="text-taupe-dark hover:text-terracotta">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-taupe">
              <p>Tu carrito está vacío.</p>
              <Button variant="ghost" onClick={toggleCart} className="mt-4">
                Volver al catálogo
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-sand/20 shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-taupe-dark">{item.name}</h3>
                  <p className="text-terracotta font-medium">${item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-sand rounded-full">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-terracotta"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-terracotta"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-taupe/60 hover:text-red-500 ml-auto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-sand/30 bg-cream">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-taupe-dark">Total Estimado</span>
              <span className="text-2xl font-serif font-bold text-terracotta">
                ${cartTotal.toLocaleString()}
              </span>
            </div>
            <Button onClick={handleCheckout} className="w-full" size="lg">
              Enviar pedido por WhatsApp
            </Button>
            <p className="text-xs text-center text-taupe mt-3">
              El pago y envío se coordinan directamente con Cristina.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
