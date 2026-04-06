'use client';
import { motion } from 'framer-motion';
import { TextReveal } from './TextReveal';
import styles from './FullstackIoT.module.css';

const fullstackCards = [
    {
        title: 'Hardware Development',
        desc: 'Custom IoT devices, Smart Sensors, RTLS Technology, and Edge Computing. Built for industrial environments.',
        metric: '25+',
        label: 'Patents & Designs'
    },
    {
        title: 'Connectivity & Transmission',
        desc: 'Robust communication infrastructure. Multi-Protocol support for real-time secure transmission.',
        metric: '99.9%',
        label: 'Uptime Precision'
    },
    {
        title: 'AI/ML & Analytics',
        desc: 'Turning raw data into predictive maintenance and performance analytics for high-stakes operations.',
        metric: '-30%',
        label: 'Downtime Reduction'
    },
    {
        title: 'Digital Twin',
        desc: '3D Visualization and Real-time Sync. Predictive modeling and simulation mapping.',
        metric: '+25%',
        label: 'Throughput Gain'
    }
];

export default function FullstackIoT() {
    return (
        <section className={styles.section} id="platform">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={styles.header}
                >
                    <span className={styles.badge}>Fullstack IoT</span>
                    <h2 className={styles.title}>
                        <TextReveal text="From hardware to intelligence." />
                    </h2>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px' }}>
                        <TextReveal text="Turning raw connectivity into actionable enterprise intelligence." />
                    </div>
                </motion.div>

                <div className={styles.grid}>
                    {fullstackCards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className={styles.card}
                        >
                            <div className={styles.cardContent}>
                                <h3>{card.title}</h3>
                                <p>{card.desc}</p>
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.metric}>
                                    <span className={styles.val}>{card.metric}</span>
                                    <span className={styles.lab}>{card.label}</span>
                                </div>
                                <div className={styles.arrow}>→</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
