import { Hero } from '@/components/home/hero';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const categories = [
    {
      title: 'Deco Pared',
      description: 'Tapices y murales que dan vida a tus espacios.',
      color: 'bg-terracotta/10',
      href: '/catalogo?category=Deco Pared',
    },
    {
      title: 'Porta Macetas',
      description: 'Soportes colgantes para tus plantas favoritas.',
      color: 'bg-sage/20',
      href: '/catalogo?category=Porta Macetas',
    },
    {
      title: 'Accesorios',
      description: 'Detalles únicos como espejos, caminos y más.',
      color: 'bg-sand/30',
      href: '/catalogo?category=Accesorios',
    },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />

      {/* About Section */}
      <section id="sobre-mi" className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
             <Image
               src="/images/cristina.webp"
               alt="Cristina trabajando en su taller"
               width={0}
               height={0}
               sizes="(max-width: 768px) 100vw, 50vw"
               className="w-full h-auto rounded-2xl shadow-md"
             />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-taupe-dark mb-6">
              Sobre el emprendimiento
            </h2>
            <p className="text-lg text-taupe mb-6 leading-relaxed">
              Hola, soy Cristina. Mi pasión por el macramé nació de la búsqueda de crear objetos que transmitan calma y calidez. Cada nudo está hecho a mano con dedicación, utilizando fibras naturales de algodón.
            </p>
            <p className="text-lg text-taupe mb-8 leading-relaxed">
              Creo en el valor de lo artesanal, en las piezas que cuentan una historia y en decorar nuestros hogares con objetos que tienen alma.
            </p>
            <div className="h-1 w-20 bg-terracotta rounded-full" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-taupe-dark mb-4">
            Explora mis creaciones
          </h2>
          <p className="text-taupe max-w-xl mx-auto">
            Descubre las diferentes colecciones diseñadas para cada rincón de tu hogar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.title} 
              href={cat.href}
              className="group block"
            >
              <div className={`h-80 rounded-2xl ${cat.color} p-8 flex flex-col justify-end transition-transform duration-300 group-hover:-translate-y-2`}>
                <h3 className="text-2xl font-serif font-bold text-taupe-dark mb-2">
                  {cat.title}
                </h3>
                <p className="text-taupe-dark/80 mb-4">
                  {cat.description}
                </p>
                <div className="flex items-center text-terracotta font-medium group-hover:gap-2 transition-all">
                  Ver productos <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
