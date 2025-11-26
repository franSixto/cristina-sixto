import { Hero } from '@/components/home/hero';
import Image from 'next/image';
import { CatalogSection } from '@/components/home/catalog-section';
import { CoursesSection } from '@/components/home/courses-section';
import { Section } from '@/components/ui/section';

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-20">
      <Hero />

      {/* About Section */}
      <Section id="sobre-mi">
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
      </Section>

      <CatalogSection />
      
      <CoursesSection />
    </div>
  );
}
