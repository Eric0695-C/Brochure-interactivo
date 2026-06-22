import React, { useState, useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import programasData from './data/programas.json';
import { ProgramGrid } from './components/programGrid';
import { Home } from './pages/home';
import { Breadcrumb } from './components/breadcrumb';
import { OfertaEducativa } from './pages/ofertaeducativa';
import { PorqueAden } from './pages/porqueaden';
import { Comparador } from './pages/comparador';
import { MenuRadial } from './components/menuradial';
import { LeadForm } from './pages/leadform';
import { DetallesPrograma } from './pages/detallesprograma';

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
    navigate('detallesprograma');
  };

  return (
    <div className={`min-h-screen antialiased font-sans relative overflow-x-hidden ${currentScreen === 'home' ? 'bg-black' : 'bg-white pb-16 text-slate-800'}`}>

      {/* ── FONDOS DECORATIVOS GLOBALES (solo fuera del home) ── */}
      <div className={`fixed inset-0 pointer-events-none overflow-hidden ${currentScreen === 'home' ? 'hidden' : ''}`} style={{ zIndex: -1 }} aria-hidden="true">
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
        <Home navigate={navigate} />
      )}

      {/* PANTALLA: ATRIBUTOS DIFERENCIALES */}
      {currentScreen === 'atributos' && (
        <PorqueAden navigate={navigate} />
      )}

      {/* PANTALLA 1: EJES */}
      {currentScreen === 'ejes' && (
        <OfertaEducativa navigate={navigate} />
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

      {/* PANTALLA 3: DETALLES DEL PROGRAMA */}
      {currentScreen === 'detallesprograma' && (
        <DetallesPrograma
          navigate={navigate}
          selectedProgram={selectedProgram}
          compareList={compareList}
          handleToggleCompare={handleToggleCompare}
        />
      )}


      {/* PANTALLA 4: COMPARADOR */}
      {currentScreen === 'comparador' && (
        <Comparador
          navigate={navigate}
          compareList={compareList}
          handleToggleCompare={handleToggleCompare}
          programas={programasData}
        />
      )}

      {/* PANTALLA: FORMULARIO */}
      {currentScreen === 'form' && (
        <LeadForm
          navigate={navigate}
          selectedProgram={selectedProgram}
        />
      )}

      {/* MENÚ RADIAL GLOBAL */}
      <MenuRadial
        currentScreen={currentScreen}
        navigate={navigate}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

    </div>
  );
}

export default App;
