'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Industrial3DSpace.module.css';

export function Industrial3DSpace() {
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Smooth heavy lagging spring for premium industrial parallax
    const springConfig = { damping: 40, stiffness: 60, mass: 2 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Tilt the entire 3D scene based on mouse position
    const rotateX = useTransform(smoothY, [0, 1], [5, -5]);
    const rotateY = useTransform(smoothX, [0, 1], [-5, 5]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth);
            mouseY.set(e.clientY / window.innerHeight);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Generate random static particles with varying depth
    const [randomParticles, setRandomParticles] = useState<{ x: number, y: number, z: number }[]>([]);
    
    useEffect(() => {
        const particles = Array.from({ length: 40 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            z: Math.random() * 800 - 400
        }));
        setRandomParticles(particles);
    }, []);

    return (
        <div className={styles.container}>
            <motion.div 
                className={styles.scene}
                style={{
                    rotateX,
                    rotateY,
                }}
            >
                {/* 1. Perspective Grid (Deep Ground Plane) */}
                <div className={styles.grid} />

                {/* 2. Floating Data Clusters (Parallax Objects) */}
                <div className={styles.particles}>
                    {randomParticles.map((p, i) => (
                        <motion.div
                            key={i}
                            className={styles.particle}
                            style={{
                                top: `${p.y}%`,
                                left: `${p.x}%`,
                                transform: `translateZ(${p.z}px)`,
                            }}
                            animate={{
                                opacity: [0.1, 0.4, 0.1],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                {/* 3. Sweeping Volumetric Scan Line */}
                <motion.div 
                    className={styles.volume}
                    animate={{
                        y: ["-40vh", "40vh"],
                        rotateY: [0, 360],
                    }}
                    transition={{
                        y: { duration: 25, repeat: Infinity, ease: "linear" },
                        rotateY: { duration: 60, repeat: Infinity, ease: "linear" }
                    }}
                    style={{
                        top: '50%',
                        left: '50%',
                        translateY: '-50%',
                        translateX: '-50%',
                        translateZ: 200,
                    }}
                />

            </motion.div>

            {/* Fog of War (Industrial Depth Blur) */}
            <div className={styles.fog} />
        </div>
    );
}
