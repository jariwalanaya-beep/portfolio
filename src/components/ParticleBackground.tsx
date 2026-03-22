import { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let stars: Star[] = [];
    let animationFrameId: number;

    const numStars = 600;
    let centerX: number;
    let centerY: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Star {
      x: number;
      y: number;
      z: number;
      pz: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width - centerX;
        this.y = Math.random() * canvas.height - centerY;
        this.z = Math.random() * canvas.width;
        this.pz = this.z;

        const rand = Math.random();
        if (rand < 0.3) {
          this.color = "34, 197, 94"; // Target green
        } else if (rand < 0.8) {
          this.color = "74, 222, 128"; // Lighter green
        } else {
          this.color = "21, 128, 61"; // Darker green
        }
      }

      update() {
        this.z -= 0.8;
        if (this.z < 1) {
          this.z = canvas.width;
          this.x = Math.random() * canvas.width - centerX;
          this.y = Math.random() * canvas.height - centerY;
          this.pz = this.z;
        }
      }

      draw() {
        if (!ctx) return;

        const sx = (this.x / this.z) * canvas.width + centerX;
        const sy = (this.y / this.z) * canvas.width + centerY;

        const size = Math.max(0.5, (1 - this.z / canvas.width) * 4);
        const opacity = (1 - this.z / canvas.width) * 0.9;

        ctx.fillStyle = `rgba(${this.color}, ${opacity})`;
        ctx.fillRect(sx - size / 2, sy - size / 2, size, size);

        this.pz = this.z;
      }
    }

    const init = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-80"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
