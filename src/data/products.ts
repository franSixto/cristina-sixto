import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Tapiz Bohemio Grande',
    price: 45000,
    category: 'Deco Pared',
    image: '/images/producto-1.webp',
    gallery: [
      '/images/producto-2.webp',
      '/images/producto-3.webp'
    ],
    description: 'Tapiz de macramé con diseño geométrico y flecos largos. Ideal para cabecera de cama o sofá.',
    dimensions: '80cm x 100cm',
    colors: ['Crudo', 'Terracota'],
    status: 'disponible',
  },
  {
    id: '2',
    name: 'Porta Maceta Colgante',
    price: 15000,
    category: 'Porta Macetas',
    image: 'https://placehold.co/600x800/E8DCC6/4A3B2A?text=Porta+Maceta',
    gallery: [
      'https://placehold.co/600x800/E8DCC6/4A3B2A?text=Porta+Maceta+1',
      'https://placehold.co/600x800/E8DCC6/4A3B2A?text=Porta+Maceta+Detalle'
    ],
    description: 'Soporte colgante resistente para macetas medianas. Aporta un toque verde y natural.',
    dimensions: '100cm largo',
    colors: ['Crudo'],
    status: 'disponible',
  },
  {
    id: '3',
    name: 'Espejo Sol',
    price: 32000,
    category: 'Accesorios',
    image: 'https://placehold.co/600x800/E8DCC6/4A3B2A?text=Espejo+Sol',
    description: 'Espejo redondo con marco de macramé estilo mandala.',
    dimensions: '40cm diámetro',
    colors: ['Beige', 'Dorado'],
    status: 'pedido',
  },
  {
    id: '4',
    name: 'Camino de Mesa',
    price: 28000,
    category: 'Accesorios',
    image: 'https://placehold.co/600x800/E8DCC6/4A3B2A?text=Camino+Mesa',
    description: 'Camino de mesa tejido a mano, perfecto para mesas de comedor rústicas.',
    dimensions: '150cm x 30cm',
    colors: ['Arena'],
    status: 'pedido',
  },
  {
    id: '5',
    name: 'Tapiz Hojas',
    price: 38000,
    category: 'Deco Pared',
    image: 'https://placehold.co/600x800/E8DCC6/4A3B2A?text=Tapiz+Hojas',
    description: 'Diseño orgánico con formas de hojas caídas.',
    dimensions: '60cm x 80cm',
    colors: ['Verde Salvia', 'Crudo'],
    status: 'disponible',
  },
];
