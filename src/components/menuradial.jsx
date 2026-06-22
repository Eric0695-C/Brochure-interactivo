import React from 'react';

export function MenuRadial({ currentScreen, navigate, menuOpen, setMenuOpen }) {
  return (
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
        { label: 'Inicio', icon: '🏠', screen: 'home', angle: 8 },
        { label: 'Oferta educativa', icon: '📚', screen: 'ejes', angle: 45 },
        { label: 'Comparador', icon: '⚖️', screen: 'comparador', angle: 80 },
        { label: 'Generar oportunidad', icon: '🚀', screen: 'form', angle: 115 },
      ].map((item, i, arr) => {
        const rad = (item.angle * Math.PI) / 180;
        const tx = -(Math.sin(rad) * 85).toFixed(1);
        const ty = -(Math.cos(rad) * 85).toFixed(1);
        const isActive =
          currentScreen === item.screen ||
          (['ejes', 'grilla', 'ficha'].includes(currentScreen) && item.screen === 'ejes');
        const openDelay = (i * 0.06).toFixed(2);
        const closeDelay = ((arr.length - 1 - i) * 0.04).toFixed(2);
        const delay = menuOpen ? openDelay : closeDelay;

        return (
          <button
            key={item.screen}
            onClick={() => {
              navigate(item.screen);
              setMenuOpen(false);
            }}
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
        <span
          style={{
            display: 'block',
            fontSize: 30,
            fontWeight: 200,
            lineHeight: 1,
            userSelect: 'none',
            transition: 'transform 0.44s cubic-bezier(0.34,1.56,0.64,1)',
            transform: menuOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
        {/* Pulse ring cuando está cerrado */}
        {!menuOpen && (
          <span className="absolute inset-0 rounded-full border-2 border-[#B31D15] animate-ping opacity-25 pointer-events-none" />
        )}
      </button>
    </div>
  );
}