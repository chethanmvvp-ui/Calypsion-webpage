'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ProgressiveText({ text, className }: { text: string; className?: string }) {
    const container = useRef<HTMLParagraphElement>(null);

    // Track this specific paragraph's position within the viewport
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "start 0.3"] // Starts animating when top hits 90% of screen, finishes at 30%
    });

    const words = text.split(" ");

    return (
        <p ref={container} className={className} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}>
            {words.map((word, i) => {
                // Calculate the specific scroll range for this individual word
                const start = i / words.length;
                const end = start + (1 / words.length);

                // Map the overall scroll progress to this word's opacity
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

                return (
                    <motion.span key={i} style={{ opacity }}>
                        {word}
                    </motion.span>
                );
            })}
        </p>
    );
}
