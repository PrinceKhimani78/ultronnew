'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Hero } from './Hero';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroScrollWrapper() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !triggerRef.current || !pinRef.current)
      return;

    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // ── Desktop & Tablet (min-width: 768px) ──────────────────────────────────
    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const heroContent = triggerRef.current?.querySelectorAll(
          '[data-hero-content]',
        );
        const heroBg = triggerRef.current?.querySelector('[data-hero-bg]');
        const heroMonogram = triggerRef.current?.querySelector(
          '[data-hero-monogram]',
        );
        const pinnedStage = pinRef.current;

        if (!pinnedStage || !triggerRef.current) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '+=160%',
            scrub: 1,
            pin: pinnedStage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Stage 2 (15%–40%): Hero content exits upward & fades out
        if (heroContent && heroContent.length > 0) {
          tl.to(
            heroContent,
            {
              y: -75,
              opacity: 0,
              stagger: 0.04,
              duration: 0.25,
              ease: 'power2.inOut',
            },
            0.15,
          );
        }

        // Stage 3 (10%–70%): Parallax depth & subtle scale on background
        if (heroBg) {
          tl.to(
            heroBg,
            {
              scale: 1.08,
              y: -30,
              duration: 0.6,
              ease: 'none',
            },
            0.1,
          );
        }

        // Stage 4 & 6 (22%–85%): Ultron 3D Monogram moves to center, scales up & clears screen
        if (heroMonogram) {
          tl.to(
            heroMonogram,
            {
              x: () => {
                const rect = heroMonogram.getBoundingClientRect();
                const centerX = window.innerWidth / 2;
                const elementCenterX = rect.left + rect.width / 2;
                return centerX - elementCenterX;
              },
              y: () => {
                const rect = heroMonogram.getBoundingClientRect();
                const centerY = window.innerHeight / 2;
                const elementCenterY = rect.top + rect.height / 2;
                return centerY - elementCenterY;
              },
              scale: 13,
              transformOrigin: 'center center',
              duration: 0.6,
              ease: 'power2.inOut',
            },
            0.22,
          );

          tl.to(
            heroMonogram,
            {
              opacity: 0,
              pointerEvents: 'none',
              duration: 0.15,
              ease: 'power2.out',
            },
            0.82,
          );
        }
      }, triggerRef);

      return () => ctx.revert();
    });

    // ── Mobile (max-width: 767px) ───────────────────────────────────────────
    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        const heroContent = triggerRef.current?.querySelectorAll(
          '[data-hero-content]',
        );
        const heroBg = triggerRef.current?.querySelector('[data-hero-bg]');
        const heroMonogram = triggerRef.current?.querySelector(
          '[data-hero-monogram]',
        );
        const pinnedStage = pinRef.current;

        if (!pinnedStage || !triggerRef.current) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
            pin: pinnedStage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (heroContent && heroContent.length > 0) {
          tl.to(
            heroContent,
            {
              y: -40,
              opacity: 0,
              duration: 0.25,
              ease: 'power2.inOut',
            },
            0.15,
          );
        }

        if (heroBg) {
          tl.to(
            heroBg,
            {
              scale: 1.04,
              duration: 0.6,
              ease: 'none',
            },
            0.1,
          );
        }

        if (heroMonogram) {
          tl.to(
            heroMonogram,
            {
              x: () => {
                const rect = heroMonogram.getBoundingClientRect();
                const centerX = window.innerWidth / 2;
                const elementCenterX = rect.left + rect.width / 2;
                return centerX - elementCenterX;
              },
              y: () => {
                const rect = heroMonogram.getBoundingClientRect();
                const centerY = window.innerHeight / 2;
                const elementCenterY = rect.top + rect.height / 2;
                return centerY - elementCenterY;
              },
              scale: 6,
              transformOrigin: 'center center',
              duration: 0.6,
              ease: 'power2.inOut',
            },
            0.22,
          );

          tl.to(
            heroMonogram,
            {
              opacity: 0,
              pointerEvents: 'none',
              duration: 0.15,
              ease: 'power2.out',
            },
            0.82,
          );
        }
      }, triggerRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative h-[240vh] w-full lg:h-[260vh]">
      <div
        ref={pinRef}
        className="sticky top-0 left-0 h-[100dvh] h-screen w-full overflow-hidden bg-[#FDFBEE]"
      >
        <Hero />
      </div>
    </div>
  );
}
