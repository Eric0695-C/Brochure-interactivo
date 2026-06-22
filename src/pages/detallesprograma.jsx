import React, { useState } from 'react';
// Importamos el Breadcrumb común
import { Breadcrumb } from '../components/Breadcrumb';

export function DetallesPrograma({ navigate, selectedProgram, compareList, handleToggleCompare }) {
  // Manejo de tabs interno de la ficha
  const [activeTab, setActiveTab] = useState('plan');

  if (!selectedProgram) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 pt-6 pb-40 relative overflow-hidden">

      {/* Decoraciones de fondo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Anillos – arriba derecha */}
        {[500, 360, 220].map(s => (
          <div key={s} style={{
            position: 'absolute', top: -s / 2, right: -s / 2,
            width: s, height: s, borderRadius: '50%',
            border: '1px solid rgba(203,213,225,0.45)',
          }} />
        ))}
        {/* Líneas horizontales tipo técnico – panel izquierdo */}
        <div className="absolute left-0 top-40 bottom-0 w-1/2 opacity-[0.025]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #64748b, #64748b 1px, transparent 1px, transparent 32px)',
        }} />
        {/* Acento rojo esquina inferior izquierda */}
        <div style={{
          position: 'absolute', bottom: 60, left: -80,
          width: 260, height: 260, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(179,29,21,0.07) 0%, transparent 70%)',
        }} />
      </div>

      <Breadcrumb
        items={[
          { label: 'ADEN', screen: 'home' },
          { label: 'Oferta educativa', screen: 'ejes' },
          { label: 'Inteligencia Artificial', screen: 'grilla' },
          { label: selectedProgram.titulo },
        ]}
        navigate={navigate}
      />

      {/* HERO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Left */}
        <div className="lg:col-span-7">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 text-[#B31D15] border border-red-100 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B31D15] inline-block animate-pulse" />
            {selectedProgram.tipo}
          </div>

          {/* Title */}
          <h1 className="text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            {selectedProgram.titulo}
          </h1>

          {/* Description */}
          <p className="text-slate-500 mt-4 text-base leading-relaxed max-w-lg">
            {selectedProgram.descripcion}
          </p>

          {/* Stats chips */}
          <div className="flex flex-wrap gap-3 mt-7">
            {[
              { icon: '📅', label: 'Duración', value: selectedProgram.duracion },
              { icon: '💻', label: 'Modalidad', value: selectedProgram.modalidad },
              { icon: '🎓', label: 'Titulación', value: selectedProgram.titulacion },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2.5 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
                <span className="text-lg">{stat.icon}</span>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block leading-none">{stat.label}</span>
                  <span className="font-bold text-slate-800 text-sm leading-snug">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-5 mt-6 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="text-amber-400 tracking-tight">★★★★★</span>
              <strong className="text-slate-700">4.9</strong>
            </span>
            <span className="w-px h-4 bg-slate-200" />
            <span className="text-slate-500"><strong className="text-slate-700">2.400+</strong> egresados</span>
            <span className="w-px h-4 bg-slate-200" />
            <span className="text-slate-500"><strong className="text-slate-700">18</strong> países</span>
          </div>
        </div>

        {/* Right: video + CTAs */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Video */}
          <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group aspect-video">
            <div className="absolute inset-0 bg-gradient-to-br from-[#B31D15]/25 via-transparent to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-white/15 scale-125 group-hover:scale-150 transition-transform duration-500 ease-out" />
                <div className="w-16 h-16 bg-white/20 group-hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-all duration-300 relative z-10 shadow-lg">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white text-sm font-semibold">Director Académico</p>
              <p className="text-slate-400 text-xs mt-0.5">Presentación del programa · 1:20</p>
            </div>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => navigate('form')}
            className="w-full py-4 bg-[#B31D15] hover:bg-[#8B1010] text-white font-bold rounded-xl shadow-lg shadow-red-900/20 transition-all text-sm flex items-center justify-center gap-2 group"
          >
            <span className="group-hover:rotate-12 transition-transform">🚀</span>
            Generar oportunidad
          </button>

          {/* Secondary CTAs */}
          <div className="grid grid-cols-3 gap-2">
            <button className="py-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold rounded-xl transition-all text-xs flex items-center justify-center gap-1">
              📅 Agendar
            </button>
            <button
              onClick={() => handleToggleCompare(selectedProgram)}
              className={`py-3 border font-semibold rounded-xl transition-all text-xs flex items-center justify-center gap-1 ${
                compareList.some(i => i.id === selectedProgram.id)
                  ? 'bg-red-50 border-red-200 text-[#B31D15]'
                  : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700'
              }`}
            >
              {compareList.some(i => i.id === selectedProgram.id) ? '✓ Añadido' : '⚖️ Comparar'}
            </button>
            <button
              onClick={() => navigate('comparador')}
              className="py-3 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all text-xs flex items-center justify-center gap-1"
            >
              Ver comparador →
            </button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mt-14 border-b border-slate-200">
        <div className="flex gap-1">
          {[
            { key: 'plan', label: 'Plan de estudios' },
            { key: 'perfil', label: 'Perfil objetivo' },
            { key: 'inversion', label: 'Inversión' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative px-5 py-3 text-sm font-semibold rounded-t-xl transition-all ${
                activeTab === key
                  ? 'text-[#B31D15] bg-red-50/60'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              {label}
              {activeTab === key && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B31D15] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="mt-8">

        {/* Plan de estudios */}
        {activeTab === 'plan' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {selectedProgram.plan_estudios?.map((modulo, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl border border-slate-200 p-5 overflow-hidden
                  hover:border-[#B31D15]/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-250 cursor-default"
              >
                {/* Background number watermark */}
                <span className="absolute -right-1 -bottom-2 text-8xl font-black text-slate-100 select-none leading-none pointer-events-none group-hover:text-red-50/70 transition-colors duration-300">
                  {modulo.isStar ? '★' : modulo.modulo}
                </span>
                {/* Red top bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#B31D15] to-red-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />

                {/* Number chip */}
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-black mb-4 ${
                  modulo.isStar ? 'bg-amber-100 text-amber-600' : 'bg-[#B31D15]/10 text-[#B31D15]'
                }`}>
                  {modulo.isStar ? '★' : String(modulo.modulo).padStart(2, '0')}
                </span>

                <h4 className="font-bold text-slate-800 text-sm leading-snug relative z-10">
                  {modulo.nombre}
                </h4>

                <div className="mt-4 inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium bg-slate-50 px-2.5 py-1 rounded-full relative z-10">
                  ⏱ {modulo.semanas}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Perfil objetivo */}
        {activeTab === 'perfil' && (
          <div className="max-w-2xl">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-[#B31D15]/10 rounded-2xl flex items-center justify-center text-2xl mb-5">🎯</div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">¿A quién va dirigido?</h3>
              <p className="text-slate-600 leading-relaxed">{selectedProgram.perfil_objetivo}</p>

              {selectedProgram.plan_resumido && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h4 className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-3">Resumen curricular</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProgram.plan_resumido.split('·').map((item, i) => (
                      <span key={i} className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-[#B31D15] text-slate-600 rounded-full font-medium transition-colors cursor-default">
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Inversión */}
        {activeTab === 'inversion' && (
          <div className="max-w-md">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-[#B31D15]/10 rounded-2xl flex items-center justify-center text-2xl mb-5">💳</div>
              <h4 className="font-bold text-slate-400 uppercase text-xs tracking-wider mb-2">Financiación Flexible</h4>
              <p className="text-3xl font-extrabold text-slate-900">{selectedProgram.inversion}</p>
              <p className="text-slate-400 text-sm mt-2">Sin interés · Adaptado a cada país</p>
              <button onClick={() => navigate('form')} className="mt-6 w-full py-3.5 bg-[#B31D15] hover:bg-[#8B1010] text-white font-bold rounded-xl text-sm transition-all">
                Consultar condiciones →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}