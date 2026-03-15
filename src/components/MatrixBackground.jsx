import { useEffect, useRef } from 'react';

export default function MatrixBackground({ density = 0.3 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars =
      '01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>{}[]|\\/*&^%$#@!~';
    const fontSize = 13;
    let cols = Math.floor((canvas.width / fontSize) * density);
    const drops = Array(cols).fill(1);

    let animId;
    const draw = () => {
      ctx.fillStyle = 'rgba(5, 8, 16, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(0, 212, 255, 0.15)';
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle =
          Math.random() > 0.98
            ? 'rgba(0, 255, 136, 0.8)'
            : 'rgba(0, 212, 255, 0.12)';
        ctx.fillText(char, i * (canvas.width / cols), drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
}
