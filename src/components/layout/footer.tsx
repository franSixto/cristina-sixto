import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-taupe-dark text-cream py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Cris Sixto</h3>
            <p className="text-cream/80 max-w-xs">
              Creando piezas únicas de macramé con amor y dedicación. Decoración consciente y artesanal.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">Enlaces</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-cream/80 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="/catalogo" className="text-cream/80 hover:text-white transition-colors">Catálogo</Link></li>
              <li><Link href="/#sobre-mi" className="text-cream/80 hover:text-white transition-colors">Sobre Mí</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">Contacto</h4>
            <div className="flex gap-4">
              <a href="#" className="text-cream/80 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="mailto:contacto@cristinasixto.com" className="text-cream/80 hover:text-white transition-colors" aria-label="Email">
                <Mail size={24} />
              </a>
            </div>
            <p className="mt-4 text-sm text-cream/60">
              &copy; {new Date().getFullYear()} Cris Sixto Macramé.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
