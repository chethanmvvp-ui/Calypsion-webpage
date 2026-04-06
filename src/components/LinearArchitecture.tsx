'use client';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import styles from './LinearArchitecture.module.css';
import { Factory, Sun, Wind, Truck, Radio, Wifi, Share2, Cloud, Database, BarChart3, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

const pipelineStages = [
    {
        id: 'sources',
        title: 'Industrial Sources',
        icons: [Factory, Sun, Wind, Truck],
        labels: ['PROJECTS', 'SOLAR CARDS', 'WIND FARMS', 'LOGISTICS'],
        desc: 'Capturing raw machine, environmental, and proximity telemetry from the edge.'
    },
    {
        id: 'gateways',
        title: 'Connectivity Hub',
        icons: [Radio, Wifi, Share2],
        labels: ['5G/4G/3G LTE', 'LoRaWAN', 'NB-IoT'],
        desc: 'Multi-protocol routing via secure industrial gateways to Calypsion core.'
    },
    {
        id: 'platform',
        title: 'Calypsion Platform',
        icons: [Cloud],
        labels: ['Cloud Intelligence'],
        desc: 'Advanced neural processing and real-time data orchestration.'
    },
    {
        id: 'outputs',
        title: 'Enterprise Destinations',
        icons: [Globe, BarChart3, Database, Factory],
        labels: ['ENTERPRISE APP', 'IOT ANALYTICS', 'CUSTOMER CLOUD', 'CONTROL HUB'],
        desc: 'Intelligence-driven outcomes for decision makers and engineering systems.'
    }
];

export default function LinearArchitecture() {
    const [activeStage, setActiveStage] = useState(-1);
    const [isPaused, setIsPaused] = useState(false);
    const scanControls = useAnimation();

    const startScan = async () => {
        await scanControls.start({
            left: '100%',
            transition: { duration: 8, ease: "linear" }
        });
        // Reset
        setActiveStage(-1);
        await scanControls.set({ left: '0%' });
        if (!isPaused) startScan();
    };

    useEffect(() => {
        if (!isPaused) {
            startScan();
        } else {
            scanControls.stop();
        }
    }, [isPaused]);

    // Use motion value to trigger active stage based on scan position
    // (Simulated with keyframes for simplicity in this implementation)

    return (
        <section 
            id="architecture"
            className={styles.section}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className={`container ${styles.container}`}>
                <div className={styles.blackBox}>
                    <div className={styles.header}>
                        <div className={styles.metaTop}>
                            <span className={styles.projectCode}>[ PROJECT: AX-01 ]</span>
                            <span className={styles.liveBadge}>
                                <span className={styles.pulseDot} />
                                LIVE DATA STREAM
                            </span>
                        </div>
                        <h2 className={styles.title}>Edge-to-Enterprise</h2>
                        <div className={styles.metaBottom}>
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>DEPLOYMENT</span>
                                <span className={styles.metaValue}>GLOBAL_NODES_v3</span>
                            </div>
                            <div className={styles.metaDivider} />
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>LATENCY</span>
                                <span className={styles.metaValue}>&lt; 15.4ms</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.pipelineSpace}>
                        {/* THE SCANLINE */}
                        <motion.div 
                            className={styles.scanLine}
                            animate={scanControls}
                            initial={{ left: '0%' }}
                            onUpdate={(latest) => {
                                const leftVal = latest.left;
                                const percent = typeof leftVal === 'number' ? leftVal : parseFloat(String(leftVal ?? '0'));
                                if (percent < 5) setActiveStage(-1);
                                else if (percent < 25) setActiveStage(0);
                                else if (percent < 50) setActiveStage(1);
                                else if (percent < 75) setActiveStage(2);
                                else if (percent < 100) setActiveStage(3);
                            }}
                        />

                        {/* STAGES ROW */}
                        <motion.div 
                            className={styles.stagesRow}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={{
                                visible: { transition: { staggerChildren: 0.12 } }
                            }}
                        >
                            {pipelineStages.map((stage, idx) => (
                                <motion.div 
                                    key={stage.id} 
                                    className={`${styles.stageCard} ${activeStage === idx ? styles.active : ''}`}
                                    onMouseEnter={() => setActiveStage(idx)}
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                    }}
                                >
                                    <div className={styles.stageContent}>
                                        <div className={styles.iconGrid}>
                                            {stage.icons.map((Icon, i) => (
                                                <div key={i} className={styles.iconBox}>
                                                    <Icon size={24} strokeWidth={1} />
                                                    <span className={styles.iconLabel}>{stage.labels[i]}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className={styles.textSection}>
                                            <motion.h3 
                                                className={styles.stageTitle}
                                                animate={{ 
                                                    y: activeStage === idx ? -5 : 0,
                                                    opacity: activeStage === idx ? 1 : 0.8
                                                }}
                                            >
                                                {stage.title}
                                            </motion.h3>
                                            <AnimatePresence mode="wait">
                                                {activeStage === idx && (
                                                    <motion.p 
                                                        initial={{ opacity: 0, y: 15 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 5 }}
                                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                                        className={styles.stageDesc}
                                                    >
                                                        {stage.desc}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                    {idx < pipelineStages.length - 1 && (
                                        <div className={styles.connectorLine}>
                                            <div className={styles.beamTrack} />
                                            <motion.div 
                                                className={styles.beamPulse}
                                                animate={{ x: ['-100%', '100%'] }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                            />
                                            {/* Streaming Dots overlay - Only show if current stage or previous was scanned */}
                                            <div className={styles.dotStream}>
                                                {activeStage >= idx && [...Array(5)].map((_, i) => (
                                                    <motion.div 
                                                        key={i}
                                                        className={styles.dataDot}
                                                        animate={{ x: ['0px', '60px'], opacity: [0, 1, 0] }}
                                                        transition={{ 
                                                            duration: 1.2, 
                                                            repeat: Infinity, 
                                                            delay: i * 0.24,
                                                            ease: "linear" 
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    </motion.div>
                                ))}
                            </motion.div>

                        {/* LARGE CENTRAL FOCUS */}
                        {activeStage === 2 && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={styles.platformFocus}
                            >
                                <Cloud size={80} strokeWidth={0.5} className={styles.focusIcon} />
                                <div className={styles.pulseRing} />
                                <div className={styles.pulseRing2} />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
