'use client';

import styles from './Industries.module.css';
import { FadeIn } from './FadeIn';
import { motion } from 'framer-motion';

const industries = [
    {
        title: 'Automotive',
        description: 'Robot health monitoring, cycle-time logic, and OEE per assembly line.',
        stat: '100+',
        label: 'ASSEMBLY LINES',
        id: 'SEC_01'
    },
    {
        title: 'Electronics',
        description: 'SMT performance, pick-and-place health, and first-pass yield analytics.',
        stat: '99%',
        label: 'YIELD FIDELITY',
        id: 'SEC_02'
    }
];

export default function Industries() {
    return (
        <section className={styles.section} id="industries">
            <div className={`container ${styles.container}`}>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className={styles.innerWrapper}
                >
                    <div className={styles.splitLayout}>
                        {/* LEFT SIDE: HEADER & TITLE */}
                        <FadeIn direction="up" className={styles.headerSide}>
                            <div className={styles.metaLabel}>{'// CORE_FOCUS'}</div>
                            <h2 className={styles.mainTitle}>
                                Built for <br />
                                <span className={styles.accentText}>Heavy Industry.</span>
                            </h2>
                            <div className={styles.verticalTag}>INDUSTRIAL_SECTORS_024</div>
                        </FadeIn>

                        {/* RIGHT SIDE: DATA READOUTS */}
                        <div className={styles.dataSide}>
                            {industries.map((ind, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ 
                                        delay: 0.3 + (i * 0.15), 
                                        duration: 0.8, 
                                        ease: [0.16, 1, 0.3, 1] 
                                    }}
                                    viewport={{ once: true }}
                                    className={styles.statModule}
                                >
                                    <div className={styles.moduleHeader}>
                                        <span className={styles.moduleId}>{ind.id}</span>
                                        <h3 className={styles.moduleTitle}>{ind.title}</h3>
                                    </div>
                                    <div className={styles.readoutWrapper}>
                                        <div className={styles.bigStat}>{ind.stat}</div>
                                        <div className={styles.statSub}>
                                            <span className={styles.subLabel}>{ind.label}</span>
                                            <p className={styles.description}>{ind.description}</p>
                                        </div>
                                    </div>
                                    <div className={styles.scanningLine} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
