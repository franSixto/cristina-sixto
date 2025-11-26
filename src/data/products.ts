import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'macrame-bolso-01',
    name: 'Bolso bandolera de macramé artesanal',
    price: 18000,
    category: 'Accesorios',
    image: '/images/producto-3.webp',
    description: 'Bolso tejido a mano en macramé con punto nudo cuadrado. Incluye correa larga, amplio espacio interior y diseño resistente ideal para uso diario. Hecho con hilo 100% algodón.',
    dimensions: '28 x 20 cm',
    colors: ['Crudo'],
    status: 'disponible',
  },
  {
    id: 'macrame-espejo-03',
    name: 'Espejo con marco de macramé',
    price: 32000,
    category: 'Decoración',
    image: '/images/macrame-espejo.webp',
    description: 'Espejo redondo con marco artesanal tejido en macramé, diseño boho-chic con flecos y patrones geométricos. Ideal para dormitorios, livings o recibidores.',
    dimensions: '50 cm de diámetro total',
    colors: ['Crudo'],
    status: 'disponible',
  },
  {
    id: 'macrame-flor-04',
    name: 'Flor decorativa de macramé con flecos',
    price: 3500,
    category: 'Decoración',
    image: '/images/macrame-flor.webp',
    description: 'Flor artesanal de macramé con pétalos tejidos y flecos largos, ideal para decoración de jarrones, paredes o arreglos naturales. Diseño delicado y único.',
    dimensions: '30 cm de largo total',
    colors: ['Celeste', 'Crudo (centro)'],
    status: 'disponible',
  }
];
