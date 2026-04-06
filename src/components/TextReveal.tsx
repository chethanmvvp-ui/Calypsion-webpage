'use client';
import type { CSSProperties } from 'react';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

export function TextReveal({ 
    text, 
    className, 
    delay = 0, 
    justifyContent = "center" 
}: { 
    text: string; 
    className?: string; 
    delay?: number;
    justifyContent?: string;
}) {
    // Split text by lines, or by words. Let's split by words for a classic Awwwards reveal.
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Stagger each word
                delayChildren: delay
            }
        }
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring' as const, damping: 14, stiffness: 100 }
        },
        hidden: {
            opacity: 0,
            y: '100%'
        }
    };

    return (
        <motion.span
            style={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                gap: '0.25em',
                justifyContent: justifyContent as CSSProperties['justifyContent']
            }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {words.map((word, index) => (
                <span key={index} style={{ overflow: "hidden", display: "inline-flex", paddingBottom: "0.1em" }}>
                    <motion.span variants={child} className={className} style={{ display: "inline-block" }}>
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}
