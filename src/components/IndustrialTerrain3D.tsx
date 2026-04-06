'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './IndustrialTerrain3D.module.css';

export function IndustrialTerrain3D() {
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Fast but heavy lagging spring for premium fluid motion
    const springConfig = { damping: 50, stiffness: 60, mass: 2 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Tilt the entire 3D Terrain based on mouse position
    const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);
    const meshTranslateY = useTransform(smoothY, [0, 1], [-30, 30]);
    const meshTranslateX = useTransform(smoothX, [0, 1], [-40, 40]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth);
            mouseY.set(e.clientY / window.innerHeight);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Generate random topographic data points (ripples)
    const [ripples, setRipples] = useState<{ id: number, x: number, y: number, scale: number }[]>([]);

    useEffect(() => {
        const initialRipples = Array.from({ length: 5 }).map((_, i) => ({
            id: i,
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            scale: Math.random() * 0.5 + 0.5
        }));
        setRipples(initialRipples);
    }, []);

    return (
        <div className={styles.container}>
            <motion.div 
                className={styles.scene}
                style={{
                    rotateX: 65, // Fixed terrain tilt
                    rotateY,
                    y: meshTranslateY,
                    x: meshTranslateX,
                }}
            >
                <div className={styles.terrainWrap}>
                    {/* Layered Wireframe Mesh for depth */}
                    {[1, 0.6, 0.2].map((opacity, i) => (
                        <motion.div
                            key={i}
                            className={styles.mesh}
                            style={{ 
                                opacity: opacity * 1.0,
                                translateZ: i * -240 // Deepened layered vertical depth
                            }}
                            animate={{
                                y: [0, -60, 0], // More pronounced rolling motion
                            }}
                            transition={{
                                duration: 15 + i * 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}

                    {/* Volumetric Topography Ripples */}
                    {ripples.map((r) => (
                        <motion.div
                            key={r.id}
                            className={styles.ripple}
                            style={{
                                top: `${r.y}%`,
                                left: `${r.x}%`,
                                scale: r.scale,
                            }}
                            animate={{
                                opacity: [0, 0.25, 0],
                                scale: [r.scale, r.scale * 1.8, r.scale],
                            }}
                            transition={{
                                duration: 8 + Math.random() * 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 4
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Gaussian Atmosphere Fade (Digital Horizon) */}
            <div className={styles.fog} />
        </div>
    );
}
