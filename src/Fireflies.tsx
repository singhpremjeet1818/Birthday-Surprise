import { useEffect, useRef } from "react";

const FirefliesCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireflies: any[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createFireflies = (count: number) => {
      for (let i = 0; i < count; i++) {
        fireflies.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          dx: Math.random() * 0.6 - 0.3,
          dy: Math.random() * 0.6 - 0.3,
          alpha: Math.random(),
          glowSpeed: Math.random() * 0.01 + 0.002,
        });
      }
    };

    createFireflies(15);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let firefly of fireflies) {
        // Update position
        firefly.x += firefly.dx;
        firefly.y += firefly.dy;

        // Bounce off edges (X-axis)
        if (firefly.x < 0 || firefly.x > canvas.width) {
          firefly.dx *= -1;
        }

        // Bounce off edges (Y-axis)
        if (firefly.y < 0 || firefly.y > canvas.height) {
          firefly.dy *= -1;
        }

        // Glow effect
        firefly.alpha += firefly.glowSpeed;
        if (firefly.alpha > 1 || firefly.alpha < 0) {
          firefly.glowSpeed = -firefly.glowSpeed;
        }

        // Draw firefly
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 180, ${firefly.alpha})`;
        ctx.shadowColor = "rgba(255, 255, 180, 0.5)";
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed bottom-0 left-0 w-full h-[50vh] pointer-events-none z-10"
    />
  );
};

export default FirefliesCanvas;
