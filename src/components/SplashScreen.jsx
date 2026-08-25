import React, { useState, useEffect } from "react";

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => setPhase(3), 3400);
    const t4 = setTimeout(() => {
      setPhase(4);
      onComplete?.();
    }, 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  if (phase >= 4) return null;

  return (
    <div className={`splash splash-phase-${phase}`}>
      <div className="splash-curtain splash-left" />
      <div className="splash-curtain splash-right" />
      <div className="splash-content">
        <img src="/Logo.webp" alt="" className="splash-logo" />
        <div className="splash-divider" />
        <div className="splash-text">Bem-vindo à</div>
        <div className="splash-brand">STÄRKE <b>PARTS</b></div>
      </div>
      <div className="splash-line" />
    </div>
  );
}
