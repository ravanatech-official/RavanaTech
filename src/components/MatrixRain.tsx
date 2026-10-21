import React, { useEffect, useRef } from 'react';

export const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const chars = '0123456789ABCDEFRAVANATECHΞΨΩλπµ';
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -50);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    let lastDraw = 0;
    const fpsInterval = 1000 / 30; // 30 FPS cap for extreme efficiency & beastly speed

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);

      const elapsed = currentTime - lastDraw;
      if (elapsed < fpsInterval) return;
      lastDraw = currentTime - (elapsed % fpsInterval);

      // Semi-transparent fade
      ctx.fillStyle = 'rgba(0, 5, 10, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00BFFF';
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head of the drop is brighter
        if (Math.random() > 0.85) {
          ctx.fillStyle = '#FFFFFF';
        } else {
          ctx.fillStyle = 'rgba(0, 191, 255, 0.65)';
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="matrix-rain-canvas"
      className="matrix-rain-canvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.38
      }}
    />
  );
};
