'use client';
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

export function CollectifBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position state clamped from -1 to 1 for inverse parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Extremely loose spring for that heavy "floating" effect matching the reference
    const springConfig = { damping: 40, stiffness: 40, mass: 2 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Global scroll tracking for vertical parallax
    const { scrollY } = useScroll();

    // Shape 1 (Circle): Moves down half as fast as you scroll
    const y1 = useTransform(scrollY, [0, 4000], [0, 1000]);

    // Shape 2 (Hexagon): Moves UP rapidly as you scroll down
    const y2 = useTransform(scrollY, [0, 4000], [0, -1200]);

    // Shape 3 (Triangle): Moves down very slowly
    const y3 = useTransform(scrollY, [0, 4000], [0, 400]);

    // Combine scroll Y transform with Mouse Y inverse shift
    const combinedY1 = useTransform(() => y1.get() + smoothMouseY.get() * -80);
    const x1 = useTransform(smoothMouseX, [-1, 1], [80, -80]);

    const combinedY2 = useTransform(() => y2.get() + smoothMouseY.get() * 120);
    const x2 = useTransform(smoothMouseX, [-1, 1], [-120, 120]);

    const combinedY3 = useTransform(() => y3.get() + smoothMouseY.get() * -50);
    const x3 = useTransform(smoothMouseX, [-1, 1], [50, -50]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: -1,
                backgroundColor: 'var(--bg-primary)',
                overflow: 'hidden',
                pointerEvents: 'none'
            }}
        >
            {/* 1. Persistent Film Grain Filter */}
            <svg style={{ position: 'absolute', inset: 0, width: '100vw', height: '100vh', opacity: 0.04, mixBlendMode: 'multiply', zIndex: 10 }}>
                <filter id="noiseFilterCollectif">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilterCollectif)" />
            </svg>

            {/* 2. Soft Vignette Aura (Monitor Screen Glow) */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, transparent 30%, rgba(202, 219, 199, 0.15) 100%)',
                zIndex: 5
            }} />

            {/* 3. Floating Wireframe Geometry Parallaxing elements */}

            {/* Shape 1: Massive Wireframe Circle */}
            <motion.svg
                style={{ position: 'absolute', top: '5%', left: '-15%', width: '1000px', height: '1000px', x: x1, y: combinedY1, opacity: 0.05 }}
                viewBox="0 0 100 100"
            >
                <circle cx="50" cy="50" r="48" fill="none" stroke="var(--border-color)" strokeWidth="0.3" />
            </motion.svg>

            {/* Shape 2: Massive Architectural Hexagon */}
            <motion.svg
                style={{ position: 'absolute', top: '50%', right: '-10%', width: '800px', height: '800px', x: x2, y: combinedY2, opacity: 0.06 }}
                viewBox="0 0 100 100"
            >
                <path d="M50 2L93.3 26L93.3 74L50 98L6.7 74L6.7 26Z" fill="none" stroke="var(--border-color)" strokeWidth="0.3" />
            </motion.svg>

            {/* Shape 3: Geometric Triangle */}
            <motion.svg
                style={{ position: 'absolute', top: '20%', left: '40%', width: '600px', height: '600px', x: x3, y: combinedY3, opacity: 0.04 }}
                viewBox="0 0 100 100"
            >
                <path d="M50 5 L95 90 L5 90 Z" fill="none" stroke="var(--border-color)" strokeWidth="0.3" />
            </motion.svg>
        </div>
    );
}
