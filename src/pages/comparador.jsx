import React, { useState } from 'react';
import { Breadcrumb } from '../components/breadcrumb';

export function Comparador({ navigate, compareList, handleToggleCompare, programas = [] }) {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [search, setSearch] = useState('');

  const disponibles = programas.filter(
    p => !compareList.some(c => c.id === p.id)
  );

  const filtrados = disponibles.filter(p =>
    p.titulo.toLowerCase().includes(search.toLowerCase()) ||
    (p.tipo || '').toLowerCase().includes(search.toLowerCase())
  );

  const puedeAgregar = compareList.length < 3;

  const handleAdd = (programa) => {
    if (!puedeAgregar) return;
    handleToggleCompare(programa);
    if (compareList.length + 1 >= 3) setSelectorOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-20 relative overflow-hidden">

      {/* Decoraciones */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #94a3b8 0, #94a3b8 1px, transparent 1px, transparent 25%)',
        }} />
        <div className="absolute -top-16 -left-16 w-64 h-64 border border-slate-200/60 rounded-3xl rotate-12" />
        <div className="absolute -top-8 -left-8 w-40 h-40 border border-[#B31D15]/10 rounded-2xl rotate-12" />
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
          { label: 'Comparador' },
        ]}
        navigate={navigate}
      />

      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-4xl font-light text-slate-900">
            Comparar <span className="italic text-[#B31D15] font-normal">programas</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {compareList.length} de 3 programas seleccionados
          </p>
        </div>
        {puedeAgregar && (
          <button
            onClick={() => setSelectorOpen(o => !o)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all border ${
              selectorOpen
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:border-[#B31D15]/40 hover:text-[#B31D15]'
            }`}
          >
            <span className={`text-lg leading-none transition-transform duration-300 ${selectorOpen ? 'rotate-45' : ''}`}>+</span>
            {selectorOpen ? 'Cerrar selector' : 'Agregar programa'}
          </button>
        )}
      </div>

      {/* ── Panel selector de programas ── */}
      {selectorOpen && (
        <div className="mb-6 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
          {/* Header del panel */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/60">
            <div className="relative flex-1 max-w-sm">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Buscar programa..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#B31D15] transition-colors"
                autoFocus
              />
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {filtrados.length} disponibles
            </span>
          </div>

          {/* Lista de programas */}
          <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
            {filtrados.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-8">Sin resultados para "{search}"</p>
            ) : (
              filtrados.map(p => (
                <div
                  key={p.id}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md shrink-0">
                      {p.tipo}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 text-sm truncate">{p.titulo}</p>
                      <p className="text-xs text-slate-400 mt-0.5">⏱ {p.duracion} · {p.modalidad}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAdd(p)}
                    className="ml-4 shrink-0 bg-[#B31D15] hover:bg-[#8B1010] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all opacity-0 group-hover:opacity-100 active:scale-95"
                  >
                    + Agregar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ── Tabla comparadora ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="p-5 w-1/5 font-semibold text-slate-400 text-xs uppercase">Características</th>

              {compareList.map(item => (
                <th key={item.id} className="p-5 border-l border-slate-200 relative">
                  <button
                    onClick={() => handleToggleCompare(item)}
                    className="absolute top-4 right-4 text-slate-300 hover:text-red-500 text-base transition-colors"
                    title="Quitar programa"
                  >
                    ×
                  </button>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full uppercase">
                    {item.tipo}
                  </span>
                  <h4 className="font-bold text-slate-800 text-base mt-2 pr-6 leading-snug">{item.titulo}</h4>
                </th>
              ))}

              {/* Slots vacíos — clickeables */}
              {[...Array(3 - compareList.length)].map((_, i) => (
                <th key={i} className="p-5 border-l border-slate-200">
                  <button
                    onClick={() => setSelectorOpen(true)}
                    className="w-full h-full flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-[#B31D15]/40 hover:bg-red-50/30 transition-all group"
                  >
                    <span className="w-8 h-8 rounded-full border-2 border-slate-300 group-hover:border-[#B31D15]/50 flex items-center justify-center text-slate-300 group-hover:text-[#B31D15] font-bold text-lg transition-colors">
                      +
                    </span>
                    <span className="text-xs text-slate-300 group-hover:text-[#B31D15]/70 font-medium transition-colors">
                      Agregar programa
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[
              { key: 'duracion',        label: 'Duración',       render: p => p.duracion },
              { key: 'modalidad',       label: 'Modalidad',      render: p => p.modalidad },
              { key: 'perfil_objetivo', label: 'Perfil Objetivo', render: p => p.perfil_objetivo },
              { key: 'plan_resumido',   label: 'Plan Resumido',  render: p => p.plan_resumido },
              { key: 'inversion',       label: 'Inversión',      render: p => p.inversion },
            ].map(({ key, label, render }, rowIdx, arr) => (
              <tr key={key} className={rowIdx < arr.length - 1 ? 'border-b border-slate-100' : ''}>
                <td className="p-5 font-bold text-slate-400 text-xs uppercase bg-slate-50/20">{label}</td>
                {compareList.map(item => (
                  <td key={item.id} className={`p-5 border-l border-slate-200 text-slate-600 ${key === 'inversion' ? 'font-bold text-slate-800' : 'text-xs leading-relaxed'}`}>
                    {render(item)}
                  </td>
                ))}
                {[...Array(3 - compareList.length)].map((_, i) => (
                  <td key={i} className="border-l border-slate-200 bg-slate-50/10" />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-8 flex gap-4 justify-end">
        <button
          onClick={() => navigate('form')}
          className="bg-[#B31D15] hover:bg-[#8B1010] text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/10 transition-all text-sm"
        >
          🚀 Generar oportunidad
        </button>
      </div>
    </div>
  );
}
