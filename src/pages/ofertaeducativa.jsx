import React from 'react';
// Importamos el Breadcrumb que aislamos anteriormente
import { Breadcrumb } from '../components/breadcrumb';

export function OfertaEducativa ({ navigate }) {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 relative overflow-hidden">

      {/* Decoraciones de fondo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Anillos concéntricos – esquina superior derecha */}
        {[480, 340, 200, 90].map(s => (
          <div key={s} style={{
            position: 'absolute', top: 0, right: 0,
            width: s, height: s, borderRadius: '50%',
            border: '1px solid rgba(203,213,225,0.5)',
            transform: 'translate(50%, -50%)',
          }} />
        ))}
        {/* Relleno rojo suave en el centro */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 90, height: 90, borderRadius: '50%',
          transform: 'translate(50%, -50%)',
          background: 'radial-gradient(circle, rgba(179,29,21,0.12) 0%, transparent 70%)',
        }} />
        {/* Líneas paralelas diagonales – mitad derecha */}
        <div className="absolute top-0 right-0 bottom-0 w-1/2 opacity-[0.035]" style={{
          backgroundImage: 'repeating-linear-gradient(50deg, #94a3b8 0, #94a3b8 1px, transparent 0, transparent 22px)',
        }} />
        {/* Ángulo decorativo – bottom-left */}
        <div className="absolute bottom-12 left-0 w-20 h-20">
          <div className="absolute bottom-0 left-0 w-full h-px bg-slate-200" />
          <div className="absolute bottom-0 left-0 w-px h-full bg-slate-200" />
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: 'ADEN', screen: 'home' },
          { label: 'Oferta educativa' },
        ]}
        navigate={navigate}
      />
      
      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 relative">
        <span className="w-4 h-px bg-slate-300" />
        Pregunta al prospecto
      </span>
      <h2 className="text-6xl font-light text-slate-900 mt-2 leading-[1.1] relative">
        ¿Qué querés<br />
        <span className="italic text-[#B31D15] font-normal">potenciar</span>?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 relative">
        {[
          { icon: '🧠', label: 'Inteligencia Artificial', sub: 'Negocios Digitales e Innovación', count: 6, hex: '#1868AF' },
          { icon: '📊', label: 'Negocios & Estrategia', sub: 'Estrategia · Innovación', count: 14, hex: '#1868AF' },
          { icon: '💰', label: 'Finanzas y Operaciones', sub: 'Finanzas · Logística · Ops', count: 11, hex: '#CCA946' },
          { icon: '📣', label: 'Marketing & Gestión Comercial', sub: 'Marketing · Ventas', count: 8, hex: '#CCA946' },
          { icon: '🤝', label: 'Talento Humano', sub: 'Liderazgo · RRHH', count: 9, hex: '#DD8345' },
          { icon: '⚖️', label: 'Derecho y Compliance', sub: 'Derecho · Arte · Gestión', count: 5, hex: '#DD8345' },
          { icon: '🏥', label: 'Gestión de Salud', sub: 'Salud · Proyectos', count: 7, hex: '#238066' },
          { icon: '📋', label: 'Gestión de Proyectos', sub: 'PMO · Metodologías ágiles', count: 4, hex: '#238066' },
        ].map((eje) => (
          <div
            key={eje.label}
            onClick={() => navigate('grilla')}
            className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 cursor-pointer shadow-sm transition-all duration-200 group relative overflow-hidden hover:-translate-y-1 hover:shadow-xl"
            style={{ '--eje-color': eje.hex }}
          >
            {/* Barra de color izquierda */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300 group-hover:w-1.5"
              style={{ background: eje.hex }} />

            {/* Fondo decorativo esquina */}
            <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full opacity-10 transition-opacity duration-300 group-hover:opacity-20"
              style={{ background: eje.hex }} />

            <div className="pl-5 pr-5 pt-5 pb-5">
              {/* Icono */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-xl group-hover:scale-110 transition-transform"
                style={{ background: `${eje.hex}18`, border: `1px solid ${eje.hex}30` }}
              >
                {eje.icon}
              </div>

              {/* Textos */}
              <h3 className="font-bold text-slate-800 text-sm leading-snug transition-colors duration-200 group-hover:text-slate-900">
                {eje.label}
              </h3>
              <p className="text-[10px] text-slate-400 mt-1 font-medium leading-snug">{eje.sub}</p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold" style={{ color: eje.hex }}>
                  {eje.count} programas
                </span>
                <span className="text-[11px] font-bold text-slate-300 group-hover:text-slate-500 transition-colors">
                  Ver →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}