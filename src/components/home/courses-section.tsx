'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';
import { Check } from 'lucide-react';
import { Section } from '@/components/ui/section';

export function CoursesSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    Swal.fire({
      icon: 'success',
      title: '¡Gracias por tu interés!',
      text: 'Te avisaremos en cuanto los cursos estén disponibles.',
      confirmButtonColor: '#C27C59',
      background: '#F7F2EB',
      color: '#4A3B2A'
    });
    setEmail('');
  };

  return (
    <Section id="cursos" className="bg-cream">
      <div className="text-center mb-16">
        <span className="inline-block py-1 px-3 rounded-full bg-terracotta/10 text-terracotta text-sm font-medium mb-4 tracking-wide">
          Próximamente
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-taupe-dark mb-6">
          Aprende, Crea y Vende
        </h2>
        <p className="text-taupe max-w-2xl mx-auto text-lg leading-relaxed">
          Estamos preparando una experiencia educativa completa para que no solo aprendas a crear hermosas piezas de macramé, sino que también tengas las herramientas para venderlas al mundo.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
        {/* Taller de Macramé */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-sand/20 flex flex-col">
          <div className="h-16 w-16 bg-terracotta/10 rounded-full flex items-center justify-center mb-6 text-3xl">
            🧶
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-taupe-dark mb-4">
            Taller de Macramé Profesional
          </h3>
          <p className="text-taupe/80 mb-8 leading-relaxed">
            Un curso diseñado para llevarte desde los nudos básicos hasta la creación de piezas complejas y vendibles. Aprenderás sobre materiales, diseño, patrones y acabados profesionales.
          </p>
          <ul className="space-y-3 mb-8 flex-1">
            {['Nudos básicos y avanzados', 'Lectura de patrones', 'Diseño de tapices y soportes', 'Cálculo de materiales y costos'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-taupe">
                <div className="bg-sage/20 p-1 rounded-full text-sage-dark">
                  <Check size={14} className="text-taupe-dark" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Oferta Web */}
        <div className="bg-linear-to-br from-cream to-sand/20 p-8 md:p-10 rounded-3xl shadow-md border border-terracotta/20 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 bg-terracotta text-white text-xs font-bold px-4 py-2 rounded-bl-xl">
            BENEFICIO EXCLUSIVO
          </div>
          
          <div className="h-16 w-16 bg-sage/20 rounded-full flex items-center justify-center mb-6 text-3xl">
            💻
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-taupe-dark mb-4">
            Tu Tienda Online Incluida
          </h3>
          <p className="text-taupe/80 mb-6 leading-relaxed">
            Sabemos que la tecnología puede ser una barrera. Por eso, si contratas nuestro curso de macramé, te ofrecemos la opción de diseñarte tu propia web profesional.
          </p>
          
          <div className="bg-white/60 p-6 rounded-xl border border-sand/30 mb-8">
            <h4 className="font-bold text-taupe-dark mb-2">¿Qué incluye este beneficio?</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-taupe text-sm">
                <Check size={16} className="text-terracotta mt-0.5 shrink-0" />
                <span>Diseño de tienda online profesional y estética.</span>
              </li>
              <li className="flex items-start gap-3 text-taupe text-sm">
                <Check size={16} className="text-terracotta mt-0.5 shrink-0" />
                <span>Panel de administración para gestionar tus productos.</span>
              </li>
              <li className="flex items-start gap-3 text-taupe text-sm">
                <Check size={16} className="text-terracotta mt-0.5 shrink-0" />
                <span className="font-bold text-terracotta">1 AÑO DE MANTENIMIENTO GRATIS.</span>
              </li>
              <li className="flex items-start gap-3 text-taupe text-sm">
                <Check size={16} className="text-terracotta mt-0.5 shrink-0" />
                <span>Pasado el año, solo $30 USD anuales.</span>
              </li>
            </ul>
          </div>
          
          <p className="text-xs text-taupe/60 text-center mt-auto">
            * Beneficio opcional exclusivo para alumnos del taller.
          </p>
        </div>
      </div>

      {/* Formulario */}
      <div className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-sand/20 text-center">
        <h3 className="text-2xl font-serif font-bold text-taupe-dark mb-3">
          Únete a la lista de espera
        </h3>
        <p className="text-taupe mb-8">
          Déjanos tu email y sé la primera persona en enterarte cuando lancemos el curso y esta promoción especial.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-6 py-4 rounded-full border border-sand focus:outline-none focus:border-terracotta bg-cream/30 text-taupe-dark placeholder:text-taupe/50 text-center md:text-left"
          />
          <Button type="submit" size="lg" className="w-full py-6 text-lg">
            ¡Quiero que me avisen!
          </Button>
        </form>
      </div>
    </Section>
  );
}
