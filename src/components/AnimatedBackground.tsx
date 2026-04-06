'use client';

import { motion } from 'framer-motion';
import styles from './AnimatedBackground.module.css';

export function AnimatedBackground() {
    return (
        <div className={styles.container}>
            {/* Subtle SVG Noise Filter for premium texture */}
            <svg className={styles.noise}>
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.75"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>

            {/* Floating Ambient Blobs */}
            <motion.div
                animate={{
                    x: ['0vw', '10vw', '-5vw', '0vw'],
                    y: ['0vh', '15vh', '5vh', '0vh'],
                    scale: [1, 1.1, 0.95, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className={`${styles.blob} ${styles.blob1}`}
            />

            <motion.div
                animate={{
                    x: ['0vw', '-15vw', '5vw', '0vw'],
                    y: ['0vh', '-5vh', '-15vh', '0vh'],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className={`${styles.blob} ${styles.blob2}`}
            />
        </div>
    );
}
