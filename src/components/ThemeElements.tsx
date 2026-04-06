'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './ThemeElements.module.css';

import { NetworkBackground } from './NetworkBackground';
import { RadarBackground } from './RadarBackground';
import { AnimatedBackground } from './AnimatedBackground';

// ==========================================
// 1. CURSORS
// ==========================================

export function TrailingCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springX = useSpring(cursorX, { damping: 25, stiffness: 200, mass: 0.5 });
    const springY = useSpring(cursorY, { damping: 25, stiffness: 200, mass: 0.5 });

    useEffect(() => {
        document.body.style.cursor = 'none';
        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };
        window.addEventListener('mousemove', move);
        return () => {
            document.body.style.cursor = 'auto';
            window.removeEventListener('mousemove', move);
        };
    }, [cursorX, cursorY]);

    return <motion.div className={styles.trailingCursor} style={{ x: springX, y: springY }} />;
}

export function CrosshairCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springX = useSpring(cursorX, { damping: 25, stiffness: 350, mass: 0.15 });
    const springY = useSpring(cursorY, { damping: 25, stiffness: 350, mass: 0.15 });

    useEffect(() => {
        document.body.style.cursor = 'none';
        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        window.addEventListener('mousemove', move);
        return () => {
            document.body.style.cursor = 'auto';
            window.removeEventListener('mousemove', move);
        };
    }, [cursorX, cursorY]);

    return (
        <div className={styles.crosshairWrapper}>
            <motion.div className={styles.crosshairH} style={{ y: springY }} />
            <motion.div className={styles.crosshairV} style={{ x: springX }} />
            <motion.div className={styles.crosshairReticle} style={{ x: springX, y: springY }} />
        </div>
    );
}

export function BracketCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springX = useSpring(cursorX, { damping: 40, stiffness: 400 });
    const springY = useSpring(cursorY, { damping: 40, stiffness: 400 });

    useEffect(() => {
        document.body.style.cursor = 'none';
        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX - 20);
            cursorY.set(e.clientY - 20);
        };
        window.addEventListener('mousemove', move);
        return () => {
            document.body.style.cursor = 'auto';
            window.removeEventListener('mousemove', move);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div className={styles.bracketCursor} style={{ x: springX, y: springY }}>
            <span className={styles.bracket}>[</span>
            <span className={styles.bracket}>]</span>
        </motion.div>
    );
}

// ==========================================
// 2. BACKGROUNDS
// ==========================================

export function FlashlightBackground() {
    const cursorX = useMotionValue(-1000);
    const cursorY = useMotionValue(-1000);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, [cursorX, cursorY]);

    return (
        <div className={styles.flashlightContainer}>
            <div className={styles.flashlightGrid} />
            <motion.div
                className={styles.flashlightAura}
                style={{
                    background: `radial-gradient(circle at center, rgba(0, 59, 50, 0.15) 0%, transparent 50%)`,
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            />
        </div>
    );
}

export function LaserBackground() {
    return (
        <div className={styles.laserContainer}>
            <motion.div
                className={styles.laserH}
                animate={{ y: ['-10vh', '110vh'] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
                className={styles.laserV}
                animate={{ x: ['-10vw', '110vw'] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
                className={styles.laserH}
                animate={{ y: ['110vh', '-10vh'] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
}

// ==========================================
// 3. MASTER SWITCHER
// ==========================================

export function DynamicBackgroundSwitcher() {
    const [themeIndex, setThemeIndex] = useState<number | null>(null);

    useEffect(() => {
        // Select a random theme from 1 to 5 on mount
        setThemeIndex(Math.floor(Math.random() * 5) + 1);
    }, []);

    if (themeIndex === null) return null;

    return (
        <>
            {/* Option 1: Canvas Neural Network (Default mouse) */}
            {themeIndex === 1 && <NetworkBackground />}

            {/* Option 2: Radar Hex Grid + CAD Crosshairs */}
            {themeIndex === 2 && (
                <>
                    <RadarBackground />
                    <CrosshairCursor />
                </>
            )}

            {/* Option 3: Ambient Blurred Blobs + Trailing Circle */}
            {themeIndex === 3 && (
                <>
                    <AnimatedBackground />
                    <TrailingCursor />
                </>
            )}

            {/* Option 4: Square Grid with Flashlight (Default mouse) */}
            {themeIndex === 4 && <FlashlightBackground />}

            {/* Option 5: Scanning Lasers + Bracket Cursor */}
            {themeIndex === 5 && (
                <>
                    <LaserBackground />
                    <BracketCursor />
                </>
            )}
        </>
    );
}
