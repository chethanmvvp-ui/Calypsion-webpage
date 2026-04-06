'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './CustomCursor.module.css';

export function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // Fast tracking for the main diamond
    const mainSpringConfig = { damping: 35, stiffness: 250, mass: 0.5 };
    const springX = useSpring(cursorX, mainSpringConfig);
    const springY = useSpring(cursorY, mainSpringConfig);

    // Slow, weighted tracking for the trailing "ghost" shadow
    const trailSpringConfig = { damping: 45, stiffness: 120, mass: 1.2 };
    const trailX = useSpring(cursorX, trailSpringConfig);
    const trailY = useSpring(cursorY, trailSpringConfig);
    
    // Interaction states
    const mainScale = useSpring(isHovering ? 2.5 : isClicked ? 0.8 : 1, { damping: 20, stiffness: 300 });
    const rotate = useSpring(isHovering ? 45 : 0, { damping: 20, stiffness: 150 });
    const trailScale = useSpring(isClicked ? 1.5 : 1, { damping: 25, stiffness: 100 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            // Dynamic interaction check
            const target = e.target as HTMLElement;
            const isInteractive = !!target.closest('a, button, [role="button"], .interactive-hover');
            setIsHovering(isInteractive);
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    return (
        <div className={styles.cursorWrapper} style={{ opacity: isVisible ? 1 : 0 }}>
            {/* Trailing Shadow: The "Ghost" following with lag */}
            <motion.div
                className={styles.trailShadow}
                style={{
                    x: trailX,
                    y: trailY,
                    scale: trailScale,
                }}
            />

            {/* Main Interactive Shape: Diamond Outline */}
            <motion.div
                className={styles.mainShape}
                style={{
                    x: springX,
                    y: springY,
                    scale: mainScale,
                    rotate: rotate,
                }}
            />

            {/* Precision Center Point */}
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
