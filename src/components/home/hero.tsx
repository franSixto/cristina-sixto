import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] bg-sand/10 flex items-center overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0 bg-sand/20">
        <Image
          src="/images/background.webp"
          alt="Fondo de taller de macramé"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-cream/90 via-cream/50 to-transparent z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-2xl">
          <span className="inline-block py-1 px-3 rounded-full bg-sage/20 text-taupe-dark text-sm font-medium mb-6 tracking-wide">
            Artesanía & Decoración
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-taupe-dark mb-6 leading-tight">
            Macramé hecho a mano por <span className="text-terracotta whitespace-nowrap">Cris Sixto</span>
          </h1>
          <p className="text-lg md:text-xl text-taupe mb-8 max-w-lg leading-relaxed">
            Piezas artesanales únicas creadas con fibras naturales para llenar de calidez y textura cada rincón de tu hogar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/#catalogo">
              <Button size="lg" className="w-full sm:w-auto">
                Ver Catálogo
              </Button>
            </Link>
            <Link href="/#sobre-mi">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Conocer más
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
