'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as THREE from 'three';

/**
 * Creates a glowing circle texture for particles.
 */
function createParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(253, 251, 238, 0.9)');
    gradient.addColorStop(0.3, 'rgba(220, 203, 142, 0.6)');
    gradient.addColorStop(0.6, 'rgba(3, 85, 81, 0.4)');
    gradient.addColorStop(1, 'rgba(3, 85, 81, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Samples visible pixels directly from the official Ultron 'UF' logo emblem (/brand/logo-icon-green.webp).
 */
async function sampleOfficialLogoPoints(
  imageSrc: string,
  targetCount: number,
): Promise<{ x: number; y: number; z: number; isHighlight: boolean }[]> {
  return new Promise((resolve) => {
    const img = new window.Image();

    img.onload = () => {
      const sampleWidth = 240;
      const sampleHeight = 240;
      const canvas = document.createElement('canvas');
      canvas.width = sampleWidth;
      canvas.height = sampleHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve([]);

      ctx.clearRect(0, 0, sampleWidth, sampleHeight);
      ctx.drawImage(img, 0, 0, sampleWidth, sampleHeight);

      let imgData: ImageData;
      try {
        imgData = ctx.getImageData(0, 0, sampleWidth, sampleHeight);
      } catch {
        return resolve([]);
      }

      const data = imgData.data;
      const rawPoints: { x: number; y: number }[] = [];

      for (let y = 0; y < sampleHeight; y++) {
        for (let x = 0; x < sampleWidth; x++) {
          const idx = (y * sampleWidth + x) * 4;
          const alpha = data[idx + 3];

          // Sample visible emblem pixels (alpha > 50)
          if (alpha > 50) {
            rawPoints.push({
              x: (x / sampleWidth - 0.5) * 3.2,
              y: -(y / sampleHeight - 0.5) * 3.2, // Flip Y for WebGL 3D coordinates
            });
          }
        }
      }

      if (rawPoints.length === 0) return resolve([]);

      const points: { x: number; y: number; z: number; isHighlight: boolean }[] = [];
      const step = Math.max(1, Math.floor(rawPoints.length / targetCount));

      for (
        let i = 0;
        i < rawPoints.length && points.length < targetCount;
        i += step
      ) {
        const pt = rawPoints[i];
        const z = (Math.random() - 0.5) * 0.35;
        const isHighlight = Math.random() < 0.15;
        points.push({
          x: pt.x,
          y: pt.y,
          z,
          isHighlight,
        });
      }

      resolve(points);
    };

    img.onerror = () => resolve([]);
    img.src = imageSrc;
  });
}

export function HeroUFParticleLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect WebGL capability safely
    try {
      const testCanvas = document.createElement('canvas');
      const gl =
        testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setTimeout(() => setWebglSupported(false), 0);
        return;
      }
    } catch {
      setTimeout(() => setWebglSupported(false), 0);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    // Determine particle count based on screen size
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    const logoTargetCount = isMobile ? 350 : isTablet ? 700 : 1400;
    const ambientTargetCount = isMobile ? 30 : isTablet ? 70 : 120;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.4;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setClearAlpha(0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    if (renderer.domElement) {
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.background = 'transparent';
    }
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Particle Texture
    const particleTexture = createParticleTexture();

    let animationFrameId: number;
    let isIntersecting = true;
    let assemblyProgress = prefersReducedMotion ? 1.0 : 0.0;
    const assemblyDuration = 1.6; // seconds
    let startTime: number | null = null;

    // Mouse Parallax Target & Current Interpolation (subtle for background)
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let targetPosX = 0;
    let targetPosY = 0;
    let currentPosX = 0;
    let currentPosY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile || prefersReducedMotion) return;
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotY = normX * 0.035; // max ~2 degrees
      targetRotX = normY * 0.025; // max ~1.4 degrees
      targetPosX = normX * 0.06;  // max 5-8px parallax
      targetPosY = -normY * 0.06;
    };

    if (!isMobile && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Scroll Tracking for Subtle Depth & Fade
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // IntersectionObserver to pause rendering off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
        });
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    // Sample official emblem image /brand/logo-icon-green.webp
    sampleOfficialLogoPoints('/brand/logo-icon-green.webp', logoTargetCount).then(
      (sampledPoints) => {
        if (sampledPoints.length === 0 || !container) return;

        const count = sampledPoints.length;

        // Attributes for Particles
        const currentPositions = new Float32Array(count * 3);
        const startPositions = new Float32Array(count * 3);
        const targetPositions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const delays = new Float32Array(count);

        const colorTeal = new THREE.Color('#035551');
        const colorDeepTeal = new THREE.Color('#023F3D');
        const colorOffWhite = new THREE.Color('#FDFBEE');
        const colorSand = new THREE.Color('#DCCB8E');

        for (let i = 0; i < count; i++) {
          const pt = sampledPoints[i];

          // Target official logo positions
          targetPositions[i * 3] = pt.x;
          targetPositions[i * 3 + 1] = pt.y;
          targetPositions[i * 3 + 2] = pt.z;

          // Start scattered positions (scattered rightwards towards background)
          const radius = 2.8 + Math.random() * 3.5;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          const startX = radius * Math.sin(phi) * Math.cos(theta);
          const startY = radius * Math.sin(phi) * Math.sin(theta);
          const startZ = radius * Math.cos(phi);

          startPositions[i * 3] = startX;
          startPositions[i * 3 + 1] = startY;
          startPositions[i * 3 + 2] = startZ;

          if (prefersReducedMotion) {
            currentPositions[i * 3] = pt.x;
            currentPositions[i * 3 + 1] = pt.y;
            currentPositions[i * 3 + 2] = pt.z;
          } else {
            currentPositions[i * 3] = startX;
            currentPositions[i * 3 + 1] = startY;
            currentPositions[i * 3 + 2] = startZ;
          }

          // Soft color assignment matching Ultron palette without harsh white glows
          let pColor: THREE.Color;
          if (pt.isHighlight) {
            pColor = Math.random() > 0.5 ? colorOffWhite : colorSand;
          } else {
            pColor = Math.random() > 0.35 ? colorTeal : colorDeepTeal;
          }

          colors[i * 3] = pColor.r;
          colors[i * 3 + 1] = pColor.g;
          colors[i * 3 + 2] = pColor.b;

          delays[i] = Math.random() * 0.3; // Staggered entrance
        }

        // Particle Geometry
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute(
          'position',
          new THREE.BufferAttribute(currentPositions, 3),
        );
        particleGeometry.setAttribute(
          'color',
          new THREE.BufferAttribute(colors, 3),
        );

        // Particle Material (Subtle Background Opacity)
        const particleMaterial = new THREE.PointsMaterial({
          size: isMobile ? 0.065 : 0.075,
          map: particleTexture,
          transparent: true,
          vertexColors: true,
          opacity: isMobile ? 0.22 : 0.45,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });

        const particlePoints = new THREE.Points(
          particleGeometry,
          particleMaterial,
        );
        mainGroup.add(particlePoints);

        // Build Connecting Lines Geometry (Short distance threshold along logo strokes)
        const maxConnectionsPerNode = 2;
        const distThreshold = isMobile ? 0.12 : 0.14;
        const lineIndices: number[] = [];

        for (let i = 0; i < count; i++) {
          let connections = 0;
          for (let j = i + 1; j < count; j++) {
            const dx = targetPositions[i * 3] - targetPositions[j * 3];
            const dy = targetPositions[i * 3 + 1] - targetPositions[j * 3 + 1];
            const dz = targetPositions[i * 3 + 2] - targetPositions[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < distThreshold && connections < maxConnectionsPerNode) {
              lineIndices.push(i, j);
              connections++;
            }
          }
        }

        const linePositions = new Float32Array(lineIndices.length * 3);
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute(
          'position',
          new THREE.BufferAttribute(linePositions, 3),
        );

        const lineMaterial = new THREE.LineBasicMaterial({
          color: new THREE.Color('#035551'),
          transparent: true,
          opacity: 0.0,
          blending: THREE.AdditiveBlending,
        });

        const lineSegments = new THREE.LineSegments(
          lineGeometry,
          lineMaterial,
        );
        mainGroup.add(lineSegments);

        // Ambient Background Floating Particles
        const ambientPositions = new Float32Array(ambientTargetCount * 3);
        for (let i = 0; i < ambientTargetCount; i++) {
          ambientPositions[i * 3] = (Math.random() - 0.5) * 6.0;
          ambientPositions[i * 3 + 1] = (Math.random() - 0.5) * 6.0;
          ambientPositions[i * 3 + 2] = (Math.random() - 0.5) * 3.0;
        }

        const ambientGeometry = new THREE.BufferGeometry();
        ambientGeometry.setAttribute(
          'position',
          new THREE.BufferAttribute(ambientPositions, 3),
        );

        const ambientMaterial = new THREE.PointsMaterial({
          size: 0.045,
          map: particleTexture,
          color: new THREE.Color('#FDFBEE'),
          transparent: true,
          opacity: isMobile ? 0.12 : 0.20,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });

        const ambientPoints = new THREE.Points(
          ambientGeometry,
          ambientMaterial,
        );
        scene.add(ambientPoints);

        setIsLoaded(true);

        // Render Loop
        const clock = new THREE.Clock();

        const animate = (timestamp: number) => {
          animationFrameId = requestAnimationFrame(animate);

          if (!isIntersecting) return;

          const elapsedTime = clock.getElapsedTime();

          // Handle Entrance Assembly Progress
          if (!prefersReducedMotion && assemblyProgress < 1.0) {
            if (startTime === null) startTime = timestamp;
            const elapsedSec = (timestamp - startTime) / 1000;
            assemblyProgress = Math.min(1.0, elapsedSec / assemblyDuration);
          }

          // Compute scroll progress through the hero section for reverse disassembly
          let scrollDispersal = 0.0;
          if (!prefersReducedMotion && container) {
            const heroElem = container.closest('section') || container;
            const heroHeight = heroElem.clientHeight || window.innerHeight * 0.9;
            const rawRatio = Math.min(1, Math.max(0, scrollY / (heroHeight * 0.85)));

            // Reverse dispersal starts after ~18% scroll journey
            if (rawRatio > 0.18) {
              const normScroll = (rawRatio - 0.18) / 0.67;
              scrollDispersal = Math.min(1.0, Math.pow(normScroll, 1.25));
            }
          }

          // Ease curve: cubic ease-out for entrance assembly
          const globalEase = 1 - Math.pow(1 - assemblyProgress, 3);

          const posAttr = particleGeometry.attributes.position;
          const posArray = posAttr.array as Float32Array;

          // Update Particle Positions (handles entrance assembly + scroll reverse disassembly)
          for (let i = 0; i < count; i++) {
            const delay = delays[i];
            const p = Math.max(
              0,
              Math.min(1, (assemblyProgress - delay) / (1 - delay)),
            );
            const pEase = 1 - Math.pow(1 - p, 3);

            const tx = targetPositions[i * 3];
            const ty = targetPositions[i * 3 + 1];
            const tz = targetPositions[i * 3 + 2];

            const sx = startPositions[i * 3];
            const sy = startPositions[i * 3 + 1];
            const sz = startPositions[i * 3 + 2];

            // Lerp back toward startPositions (scattered) based on scrollDispersal
            const particleDisperse = Math.min(
              1.0,
              scrollDispersal * (1.0 + (1 - delays[i]) * 0.4),
            );
            const effectiveEase = Math.max(0, pEase * (1 - particleDisperse));

            // Subtle idle breathing drift
            const driftFactor = 1 - scrollDispersal * 0.5;
            const driftX = Math.sin(elapsedTime * 0.8 + i) * 0.005 * driftFactor;
            const driftY = Math.cos(elapsedTime * 0.9 + i) * 0.005 * driftFactor;
            const driftZ = Math.sin(elapsedTime * 0.5 + i) * 0.006 * driftFactor;

            posArray[i * 3] =
              THREE.MathUtils.lerp(sx, tx, effectiveEase) + driftX * globalEase;
            posArray[i * 3 + 1] =
              THREE.MathUtils.lerp(sy, ty, effectiveEase) + driftY * globalEase;
            posArray[i * 3 + 2] =
              THREE.MathUtils.lerp(sz, tz, effectiveEase) + driftZ * globalEase;
          }
          posAttr.needsUpdate = true;

          // Fade scroll modifier
          const fadeOutFactor = Math.max(0, 1 - scrollDispersal * 0.88);

          // Update Line Positions
          if (!isMobile && globalEase > 0.2) {
            const linePosAttr = lineGeometry.attributes.position;
            const lineArray = linePosAttr.array as Float32Array;

            for (let k = 0; k < lineIndices.length; k++) {
              const idx = lineIndices[k];
              lineArray[k * 3] = posArray[idx * 3];
              lineArray[k * 3 + 1] = posArray[idx * 3 + 1];
              lineArray[k * 3 + 2] = posArray[idx * 3 + 2];
            }
            linePosAttr.needsUpdate = true;
            // Lines fade out quickly as scroll disassembly begins
            lineMaterial.opacity =
              Math.max(0, Math.min(0.18, (globalEase - 0.2) * 0.22) * (1 - scrollDispersal * 2.2));
          }

          // Smooth Mouse Parallax Dampening
          currentRotX += (targetRotX - currentRotX) * 0.05;
          currentRotY += (targetRotY - currentRotY) * 0.05;
          currentPosX += (targetPosX - currentPosX) * 0.05;
          currentPosY += (targetPosY - currentPosY) * 0.05;

          const scrollOffsetY = scrollDispersal * -0.28;

          mainGroup.rotation.x = currentRotX + Math.sin(elapsedTime * 0.4) * 0.008;
          mainGroup.rotation.y = currentRotY + Math.cos(elapsedTime * 0.35) * 0.01;
          mainGroup.position.x = currentPosX + (isMobile ? 0.35 : 0.50);
          mainGroup.position.y = currentPosY + scrollOffsetY;

          // Dynamic Material Opacity Fade on Scroll
          particleMaterial.opacity = (isMobile ? 0.22 : 0.45) * fadeOutFactor;
          ambientMaterial.opacity = (isMobile ? 0.12 : 0.20) * fadeOutFactor;

          // Ambient Drift
          ambientPoints.rotation.y = elapsedTime * 0.015;
          ambientPoints.rotation.x = elapsedTime * 0.008;

          renderer.render(scene, camera);
        };

        animationFrameId = requestAnimationFrame(animate);
      },
    );

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      if (!isMobile && !prefersReducedMotion) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      scene.clear();
      renderer.dispose();
      particleTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full pointer-events-none select-none flex items-center justify-center min-h-[360px] sm:min-h-[480px] lg:min-h-[620px]"
      aria-hidden="true"
    >
      {/* Fallback image shown if WebGL unavailable or while loading */}
      {(!webglSupported || !isLoaded) && (
        <Image
          src="/brand/logo-icon-green.webp"
          alt=""
          aria-hidden="true"
          width={441}
          height={473}
          priority
          sizes="(min-width: 1024px) 700px, 80vw"
          className="h-auto w-full opacity-25 transition-opacity duration-700 pointer-events-none"
        />
      )}
    </div>
  );
}
