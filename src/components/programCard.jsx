import React, { useRef } from 'react';
import gsap from 'gsap';

export const ProgramCard = ({ programa, onSelect, onAddToCompare, isInCompare }) => {
  const cardRef = useRef(null);
  const buttonRef = useRef(null);

  // Animación interactiva con GSAP al pasar el mouse (Hover)
  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.01,
      borderColor: '#B31D15', // El rojo característico de ADEN
      boxShadow: '0 20px 30px -10px rgba(209, 23, 13, 0.15)',
      duration: 0.4,
      ease: 'power2.out'
    });
    gsap.to(buttonRef.current, {
      backgroundColor: '#B31D15',
      color: '#FFFFFF',
      duration: 0.3
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      borderColor: '#E2E8F0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      duration: 0.4,
      ease: 'power2.out'
    });
    gsap.to(buttonRef.current, {
      backgroundColor: 'transparent',
      color: '#1E1E1E',
      duration: 0.3
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between h-[420px] transition-all cursor-pointer relative overflow-hidden"
      onClick={() => onSelect(programa)}
    >
      {/* Contenido Superior */}
      <div>
        <div className="flex justify-between items-start gap-4 mb-4">
          <span className="text-xs font-semibold tracking-wider uppercase px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
            {programa.duracion}
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Evita que se abra la ficha al clickear el comparador
              onAddToCompare(programa);
            }}
            className={`text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors ${
              isInCompare 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                : 'text-slate-400 border-slate-200 hover:border-slate-400'
            }`}
          >
            {isInCompare ? '✓ Añadido' : '+ Comparar'}
          </button>
        </div>

        <h3 className="font-sans font-bold text-xl text-slate-800 line-clamp-2 mb-2 group-hover:text-red-600">
          {programa.titulo}
        </h3>
        
        <p className="text-slate-500 text-sm line-clamp-3 mb-4">
          {programa.descripcion}
        </p>
      </div>

      {/* Información Técnica y CTA */}
      <div className="mt-auto">
        <div className="border-t border-slate-100 pt-4 mb-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
          <div>
            <span className="block text-slate-400 font-medium">Modalidad:</span>
            <span className="truncate block font-semibold text-slate-700">{programa.modalidad}</span>
          </div>
          <div>
            <span className="block text-slate-400 font-medium">Titulación:</span>
            <span className="truncate block font-semibold text-slate-700">{programa.titulacion.split('+')[0]}</span>
          </div>
        </div>

        <button
          ref={buttonRef}
          className="w-full py-3 rounded-xl border border-slate-800 text-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-2"
        >
          Explorar Programa
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};