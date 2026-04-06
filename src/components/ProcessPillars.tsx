'use client';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import { CyberText } from './CyberText';
import styles from './ProcessPillars.module.css';
import { Search, Link as LinkIcon, BarChart3, Zap, ArrowRight } from 'lucide-react';

const stages = [
    {
        num: '01',
        id: 'ASSESS',
        title: 'Assess',
        desc: 'Deep mechanical audit of existing line health to identify hidden optimization opportunities.',
        icon: Search,
        angle: 0
    },
    {
        num: '02',
        id: 'CONNECT',
        title: 'Connect',
        desc: 'Harness raw telemetry through edge computing and non-intrusive sensor networks.',
        icon: LinkIcon,
        angle: 90
    },
    {
        num: '03',
        id: 'ANALYZE',
        title: 'Analyze',
        desc: 'Transform multi-dimensional data streams into actionable intelligence via Calypsion AI.',
        icon: BarChart3,
        angle: 180
    },
    {
        num: '04',
        id: 'OPTIMIZE',
        title: 'Optimize',
        desc: 'Implement closed-loop autonomous control to drive maximum industrial throughput.',
        icon: Zap,
        angle: 270
    }
];

export default function ProcessPillars() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (pauseTimeoutRef.current) {
                clearTimeout(pauseTimeoutRef.current);
            }
        };
    }, []);

    // Auto-rotation with pause logic
    useEffect(() => {
        if (isPaused) return;
        
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % stages.length);
        }, 2000);
        
        return () => clearInterval(interval);
    }, [isPaused]);

    // Handle user interaction pause with auto-resume
    const handleUserInteraction = useCallback(() => {
        setIsPaused(true);
        
        // Clear existing timeout
        if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current);
        }
        
        // Auto-resume after 3 seconds
        pauseTimeoutRef.current = setTimeout(() => {
            setIsPaused(false);
        }, 3000);
    }, []);

    // Handle swipe navigation
    const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50;
        const velocity = info.velocity.x;
        const offset = info.offset.x;
        
        if (Math.abs(offset) > threshold || Math.abs(velocity) > 500) {
            if (offset > 0 || velocity > 500) {
                // Swiped right - go to previous
                setActiveIndex((prev) => (prev - 1 + stages.length) % stages.length);
            } else {
                // Swiped left - go to next
                setActiveIndex((prev) => (prev + 1) % stages.length);
            }
            handleUserInteraction();
        }
    }, [handleUserInteraction]);

    // Handle dot click
    const handleDotClick = useCallback((index: number) => {
        setActiveIndex(index);
        handleUserInteraction();
    }, [handleUserInteraction]);

    return (
        <section className={styles.section} id="solutions">
            <div className={styles.intro}>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '24px', opacity: 0.5 }}>
                        Industrial Transformation
                    </div>
                    <h2 className={styles.title}>
                        Transformation <br /> Lifecycle
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '400px', lineHeight: 1.6 }}>
                        A precision-engineered 4-stage deployment architecture designed 
                        to scale intelligence across high-complexity environments.
                    </p>
                </motion.div>
            </div>

            {/* Desktop Rotation Hub */}
            <div className={styles.hubSpace}>
                <motion.div 
                    className={styles.hubWrapper}
                    initial={{ rotateX: 20, rotateY: -10, opacity: 0 }}
                    animate={{ rotateX: 10, rotateY: -5, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    {/* Central Mechanical Core */}
                    <div className={styles.mechanicalCore}>
                        <div className={styles.techRing + ' ' + styles.ring1} />
                        <div className={styles.techRing + ' ' + styles.ring2} />
                        <div className={styles.techRing + ' ' + styles.ring3} />
                        
                        <motion.div 
                            className={styles.coreCenter}
                            animate={{ rotate: stages[activeIndex].angle }}
                            transition={{ type: "spring", stiffness: 60, damping: 15 }}
                        >
                            <span style={{ transform: `rotate(-${stages[activeIndex].angle}deg)`, transition: 'transform 0.5s' }}>
                                HUB_CORE
                            </span>
                        </motion.div>

                        {/* Active Directional Beam */}
                        <motion.div 
                            className={styles.activeBeam}
                            animate={{ 
                                rotate: stages[activeIndex].angle - 90, 
                                width: activeIndex === 1 ? [250, 450, 420] : [100, 180, 150] 
                            }}
                            transition={{ rotate: { type: "spring", stiffness: 60, damping: 15 }, width: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
                            style={{ top: '50%', left: '50%' }}
                        />
                    </div>

                    {/* Orbital Stage Cards */}
                    {stages.map((stage, i) => (
                        <motion.div
                            key={i}
                            className={`${styles.stageCard} ${styles['stage' + i]} ${i === activeIndex ? styles.activeStage : ''}`}
                            onMouseEnter={() => {
                                setActiveIndex(i);
                                setIsPaused(true);
                            }}
                            onMouseLeave={() => setIsPaused(false)}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className={styles.nodeIndex}>
                                PHASE_0{i + 1} {'//'} {stage.id}
                            </div>
                            <h3 className={styles.stageTitle}>
                                <CyberText text={stage.title} delay={0.2} />
                            </h3>
                            <AnimatePresence mode="wait">
                                {i === activeIndex && (
                                    <motion.p 
                                        key="desc"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        className={styles.stageDesc}
                                    >
                                        {stage.desc}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            
                            {i !== activeIndex && (
                                <div style={{ height: '30px', display: 'flex', alignItems: 'center', opacity: 0.2 }}>
                                    <ArrowRight size={16} />
                                    <span style={{ fontSize: '9px', marginLeft: '5px', letterSpacing: '1px' }}>EXPAND_DATA</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Mobile/Tablet Carousel */}
            <div className={styles.carouselContainer}>
                <div className={styles.carouselWrapper}>
                    <motion.div 
                        className={styles.carouselTrack}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        onTouchStart={handleUserInteraction}
                        animate={{ 
                            x: `calc(-${activeIndex * 100}% - ${activeIndex * 16}px)` 
                        }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 30 
                        }}
                    >
                        {stages.map((stage, i) => (
                        <motion.div
                            key={i}
                            className={`${styles.carouselCard} ${i === activeIndex ? styles.activeCarouselCard : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => handleDotClick(i)}
                        >
                            <div className={styles.nodeIndex}>
                                PHASE_0{i + 1} {'//'} {stage.id}
                            </div>
                            <h3 className={styles.stageTitle}>
                                <CyberText text={stage.title} delay={0.2} />
                            </h3>
                            <motion.p 
                                className={styles.stageDesc}
                                initial={{ opacity: 0.7 }}
                                animate={{ opacity: i === activeIndex ? 1 : 0.7 }}
                            >
                                {stage.desc}
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>
                </div>
                
                {/* Progress Dots */}
                <div className={styles.dotsContainer}>
                    {stages.map((_, i) => (
                        <button
                            key={i}
                            className={`${styles.dot} ${i === activeIndex ? styles.activeDot : ''}`}
                            onClick={() => handleDotClick(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
