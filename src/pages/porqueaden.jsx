import React from 'react';
// Importamos el Breadcrumb común
import { Breadcrumb } from '../components/breadcrumb';

export function PorqueAden({ navigate }) {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-20 relative overflow-hidden">

      {/* Decoraciones de fondo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[600, 420, 260, 120].map(s => (
          <div key={s} style={{
            position: 'absolute', top: 0, right: 0,
            width: s, height: s, borderRadius: '50%',
            border: '1px solid rgba(203,213,225,0.45)',
            transform: 'translate(50%, -50%)',
          }} />
        ))}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 120, height: 120, borderRadius: '50%',
          transform: 'translate(50%, -50%)',
          background: 'radial-gradient(circle, rgba(179,29,21,0.12) 0%, transparent 70%)',
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-[0.025]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #64748b, #64748b 1px, transparent 1px, transparent 28px)',
        }} />
      </div>

      <Breadcrumb
        items={[
          { label: 'ADEN', screen: 'home' },
          { label: '¿Por qué ADEN?' },
        ]}
        navigate={navigate}
      />

      {/* Header */}
      <div className="max-w-2xl mb-14 relative">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B31D15]">
          <span className="w-4 h-px bg-[#B31D15]" />
          Atributos Diferenciales
        </span>
        <h1 className="text-6xl font-light text-slate-900 mt-3 leading-[1.1] tracking-tight">
          Lo que nos hace<br />
          <span className="italic text-[#B31D15] font-normal">únicos</span>
        </h1>
        <p className="mt-4 text-slate-500 text-base leading-relaxed">
          Más de 30 años construyendo un modelo educativo que transforma profesionales en líderes de impacto real.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            icon: '🌐',
            title: 'Hibridez',
            desc: 'Combinamos la presencialidad con formación online de vanguardia, lo mejor de ambos mundos. La red más grande de sedes en América Latina integrada a nuestro modelo online.',
            accent: '#B31D15',
            tag: 'Modalidad',
          },
          {
            icon: '🏆',
            title: 'Titulación Internacional',
            desc: 'Nuestros programas están avalados por titulaciones y certificaciones con recognition internacional, otorgadas por prestigiosas instituciones académicas de clase mundial.',
            accent: '#1868AF',
            tag: 'Certificación',
          },
          {
            icon: '🎯',
            title: 'Personalización',
            desc: 'Diseñamos experiencias de aprendizaje basadas en los intereses y motivaciones de cada profesional, con módulos electivos para armar rutas formativas a la medida.',
            accent: '#238066',
            tag: 'Aprendizaje',
          },
          {
            icon: '🧩',
            title: 'Modelo Académico',
            desc: 'Un modelo pedagógico propio con enfoque práctico que permite la transferencia de conocimientos al puesto de trabajo, con simuladores de negocios y herramientas de gamificación.',
            accent: '#CCA946',
            tag: 'Pedagogía',
          },
          {
            icon: '♾️',
            title: 'Acceso de por vida',
            desc: 'Ofrecemos acceso permanente a los contenidos del programa cursado, así como a eventos y experiencias para continuar fortaleciendo competencias en cada etapa de la carrera.',
            accent: '#DD8345',
            tag: 'Comunidad',
          },
          {
            icon: '🌎',
            title: 'Red Latinoamericana',
            desc: 'Más de 15 sedes en toda América Latina conectadas en un ecosistema único de networking, colaboración y oportunidades de negocio reales entre egresados y empresas.',
            accent: '#B31D15',
            tag: 'Red',
          },
        ].map((attr, i) => (
          <div
            key={attr.title}
            className="group relative bg-white rounded-3xl border border-slate-200 p-7 overflow-hidden cursor-default hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            {/* Borde top animado */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ background: attr.accent }}
            />
            {/* Orbe de fondo */}
            <div
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
              style={{ background: attr.accent }}
            />

            {/* Tag */}
            <span
              className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full mb-5"
              style={{ background: `${attr.accent}14`, color: attr.accent }}
            >
              {attr.tag}
            </span>

            {/* Icono grande */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm"
              style={{ background: `${attr.accent}12`, border: `1.5px solid ${attr.accent}25` }}
            >
              {attr.icon}
            </div>

            <h3 className="font-extrabold text-slate-900 text-lg leading-tight mb-3 group-hover:text-slate-800">
              {attr.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {attr.desc}
            </p>

            {/* Numeración sutil */}
            <span className="absolute bottom-5 right-6 text-5xl font-black text-slate-100 select-none group-hover:text-slate-50 transition-colors leading-none">
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>

      {/* CTA inferior */}
      <div className="mt-14 flex items-center gap-4">
        <button
          onClick={() => navigate('ejes')}
          className="bg-[#B31D15] hover:bg-[#8B1010] text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-red-900/15 transition-all text-sm flex items-center gap-2 group"
        >
          Explorar oferta educativa
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
        <button
          onClick={() => navigate('form')}
          className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-6 py-4 rounded-xl transition-all text-sm"
        >
          🚀 Generar oportunidad
        </button>
      </div>
    </div>
  );
}