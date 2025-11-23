export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Deco Pared' | 'Porta Macetas' | 'Accesorios';
  image: string;
  gallery?: string[];
  description: string;
  dimensions?: string;
  colors?: string[];
  status: 'disponible' | 'pedido';
}

export interface CartItem extends Product {
  quantity: number;
}
