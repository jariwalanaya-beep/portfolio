import { useEffect, useRef } from 'react';

const MobiusStrip = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Scale for high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    const width = 800;
    const height = 800;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Ribbon geometry
    const mR = 260;       // Radius/scale of figure 8
    const maxV = 55;      // Width of the strip
    const stepsU = 130;   // Reduced length resolution to reduce particles
    const stepsV = 6;     // Width resolution (number of particle streams)
    
    let mFrame = 0;
    let animationId: number;

    const render = () => {
      mFrame++;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      
      const time = mFrame * 0.007; // Smooth global time
      
      // Slight fixed tilt X so we view it beautifully
      const tiltX = 0.5;
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);
      
      // Gentle wobble in Z and Y for organic feel, but mostly stationary
      const wobbleZ = Math.sin(time * 0.5) * 0.1;
      const cosZ = Math.cos(wobbleZ);
      const sinZ = Math.sin(wobbleZ);

      const wobbleY = Math.cos(time * 0.3) * 0.1;
      const cosY = Math.cos(wobbleY);
      const sinY = Math.sin(wobbleY);

      const particles: { sx: number, sy: number, scale: number }[] = [];

      // Calculate 3D points
      for (let j = 0; j <= stepsV; j++) {
        // Evaluate v from -maxV to +maxV
        const v = -maxV + (j / stepsV) * (maxV * 2);

        // We go to stepsU * 2 to cover 4PI for closing the loop
        for (let i = 0; i <= stepsU * 2; i++) {
          
          // Introduce a slight pseudo-random jiggle to particles across paths 
          // so it doesn't look like a completely rigid grid. 
          // The deterministic pseudo-random offset is based on i and j.
          const offsetU = Math.sin(i * 13.5 + j * 7.1) * 0.02;
          const offsetV = Math.cos(i * 11.2 - j * 5.3) * 2.0;

          // Slow down the travel time significantly for an elegant smooth crawl
          const u = (i / stepsU) * Math.PI * 2 + time * 0.3 + offsetU; 
          
          // Pure Figure-8 (Lemniscate of Gerono) base curve
          const bx = mR * Math.cos(u);
          const by = mR * Math.sin(u) * Math.cos(u);
          const bz = (mR * 0.3) * Math.sin(u);

          // Sub-tangents to find normal
          const dx = -mR * Math.sin(u);
          const dy = mR * (Math.cos(u) * Math.cos(u) - Math.sin(u) * Math.sin(u));
          const len = Math.sqrt(dx*dx + dy*dy);
          const nx = -dy / len;
          const ny = dx / len;

          const twist = u / 2;
          
          const adjustedV = v + offsetV;
          
          // Twist the strip width
          const x = bx + adjustedV * Math.cos(twist) * nx;
          const y = by + adjustedV * Math.cos(twist) * ny;
          const z = bz + adjustedV * Math.sin(twist);

          // Apply 3D Rotations
          const rx1 = x * cosZ - y * sinZ;
          const ry1 = x * sinZ + y * cosZ;
          const rz1 = z;

          const rx2 = rx1 * cosY + rz1 * sinY;
          const rz2 = -rx1 * sinY + rz1 * cosY;
          
          const ry3 = ry1 * cosX - rz2 * sinX;
          const rz3 = ry1 * sinX + rz2 * cosX;
          
          // Perspective
          const fov = 1000;
          const depth = fov + rz3;
          const scale = depth > 0 ? fov / depth : 0;

          if (scale > 0 && cx + rx2 * scale > 0 && cx + rx2 * scale < width) {
            particles.push({
              sx: cx + rx2 * scale,
              sy: cy + ry3 * scale,
              scale: scale
            });
          }
        }
      }

      // Sort particles back-to-front based on perspective scale (farthest first)
      particles.sort((a, b) => a.scale - b.scale);

      // Pre-calculate fill styles up to 2 decimal places to avoid string interpolation overhead in loop
      const alphaCache = new Map();
      const getAlphaColor = (s: number) => {
        const val = Math.min(1, Math.max(0.1, s * 1.5 - 0.3)).toFixed(2);
        if (!alphaCache.has(val)) alphaCache.set(val, `rgba(34, 197, 94, ${val})`);
        return alphaCache.get(val);
      };

      ctx.shadowBlur = 0; // Disable heavy canvas shadows completely, rely on sizes representing depth

      // Draw particles
      particles.forEach((p) => {
        const s = Math.max(0.1, p.scale);
        const size = s * 1.8;
        
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fillStyle = getAlphaColor(s) as string;
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    }
    
    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square pointer-events-none z-[50] lg:right-10 flex items-center justify-center opacity-90 transition-opacity duration-1000">
      <div className="relative w-full h-full flex items-center justify-center bg-primary/[0.02] rounded-full shadow-[0_0_80px_rgba(34,197,94,0.05)]">
        <canvas 
          ref={canvasRef} 
          className="w-[120%] h-[120%] max-w-none object-contain"
          style={{ mixBlendMode: 'screen' }}
        />
      </div>
    </div>
  );
};

export default MobiusStrip;
