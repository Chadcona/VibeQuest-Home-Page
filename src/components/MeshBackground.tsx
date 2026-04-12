import React, { useEffect, useRef } from 'react';

const MeshBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = [
      'rgba(24, 168, 173, 0.16)',  // Cyan
      'rgba(243, 187, 73, 0.14)',  // Amber
      'rgba(6, 118, 146, 0.14)',   // Teal depth
      'rgba(255, 255, 255, 0.05)', // Fog highlight
    ];
    const speed = 0.4;

    const blobs = colors.map((c) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      r: 0.3 + Math.random() * 0.3,
      color: c,
    }));

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      
      // Deep ocean-charcoal foundation
      ctx.fillStyle = '#091018';
      ctx.fillRect(0, 0, w, h);

      blobs.forEach((b) => {
        b.x += b.vx / (w / 100);
        b.y += b.vy / (h / 100);

        if (b.x < -0.2 || b.x > 1.2) b.vx *= -1;
        if (b.y < -0.2 || b.y > 1.2) b.vy *= -1;

        const gradX = b.x * w;
        const gradY = b.y * h;
        const gradR = b.r * Math.max(w, h);

        const grd = ctx.createRadialGradient(gradX, gradY, 0, gradX, gradY, gradR);
        grd.addColorStop(0, b.color);
        grd.addColorStop(1, 'transparent');

        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'source-over';
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-20"
      style={{ filter: 'blur(40px)' }}
    />
  );
};

export default MeshBackground;
