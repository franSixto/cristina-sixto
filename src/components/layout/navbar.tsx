'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/cart-context';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { toggleCart, cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/catalogo?category=Insumos', label: 'Insumos' },
    { href: '/cursos', label: 'Cursos' },
    { href: '/#sobre-mi', label: 'Sobre Mí' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-cream/80 backdrop-blur-md border-b border-sand/30">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif font-bold text-taupe-dark">
          Cristina Sixto
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-taupe-dark hover:text-terracotta transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCart}
            className="relative p-2 text-taupe-dark hover:text-terracotta transition-colors"
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-terracotta text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-taupe-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden absolute top-20 left-0 w-full bg-cream border-b border-sand/30 transition-all duration-300 ease-in-out overflow-hidden',
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-taupe-dark hover:text-terracotta font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
