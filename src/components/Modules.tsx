'use client';

import { useState, useEffect, useMemo } from 'react';
import styles from './Modules.module.css';
import type { TargetAndTransition, Variants } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn';
import Image from 'next/image';
import { ProjectModal } from './ProjectModal';
import { IframeModal } from './IframeModal';
import type { LucideIcon } from 'lucide-react';
import {
    Radar,
    Cpu,
    BrainCircuit,
    FlaskConical,
    Eye,
    Box,
    Settings
} from 'lucide-react';

interface PlatformModule {
    id: string;
    title: string;
    slotClass: string;
    launchUrl: string;
    icon: LucideIcon;
    animation: TargetAndTransition;
    status: string;
    description: string;
    fullDescription: string;
    bullets: string[];
    metricValue: string;
    metricLabel: string;
    image: string;
}

const modulesData: PlatformModule[] = [
    {
        id: '01',
        title: 'RTLS TRACKING',
        slotClass: 'slot_1',
        launchUrl: 'https://link360.in/rtls',
        icon: Radar,
        animation: {
            rotate: [0, 360],
            transition: { duration: 10, repeat: Infinity, ease: "linear" }
        },
        status: 'Live Demo',
        description: 'Track materials and work-in-progress across the factory floor with high precision.',
        fullDescription: 'Our Real-Time Location System (RTLS) utilizes UWB and BLE mesh technology to provide sub-meter accuracy for entire factory floors. This module monitors work-in-progress (WIP) flow, material staging, and personnel safety zones, enabling a complete digital shadow of movement and layout efficiency.',
        bullets: ['Location Map', 'Zone Alerts', 'History', 'Real-time Paging', 'Geofencing Logic', 'Asset Utilization'],
        metricValue: '±0.3m',
        metricLabel: 'ACCURACY',
        image: '/images/modules/rtls_tracking_v2.png'
    },
    {
        id: '02',
        title: 'DIGITAL TWIN',
        slotClass: 'slot_2',
        launchUrl: 'https://link360.in/digital-twin',
        icon: Cpu,
        animation: {
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        },
        status: 'Live Demo',
        description: 'Mirror your physical assets in a real-time, synchronized 3D environment.',
        fullDescription: 'The Digital Twin module creates a high-fidelity 3D replica of your production environment, integrated directly with PLCs and IoT sensors. This enables remote simulation of material flow, virtual commissioning of new lines, and predictive maintenance walkthroughs in a fully immersive spatial context.',
        bullets: ['3D Simulation', 'Live Sync', 'Predictive', 'Collision Detection', 'Remote Operations', 'Training Sandbox'],
        metricValue: '99.8%',
        metricLabel: 'FIDELITY',
        image: '/images/modules/digital_twin_v2.png'
    },
    {
        id: '03',
        title: 'PREDICTIVE AI',
        slotClass: 'slot_3',
        launchUrl: 'https://link360.in/vibrationmodule',
        icon: BrainCircuit,
        animation: {
            y: [0, -4, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        },
        status: 'Live Demo',
        description: 'Analyze vibration and health scores to prevent unexpected downtime.',
        fullDescription: 'Leveraging neural network architectures and edge computing, the Predictive AI module detects micro-vibrations and thermal anomalies before they lead to failure. By analyzing historical load patterns and current health scores, the system identifies the "remaining useful life" (RUL) of critical motor and bearing assets.',
        bullets: ['Vibration', 'Thermal', 'Health', 'Anomaly Detection', 'Remaining Useful Life', 'MTBF Analysis'],
        metricValue: '85%',
        metricLabel: 'UPTIME',
        image: '/images/modules/predictive_ai_v2.png'
    },
    {
        id: '04',
        title: 'Digital Twin — Test Model',
        slotClass: 'slot_4',
        launchUrl: 'https://link360.in/digital-twin-test',
        icon: FlaskConical,
        animation: {
            rotate: [-10, 10, -10],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        },
        status: 'Live Demo',
        description: 'Evaluate and simulate theoretical industrial scenarios in a risk-free virtual environment.',
        fullDescription: 'The Digital Twin Test Model provides a sandboxed environment for engineering teams to validate theoretical throughput changes and logic updates before they are deployed to the live synchronized twin. It allows for rigorous scenario-based testing of edge cases and stress-testing of new algorithmic optimizations.',
        bullets: ['Bottleneck ID', 'Line Balance', 'Logic', 'Shift Planning', 'WIP Balancing', 'Throughput Testing'],
        metricValue: 'SANDBOX',
        metricLabel: 'VALIDATION',
        image: '/images/modules/test_model_v1.png'
    },
    {
        id: '05',
        title: 'LinkVision',
        slotClass: 'slot_5',
        launchUrl: 'https://linkvision.vercel.app/',
        icon: Eye,
        animation: {
            x: [-3, 3, -3],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        },
        status: 'Live Demo',
        description: 'Advanced computer vision for real-time quality audits and surface defect detection.',
        fullDescription: 'LinkVision integrates high-speed industrial cameras with edge-AI models to perform real-time quality audits, surface defect detection, and assembly verification. By automating the visual inspection layer, it ensures 100% quality compliance even at peak production speeds.',
        bullets: ['AI Audits', 'Defect ID', 'High-Speed', 'OCR Scan', 'Unit Compliance', 'Visual IQ'],
        metricValue: '100%',
        metricLabel: 'QUALITY',
        image: '/images/modules/linkvision_v1.png'
    },
    {
        id: '06',
        title: 'RTLS 3D Model',
        slotClass: 'slot_6',
        launchUrl: 'http://4.188.84.137:5173/dashboard.html',
        icon: Box,
        animation: {
            rotateY: [0, 360],
            transition: { duration: 8, repeat: Infinity, ease: "linear" }
        },
        status: 'Live Demo',
        description: 'Immersive spatial visualization of asset movement and material flow across the factory floor.',
        fullDescription: 'The RTLS 3D Model provides a real-time, interactive viewport of your physical facility. By mapping sub-meter location data directly onto a high-fidelity 3D layout, it enables operations managers to identify spatial bottlenecks, track high-value asset movement, and optimize material replenishment paths in a fully immersive digital environment.',
        bullets: ['Spatial Heatmap', 'Path Finding', '3D Layout', 'Asset Flow', 'Flow Dynamics', 'Digital Layer'],
        metricValue: '±0.5m',
        metricLabel: 'SPATIAL IQ',
        image: '/images/modules/rtls_3d_v1.png'
    },
    {
        id: '07',
        title: 'SCADA Module',
        slotClass: 'slot_7',
        launchUrl: 'https://test-rmca.ohmium.com:8043/data/perspective/client/SCADA',
        icon: Settings,
        animation: {
            rotate: [0, 360],
            transition: { duration: 15, repeat: Infinity, ease: "linear" }
        },
        status: 'Live Demo',
        description: 'High-fidelity telemetry and real-time supervisory control for industrial operations.',
        fullDescription: 'The SCADA Module provides a centralized command interface for real-time telemetry from pumps, valves, and motor drives. Designed with a high-contrast industrial HMI aesthetic, it enables supervisory control and data acquisition with sub-second latency for mission-critical floor operations.',
        bullets: ['Real-time HMI', 'Telemetry', 'Control Logic', 'Sub-second Sync', 'Remote Valves', 'System Health'],
        metricValue: '99.99%',
        metricLabel: 'UPTIME',
        image: '/images/modules/scada_v1.png'
    }
];

const hudContainerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
};

export default function Modules() {
    const [selectedModule, setSelectedModule] = useState<PlatformModule | null>(null);
    const [launchingUrl, setLaunchingUrl] = useState<string | null>(null);
    const [launchingTitle, setLaunchingTitle] = useState<string | null>(null);
    const [focusId, setFocusId] = useState<string | null>('01');
    const [isPaused, setIsPaused] = useState(false);

    const activeModule = useMemo(() => modulesData.find(m => m.id === focusId), [focusId]);

    const isAnyModalOpen = !!selectedModule || !!launchingUrl;

    useEffect(() => {
        if (isPaused || isAnyModalOpen) return;

        const interval = setInterval(() => {
            setFocusId(prev => {
                const currentIdx = prev ? modulesData.findIndex(m => m.id === prev) : -1;
                const nextIdx = (currentIdx + 1) % modulesData.length;
                return modulesData[nextIdx].id;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, isAnyModalOpen]);

    return (
        <section id="solutions" className={styles.section}>
            <div className={styles.sectionInner}>
                <div className={`container ${styles.container}`}>
                    <div className={styles.centeredHeader}>
                        <FadeIn direction="up">
                            <span className={styles.preTitle}>PLATFORM CAPABILITIES</span>
                            <h2 className={styles.title}>SEVEN MODULES.<br />ONE FLOOR.</h2>
                            <p className={styles.subtitle}>Unified industrial intelligence as a singular asset landscape.</p>
                        </FadeIn>
                    </div>

                    <div className={styles.floorContainer}>
                        <div className={styles.floorCenter}>
                            <div className={styles.arcCanvas}>
                                <div className={styles.radialFloor}>
                                    <div className={styles.floorGrid} />
                                </div>

                                <div className={styles.workstations}>
                                    {modulesData.map((mod) => {
                                        const isActive = focusId === mod.id;
                                        return (
                                            <div
                                                key={mod.id}
                                                className={`${styles.workstation} ${styles[mod.slotClass]} ${isActive ? styles.modActive : ''}`}
                                                onMouseEnter={() => {
                                                    setFocusId(mod.id);
                                                    setIsPaused(true);
                                                }}
                                                onMouseLeave={() => setIsPaused(false)}
                                                onClick={() => setSelectedModule(mod)}
                                            >
                                                <div className={styles.workstationCore}>
                                                    <motion.div
                                                        className={styles.glassNode}
                                                        animate={isAnyModalOpen ? {} : (isActive ? {
                                                            y: [0, -15, 0],
                                                            scale: 1.2,
                                                            rotateY: 180
                                                        } : {
                                                            y: [0, -5, 0],
                                                            scale: 1,
                                                            rotateY: 0
                                                        })}
                                                        transition={{
                                                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                                            rotateY: { duration: 0.8, ease: "circOut" }
                                                        }}
                                                    >
                                                        <motion.div
                                                            animate={isActive ? mod.animation : {}}
                                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                        >
                                                            <mod.icon className={styles.modIcon} />
                                                        </motion.div>
                                                    </motion.div>

                                                    <AnimatePresence>
                                                        {isActive && (
                                                            <motion.div
                                                                className={styles.activeLaser}
                                                                initial={{ opacity: 0, scaleY: 0 }}
                                                                animate={{ opacity: 1, scaleY: 1 }}
                                                                exit={{ opacity: 0, scaleY: 0 }}
                                                                transition={{ duration: 0.5 }}
                                                            />
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                                <span className={styles.workstationLabel}>{mod.title}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {activeModule && !isAnyModalOpen && (
                                    <motion.div
                                        key={activeModule.id}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={hudContainerVariants}
                                        className={styles.floatingHud}
                                    >
                                        <div className={styles.hudImageWrapper}>
                                            <Image
                                                src={activeModule.image}
                                                alt={activeModule.title}
                                                fill
                                                className={styles.hudImage}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className={styles.hudInfo}>
                                            <span className={styles.hudId}>CAPABILITY_ID: {activeModule.id}</span>
                                            <h3 className={styles.hudTitle}>{activeModule.title}</h3>
                                            <p className={styles.hudDesc}>{activeModule.description}</p>

                                            <div className={styles.hudMetricRow}>
                                                <div className={styles.metric}>
                                                    <span className={styles.mValue}>{activeModule.metricValue}</span>
                                                    <span className={styles.mLabel}>{activeModule.metricLabel}</span>
                                                </div>
                                                <button
                                                    onClick={() => setSelectedModule(activeModule)}
                                                    className={styles.primaryAction}
                                                >
                                                    EXPLORE
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedModule && (
                    <ProjectModal
                        module={{
                            ...selectedModule,
                            slides: [selectedModule.image]
                        }}
                        onClose={() => setSelectedModule(null)}
                        onLaunch={(url) => {
                            setLaunchingUrl(url);
                            setLaunchingTitle(selectedModule?.title || null);
                        }}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {launchingUrl && (
                    <IframeModal
                        url={launchingUrl}
                        title={launchingTitle || ''}
                        onClose={() => setLaunchingUrl(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
