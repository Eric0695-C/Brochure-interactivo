import React from 'react';
import { StatCounter } from '../components/homecounter';

const VIDEO_URL = 'https://mkt-landings.adenuniversity.edu.pa/wp-content/uploads/fondo-mundo-acelerado.mp4';

export function Home({ navigate }) {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col">

      {/* ── Video del globo ── */}
      <video
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        style={{ objectPosition: '65% center' }}
      />

      {/* ── Gradiente de fundido izquierda → derecha ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, #000000 30%, rgba(0,0,0,0.80) 48%, rgba(0,0,0,0.15) 68%, transparent 100%)',
        }}
      />

      {/* ── Gradiente inferior para legibilidad de stats ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}
      />

      {/* ── Contenido principal ── */}
      <div className="relative z-10 flex flex-col min-h-screen px-10 py-8 max-w-5xl">

        {/* Logo bar */}
        <div className="flex items-center gap-3 mb-auto">
          <div className="flex items-center gap-2">
              <img className= "logo" src='https://www.aden.org/wp-content/uploads/2026/06/aden-te-acompana.png'/>
            </div>
        </div>

        {/* Headline + sub */}
        <div className="mt-16">
          <h1 className="text-[clamp(4rem,10vw,7.5rem)] font-black text-white leading-[0.92] tracking-tight">
            En un<br />mundo<br />acelerado
          </h1>

          {/* Línea roja */}
          <div className="w-28 h-[3px] bg-[#B31D15] mt-5 mb-5 rounded-full" />

          <p className="text-white/65 text-xl font-light tracking-wide">
            El reto es mantenerse actualizado
          </p>

          {/* Stats */}
          <div className="flex items-center gap-0 mt-10 divide-x divide-white/15">
            {[
              { prefix: '', target: 15, suffix: '', label: 'Sedes' },
              { prefix: '+', target: 30, suffix: '', label: 'Años de experiencia' },
              { prefix: '+', target: 400, suffix: 'k', label: 'Ejecutivos' },
            ].map((kpi, i) => (
              <div key={i} className="px-6 first:pl-0">
                <span className="block text-4xl font-black text-white leading-none">
                  <StatCounter prefix={kpi.prefix} target={kpi.target} suffix={kpi.suffix} duration={1.8 + i * 0.2} />
                </span>
                <span className="block text-white/45 text-xs mt-1.5 font-medium tracking-wide">
                  {kpi.label}
                </span>
              </div>
            ))}
          </div>

          {/* Botones de navegación */}
          <div className="flex flex-wrap gap-3 mt-10">
            <button
              onClick={() => navigate('ejes')}
              className="bg-[#B31D15] hover:bg-[#9B1710] text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm flex items-center gap-2 shadow-lg shadow-red-900/30 group"
            >
              Explorar oferta educativa
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button
              onClick={() => navigate('atributos')}
              className="bg-white/10 hover:bg-white/18 border border-white/20 hover:border-white/35 text-white font-semibold px-5 py-3.5 rounded-xl transition-all text-sm backdrop-blur-sm"
            >
              ✦ ¿Por qué ADEN?
            </button>
            <button
              onClick={() => navigate('comparador')}
              className="bg-white/10 hover:bg-white/18 border border-white/20 hover:border-white/35 text-white font-semibold px-5 py-3.5 rounded-xl transition-all text-sm backdrop-blur-sm"
            >
              ⚖️ Comparar programas
            </button>
          </div>
        </div>

        {/* Footer row */}
        <div className="mt-auto pt-10 flex items-end justify-between">
          {/* Reconocimientos */}
          <div className="flex items-center gap-3">
            {['QS Rankings', 'AACSB Ready', 'ISO 9001'].map(label => (
              <span
                key={label}
                className="px-3 py-1.5 border border-white/15 rounded-lg text-[11px] font-bold text-white/50 backdrop-blur-sm"
              >
                {label}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}