import React, { useState, useMemo, useEffect } from 'react';

export function ProgramGrid({ programas = [], onSelectProgram, compareList = [], onToggleCompare, navigate }) {

  const programasEje = useMemo(() => {
    if (!programas || programas.length === 0) return [];
    const filtrados = programas.filter(p => {
      const ejeNormalizado = (p.eje || "").toLowerCase();
      const categoriaNormalizada = (p.categoria || "").toLowerCase();
      const tituloNormalizado = (p.titulo || "").toLowerCase();
      return (
        ejeNormalizado.includes("artificial") ||
        ejeNormalizado.includes("ia") ||
        categoriaNormalizada.includes("ia") ||
        tituloNormalizado.includes("ia") ||
        tituloNormalizado.includes("artificial") ||
        p.ejeId === 1
      );
    });
    return filtrados.length === 0 ? programas : filtrados;
  }, [programas]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => { setReady(true); }, []);

  const handleNext = () => {
    if (programasEje.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % programasEje.length);
  };

  const handlePrev = () => {
    if (programasEje.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + programasEje.length) % programasEje.length);
  };

  const getCardStyle = (diff) => {
    const transition = ready
      ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease'
      : 'none';

    if (diff === 0) {
      return { transform: 'translateX(0px) scale(1.06) rotateY(0deg)', opacity: 1, zIndex: 40, transition };
    } else if (diff === -1) {
      return { transform: 'translateX(-348px) scale(0.88) rotateY(12deg)', opacity: 0.88, zIndex: 20, transition };
    } else if (diff === 1) {
      return { transform: 'translateX(348px) scale(0.88) rotateY(-12deg)', opacity: 0.88, zIndex: 20, transition };
    } else {
      const tx = diff > 0 ? '620px' : '-620px';
      return { transform: `translateX(${tx}) scale(0.88) rotateY(0deg)`, opacity: 0, zIndex: 10, transition };
    }
  };

  if (programasEje.length === 0) {
    return (
      <div className="w-full text-center py-20 text-slate-400">
        No se encontraron programas disponibles.
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pt-10 flex flex-col min-h-[calc(100vh-180px)] relative">

      {/* ── Encabezado ── */}
      <div className="mb-6 relative">
        <nav className="flex items-center gap-1 text-xs mb-5" aria-label="Breadcrumb">
          {[
            { label: 'ADEN', screen: 'home' },
            { label: 'Oferta educativa', screen: 'ejes' },
            { label: 'Inteligencia Artificial' },
          ].map((item, i, arr) => {
            const isLast = i === arr.length - 1;
            return (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-slate-300 mx-1 select-none">›</span>}
                {item.screen && !isLast ? (
                  <button onClick={() => navigate?.(item.screen)}
                    className="text-slate-400 hover:text-[#B31D15] transition-colors font-medium">
                    {item.label}
                  </button>
                ) : (
                  <span className={isLast ? 'text-slate-700 font-semibold' : 'text-slate-400 font-medium'}>
                    {item.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-5xl font-bold text-slate-950 tracking-tight">
              Inteligencia <span className="italic text-[#B31D15] font-normal">Artificial</span>
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              {programasEje.length} programas disponibles · Seleccioná el que mejor se adapta a tu perfil
            </p>
          </div>
          {/* Indicador de posición */}
          <span className="text-slate-300 font-mono text-sm mb-1">
            {String(activeIndex + 1).padStart(2, '0')} / {String(programasEje.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── Escenario del carrusel con fondo oscuro ── */}
      <div className="relative rounded-3xl overflow-hidden flex-1 flex flex-col"
        style={{
          background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 45%, #0f1f35 100%)',
          minHeight: 500,
        }}>

        {/* Decoraciones internas del escenario */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Orbe rojo central */}
          <div style={{
            position: 'absolute', top: '40%', left: '50%',
            width: 600, height: 600,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(179,29,21,0.15) 0%, transparent 60%)',
          }} />
          {/* Anillos concéntricos */}
          {[500, 360, 220].map(s => (
            <div key={s} style={{
              position: 'absolute', top: '40%', left: '50%',
              width: s, height: s,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.05)',
            }} />
          ))}
          {/* Grilla de puntos tenue */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />
          {/* Línea diagonal esquina izq */}
          <div className="absolute left-0 top-0 bottom-0 w-32 opacity-[0.04]" style={{
            backgroundImage: 'repeating-linear-gradient(-55deg, #B31D15 0, #B31D15 1px, transparent 0, transparent 20px)',
          }} />
          {/* Gradiente superior difuminado */}
          <div className="absolute top-0 left-0 right-0 h-20"
            style={{ background: 'linear-gradient(to bottom, rgba(15,23,42,0.6), transparent)' }} />
          {/* Gradiente inferior difuminado */}
          <div className="absolute bottom-0 left-0 right-0 h-24"
            style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.7), transparent)' }} />
        </div>

        {/* Stage de cards */}
        <div className="relative flex items-center justify-center flex-1 py-10 overflow-visible z-10" style={{ minHeight: 440 }}>
          <div className="relative w-full max-w-md h-[400px] flex items-center justify-center style-perspective overflow-visible">

            {programasEje.map((programa, idx) => {
              let total = programasEje.length;
              let diff = idx - activeIndex;
              if (diff < -total / 2) diff += total;
              if (diff > total / 2) diff -= total;
              const isCenter = diff === 0;

              return (
                <div
                  key={programa.id || idx}
                  onClick={() => {
                    if (isCenter && onSelectProgram) {
                      onSelectProgram(programa);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  style={getCardStyle(diff)}
                  className="absolute top-0 w-[320px] h-[400px] cursor-pointer origin-center select-none backface-hidden"
                >
                  <div className={`w-full h-full rounded-3xl flex flex-col overflow-hidden shadow-2xl
                    ${isCenter
                      ? 'ring-2 ring-[#B31D15]/50 shadow-[0_25px_60px_rgba(0,0,0,0.5)]'
                      : 'shadow-[0_10px_30px_rgba(0,0,0,0.4)]'
                    }`}
                    style={{ background: isCenter ? '#ffffff' : '#f8fafc' }}
                  >
                    {/* Header de color según tipo */}
                    <div className={`px-5 pt-5 pb-4 ${isCenter ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-slate-100'}`}>
                      <div className="flex justify-between items-center">
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md
                          ${isCenter ? 'bg-white/10 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>
                          {programa.tipo || "Programa"}
                        </span>
                        <span className={`text-[11px] font-mono ${isCenter ? 'text-slate-400' : 'text-slate-400'}`}>
                          ⏱️ {programa.duracion || "Consultar"}
                        </span>
                      </div>
                      <h3 className={`text-lg font-bold mt-3 leading-snug tracking-tight line-clamp-2
                        ${isCenter ? 'text-white' : 'text-slate-800'}`}>
                        {programa.titulo}
                      </h3>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-5 justify-between bg-white">
                      <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed">
                        {programa.descripcion || "Sin descripción disponible actualmente."}
                      </p>

                      <div className="mt-auto pt-4 border-t border-slate-100">
                        <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 mb-4">
                          <div>Modalidad
                            <span className="font-bold text-slate-700 block text-xs mt-0.5">{programa.modalidad || "Online"}</span>
                          </div>
                          <div>Titulación
                            <span className="font-bold text-slate-700 block text-xs mt-0.5">{programa.titulacion || "ADEN"}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            disabled={!isCenter}
                            onClick={(e) => { e.stopPropagation(); if (onSelectProgram) onSelectProgram(programa); }}
                            className={`flex-1 text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1 transition-all
                              ${isCenter
                                ? 'bg-[#B31D15] text-white hover:bg-[#8B1010] shadow-md shadow-red-900/20'
                                : 'bg-slate-100 text-slate-300 cursor-default'}`}
                          >
                            Explorar programa →
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const inList = compareList.some(c => c.id === programa.id);
                              if (!inList && onToggleCompare) onToggleCompare(programa);
                              if (navigate) navigate('comparador');
                            }}
                            className={`px-3 py-2.5 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                              compareList.some(c => c.id === programa.id)
                                ? 'bg-[#B31D15]/10 border-[#B31D15]/30 text-[#B31D15]'
                                : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                            }`}
                            title="Comparar programa"
                          >
                            ⚖️ {compareList.some(c => c.id === programa.id) ? 'Ver' : 'Comparar'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Controles dentro del escenario ── */}
        <div className="flex items-center justify-center gap-5 pb-7 relative z-10">
          <button onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold flex items-center justify-center transition-all active:scale-95">
            ←
          </button>

          <div className="flex gap-1.5">
            {programasEje.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'w-6 bg-[#B31D15]' : 'w-1.5 bg-white/25 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold flex items-center justify-center transition-all active:scale-95">
            →
          </button>
        </div>
      </div>

    </div>
  );
}
