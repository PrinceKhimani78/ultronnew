'use client';

import { useEffect, useRef } from 'react';

type ServiceNode = {
  id: string;
  title: string;
  angle: number;
  icon: 'building' | 'bank' | 'document' | 'shield';
};

const NODES: ServiceNode[] = [
  {
    id: 'setup',
    title: 'Business Setup',
    angle: -Math.PI / 4,
    icon: 'building',
  },
  { id: 'banking', title: 'Banking', angle: Math.PI / 4, icon: 'bank' },
  {
    id: 'lending',
    title: 'Lending & Finance',
    angle: (3 * Math.PI) / 4,
    icon: 'document',
  },
  {
    id: 'compliance',
    title: 'Compliance',
    angle: (-3 * Math.PI) / 4,
    icon: 'shield',
  },
];

export function UltronFinancialCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let startTime: number | null = null;

    let targetTiltX = 0;
    let targetTiltY = 0;
    let tiltX = 0;
    let tiltY = 0;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const updateSize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      targetTiltX = Math.max(-0.06, Math.min(0.06, deltaY * 0.06));
      targetTiltY = Math.max(-0.06, Math.min(0.06, -deltaX * 0.06));
    };

    const handleMouseLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    const heroEl = document.getElementById('top') || document.body;
    heroEl.addEventListener('mousemove', handleMouseMove);
    heroEl.addEventListener('mouseleave', handleMouseLeave);

    const drawIcon = (
      c: CanvasRenderingContext2D,
      type: ServiceNode['icon'],
      x: number,
      y: number,
      size: number,
    ) => {
      c.save();
      c.translate(x, y);
      c.strokeStyle = '#FFFFFF';
      c.fillStyle = '#FFFFFF';
      c.lineWidth = 2.4;
      c.lineCap = 'round';
      c.lineJoin = 'round';

      const s = size * 0.48;

      if (type === 'building') {
        c.beginPath();
        c.rect(-s * 0.5, -s * 0.65, s * 1.0, s * 1.3);
        c.stroke();
        c.beginPath();
        c.moveTo(-s * 0.25, -s * 0.25);
        c.lineTo(-s * 0.25, -s * 0.05);
        c.moveTo(s * 0.25, -s * 0.25);
        c.lineTo(s * 0.25, -s * 0.05);
        c.moveTo(-s * 0.25, s * 0.15);
        c.lineTo(-s * 0.25, s * 0.35);
        c.moveTo(s * 0.25, s * 0.15);
        c.lineTo(s * 0.25, s * 0.35);
        c.stroke();
      } else if (type === 'bank') {
        c.beginPath();
        c.moveTo(0, -s * 0.7);
        c.lineTo(-s * 0.7, -s * 0.2);
        c.lineTo(s * 0.7, -s * 0.2);
        c.closePath();
        c.stroke();
        c.beginPath();
        c.moveTo(-s * 0.5, -s * 0.1);
        c.lineTo(-s * 0.5, s * 0.45);
        c.moveTo(-s * 0.15, -s * 0.1);
        c.lineTo(-s * 0.15, s * 0.45);
        c.moveTo(s * 0.15, -s * 0.1);
        c.lineTo(s * 0.15, s * 0.45);
        c.moveTo(s * 0.5, -s * 0.1);
        c.lineTo(s * 0.5, s * 0.45);
        c.moveTo(-s * 0.65, s * 0.55);
        c.lineTo(s * 0.65, s * 0.55);
        c.stroke();
      } else if (type === 'document') {
        c.beginPath();
        c.rect(-s * 0.45, -s * 0.65, s * 0.9, s * 1.3);
        c.stroke();
        c.beginPath();
        c.moveTo(-s * 0.25, -s * 0.3);
        c.lineTo(s * 0.25, -s * 0.3);
        c.moveTo(-s * 0.25, -0.05);
        c.lineTo(s * 0.1, -0.05);
        c.stroke();
        c.beginPath();
        c.moveTo(-s * 0.15, s * 0.25);
        c.lineTo(0, s * 0.45);
        c.lineTo(s * 0.35, s * 0.15);
        c.strokeStyle = '#FDFBEE';
        c.stroke();
      } else if (type === 'shield') {
        c.beginPath();
        c.moveTo(0, -s * 0.65);
        c.lineTo(s * 0.55, -s * 0.35);
        c.lineTo(s * 0.45, s * 0.3);
        c.lineTo(0, s * 0.65);
        c.lineTo(-s * 0.45, s * 0.3);
        c.lineTo(-s * 0.55, -s * 0.35);
        c.closePath();
        c.stroke();
        c.beginPath();
        c.moveTo(-s * 0.18, 0);
        c.lineTo(0, s * 0.18);
        c.lineTo(s * 0.22, -s * 0.12);
        c.stroke();
      }

      c.restore();
    };

    const drawCentralEmblem = (c: CanvasRenderingContext2D, size: number) => {
      c.save();

      c.shadowColor = 'rgba(2, 63, 61, 0.45)';
      c.shadowBlur = 24;
      c.shadowOffsetY = 10;

      // Outer bezel ring
      c.beginPath();
      c.arc(0, 0, size * 0.88, 0, Math.PI * 2);
      const bezelGrad = c.createLinearGradient(-size, -size, size, size);
      bezelGrad.addColorStop(0, '#046e68');
      bezelGrad.addColorStop(0.5, '#023F3D');
      bezelGrad.addColorStop(1, '#012422');
      c.fillStyle = bezelGrad;
      c.fill();
      c.shadowBlur = 0;

      // Brushed metal inner face
      c.beginPath();
      c.arc(0, 0, size * 0.8, 0, Math.PI * 2);
      const innerGrad = c.createRadialGradient(
        -size * 0.2,
        -size * 0.2,
        size * 0.1,
        0,
        0,
        size * 0.8,
      );
      innerGrad.addColorStop(0, '#057b75');
      innerGrad.addColorStop(0.4, '#035551');
      innerGrad.addColorStop(1, '#023F3D');
      c.fillStyle = innerGrad;
      c.fill();

      // Outer highlight rim
      c.beginPath();
      c.arc(0, 0, size * 0.8, -Math.PI * 0.85, -Math.PI * 0.15);
      c.strokeStyle = 'rgba(253, 251, 238, 0.45)';
      c.lineWidth = 2.5;
      c.stroke();

      // Inner Ultron Symbol
      c.save();
      c.scale(size * 0.0095, size * 0.0095);

      c.beginPath();
      c.moveTo(-35, -45);
      c.lineTo(-18, -45);
      c.lineTo(-18, 15);
      c.quadraticCurveTo(-18, 35, 0, 35);
      c.quadraticCurveTo(18, 35, 18, 15);
      c.lineTo(18, -45);
      c.lineTo(35, -45);
      c.lineTo(35, 15);
      c.quadraticCurveTo(35, 52, 0, 52);
      c.quadraticCurveTo(-35, 52, -35, 15);
      c.closePath();

      const uGrad = c.createLinearGradient(0, -45, 0, 52);
      uGrad.addColorStop(0, '#FDFBEE');
      uGrad.addColorStop(1, '#DCCB8E');
      c.fillStyle = uGrad;
      c.fill();

      c.strokeStyle = 'rgba(253, 251, 238, 0.6)';
      c.lineWidth = 2;
      c.stroke();

      c.restore();
      c.restore();
    };

    const render = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      tiltX += (targetTiltX - tiltX) * 0.08;
      tiltY += (targetTiltY - tiltY) * 0.08;

      const w = canvas.width;
      const h = canvas.height;
      const centerX = w / 2;
      const centerY = h / 2;
      const baseRadius = Math.min(w, h) * 0.42;

      ctx.clearRect(0, 0, w, h);

      const entranceProgress = prefersReducedMotion
        ? 1
        : Math.min(1, elapsed / 2000);

      const s1Progress = Math.min(1, entranceProgress / 0.35);
      const s2Progress = Math.max(
        0,
        Math.min(1, (entranceProgress - 0.25) / 0.35),
      );
      const s3Progress = Math.max(
        0,
        Math.min(1, (entranceProgress - 0.45) / 0.35),
      );
      const s4Progress = Math.max(
        0,
        Math.min(1, (entranceProgress - 0.65) / 0.35),
      );

      ctx.save();
      ctx.translate(centerX, centerY);

      const currentFloatY = prefersReducedMotion
        ? 0
        : Math.sin(now * 0.0015) * 8;
      const currentTiltX =
        tiltX + (prefersReducedMotion ? 0 : Math.cos(now * 0.001) * 0.02);
      const currentTiltY = tiltY;

      ctx.transform(
        Math.cos(currentTiltY),
        Math.sin(currentTiltX) * 0.3,
        -Math.sin(currentTiltY) * 0.3,
        Math.cos(currentTiltX),
        0,
        currentFloatY,
      );

      // Ring 04: Outer Faint Orbit
      if (s2Progress > 0) {
        ctx.save();
        ctx.globalAlpha = 0.25 * s2Progress;
        ctx.beginPath();
        ctx.arc(0, 0, baseRadius * 0.95, 0, Math.PI * 2);
        ctx.setLineDash([4, 12]);
        ctx.strokeStyle = '#035551';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      // Ring 03: Architectural Line Ring
      if (s2Progress > 0) {
        ctx.save();
        const r3Angle = prefersReducedMotion ? 0 : now * 0.00015;
        ctx.rotate(r3Angle);
        ctx.globalAlpha = 0.5 * s2Progress;
        ctx.beginPath();
        ctx.arc(0, 0, baseRadius * 0.78, 0, Math.PI * 2);
        ctx.strokeStyle = '#046e68';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([20, 10, 5, 10]);
        ctx.stroke();
        ctx.restore();
      }

      // Ring 02: Semi-Transparent Teal Glass Ring
      if (s2Progress > 0) {
        ctx.save();
        const r2Angle = prefersReducedMotion ? 0 : -now * 0.00025;
        ctx.rotate(r2Angle);
        ctx.globalAlpha = 0.7 * s2Progress;

        ctx.beginPath();
        ctx.arc(0, 0, baseRadius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(3, 85, 81, 0.4)';
        ctx.lineWidth = 8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, baseRadius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = '#057b75';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([60, 40]);
        ctx.stroke();

        for (let i = 0; i < 6; i++) {
          const nodeAng = (i * Math.PI) / 3;
          const nx = Math.cos(nodeAng) * baseRadius * 0.6;
          const ny = Math.sin(nodeAng) * baseRadius * 0.6;

          ctx.beginPath();
          ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#FDFBEE';
          ctx.fill();
        }
        ctx.restore();
      }

      // Ring 01: Brushed Deep-Teal Metal Ring
      if (s2Progress > 0) {
        ctx.save();
        const r1Angle = prefersReducedMotion ? 0 : now * 0.0003;
        ctx.rotate(r1Angle);
        ctx.globalAlpha = 0.9 * s2Progress;

        ctx.beginPath();
        ctx.arc(0, 0, baseRadius * 0.4, 0, Math.PI * 2);
        ctx.strokeStyle = '#023F3D';
        ctx.lineWidth = 12;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, baseRadius * 0.4, 0, Math.PI * 2);
        ctx.strokeStyle = '#057b75';
        ctx.lineWidth = 2;
        ctx.stroke();

        for (let i = 0; i < 12; i++) {
          const tickAng = (i * Math.PI) / 6;
          const tx1 = Math.cos(tickAng) * baseRadius * 0.36;
          const ty1 = Math.sin(tickAng) * baseRadius * 0.36;
          const tx2 = Math.cos(tickAng) * baseRadius * 0.43;
          const ty2 = Math.sin(tickAng) * baseRadius * 0.43;

          ctx.beginPath();
          ctx.moveTo(tx1, ty1);
          ctx.lineTo(tx2, ty2);
          ctx.strokeStyle = 'rgba(253, 251, 238, 0.5)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Connecting Paths & Energy Pulses
      if (s3Progress > 0) {
        const orbitRadius = baseRadius * 0.78 * s3Progress;

        NODES.forEach((node, idx) => {
          const endX = Math.cos(node.angle) * orbitRadius;
          const endY = Math.sin(node.angle) * orbitRadius;

          ctx.save();
          ctx.globalAlpha = 0.4 * s3Progress;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = 'rgba(3, 85, 81, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.restore();

          if (s4Progress > 0 && !prefersReducedMotion) {
            const pulsePeriod = 3000;
            const pulseTime = (now + idx * 750) % pulsePeriod;
            const pulsePos = 1 - pulseTime / pulsePeriod;

            const px = endX * pulsePos;
            const py = endY * pulsePos;

            ctx.save();
            ctx.globalAlpha = 0.8 * Math.sin(pulsePos * Math.PI) * s4Progress;
            ctx.beginPath();
            ctx.arc(px, py, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = '#057b75';
            ctx.shadowColor = '#057b75';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.restore();
          }
        });
      }

      // Central Ultron Emblem (Stage 1)
      if (s1Progress > 0) {
        ctx.save();
        ctx.globalAlpha = s1Progress;
        const emblemScale = 0.88 + 0.12 * s1Progress;
        ctx.scale(emblemScale, emblemScale);
        drawCentralEmblem(ctx, baseRadius * 0.32);
        ctx.restore();
      }

      // Financial Service Nodes (Stage 3) - Prominent enlarged size (clamp ~58px-76px diameter)
      if (s3Progress > 0) {
        const orbitRadius = baseRadius * 0.78 * s3Progress;
        // Node diameter = nodeRadius * 2 -> clamp(58px, 4.2vw, 76px) equivalent in canvas units
        const nodeRadius = Math.max(28, Math.min(38, baseRadius * 0.14));

        NODES.forEach((node) => {
          const nx = Math.cos(node.angle) * orbitRadius;
          const ny = Math.sin(node.angle) * orbitRadius;

          ctx.save();
          ctx.globalAlpha = s3Progress;

          // Shadow for node badge
          ctx.shadowColor = 'rgba(2, 63, 61, 0.4)';
          ctx.shadowBlur = 12;
          ctx.shadowOffsetY = 4;

          // Outer glass ring badge
          ctx.beginPath();
          ctx.arc(nx, ny, nodeRadius, 0, Math.PI * 2);
          const glassGrad = ctx.createRadialGradient(
            nx - nodeRadius * 0.3,
            ny - nodeRadius * 0.3,
            2,
            nx,
            ny,
            nodeRadius,
          );
          glassGrad.addColorStop(0, '#057b75');
          glassGrad.addColorStop(0.65, '#035551');
          glassGrad.addColorStop(1, '#023F3D');
          ctx.fillStyle = glassGrad;
          ctx.fill();

          ctx.shadowBlur = 0;

          // Outer highlight border
          ctx.beginPath();
          ctx.arc(nx, ny, nodeRadius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(253, 251, 238, 0.6)';
          ctx.lineWidth = 2.2;
          ctx.stroke();

          // Prominent Icon Symbol
          drawIcon(ctx, node.icon, nx, ny, nodeRadius * 1.0);

          ctx.restore();
        });
      }

      ctx.restore();

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', updateSize);
      heroEl.removeEventListener('mousemove', handleMouseMove);
      heroEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="financial-core-wrapper pointer-events-none relative mx-auto flex aspect-square w-[min(340px,82vw)] items-center justify-center sm:w-[400px] lg:mx-0 lg:w-[480px] xl:w-[540px]"
      aria-label="Ultron Financial Core animation"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none h-full w-full object-contain"
      />
    </div>
  );
}
