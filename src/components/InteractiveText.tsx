'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, MouseEvent, ReactNode } from 'react';

export function InteractiveText({ children, className }: { children: ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    // Mapping local mouse coordinates to strict boundaries
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Extremely tight, highly responsive spring for the typography
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };

    // Create 3D Pitch and Yaw offsets based on mouse mapped coordinates
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [20, -20]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-20, 20]), springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const MathRect = ref.current.getBoundingClientRect();
        const centerX = MathRect.left + MathRect.width / 2;
        const centerY = MathRect.top + MathRect.height / 2;

        // Normalize coordinates so center is 0, edges are -0.5 / 0.5
        // Divide by larger threshold to smooth out the tracking beyond the exact container
        x.set((e.clientX - centerX) / window.innerWidth);
        y.set((e.clientY - centerY) / window.innerHeight);
    };

    const handleMouseLeave = () => {
        // Snap smoothly back to resting position
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            // Establishing the 3D local coordinate space
            style={{
                display: 'inline-block',
                perspective: 1200,
            }}
            className={className}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                    filter: `drop-shadow(0px 20px 30px rgba(0,0,0,0.08))` // Gives depth behind the letters
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
