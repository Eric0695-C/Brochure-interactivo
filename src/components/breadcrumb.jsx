import React from 'react';

export function Breadcrumb({ items, navigate }) {
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
