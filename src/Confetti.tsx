import React, { useEffect, useRef } from "react";

class Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  gravity: number;
  color: string;

  constructor(canvasWidth: number, canvasHeight: number) {
    const angle = Math.random() * Math.PI / 2 + Math.PI; // shoot up-left
    const speed = Math.random() * 5 + 4;

    this.x = canvasWidth;
    this.y = canvasHeight;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 6;
    this.size = Math.random() * 4 + 2;
    this.gravity = 0.05;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }

  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.01;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

const ConfettiBlast: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparkles = useRef<Sparkle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createSparkles = (count: number) => {
      for (let i = 0; i < count; i++) {
        sparkles.current.push(new Sparkle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparkles.current.forEach((s, index) => {
        s.update();
        s.draw(ctx);
        if (s.alpha <= 0) {
          sparkles.current.splice(index, 1);
        }
      });
      requestAnimationFrame(animate);
    };

    createSparkles(100);
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("click", () => createSparkles(100));

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default ConfettiBlast;
