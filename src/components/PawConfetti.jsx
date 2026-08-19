import { useEffect, useState } from 'react';

export default function PawConfetti({ active }) {
  const [paws, setPaws] = useState([]);

  useEffect(() => {
    if (!active) return;
    const items = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      size: 16 + Math.random() * 20,
      duration: 2 + Math.random() * 2,
    }));
    setPaws(items);
    const t = setTimeout(() => setPaws([]), 5000);
    return () => clearTimeout(t);
  }, [active]);

  if (!paws.length) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {paws.map((p) => (
        <span
          key={p.id}
          className="absolute animate-paw-fall"
          style={{
            left: `${p.left}%`,
            top: '-30px',
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          🐾
        </span>
      ))}
    </div>
  );
}
