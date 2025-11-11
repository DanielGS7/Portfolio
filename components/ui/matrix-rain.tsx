'use client';

import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  sentences?: string[];
  maxDrops?: number;
  fontSize?: number;
  speed?: number;
  glowRadius?: number;
}

export default function MatrixRain({
  sentences = [
    'CODE CREATE BUILD',
    'WEB DEVELOPER',
    'MIXED REALITY',
    'ALWAYS LEARNING',
    'INNOVATION FIRST',
    'DIGITAL DREAMS'
  ],
  maxDrops = 4,
  fontSize = 14,
  speed = 0.15,
  glowRadius = 150
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Detect theme
    const isDarkMode = () => document.documentElement.classList.contains('dark');

    const getColors = () => {
      const dark = isDarkMode();
      return {
        base: dark ? { r: 0, g: 255, b: 0 } : { r: 0, g: 120, b: 0 },
        glow: dark ? { r: 0, g: 255, b: 255 } : { r: 0, g: 80, b: 180 }
      };
    };

    const trailLength = 52; // Halved from 105 for faster visual refresh
    const colorVariation = 0.15;
    const glowIntensityMultiplier = 1.5;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let columns = Math.floor(width / fontSize);
    let drops: Drop[] = [];
    let mouse = { x: -1000, y: -1000 };
    let animationId: number;

    class Drop {
      x: number;
      y: number;
      speed: number;
      sentenceIndex: number;
      sentence: string[];
      charIndex: number;
      trail: Array<{ char: string; y: number; colorVar: number }>;
      lastFloorY: number;

      constructor(x: number) {
        this.x = x;
        this.y = 0;
        // Increased minimum speed: base 0.25 + random 0.15 = range 0.25 to 0.4
        this.speed = Math.random() * 0.15 + 0.25;
        this.sentenceIndex = Math.floor(Math.random() * sentences.length);
        // Add space at end so when sentence loops, there's separation
        this.sentence = (sentences[this.sentenceIndex] + ' ').split('');
        this.charIndex = 0;
        this.trail = [];
        this.lastFloorY = -1; // Track last integer position to ensure one char per row
      }

      getNextChar(): string {
        const char = this.sentence[this.charIndex % this.sentence.length];
        this.charIndex++;
        return char;
      }

      update(): void {
        this.y += this.speed;

        // Only add character when crossing into a new integer row
        const currentFloorY = Math.floor(this.y);
        if (currentFloorY !== this.lastFloorY) {
          this.trail.unshift({
            char: this.getNextChar(),
            y: currentFloorY,
            colorVar: (Math.random() - 0.5) * colorVariation
          });

          this.lastFloorY = currentFloorY;

          if (this.trail.length > trailLength) {
            this.trail.pop();
          }
        }

        if (this.y > height / fontSize + trailLength) {
          // Remove this drop when it's done
          const index = drops.indexOf(this);
          if (index > -1) {
            drops.splice(index, 1);
          }
        }
      }

      draw(): void {
        if (!ctx) return;
        const x = this.x * fontSize;
        const colors = getColors();

        this.trail.forEach((item, i) => {
          const y = item.y * fontSize;
          if (y < 0 || y > height) return;

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let alpha = (1 - i / this.trail.length) * 0.5; // Reduced opacity for subtlety
          let r = colors.base.r;
          let g = colors.base.g;
          let b = colors.base.b;

          r += (Math.random() - 0.5) * colorVariation * 255;
          g += (Math.random() - 0.5) * colorVariation * 255 + item.colorVar * 50;
          b += (Math.random() - 0.5) * colorVariation * 255;

          r = Math.max(0, Math.min(255, r));
          g = Math.max(0, Math.min(255, g));
          b = Math.max(0, Math.min(255, b));

          let glowIntensity = 0;

          if (distance < glowRadius) {
            const proximity = 1 - (distance / glowRadius);
            glowIntensity = proximity * glowIntensityMultiplier;

            r = Math.round(r + (colors.glow.r - r) * proximity);
            g = Math.round(g + (colors.glow.g - g) * proximity);
            b = Math.round(b + (colors.glow.b - b) * proximity);

            alpha = Math.min(0.8, alpha + proximity * 0.5); // Still subtle even with glow
          }

          const color = `rgb(${r}, ${g}, ${b})`;

          if (i === 0) {
            alpha = Math.min(0.9, alpha + 0.3); // Brighter head but still subtle
            ctx.shadowBlur = glowIntensity * 20;
            ctx.shadowColor = color;
          } else {
            ctx.shadowBlur = glowIntensity * 10;
            ctx.shadowColor = color;
          }

          ctx.fillStyle = color;
          ctx.globalAlpha = alpha;
          ctx.textBaseline = 'top';
          ctx.font = `${fontSize}px 'Courier New', monospace`;
          ctx.fillText(item.char, x, y);
        });

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    function spawnDrop(): void {
      if (drops.length < maxDrops) {
        const randomColumn = Math.floor(Math.random() * columns);
        drops.push(new Drop(randomColumn));
      }
    }

    function handleResize(): void {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
    }

    function handleMouseMove(e: MouseEvent): void {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function handleMouseLeave(): void {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    let lastTime = 0;
    let lastSpawnTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    const spawnInterval = 3000; // Spawn a new drop every 3 seconds

    function animate(currentTime: number): void {
      if (!ctx) return;
      if (currentTime - lastTime < frameInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      // Try to spawn a new drop occasionally
      if (currentTime - lastSpawnTime > spawnInterval) {
        spawnDrop();
        lastSpawnTime = currentTime;
      }

      // Clear with very high transparency for subtle fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      drops.forEach(drop => {
        drop.update();
        drop.draw();
      });

      animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Start with one drop
    spawnDrop();
    animate(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [sentences, maxDrops, fontSize, speed, glowRadius]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
