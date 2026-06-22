import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

export function StatCounter({ prefix = '', target, suffix = '', localeFormat = false, duration = 2 }) {
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

  const display = localeFormat ? value.toLocaleString('es-AR') : value;
  return <>{prefix}{display}{suffix}</>;
}
