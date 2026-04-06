'use client';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

export function InteractiveOrbBackground() {
    // Track vertical scroll position and physical scroll velocity
    const { scrollYProgress, scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Smooth the raw velocity data into a fluid spring interaction
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // KINETIC SCROLL DISTORTION:
    // When the user aggressively scrolls up or down, the background orb dynamically elongates/stretches!
    const velocityScaleY = useTransform(smoothVelocity, [-2000, 0, 2000], [1.8, 1, 1.8]);
    const velocityScaleX = useTransform(smoothVelocity, [-2000, 0, 2000], [0.6, 1, 0.6]);

    // SCROLL-LINKED PARALLAX:
    // The orb physically descends the webpage exactly as you read it, crossing from left to right.
    const orbY = useTransform(scrollYProgress, [0, 1], ['-10vh', '90vh']);
    const orbX = useTransform(scrollYProgress, [0, 0.5, 1], ['-10vw', '50vw', '-10vw']);

    // DEPTH-LINKED MORPHING:
    // The ambient color morphs from Sage to Deep Teal and back based on exact scroll reading progress.
    const orbColor = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ['rgba(202, 219, 199, 0.8)', 'rgba(0, 59, 50, 0.5)', 'rgba(202, 219, 199, 0.8)']
    );

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: 'var(--bg-primary)', overflow: 'hidden', pointerEvents: 'none' }}>

            {/* 1. Static Collectif Parcelles Film Grain Overlay */}
            <svg style={{ position: 'absolute', inset: 0, width: '100vw', height: '100vh', opacity: 0.05, mixBlendMode: 'multiply', zIndex: 10 }}>
                <filter id="noiseFilterOrb">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilterOrb)" />
            </svg>

            {/* 2. The Core Interactive Orb */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '55vw',
                    height: '55vw',
                    borderRadius: '50%',
                    filter: 'blur(120px)',
                    y: orbY,
                    x: orbX,
                    scaleX: velocityScaleX,
                    scaleY: velocityScaleY,
                    backgroundColor: orbColor
                }}
            />

            {/* 3. A secondary slow-moving counter-orb to add volumetric depth */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '50%', right: '-10%',
                    width: '40vw',
                    height: '40vw',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    y: useTransform(scrollYProgress, [0, 1], ['40vh', '-40vh']), // Parallaxes inversely
                    backgroundColor: 'rgba(0, 59, 50, 0.2)'
                }}
            />
        </div>
    );
}
