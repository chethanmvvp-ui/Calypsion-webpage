'use client';
import { useState, useEffect } from 'react';
import type { TargetAndTransition } from 'framer-motion';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TextReveal } from './TextReveal';
import { CyberText } from './CyberText';
import { PilotRequestModal } from './PilotRequestModal';
import styles from './RDPrograms.module.css';
import { ArrowRight, Activity, Box, Cpu, Eye, Zap, Globe } from 'lucide-react';

const rdFocus = [
    {
        icon: <Cpu size={32} strokeWidth={1} />,
        title: 'AI & Machine Learning',
        desc: 'Advanced neural networks for predictive maintenance.',
        coord: 'Z.04 // X.12',
        bento: styles.bento1
    },
    {
        icon: <Globe size={32} strokeWidth={1} />,
        title: 'Digital Transformation',
        desc: 'Cloud-native industrial modernization.',
        coord: 'D.09 // T.24',
        bento: styles.bento5
    },
    {
        icon: <Activity size={32} strokeWidth={1} />,
        title: 'Robotics',
        desc: 'Intelligent control systems for autonomous factory floors.',
        coord: 'Y.08 // X.22',
        bento: styles.bento2
    },
    {
        icon: <Eye size={32} strokeWidth={1} />,
        title: 'AR/VR Simulation',
        desc: 'Virtual training environments.',
        coord: 'W.14 // Z.32',
        bento: styles.bento3
    },
    {
        icon: <Box size={32} strokeWidth={1} />,
        title: 'IoT Ecosystems',
        desc: 'Secure data transmission.',
        coord: 'X.11 // Y.44',
        bento: styles.bento4
    }
];

function BentoCard({ focus, index, isActive, onMouseEnter, onMouseLeave, onInitialize }: { 
    focus: typeof rdFocus[0], 
    index: number,
    isActive: boolean,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    onInitialize: () => void
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    // Specialized animations for icon types
    const iconAnimationMap: Record<string, TargetAndTransition> = {
        'AI & Machine Learning': { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity } },
        'Digital Transformation': { rotate: 360, transition: { duration: 20, repeat: Infinity, ease: 'linear' } },
        'Robotics': { x: [-1, 1, -1], transition: { duration: 1, repeat: Infinity } },
        'AR/VR Simulation': { rotate: [0, 5, -5, 0], transition: { duration: 4, repeat: Infinity } },
        'IoT Ecosystems': { y: [0, -4, 0], transition: { duration: 3, repeat: Infinity } }
    };
    const iconAnimations: TargetAndTransition = iconAnimationMap[focus.title] ?? {};

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`${styles.card} ${focus.bento} ${isActive ? styles.activeCard : ''}`}
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={() => {
                handleMouseLeave();
                onMouseLeave();
            }}
        >
            <div className={styles.topLeft} />
            <div className={styles.bottomRight} />

            <motion.div 
                className={styles.iconWrapper}
                animate={isActive ? { ...iconAnimations, filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.2))' } : iconAnimations}
            >
                {focus.icon}
                <div className={styles.nodePulse} />
            </motion.div>

            <div className={styles.content}>
                <h3 className={styles.cardTitle}>
                    <CyberText text={focus.title} delay={0.2 + index * 0.1} />
                </h3>
                <p className={styles.desc}>{focus.desc}</p>
                <motion.div 
                    className={styles.cta}
                    whileHover={{ x: 5 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onInitialize();
                    }}
                >
                    Initialize Project <ArrowRight size={14} />
                </motion.div>
            </div>

            {/* Background Decorative Element */}
            <div style={{ position: 'absolute', bottom: 20, left: 40, opacity: 0.05, transform: 'scale(2)', pointerEvents: 'none' }}>
                <Zap size={100} strokeWidth={0.5} />
            </div>

            <span className={styles.coord}>{focus.coord}</span>
        </motion.div>
    );
}

export default function RDPrograms() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isPaused || isModalOpen) return;
        
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % rdFocus.length);
        }, 2000);
        
        return () => clearInterval(interval);
    }, [isPaused, isModalOpen]);

    return (
        <section className={styles.section} id="rd">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className={styles.intro}
                >
                    <span className={styles.badge}>R&D Programs</span>
                    <h2 className={styles.title}>
                        <TextReveal text="Industrial Innovation" /> <br />
                        <span style={{ opacity: 0.6 }}>Technical Mastery</span>
                    </h2>
                </motion.div>

                <div className={styles.grid}>
                    {rdFocus.map((focus, i) => (
                        <BentoCard 
                            key={i} 
                            focus={focus} 
                            index={i} 
                            isActive={activeIndex === i}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            onInitialize={() => setIsModalOpen(true)}
                        />
                    ))}
                </div>
            </div>

            <PilotRequestModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                mode="rd-program"
            />
        </section>
    );
}
