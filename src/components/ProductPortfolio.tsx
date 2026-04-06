'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CyberText } from './CyberText';
import styles from './ProductPortfolio.module.css';
import { ArrowRight } from 'lucide-react';
import { PilotRequestModal } from './PilotRequestModal';

const products = [
    {
        id: 'PRD-01',
        badge: 'Hardwire Connector',
        title: 'Industrial Protocol Connector',
        desc: 'Bridge legacy equipment to modern digital networks. Real-time data transmission for predictive intelligence.',
        image: '/industrial_protocol_connector.png',
        features: ['Multi-Protocol', 'Low Latency', 'Encrypted', 'Plug-and-Play'],
        specs: {
            'CON_TYPE': 'WiFi / Ethernet / LTE',
            'IO_PORTS': '16 Digital, 8 Analog',
            'PWR_IN': '12V-24V DC',
            'IP_RATING': 'IP67 Waterproof'
        }
    },
    {
        id: 'PRD-02',
        badge: 'Analytics Suite',
        title: 'IoT Analytics Platform',
        desc: 'Comprehensive software for data processing and actionable insights. Built for large-scale industrial assets.',
        image: '/iot_analytics_dashboard.png',
        features: ['AI-Powered', 'KPI Dashboards', 'Auto-Reports', 'Scalable Cloud'],
        specs: {
            'DEPLOY': 'Cloud / On-Premise',
            'INT_API': 'REST / Webhooks',
            'DEV_CAP': '10k+ Devices',
            'SLA_UP': '99.99% Uptime'
        }
    },
    {
        id: 'PRD-03',
        badge: 'Simulation Environment',
        title: 'Industrial Simulation Platform',
        desc: 'Advanced 3D environment for testing processes via Digital Twinning. Predict and optimize before deployment.',
        image: '/industrial_simulation_twin.png',
        features: ['Physics-Based', 'Scenario Mod', 'Real-Time Sync', 'VR/AR Ready'],
        specs: {
            'RENDER': 'Unity / UE5 SDK',
            'PHYS_ENG': 'NVIDIA PhysX',
            'DATA_SYNC': 'Historical/Live',
            'ISO_STD': 'ISO-Twin 2.0'
        }
    }
];

const AUTO_ROTATION_INTERVAL_MS = 3000;

export default function ProductPortfolio() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDevModalOpen, setIsDevModalOpen] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const rotationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearRotationTimeout = useCallback(() => {
        if (rotationTimeoutRef.current) {
            clearTimeout(rotationTimeoutRef.current);
            rotationTimeoutRef.current = null;
        }
    }, []);

    const scheduleNextRotation = useCallback(() => {
        clearRotationTimeout();

        if (isPaused || isDevModalOpen) return;

        rotationTimeoutRef.current = setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % products.length);
        }, AUTO_ROTATION_INTERVAL_MS);
    }, [clearRotationTimeout, isPaused, isDevModalOpen]);

    useEffect(() => {
        scheduleNextRotation();
        return clearRotationTimeout;
    }, [activeIndex, isPaused, isDevModalOpen, scheduleNextRotation, clearRotationTimeout]);
    const handleManualSelect = (index: number) => {
        setActiveIndex(index);
        scheduleNextRotation(); // Restart timer on click
    };

    return (
        <section
            className={styles.section}
            id="products"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="container">
                <div className={styles.intro}>
                    <h2 className={styles.title}>
                        Industrial Product <br />
                        Portfolio
                    </h2>
                </div>

                <div className={styles.hubGrid}>
                    {/* Left Sidebar Selector */}
                    <div className={styles.selector}>
                        {products.map((product, i) => (
                            <motion.button
                                key={product.id}
                                className={`${styles.productTab} ${activeIndex === i ? styles.activeTab : ''}`}
                                onClick={() => handleManualSelect(i)}
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <span className={styles.tabId}>{product.id}</span>
                                <h4 className={styles.tabTitle}>{product.badge}</h4>
                            </motion.button>
                        ))}

                        <div style={{ marginTop: 'auto', padding: '24px', opacity: 0.3, border: '1px dashed #000', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
                            {'SYSTEMS_READY_v4.2 // SELECT_UNIT_FOR_DETAILS'}
                        </div>
                    </div>

                    {/* Right Detail Pane */}
                    <div className={styles.displayArea}>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={products[activeIndex].id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className={styles.productContent}
                            >
                                <div className={styles.productHero}>
                                    <div className={styles.visualPane}>
                                        <Image
                                            src={products[activeIndex].image}
                                            alt={products[activeIndex].title}
                                            fill
                                            className={styles.productImg}
                                            style={{ objectFit: 'contain' }}
                                        />
                                        <div style={{ position: 'absolute', bottom: 10, right: 10, fontSize: '9px', fontFamily: 'var(--font-mono)', opacity: 0.5 }}>
                                            [PREVIEW_RENDER_v1]
                                        </div>
                                    </div>

                                    <div className={styles.textContent}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                            <div style={{ width: '20px', height: '1px', background: '#000' }} />
                                            <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>
                                                {`${products[activeIndex].id} // TECHNICAL_SPEC`}
                                            </span>
                                        </div>

                                        <h3 className={styles.productHeading}>
                                            <CyberText text={products[activeIndex].title} preserveWords />
                                        </h3>

                                        <p className={styles.desc}>
                                            {products[activeIndex].desc}
                                        </p>

                                        <div className={styles.featureList}>
                                            {products[activeIndex].features.map((f, i) => (
                                                <motion.span
                                                    key={i}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.3 + i * 0.1 }}
                                                    className={styles.featureTag}
                                                >
                                                    {f}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Integrated Technical Table */}
                                <div className={styles.specsTable}>
                                    {Object.entries(products[activeIndex].specs).map(([key, val], i) => (
                                        <motion.div
                                            key={key}
                                            className={styles.specItem}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 + i * 0.1 }}
                                        >
                                            <span className={styles.specLabel}>{key}</span>
                                            <span className={styles.specVal}>{val}</span>
                                        </motion.div>
                                    ))}

                                    <div className={styles.specItem} style={{ gridColumn: 'span 2', marginTop: '20px' }}>
                                        <button
                                            className="btn btn-primary"
                                            style={{ width: '100%', padding: '1.2rem' }}
                                            onClick={() => setIsDevModalOpen(true)}
                                        >
                                            Request Full Technical Data Sheet <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <PilotRequestModal
                isOpen={isDevModalOpen}
                onClose={() => setIsDevModalOpen(false)}
                mode="tech-data"
            />
        </section>
    );
}
