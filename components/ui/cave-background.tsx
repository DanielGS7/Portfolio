'use client';

import { useEffect, useRef } from 'react';

interface CaveBackgroundProps {
  className?: string;
  depth?: number;
  maxDepth?: number;
  scale?: number;
}

export function CaveBackground({ className = '', depth = 0, maxDepth = 4, scale = 1.0 }: CaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const depthRef = useRef(depth);

  // Calculate canvas scale to match cave entrance scaling
  // Background scales proportionally to entrance to maintain sync on all screen sizes
  // Formula: bg = (entrance - 1.0) * factor + initial
  // This ensures they scale at the same rate regardless of viewport
  const getCanvasTransform = () => {
    // Scale: proportional to entrance scale, starts at 0.25 when entrance is 1.0
    // Use consistent multiplier - entrance already has built-in acceleration at depth >= 2
    // so background will automatically accelerate with it
    const scaleFactor = 0.25;

    // Linear relationship: as entrance scales, background scales proportionally
    const canvasScale = Math.min(1.0, (scale - 1.0) * scaleFactor + 0.25);

    return {
      scale: canvasScale,
      top: '0%', // Always at top
    };
  };

  const transform = getCanvasTransform();

  useEffect(() => {
    depthRef.current = depth;
  }, [depth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    let time = 0;
    let animationId: number;

    // Configuration
    const parallaxStrength = 0.05;
    const stalactiteCount = 15;
    const stalagmiteCount = 12;
    const crystalCount = 30;
    const crystalGlowSpeed = 0.002;
    const crystalMinPulse = 0.3;
    const crystalMaxPulse = 1;
    const crystalFloatSpeed = 0.0008;
    const crystalFloatRange = 30;
    const mouseInfluenceRadius = 300;
    const depthRingCount = 5;
    const depthRingRoughness = 0.15;
    const formationLengthMultiplier = 2.5;

    // Check if we're in light or dark mode
    const isDarkMode = () => document.documentElement.classList.contains('dark');

    const colorPalettes = {
      night: {
        background: { r: 10, g: 10, b: 10 },
        ambient: { r: 20, g: 30, b: 50 },
        crystal: { r: 245, g: 200, b: 66 }, // Primary color
        layers: [
          'rgb(15, 15, 25)',
          'rgb(25, 25, 35)',
          'rgb(35, 35, 50)',
          'rgb(45, 45, 60)'
        ],
        depthRings: [
          'rgba(20, 25, 40, 0.15)',
          'rgba(25, 30, 45, 0.12)',
          'rgba(30, 35, 50, 0.1)',
          'rgba(35, 40, 55, 0.08)',
          'rgba(40, 45, 60, 0.05)'
        ]
      },
      day: {
        background: { r: 245, g: 230, b: 211 },
        ambient: { r: 220, g: 180, b: 140 },
        crystal: { r: 226, g: 174, b: 43 }, // Primary color for day
        layers: [
          'rgb(180, 140, 100)',
          'rgb(160, 120, 85)',
          'rgb(140, 100, 70)',
          'rgb(120, 85, 60)'
        ],
        depthRings: [
          'rgba(140, 110, 80, 0.08)',
          'rgba(130, 100, 70, 0.06)',
          'rgba(120, 90, 65, 0.05)',
          'rgba(110, 80, 55, 0.04)',
          'rgba(100, 70, 50, 0.03)'
        ]
      }
    };

    let currentPalette = isDarkMode() ? colorPalettes.night : colorPalettes.day;
    let targetPalette = currentPalette;
    let transitionProgress = 1;

    // Observe theme changes
    const observer = new MutationObserver(() => {
      targetPalette = isDarkMode() ? colorPalettes.night : colorPalettes.day;
      transitionProgress = 0;
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    function lerpColor(color1: any, color2: any, t: number) {
      return {
        r: color1.r + (color2.r - color1.r) * t,
        g: color1.g + (color2.g - color1.g) * t,
        b: color1.b + (color2.b - color1.b) * t
      };
    }

    function updatePalette() {
      if (transitionProgress < 1) {
        transitionProgress = Math.min(1, transitionProgress + 0.02);

        currentPalette = {
          background: lerpColor(currentPalette.background, targetPalette.background, 0.02),
          ambient: lerpColor(currentPalette.ambient, targetPalette.ambient, 0.02),
          crystal: lerpColor(currentPalette.crystal, targetPalette.crystal, 0.02),
          layers: targetPalette.layers,
          depthRings: targetPalette.depthRings
        };
      }
    }

    class DepthRing {
      depth: number;
      index: number;
      offsetX: number = 0;
      offsetY: number = 0;
      points: Array<{ x: number; y: number }> = [];

      constructor(depth: number, index: number) {
        this.depth = depth;
        this.index = index;
        this.generateRoughCircle();
      }

      generateRoughCircle() {
        const centerX = width / 2;
        const centerY = height / 2;
        const baseRadius = Math.max(width, height) * (0.3 + this.index * 0.15);
        const segments = 40;

        this.points = [];
        for (let i = 0; i < segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          const roughness = (Math.random() - 0.5) * baseRadius * depthRingRoughness;
          const radius = baseRadius + roughness;

          this.points.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius
          });
        }
      }

      update() {
        const targetX = (mouse.x - width / 2) * this.depth * parallaxStrength;
        const targetY = (mouse.y - height / 2) * this.depth * parallaxStrength;

        this.offsetX += (targetX - this.offsetX) * 0.1;
        this.offsetY += (targetY - this.offsetY) * 0.1;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.offsetX, this.offsetY);

        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 0; i < this.points.length; i++) {
          const nextIndex = (i + 1) % this.points.length;
          const current = this.points[i];
          const next = this.points[nextIndex];

          const cpX = (current.x + next.x) / 2;
          const cpY = (current.y + next.y) / 2;

          ctx.quadraticCurveTo(current.x, current.y, cpX, cpY);
        }

        ctx.closePath();
        ctx.fillStyle = currentPalette.depthRings[this.index];
        ctx.fill();

        // Remove stroke to eliminate "white outline" effect
        // ctx.strokeStyle = currentPalette.depthRings[this.index].replace(/[\d.]+\)/, '0.6)');
        // ctx.lineWidth = 2;
        // ctx.stroke();

        ctx.restore();
      }
    }

    class CaveLayer {
      depth: number;
      colorIndex: number;
      offsetX: number = 0;
      offsetY: number = 0;

      constructor(depth: number, colorIndex: number) {
        this.depth = depth;
        this.colorIndex = colorIndex;
      }

      update() {
        const targetX = (mouse.x - width / 2) * this.depth * parallaxStrength;
        const targetY = (mouse.y - height / 2) * this.depth * parallaxStrength;

        this.offsetX += (targetX - this.offsetX) * 0.1;
        this.offsetY += (targetY - this.offsetY) * 0.1;
      }

      getColor() {
        return currentPalette.layers[this.colorIndex];
      }

      drawStalactite(x: number, baseWidth: number, length: number) {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.offsetX, this.offsetY);

        ctx.beginPath();
        ctx.moveTo(x, -length * 0.5);

        const segments = 10;
        for (let i = 0; i <= segments; i++) {
          const progress = i / segments;
          const y = -length * 0.5 + length * progress;
          const w = baseWidth * (1 - progress * 0.7) * (1 + Math.sin(progress * Math.PI * 3) * 0.1);
          ctx.lineTo(x - w / 2, y);
        }

        for (let i = segments; i >= 0; i--) {
          const progress = i / segments;
          const y = -length * 0.5 + length * progress;
          const w = baseWidth * (1 - progress * 0.7) * (1 + Math.sin(progress * Math.PI * 3) * 0.1);
          ctx.lineTo(x + w / 2, y);
        }

        ctx.closePath();

        const color = this.getColor();
        const gradient = ctx.createLinearGradient(x, -length * 0.5, x, -length * 0.5 + length);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, this.adjustBrightness(color, 0.3));

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = this.adjustBrightness(color, 0.5);
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }

      drawStalagmite(x: number, baseWidth: number, length: number) {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.offsetX, this.offsetY);

        ctx.beginPath();
        ctx.moveTo(x, height + length * 0.5);

        const segments = 10;
        for (let i = 0; i <= segments; i++) {
          const progress = i / segments;
          const y = height + length * 0.5 - length * progress;
          const w = baseWidth * (1 - progress * 0.7) * (1 + Math.sin(progress * Math.PI * 3) * 0.15);
          ctx.lineTo(x - w / 2, y);
        }

        for (let i = segments; i >= 0; i--) {
          const progress = i / segments;
          const y = height + length * 0.5 - length * progress;
          const w = baseWidth * (1 - progress * 0.7) * (1 + Math.sin(progress * Math.PI * 3) * 0.15);
          ctx.lineTo(x + w / 2, y);
        }

        ctx.closePath();

        const color = this.getColor();
        const gradient = ctx.createLinearGradient(x, height + length * 0.5, x, height + length * 0.5 - length);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, this.adjustBrightness(color, 0.3));

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = this.adjustBrightness(color, 0.5);
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }

      adjustBrightness(color: string, factor: number) {
        const rgb = color.match(/\d+/g);
        if (!rgb) return color;
        return `rgb(${Math.floor(parseInt(rgb[0]) * factor)}, ${Math.floor(parseInt(rgb[1]) * factor)}, ${Math.floor(parseInt(rgb[2]) * factor)})`;
      }
    }

    class Crystal {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      baseSize: number;
      size: number;
      layer: CaveLayer;
      pulseOffset: number;
      floatOffset: number;
      glowIntensity: number = 0.5;

      constructor(x: number, y: number, size: number, layer: CaveLayer) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.baseSize = size;
        this.size = size;
        this.layer = layer;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.floatOffset = Math.random() * Math.PI * 2;
      }

      update() {
        const pulse = Math.sin(time * crystalGlowSpeed + this.pulseOffset);
        this.glowIntensity = crystalMinPulse + (pulse + 1) / 2 * (crystalMaxPulse - crystalMinPulse);

        const floatY = Math.sin(time * crystalFloatSpeed + this.floatOffset) * crystalFloatRange;
        this.y = this.baseY + floatY;

        const dx = mouse.x - (this.x + this.layer.offsetX);
        const dy = mouse.y - (this.y + this.layer.offsetY);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInfluenceRadius) {
          const influence = 1 - (distance / mouseInfluenceRadius);
          this.glowIntensity += influence * 0.5;
        }

        this.size = this.baseSize * (0.8 + this.glowIntensity * 0.3);
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.layer.offsetX, this.layer.offsetY);

        const crystalColor = currentPalette.crystal;

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, `rgba(${crystalColor.r}, ${crystalColor.g}, ${crystalColor.b}, ${this.glowIntensity * 0.8})`);
        gradient.addColorStop(0.3, `rgba(${crystalColor.r}, ${crystalColor.g}, ${crystalColor.b}, ${this.glowIntensity * 0.4})`);
        gradient.addColorStop(1, `rgba(${crystalColor.r}, ${crystalColor.g}, ${crystalColor.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${Math.min(255, crystalColor.r + 50)}, ${Math.min(255, crystalColor.g + 50)}, ${Math.min(255, crystalColor.b + 50)}, ${this.glowIntensity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Initialize elements
    const depthRings: DepthRing[] = [];
    for (let i = 0; i < depthRingCount; i++) {
      depthRings.push(new DepthRing(0.3 + i * 0.2, i));
    }

    const layers = [
      new CaveLayer(1.5, 0),
      new CaveLayer(1.2, 1),
      new CaveLayer(0.8, 2),
      new CaveLayer(0.4, 3)
    ];

    const stalactites: Array<{ x: number; width: number; length: number; layer: CaveLayer }> = [];
    for (let i = 0; i < stalactiteCount; i++) {
      const layerIndex = Math.floor(Math.random() * layers.length);
      stalactites.push({
        x: Math.random() * width,
        width: 20 + Math.random() * 40,
        length: (50 + Math.random() * 150) * formationLengthMultiplier,
        layer: layers[layerIndex]
      });
    }

    const stalagmites: Array<{ x: number; width: number; length: number; layer: CaveLayer }> = [];
    for (let i = 0; i < stalagmiteCount; i++) {
      const layerIndex = Math.floor(Math.random() * layers.length);
      stalagmites.push({
        x: Math.random() * width,
        width: 25 + Math.random() * 50,
        length: (60 + Math.random() * 180) * formationLengthMultiplier,
        layer: layers[layerIndex]
      });
    }

    const crystals: Crystal[] = [];
    for (let i = 0; i < crystalCount; i++) {
      const layerIndex = Math.floor(Math.random() * (layers.length - 1));
      const isTop = Math.random() > 0.5;
      const margin = 100;

      crystals.push(new Crystal(
        margin + Math.random() * (width - margin * 2),
        isTop ? margin + Math.random() * 200 : height - margin - Math.random() * 200,
        3 + Math.random() * 5,
        layers[layerIndex]
      ));
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    }

    function handleResize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
      depthRings.forEach(ring => ring.generateRoughCircle());
    }

    function animate() {
      if (!ctx) return;

      time++;
      updatePalette();

      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Clear background with solid color
      const bgColor = currentPalette.background;
      ctx.fillStyle = `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`;
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient lighting without visible gradient oval
      const ambientColor = currentPalette.ambient;
      const ambientGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height)
      );
      ambientGradient.addColorStop(0, `rgba(${ambientColor.r}, ${ambientColor.g}, ${ambientColor.b}, 0.1)`);
      ambientGradient.addColorStop(1, `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, 0)`);
      ctx.fillStyle = ambientGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw depth rings
      depthRings.forEach(ring => {
        ring.update();
        ring.draw();
      });

      layers.forEach(layer => layer.update());

      // Draw stalactites (from ceiling)
      for (let i = layers.length - 1; i >= 0; i--) {
        stalactites.filter(s => s.layer === layers[i]).forEach(stalactite => {
          stalactite.layer.drawStalactite(stalactite.x, stalactite.width, stalactite.length);
        });

        // Skip stalagmites to avoid "grass" effect
        // stalagmites.filter(s => s.layer === layers[i]).forEach(stalagmite => {
        //   stalagmite.layer.drawStalagmite(stalagmite.x, stalagmite.width, stalagmite.length);
        // });
      }

      // Draw crystals
      crystals.forEach(crystal => {
        crystal.update();
        crystal.draw();
      });

      animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed pointer-events-none ${className}`}
      style={{
        zIndex: 2,
        left: '50%',
        top: transform.top,
        transform: `translateX(-50%) scale(${transform.scale})`,
        transformOrigin: 'center 65%', // Match cave entrance transform origin for aligned scaling
        width: '100vw',
        height: '100vh',
        transition: 'transform 1.2s cubic-bezier(0.43, 0.13, 0.23, 0.96)',
      }}
    />
  );
}
