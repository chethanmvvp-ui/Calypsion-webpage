'use client';
import { motion, Variants } from 'framer-motion';

export function CyberText({ 
    text, 
    className, 
    delay = 0, 
    speed = 0.02,
    preserveWords = false
}: { 
    text: string; 
    className?: string; 
    delay?: number;
    speed?: number;
    preserveWords?: boolean;
}) {
    const segments = preserveWords
        ? text.split(/(\s+)/)
        : text.split("");

    const container: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: speed,
                delayChildren: delay
            }
        }
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.1, ease: "easeOut" as const }
        },
        hidden: {
            opacity: 0,
            y: 5, // Subtle rise
        }
    };

    return (
        <motion.span
            className={className}
            style={{ display: "inline-flex", flexWrap: "wrap" }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {segments.map((segment, index) => (
                <motion.span 
                    key={index} 
                    variants={child} 
                    style={
                        preserveWords
                            ? segment.trim() === ""
                                ? { display: "inline", whiteSpace: "pre" }
                                : { display: "inline-block", whiteSpace: "nowrap" }
                            : { display: "inline-block", whiteSpace: segment.trim() === "" ? "pre" : "normal" }
                    }
                >
                    {segment}
                </motion.span>
            ))}
        </motion.span>
    );
}
