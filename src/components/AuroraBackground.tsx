'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export function AuroraBackground() {
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);

    useEffect(() => {
        const updateMouse = (e: MouseEvent) => {
            // Map exact mouse coordinates to percentages
            mouseX.set((e.clientX / window.innerWidth) * 100);
            mouseY.set((e.clientY / window.innerHeight) * 100);
        };
        window.addEventListener('mousemove', updateMouse);
        return () => window.removeEventListener('mousemove', updateMouse);
    }, [mouseX, mouseY]);

    // Buttery-smooth, heavy lagging spring to give the background a premium fluid feel
    const springConfig = { damping: 100, stiffness: 40, mass: 3 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Instead of violently snapping to the cursor, the Aurora gently shifts based on quadrant
    const shiftX = useTransform(smoothX, [0, 100], ['-15vw', '15vw']);
    const shiftY = useTransform(smoothY, [0, 100], ['-15vh', '15vh']);

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: 'var(--bg-primary)', overflow: 'hidden', pointerEvents: 'none' }}>

            {/* 1. Global Noise Grain (Crucial for high-end feel and eliminating banding) */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05, mixBlendMode: 'multiply', zIndex: 10 }}>
                <filter id="noiseFilterAurora">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilterAurora)" />
            </svg>

            {/* 2. Massive Interactive Fluid Aurora Mesh */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '-20%', left: '-20%',
                    width: '140vw', height: '140vh',
                    filter: 'blur(130px)',
                    x: shiftX,
                    y: shiftY,
                    // 3-point complex gradient combining the brand palette
                    background: `
            radial-gradient(circle at 30% 30%, rgba(202, 219, 199, 0.45) 0%, transparent 60%), 
            radial-gradient(circle at 70% 70%, rgba(0, 59, 50, 0.15) 0%, transparent 60%), 
            radial-gradient(circle at 50% 50%, rgba(253, 246, 243, 0.6) 0%, transparent 70%)
          `,
                }}
                // Continuous organic looping animation (fixed background)
                animate={{
                    rotate: 360,
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                    scale: { duration: 20, repeat: Infinity, ease: "easeInOut" }
                }}
            />
        </div>
    );
}
