import React from 'react';
// Importamos el Breadcrumb común
import { Breadcrumb } from '../components/Breadcrumb';

export function LeadForm({ navigate, selectedProgram }) {
  return (
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
      <h2 className="text-5xl font-light text-slate-900 mt-2 relative">
        Datos del <span className="italic text-[#B31D15] font-normal">prospecto</span>
      </h2>

      {selectedProgram && (
        <div className="bg-red-50/60 border border-red-100 p-4 rounded-xl mt-6 flex justify-between items-center">
          <p className="text-xs text-slate-600 m-0">
            PROGRAMA PRESELECCIONADO: <strong className="text-[#B31D15]">{selectedProgram.titulo} · {selectedProgram.tipo} · {selectedProgram.duracion}</strong>
          </p>
          <button onClick={() => navigate('grilla')} className="text-xs font-bold text-slate-400 hover:text-slate-600">
            Cambiar
          </button>
        </div>
      )}

      <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-sm" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Nombre completo *</label>
            <input type="text" defaultValue="Laura Pérez" className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B31D15]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Email *</label>
            <input type="email" defaultValue="laura@empresa.com" className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B31D15]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Teléfono *</label>
            <input type="text" defaultValue="+54 9 261 ..." className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B31D15]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">País *</label>
            <select className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B31D15]">
              <option>Argentina</option>
            </select>
          </div>
        </div>
        <button className="w-full py-4 bg-[#B31D15] hover:bg-[#8B1010] text-white font-bold rounded-xl shadow-lg shadow-red-600/10 transition-all">
          Enviar Consulta
        </button>
      </form>
    </div>
  );
}