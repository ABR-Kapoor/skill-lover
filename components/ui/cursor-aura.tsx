'use client';

import { useEffect, useRef } from 'react';

export function CursorAura() {
  const rafRef = useRef<number | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const orbsRef = useRef<HTMLElement[]>([]);
  const cursorRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Collect interactive elements
    const updateElements = () => {
      cardsRef.current = Array.from(document.querySelectorAll('[data-neu-card]'));
      orbsRef.current = Array.from(document.querySelectorAll('.bg-orb-1, .bg-orb-2, .bg-orb-3'));
    };
    
    // Initial collection
    updateElements();
    
    // Observer for dynamic content
    const observer = new MutationObserver(updateElements);
    observer.observe(document.body, { childList: true, subtree: true });

    const onMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      scheduleTick();
    };

    const scheduleTick = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        tick();
      });
    };

    const tick = () => {
      const { x, y } = cursorRef.current;
      
      // 1. Update global CSS vars for spotlight
      document.documentElement.style.setProperty('--cursor-x', `${x}px`);
      document.documentElement.style.setProperty('--cursor-y', `${y}px`);

      // 2. Background parallax (orbs)
      orbsRef.current.forEach((orb, i) => {
        const factor = (i + 1) * 0.015;
        const dx = (x - window.innerWidth / 2) * factor;
        const dy = (y - window.innerHeight / 2) * factor;
        
        orb.style.setProperty('--parallax-x', `${dx}px`);
        orb.style.setProperty('--parallax-y', `${dy}px`);
      });

      // 3. Card 3D tilt
      cardsRef.current.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 400;

        if (dist < maxDist) {
          const intensity = (1 - dist / maxDist);
          const rotX = (dy / rect.height) * -8 * intensity;
          const rotY = (dx / rect.width) * 8 * intensity;
          const gX = 50 + (dx / rect.width) * 30;
          const gY = 50 + (dy / rect.height) * 30;

          card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
          card.style.setProperty('--glare-x', `${gX}%`);
          card.style.setProperty('--glare-y', `${gY}%`);
          card.style.setProperty('--tilt-intensity', intensity.toFixed(3));
        } else {
          card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
          card.style.setProperty('--tilt-intensity', '0');
        }
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return null; // Logic only, no visible render (styles are global)
}
