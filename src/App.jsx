import React, { useState, useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import programasData from './data/programas.json';
import { ProgramGrid } from './components/ProgramGrid';

// Contador animado con GSAP
function StatCounter({ prefix = '', target, suffix = '', localeFormat = false, duration = 2 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const counter = { val: 0 };
    const tween = gsap.to(counter, {
      val: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => setValue(Math.round(counter.val)),
    });
    return () => tween.kill();
  }, [target, duration]);

  const display = localeFormat
    ? value.toLocaleString('es-AR')
    : value;

  return <>{prefix}{display}{suffix}</>;
}

// ── Componente Breadcrumb reutilizable ──────────────────────────────────────
function Breadcrumb({ items, navigate }) {
  return (
    <nav className="flex items-center gap-1 text-xs mb-8 relative z-10" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-slate-300 mx-1 select-none">›</span>}
            {item.screen && !isLast ? (
              <button
                onClick={() => navigate(item.screen)}
                className="text-slate-400 hover:text-[#B31D15] transition-colors font-medium"
              >
                {item.label}
              </button>
            ) : (
              <span className={isLast ? 'text-slate-700 font-semibold truncate max-w-[240px]' : 'text-slate-400 font-medium'}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [activeTab, setActiveTab] = useState('plan');
  const [menuOpen, setMenuOpen] = useState(false);

  const overlayRef = useRef(null);
  const navigating = useRef(false);

  const navigate = useCallback((screen) => {
    if (navigating.current) return;
    if (!overlayRef.current) { setCurrentScreen(screen); return; }

    navigating.current = true;
    const overlay = overlayRef.current;

    gsap.set(overlay, {
      yPercent: 110,
      borderRadius: '50% 50% 0 0 / 8% 8% 0 0',
      visibility: 'visible',
      pointerEvents: 'all',
    });

    gsap.to(overlay, {
      yPercent: 0,
      borderRadius: '0% 0% 0 0',
      duration: 0.55,
      ease: 'power3.inOut',
      onComplete: () => {
        setCurrentScreen(screen);
        gsap.delayedCall(0.08, () => {
          gsap.set(overlay, { borderRadius: '0 0 50% 50% / 0 0 8% 8%' });
          gsap.to(overlay, {
            yPercent: -110,
            duration: 0.55,
            ease: 'power3.inOut',
            onComplete: () => {
              gsap.set(overlay, { visibility: 'hidden', pointerEvents: 'none' });
              navigating.current = false;
            }
          });
        });
      }
    });
  }, []);

  const handleToggleCompare = (programa) => {
    setCompareList(prev => {
      const exists = prev.some(item => item.id === programa.id);
      if (exists) return prev.filter(item => item.id !== programa.id);
      if (prev.length >= 3) {
        alert("Podés comparar un máximo de 3 programas en simultáneo.");
        return prev;
      }
      return [...prev, programa];
    });
  };

  const handleSelectProgram = (programa) => {
    setSelectedProgram(programa);
    navigate('ficha');
  };

  return (
    <div className="min-h-screen bg-white pb-16 text-slate-800 antialiased font-sans relative overflow-x-hidden">

      {/* ── FONDOS DECORATIVOS GLOBALES ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }} aria-hidden="true">
        {/* Orbe rojo – arriba derecha */}
        <div className="absolute -top-64 -right-64 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(179,29,21,0.09) 0%, transparent 65%)' }} />
        {/* Orbe pizarra – izquierda centro */}
        <div className="absolute top-1/3 -left-72 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(100,116,139,0.07) 0%, transparent 65%)' }} />
        {/* Orbe cálido – abajo derecha */}
        <div className="absolute -bottom-56 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 65%)' }} />
        {/* Grilla de puntos */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(100,116,139,0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }} />
        {/* Línea diagonal decorativa */}
        <div className="absolute top-0 left-1/2 w-px h-full opacity-[0.04]"
          style={{ background: 'linear-gradient(to bottom, transparent, #B31D15 30%, #B31D15 70%, transparent)' }} />
      </div>

      {/* OVERLAY DE TRANSICIÓN */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'linear-gradient(160deg, #B31D15 0%, #7A1010 55%, #4A0808 100%)',
          visibility: 'hidden',
          pointerEvents: 'none',
        }}
      />

      {/* PANTALLA 0: HOME */}
      {currentScreen === 'home' && (
        <div className="max-w-6xl mx-auto px-6 pt-6 relative">

          {/* Anillos concéntricos – esquina superior derecha */}
          <div className="absolute top-0 right-0 pointer-events-none overflow-visible" aria-hidden="true">
            {[640, 480, 320, 160].map(size => (
              <div key={size} style={{
                position: 'absolute', top: 0, right: 0,
                width: size, height: size, borderRadius: '50%',
                border: '1px solid rgba(203,213,225,0.55)',
                transform: 'translate(50%, -50%)',
              }} />
            ))}
            {/* Relleno rojo suave en el centro de los anillos */}
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: 160, height: 160, borderRadius: '50%',
              transform: 'translate(50%, -50%)',
              background: 'radial-gradient(circle, rgba(179,29,21,0.10) 0%, transparent 70%)',
            }} />
          </div>

          {/* Acento vertical rojo */}
          <div className="absolute left-0 top-14 h-24 w-1 rounded-full"
            style={{ background: 'linear-gradient(to bottom, #B31D15, rgba(179,29,21,0.1))' }} />

          {/* Hero text */}
          <div className="pl-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B31D15]">
              <span className="w-4 h-px bg-[#B31D15]" />
              Líder en Educación Ejecutiva de América Latina
            </span>
            <h1 className="text-7xl font-light text-slate-900 mt-3 tracking-tight leading-[1.05]">
              <span className="italic text-[#B31D15] font-normal">ADEN International Business School</span>
            </h1>
            <p className="mt-5 text-slate-500 text-lg max-w-xl leading-relaxed">
              Más de 30 años formando líderes que crean y transforman organizaciones en toda Latinoamérica.
            </p>
          </div>

          {/* KPIs */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200/80 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
            {[
              { label: 'Años', prefix: '+', target: 30, duration: 1.8 },
              { label: 'Sedes en LATAM', target: 15, duration: 1.5 },
              { label: 'Empresas', prefix: '+', target: 5000, localeFormat: true, duration: 2 },
              { label: 'Ejecutivos', prefix: '+', target: 400, suffix: 'k', duration: 2 },
            ].map((kpi, i) => (
              <div key={i} className="bg-white p-8 group relative overflow-hidden">
                {/* Hover accent */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#B31D15] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                <span className="text-4xl font-bold text-slate-800 mt-2 block">
                  <StatCounter
                    prefix={kpi.prefix || ''}
                    target={kpi.target}
                    suffix={kpi.suffix || ''}
                    localeFormat={kpi.localeFormat || false}
                    duration={kpi.duration}
                  />
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-3 pl-0">
            <button onClick={() => navigate('ejes')}
              className="bg-[#B31D15] hover:bg-[#8B1010] text-white font-semibold px-7 py-4 rounded-xl transition-all flex items-center gap-2 text-sm shadow-lg shadow-red-900/15 group">
              Explorar oferta educativa
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button onClick={() => navigate('atributos')}
              className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-[#B31D15]/30 text-slate-700 font-semibold px-5 py-4 rounded-xl transition-all text-sm flex items-center gap-2 group">
              ✦ ¿Por qué ADEN?
            </button>
            <button className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold px-5 py-4 rounded-xl transition-all text-sm flex items-center gap-2">
              📍 Sedes
            </button>
          </div>

          {/* Franja decorativa inferior */}
          <div className="mt-20 border-t border-slate-100 pt-8 flex items-center gap-8 text-sm text-slate-400">
            <span className="font-semibold text-slate-500">Reconocida por:</span>
            {['QS Rankings', 'AACSB Ready', 'ISO 9001'].map(label => (
              <span key={label} className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold bg-white shadow-sm">
                {label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* PANTALLA: ATRIBUTOS DIFERENCIALES */}
      {currentScreen === 'atributos' && (
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
                desc: 'Nuestros programas están avalados por titulaciones y certificaciones con reconocimiento internacional, otorgadas por prestigiosas instituciones académicas de clase mundial.',
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
      )}

      {/* PANTALLA 1: EJES */}
      {currentScreen === 'ejes' && (
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
              { icon: '🧠', label: 'Inteligencia Artificial',          sub: 'Negocios Digitales e Innovación', count: 6,  hex: '#1868AF' },
              { icon: '📊', label: 'Negocios & Estrategia',            sub: 'Estrategia · Innovación',          count: 14, hex: '#1868AF' },
              { icon: '💰', label: 'Finanzas y Operaciones',           sub: 'Finanzas · Logística · Ops',       count: 11, hex: '#CCA946' },
              { icon: '📣', label: 'Marketing & Gestión Comercial',    sub: 'Marketing · Ventas',               count: 8,  hex: '#CCA946' },
              { icon: '🤝', label: 'Talento Humano',                   sub: 'Liderazgo · RRHH',                 count: 9,  hex: '#DD8345' },
              { icon: '⚖️', label: 'Derecho y Compliance',             sub: 'Derecho · Arte · Gestión',         count: 5,  hex: '#DD8345' },
              { icon: '🏥', label: 'Gestión de Salud',                 sub: 'Salud · Proyectos',                count: 7,  hex: '#238066' },
              { icon: '📋', label: 'Gestión de Proyectos',             sub: 'PMO · Metodologías ágiles',        count: 4,  hex: '#238066' },
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
      )}

      {/* PANTALLA 2: GRILLA */}
      {currentScreen === 'grilla' && (
        <ProgramGrid
          programas={programasData}
          onSelectProgram={handleSelectProgram}
          compareList={compareList}
          onToggleCompare={handleToggleCompare}
          navigate={navigate}
        />
      )}

      {/* PANTALLA 3: FICHA TÉCNICA */}
      {currentScreen === 'ficha' && selectedProgram && (
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
                        <path d="M8 5v14l11-7z"/>
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
                      modulo.isStar
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-[#B31D15]/10 text-[#B31D15]'
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
      )}

      {/* PANTALLA 4: COMPARADOR */}
      {currentScreen === 'comparador' && (
        <div className="max-w-7xl mx-auto px-6 pt-12 relative overflow-hidden">

          {/* Decoraciones */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {/* Columnas verticales translúcidas */}
            <div className="absolute inset-0 opacity-[0.035]" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, #94a3b8 0, #94a3b8 1px, transparent 1px, transparent 25%)',
            }} />
            {/* Cuadrado decorativo top-left rotado */}
            <div className="absolute -top-16 -left-16 w-64 h-64 border border-slate-200/60 rounded-3xl rotate-12" />
            <div className="absolute -top-8 -left-8 w-40 h-40 border border-[#B31D15]/10 rounded-2xl rotate-12" />
            {/* Orbe bottom-right */}
            <div style={{
              position: 'absolute', bottom: -60, right: -60,
              width: 320, height: 320, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(179,29,21,0.06) 0%, transparent 70%)',
            }} />
          </div>

          <Breadcrumb
            items={[
              { label: 'ADEN', screen: 'home' },
              { label: 'Oferta educativa', screen: 'ejes' },
              { label: 'Inteligencia Artificial', screen: 'grilla' },
              { label: 'Comparador' },
            ]}
            navigate={navigate}
          />
          <h2 className="text-4xl font-light text-slate-900 mb-8 relative">Comparar <span className="italic text-[#B31D15] font-normal">programas</span></h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="p-5 w-1/5 font-semibold text-slate-400 text-xs uppercase">Características</th>
                  {compareList.map(item => (
                    <th key={item.id} className="p-5 w-4/15 border-l border-slate-200 relative">
                      <button onClick={() => handleToggleCompare(item)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 text-base">×</button>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full uppercase">{item.tipo}</span>
                      <h4 className="font-bold text-slate-800 text-base mt-2">{item.titulo}</h4>
                    </th>
                  ))}
                  {[...Array(3 - compareList.length)].map((_, i) => (
                    <th key={i} className="p-5 border-l border-slate-200 bg-slate-50/20 text-center text-slate-300 font-normal italic">Espacio disponible</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-400 text-xs uppercase bg-slate-50/20">Duración</td>
                  {compareList.map(item => <td key={item.id} className="p-5 border-l border-slate-200 text-slate-700 font-medium">{item.duracion}</td>)}
                  {[...Array(3 - compareList.length)].map((_, i) => <td key={i} className="border-l border-slate-200 bg-slate-50/10"></td>)}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-400 text-xs uppercase bg-slate-50/20">Modalidad</td>
                  {compareList.map(item => <td key={item.id} className="p-5 border-l border-slate-200 text-slate-600">{item.modalidad}</td>)}
                  {[...Array(3 - compareList.length)].map((_, i) => <td key={i} className="border-l border-slate-200 bg-slate-50/10"></td>)}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-400 text-xs uppercase bg-slate-50/20">Perfil Objetivo</td>
                  {compareList.map(item => <td key={item.id} className="p-5 border-l border-slate-200 text-slate-500 text-xs leading-relaxed">{item.perfil_objetivo}</td>)}
                  {[...Array(3 - compareList.length)].map((_, i) => <td key={i} className="border-l border-slate-200 bg-slate-50/10"></td>)}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-bold text-slate-400 text-xs uppercase bg-slate-50/20">Plan Resumido</td>
                  {compareList.map(item => <td key={item.id} className="p-5 border-l border-slate-200 text-slate-500 text-xs leading-relaxed">{item.plan_resumido}</td>)}
                  {[...Array(3 - compareList.length)].map((_, i) => <td key={i} className="border-l border-slate-200 bg-slate-50/10"></td>)}
                </tr>
                <tr>
                  <td className="p-5 font-bold text-slate-400 text-xs uppercase bg-slate-50/20">Inversión</td>
                  {compareList.map(item => <td key={item.id} className="p-5 border-l border-slate-200 font-bold text-slate-800">{item.inversion}</td>)}
                  {[...Array(3 - compareList.length)].map((_, i) => <td key={i} className="border-l border-slate-200 bg-slate-50/10"></td>)}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex gap-4 justify-end">
            <button onClick={() => navigate('grilla')} className="bg-white border border-slate-200 text-slate-700 px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all">+ Sumar otro programa</button>
            <button onClick={() => navigate('form')} className="bg-[#B31D15] hover:bg-[#8B1010] text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/10 transition-all text-sm">🚀 Generar oportunidad</button>
          </div>
        </div>
      )}

      {/* PANTALLA 5: FORMULARIO */}
      {currentScreen === 'form' && (
        <div className="max-w-4xl mx-auto px-6 pt-12 relative overflow-hidden">

          {/* Decoraciones */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {/* Orbe rojo top-left */}
            <div style={{
              position: 'absolute', top: -40, left: -60,
              width: 280, height: 280, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(179,29,21,0.07) 0%, transparent 70%)',
            }} />
            {/* Rayas horizontales en el fondo del form */}
            <div className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.03]" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #64748b, #64748b 1px, transparent 1px, transparent 20px)',
            }} />
          </div>

          <Breadcrumb
            items={[
              { label: 'ADEN', screen: 'home' },
              { label: 'Oferta educativa', screen: 'ejes' },
              { label: 'Inteligencia Artificial', screen: 'grilla' },
              { label: selectedProgram?.titulo || 'Programa', screen: 'ficha' },
              { label: 'Generar oportunidad' },
            ]}
            navigate={navigate}
          />
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 relative">
            <span className="w-4 h-px bg-slate-300" />
            Crear oportunidad en Odoo
          </span>
          <h2 className="text-5xl font-light text-slate-900 mt-2 relative">Datos del <span className="italic text-[#B31D15] font-normal">prospecto</span></h2>

          {selectedProgram && (
            <div className="bg-red-50/60 border border-red-100 p-4 rounded-xl mt-6 flex justify-between items-center">
              <p className="text-xs text-slate-600 m-0">
                PROGRAMA PRESELECCIONADO: <strong className="text-[#B31D15]">{selectedProgram.titulo} · {selectedProgram.tipo} · {selectedProgram.duracion}</strong>
              </p>
              <button onClick={() => navigate('grilla')} className="text-xs font-bold text-slate-400 hover:text-slate-600">Cambiar</button>
            </div>
          )}

          <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-sm" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Nombre completo *</label><input type="text" defaultValue="Laura Pérez" className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B31D15]" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Email *</label><input type="email" defaultValue="laura@empresa.com" className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B31D15]" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Teléfono *</label><input type="text" defaultValue="+54 9 261 ..." className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B31D15]" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">País *</label><select className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B31D15]"><option>Argentina</option></select></div>
            </div>
            <button className="w-full py-4 bg-[#B31D15] hover:bg-[#8B1010] text-white font-bold rounded-xl shadow-lg shadow-red-600/10 transition-all">Enviar Consulta</button>
          </form>
        </div>
      )}

      {/* ── MENÚ RADIAL ─────────────────────────────────────────────────────── */}
      <div className="fixed bottom-8 right-8" style={{ zIndex: 300 }}>

        {/* Backdrop – cierra el menú al hacer click fuera */}
        {menuOpen && (
          <div
            className="fixed inset-0"
            style={{ zIndex: -1 }}
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Items en arco */}
        {[
          { label: 'Inicio',               icon: '🏠', screen: 'home',       angle: 8   },
          { label: 'Oferta educativa',      icon: '📚', screen: 'ejes',       angle: 45  },
          { label: 'Comparador',           icon: '⚖️', screen: 'comparador', angle: 80  },
          { label: 'Generar oportunidad',  icon: '🚀', screen: 'form',       angle: 115 },
        ].map((item, i, arr) => {
          const rad = (item.angle * Math.PI) / 180;
          const tx  = -(Math.sin(rad) * 85).toFixed(1);
          const ty  = -(Math.cos(rad) * 85).toFixed(1);
          const isActive =
            currentScreen === item.screen ||
            (['ejes', 'grilla', 'ficha'].includes(currentScreen) && item.screen === 'ejes');
          const openDelay  = (i * 0.06).toFixed(2);
          const closeDelay = ((arr.length - 1 - i) * 0.04).toFixed(2);
          const delay = menuOpen ? openDelay : closeDelay;

          return (
            <button
              key={item.screen}
              onClick={() => { navigate(item.screen); setMenuOpen(false); }}
              className={`absolute bottom-0 right-0 w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-xl border-2 transition-transform duration-150 hover:scale-110 active:scale-95 ${
                isActive
                  ? 'bg-[#B31D15] border-[#B31D15]/80 text-white shadow-red-900/30'
                  : 'bg-slate-800 border-slate-700 text-white hover:border-slate-400'
              }`}
              style={{
                transform: menuOpen ? `translate(${tx}px, ${ty}px)` : 'translate(0,0)',
                opacity: menuOpen ? 1 : 0,
                pointerEvents: menuOpen ? 'auto' : 'none',
                transition: `transform 0.44s cubic-bezier(0.34,1.56,0.64,1) ${delay}s, opacity 0.22s ease ${delay}s`,
              }}
              title={item.label}
            >
              {item.icon}
            </button>
          );
        })}

        {/* FAB principal */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="relative w-14 h-14 rounded-full bg-[#B31D15] hover:bg-[#8B1010] text-white flex items-center justify-center shadow-2xl shadow-red-900/40 transition-colors"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {/* + que rota a × */}
          <span style={{
            display: 'block', fontSize: 30, fontWeight: 200, lineHeight: 1,
            userSelect: 'none',
            transition: 'transform 0.44s cubic-bezier(0.34,1.56,0.64,1)',
            transform: menuOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}>
            +
          </span>
          {/* Pulse ring cuando está cerrado */}
          {!menuOpen && (
            <span className="absolute inset-0 rounded-full border-2 border-[#B31D15] animate-ping opacity-25 pointer-events-none" />
          )}
        </button>
      </div>

    </div>
  );
}

export default App;
