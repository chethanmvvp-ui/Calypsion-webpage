'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

export function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Fast but dampened spring for precise crosshair tracking
    // Increased damping for a "heavy" premium feel
    const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);
    
    // Scale and Rotate values based on hover state
    const scale = useSpring(isHovering ? 2.5 : 1, { damping: 20, stiffness: 200 });
    const rotate = useSpring(isHovering ? 45 : 0, { damping: 20, stiffness: 100 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            // Check if hovering over interactive elements
            const target = e.target as HTMLElement;
            const isInteractive = !!target.closest('a, button, [role="button"], .interactive-hover');
            setIsHovering(isInteractive);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', moveCursor);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    return (
        <div className={styles.cursorWrapper} style={{ opacity: isVisible ? 1 : 0 }}>
            {/* The Main Shape: Interactive Diamond Outline */}
            <motion.div
                className={styles.mainShape}
                style={{
                    x: springX,
                    y: springY,
                    scale: scale,
                    rotate: rotate,
                }}
            />
            {/* Center Precision Point */}
            <motion.div
                className={styles.dot}
                style={{
                    x: springX,
                    y: springY,
                }}
            />
        </div>
    );
}
