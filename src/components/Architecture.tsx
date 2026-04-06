'use client';

import { motion, AnimatePresence } from 'framer-motion';
import styles from './Architecture.module.css';
import { Cpu, Settings, Bot, Building2, Radio, Server, Cloud, Network, Database } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { useState, useEffect } from 'react';

const floorSources = [
    { name: 'PLC', icon: Cpu, id: 's1', angle: 120, info: 'Industrial controller for machine logic and real-time process automation.' },
    { name: 'CNC', icon: Settings, id: 's2', angle: 150, info: 'Automated control of machining tools via high-precision numerical data.' },
    { name: 'Robot', icon: Bot, id: 's3', angle: 180, info: 'Programmable industrial arm for assembly, welding, and material handling.' },
    { name: 'Devices', icon: Building2, id: 's4', angle: 210, info: 'Edge computing devices and legacy hardware integration points.' },
    { name: 'Sensors', icon: Radio, id: 's5', angle: 240, info: 'IoT sensors capturing temperature, pressure, and vibration telemetry.' }
];

// Simplified for Orbital
const destNodes = [
    { name: 'MQTT Broker', icon: Server, id: 'd1', angle: 300, info: 'Message broker for lightweight M2M and IoT connectivity.' },
    { name: 'Cloud Hub', icon: Cloud, id: 'd2', angle: 335, info: 'Centralized cloud platform for large-scale data ingestion and storage.' },
    { name: 'Ecosystem', icon: Network, id: 'd3', angle: 25, info: 'Third-party API integrations and partner software ecosystems.' },
    { name: 'ERP/MES', icon: Database, id: 'd4', angle: 60, info: 'Enterprise Resource Planning and Manufacturing Execution Systems.' }
];

const gatewayData = {
    title: 'Link Edge Gateway',
    layers: [
        'Autonomous Protocol Engine',
        'Tag Mapping Engine',
        'Edge Processing Core',
        'Security & Encryption',
        'Store & Forward'
    ],
    info: 'Central orchestration hub that standardizes, manages, and routes all industrial data across the ecosystem.'
};

const ORBIT_SEQUENCE = [
    { id: 's5', duration: 2000 },
    { id: 's1', duration: 2000 },
    { id: 's2', duration: 2000 },
    { id: 's3', duration: 2000 },
    { id: 's4', duration: 2000 },
    { id: 'gateway', duration: 2000 },
    { id: 'd1', duration: 2000 },
    { id: 'd2', duration: 2000 },
    { id: 'd3', duration: 2000 },
    { id: 'd4', duration: 2000 }
] as const;

export default function Architecture() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [activeSequenceIndex, setActiveSequenceIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const currentStep = ORBIT_SEQUENCE[activeSequenceIndex];
        const timer = setTimeout(() => {
            setActiveSequenceIndex((prev) => (prev + 1) % ORBIT_SEQUENCE.length);
        }, currentStep.duration);

        return () => clearTimeout(timer);
    }, [activeSequenceIndex, isPaused]);

    const activeNodeId = hoveredNode || ORBIT_SEQUENCE[activeSequenceIndex].id;
    const isGatewayActive = activeNodeId === 'gateway';

    return (
        <section 
            className={styles.section}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            data-theme="sage"
        >
            <div className={`container ${styles.container}`}>
                <FadeIn direction="up" className={styles.header}>
                    <h2 className={styles.title}>Orbital Architecture</h2>
                    <p className={styles.subtitle}>A cinematic command-center perspective of your industrial connectivity ecosystem.</p>
                </FadeIn>

                <div className={styles.orbitalSpace}>
                    {/* Concentric Guide Rings */}
                    <div className={styles.guideRing} style={{ width: '520px', height: '520px' }} />
                    <div className={styles.guideRing} style={{ width: '760px', height: '760px' }} />

                    {/* Radar Sweep Beam */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className={styles.radarSweep}
                    />

                    {/* CENTRAL GATEWAY (THE SUN) */}
                    <motion.div 
                        className={styles.centerGateway}
                        onMouseEnter={() => { setHoveredNode('gateway'); setIsPaused(true); }}
                        onMouseLeave={() => { setHoveredNode(null); setIsPaused(false); }}
                        animate={{ 
                            scale: isGatewayActive ? 1.2 : 1, 
                            zIndex: isGatewayActive ? 1000 : 100
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <div className={styles.gwCore}>
                            <AnimatePresence mode="wait">
                                {isGatewayActive ? (
                                    <motion.div 
                                        key="data"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className={styles.gwDataCover}
                                    >
                                        <div className={styles.gwDataList}>
                                            {gatewayData.layers.map((layer: string, i: number) => (
                                                <div key={i} className={styles.gwDataItem}>{layer}</div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="title"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <h4 className={styles.gwTitle}>Link Edge Gateway</h4>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className={styles.gwPulse} />
                        </div>
                    </motion.div>

                    {/* SOURCES (INNER ORBIT) */}
                    {floorSources.map((src, i) => (
                        <div 
                            key={src.id} 
                            className={styles.orbitalNode}
                            style={{ 
                                transform: `rotate(${src.angle}deg) translate(260px) rotate(-${src.angle}deg)` 
                            }}
                            onMouseEnter={() => { setHoveredNode(src.id); setIsPaused(true); }}
                            onMouseLeave={() => { setHoveredNode(null); setIsPaused(false); }}
                        >
                            <AnimatePresence>
                                {activeNodeId === src.id && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                                        className={`${styles.nodeInfoBox} ${styles.infoLeft}`}
                                    >
                                        {src.info}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <motion.div 
                                animate={{ 
                                    scale: activeNodeId === src.id ? [1, 1.4, 1.2] : [1, 1.2, 1], 
                                    opacity: activeNodeId === src.id ? 1 : [0.3, 1, 0.3] 
                                }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                className={styles.nodePing}
                            />
                            <div className={`${styles.nodeIconBox} ${activeNodeId === src.id ? styles.nodeActive : ''}`}>
                                <src.icon className={styles.icon} size={20} />
                                <span className={styles.nodeLabel}>{src.name}</span>
                            </div>
                        </div>
                    ))}

                    {/* DESTINATIONS (OUTER ORBIT) */}
                    {destNodes.map((sink, i) => (
                        <div 
                            key={sink.id} 
                            className={styles.orbitalNode}
                            style={{ 
                                transform: `rotate(${sink.angle}deg) translate(380px) rotate(-${sink.angle}deg)` 
                            }}
                            onMouseEnter={() => { setHoveredNode(sink.id); setIsPaused(true); }}
                            onMouseLeave={() => { setHoveredNode(null); setIsPaused(false); }}
                        >
                            <AnimatePresence>
                                {activeNodeId === sink.id && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -20, scale: 0.9 }}
                                        className={`${styles.nodeInfoBox} ${styles.infoRight}`}
                                    >
                                        {sink.info}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <motion.div 
                                animate={{ 
                                    scale: activeNodeId === sink.id ? [1, 1.4, 1.2] : [1, 1.2, 1], 
                                    opacity: activeNodeId === sink.id ? 1 : [0.3, 1, 0.3] 
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                                className={styles.nodePing}
                            />
                            <div className={`${styles.nodeIconBox} ${activeNodeId === sink.id ? styles.nodeActive : ''}`}>
                                <sink.icon className={styles.icon} size={18} />
                                <span className={styles.nodeLabel}>{sink.name}</span>
                            </div>
                        </div>
                    ))}

                    {/* BEAMING DATA FLOW (SVG) */}
                    <svg className={styles.orbitalFlow} viewBox="0 0 1000 1000">
                        {/* Centripetal Beams (Sources to Center) */}
                        {floorSources.map((src) => (
                           <CentripetalBeam key={src.id} angle={src.angle} radius={260} />
                        ))}
                        {/* Centrifugal Beams (Center to Destinations) */}
                        {destNodes.map((sink) => (
                           <CentrifugalBeam key={sink.id} angle={sink.angle} radius={380} />
                        ))}
                    </svg>
                </div>
            </div>
        </section>
    );
}

function CentripetalBeam({ angle, radius }: { angle: number, radius: number }) {
    const startX = 500 + radius * Math.cos((angle * Math.PI) / 180);
    const startY = 500 + radius * Math.sin((angle * Math.PI) / 180);
    
    // Control point for swoop: Midpoint rotated slightly
    const midRadius = radius * 0.6;
    const ctrlAngle = angle + 25; // Create curvature
    const ctrlX = 500 + midRadius * Math.cos((ctrlAngle * Math.PI) / 180);
    const ctrlY = 500 + midRadius * Math.sin((ctrlAngle * Math.PI) / 180);

    return (
        <g>
            {/* Background Glow Path */}
            <motion.path
                d={`M ${startX} ${startY} Q ${ctrlX} ${ctrlY} 500 500`}
                stroke="#000000"
                strokeWidth="4"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: Math.random() * 2 }}
            />
            {/* Animated Data Pulse */}
            <motion.path
                d={`M ${startX} ${startY} Q ${ctrlX} ${ctrlY} 500 500`}
                stroke="#000000"
                strokeWidth="3.5"
                strokeDasharray="10 40"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                    pathLength: 1, 
                    opacity: [0, 0.8, 0],
                    strokeDashoffset: [0, 50]
                }}
                transition={{ 
                    duration: 1.8, 
                    repeat: Infinity, 
                    delay: Math.random() * 2,
                    strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: "linear" }
                }}
            />
            {/* Directional Arrow (Midpoint) */}
            <motion.path
                d="M -6 -4 L 0 0 L -6 4"
                fill="none"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform={`
                    translate(${startX * 0.25 + ctrlX * 0.5 + 500 * 0.25}, ${startY * 0.25 + ctrlY * 0.5 + 500 * 0.25}) 
                    rotate(${Math.atan2(500 - startY, 500 - startX) * 180 / Math.PI})
                `}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
        </g>
    );
}

function CentrifugalBeam({ angle, radius }: { angle: number, radius: number }) {
    const endX = 500 + radius * Math.cos((angle * Math.PI) / 180);
    const endY = 500 + radius * Math.sin((angle * Math.PI) / 180);

    // Control point: Midpoint rotated slightly
    const midRadius = radius * 0.4;
    const ctrlAngle = angle - 20; 
    const ctrlX = 500 + midRadius * Math.cos((ctrlAngle * Math.PI) / 180);
    const ctrlY = 500 + midRadius * Math.sin((ctrlAngle * Math.PI) / 180);

    return (
        <g>
            {/* Background Glow Path */}
            <motion.path
                d={`M 500 500 Q ${ctrlX} ${ctrlY} ${endX} ${endY}`}
                stroke="#000000"
                strokeWidth="4"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.15, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
            />
            {/* Animated Data Pulse */}
            <motion.path
                d={`M 500 500 Q ${ctrlX} ${ctrlY} ${endX} ${endY}`}
                stroke="#000000"
                strokeWidth="3.5"
                strokeDasharray="10 40"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                    pathLength: 1, 
                    opacity: [0, 0.8, 0],
                    strokeDashoffset: [50, 0] // Reverse for outbound
                }}
                transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: Math.random() * 2,
                    strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: "linear" }
                }}
            />
            {/* Directional Arrow (Midpoint) */}
            <motion.path
                d="M -6 -4 L 0 0 L -6 4"
                fill="none"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform={`
                    translate(${500 * 0.25 + ctrlX * 0.5 + endX * 0.25}, ${500 * 0.25 + ctrlY * 0.5 + endY * 0.25}) 
                    rotate(${Math.atan2(endY - 500, endX - 500) * 180 / Math.PI})
                `}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
        </g>
    );
}
