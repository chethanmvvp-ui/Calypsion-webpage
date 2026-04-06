'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './MarqueeScroll.module.css';

export function MarqueeScroll({ text, direction = -1 }: { text: string, direction?: number }) {
    const container = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    // Calculate dynamic X translation based on scroll position
    // The huge range (-1500 to 0) creates rapid movement based purely on scroll rate
    const x = useTransform(scrollYProgress, [0, 1], [direction === -1 ? 0 : -1500, direction === -1 ? -1500 : 0]);

    return (
        <div ref={container} className={styles.marqueeContainer}>
            <motion.div style={{ x }} className={styles.marqueeTrack}>
                <span className={styles.marqueeText}>{text} {text} {text} {text} {text}</span>
            </motion.div>
        </div>
    );
}
