import React, { useEffect, useRef } from 'react';

export const WatermarkAnimatedLogo: React.FC = () => {
  const eyeLeftRef = useRef<HTMLDivElement | null>(null);
  const eyeRightRef = useRef<HTMLDivElement | null>(null);
  const rigRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId: number | null = null;
    let ambientTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const updatePupils = () => {
      const rig = rigRef.current;
      if (rig) {
        const rect = rig.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const centerX = rect.left + rect.width * 0.5;
          const centerY = rect.top + rect.height * 0.491;

          const diffX = mouseX - centerX;
          const diffY = mouseY - centerY;
          const maxDist = Math.max(window.innerWidth, window.innerHeight) * 0.55;

          const normX = Math.max(-1, Math.min(1, diffX / maxDist));
          const normY = Math.max(-1, Math.min(1, diffY / maxDist));

          targetX = normX * 6.5;
          targetY = normY * 4.5;
        } else {
          ambientTime += 0.025;
          targetX = Math.sin(ambientTime) * 3;
          targetY = Math.cos(ambientTime * 0.8) * 2;
        }
      } else {
        ambientTime += 0.025;
        targetX = Math.sin(ambientTime) * 3;
        targetY = Math.cos(ambientTime * 0.8) * 2;
      }

      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      const px = currentX.toFixed(2) + 'px';
      const py = currentY.toFixed(2) + 'px';

      if (eyeLeftRef.current) {
        eyeLeftRef.current.style.setProperty('--pupil-x', px);
        eyeLeftRef.current.style.setProperty('--pupil-y', py);
      }
      if (eyeRightRef.current) {
        eyeRightRef.current.style.setProperty('--pupil-x', px);
        eyeRightRef.current.style.setProperty('--pupil-y', py);
      }

      rafId = requestAnimationFrame(updatePupils);
    };

    rafId = requestAnimationFrame(updatePupils);

    const handleVisibility = () => {
      if (document.hidden) {
        if (rafId) cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(updatePupils);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="deck-global-watermark" aria-hidden="true">
      {/* Background Logo Emblem */}
      <div className="watermark-emblem" />

      {/* Cyber Animated Eye Rig with Enhanced Glow */}
      <div className="watermark-eye-rig" ref={rigRef}>
        {/* Left Cyber Eye */}
        <div
          ref={eyeLeftRef}
          className="watermark-cyber-eye watermark-cyber-eye--left"
          id="watermark-eye-left"
        >
          <span className="cyber-eye__ambient-glow" style={{ boxShadow: '0 0 35px #00e5ff, 0 0 70px #18c8ff', opacity: 0.95 }} />
          <span className="cyber-eye__socket" />
          <span className="cyber-eye__iris" style={{ background: 'radial-gradient(circle, #FFFFFF 20%, #00FFFF 50%, #0088FF 90%)', boxShadow: '0 0 16px #00FFFF, 0 0 30px #18C8FF' }}>
            <span className="cyber-eye__pupil" />
          </span>
          <span className="cyber-eye__laser-flare" />
        </div>

        {/* Right Cyber Eye */}
        <div
          ref={eyeRightRef}
          className="watermark-cyber-eye watermark-cyber-eye--right"
          id="watermark-eye-right"
        >
          <span className="cyber-eye__ambient-glow" style={{ boxShadow: '0 0 35px #00e5ff, 0 0 70px #18c8ff', opacity: 0.95 }} />
          <span className="cyber-eye__socket" />
          <span className="cyber-eye__iris" style={{ background: 'radial-gradient(circle, #FFFFFF 20%, #00FFFF 50%, #0088FF 90%)', boxShadow: '0 0 16px #00FFFF, 0 0 30px #18C8FF' }}>
            <span className="cyber-eye__pupil" />
          </span>
          <span className="cyber-eye__laser-flare" />
        </div>

        {/* Laser Targeting Beam Sweep across both eyes */}
        <div className="watermark-cyber-eye__beam-sweep" />
      </div>
    </div>
  );
};
