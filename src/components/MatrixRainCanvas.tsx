import React, { useEffect, useRef } from 'react';

export const MatrixRainCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];
    let animationFrameId: number | null = null;
    let lastRenderTime = 0;
    let isRunning = true;

    const FPS = 28;
    const FRAME_INTERVAL = 1000 / FPS;
    const CHARACTERS = '010101RAVANATECHｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜXYZ<>{}/*#$';
    const FONT_SIZE = 14;

    function resize() {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;

      canvas.width = Math.floor(width);
      canvas.height = Math.floor(height);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      columns = Math.floor(width / FONT_SIZE);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -40);
      }

      ctx.fillStyle = '#01060D';
      ctx.fillRect(0, 0, width, height);
    }

    function render(currentTime: number) {
      if (!isRunning || !ctx) return;

      animationFrameId = requestAnimationFrame(render);

      if (document.hidden) return;

      const delta = currentTime - lastRenderTime;
      if (delta < FRAME_INTERVAL) return;
      lastRenderTime = currentTime - (delta % FRAME_INTERVAL);

      // Translucent fade for matrix rain trails
      ctx.fillStyle = 'rgba(1, 6, 13, 0.09)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${FONT_SIZE}px "Courier New", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        if (y > 0 && y < height + FONT_SIZE) {
          ctx.fillStyle = '#ffffff';
          ctx.fillText(char, x, y);
          ctx.fillStyle = '#00e1ff';
        }

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }
      }
    }

    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        isRunning = true;
        lastRenderTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      resize();
    };

    resize();
    lastRenderTime = performance.now();
    animationFrameId = requestAnimationFrame(render);

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="matrix-rain-canvas"
      className="matrix-rain-canvas"
      aria-hidden="true"
    />
  );
};
