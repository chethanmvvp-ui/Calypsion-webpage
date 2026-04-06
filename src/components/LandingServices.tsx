'use client';
import { motion } from 'framer-motion';
import styles from './LandingServices.module.css';

const services = [
    {
        icon: '⚡',
        title: 'Fullstack IoT Hardware',
        description: 'From custom sensors and PCBA design to edge-compute gateways. We build the physical layer of your digital transformation.'
    },
    {
        icon: '🌐',
        title: 'Industrial Connectivity',
        description: 'Multi-protocol real-time data ingestion. We connect legacy systems with modern cloud ecosystems seamlessly.'
    },
    {
        icon: '🧠',
        title: 'Intelligent Automation',
        description: 'AI-driven predictive maintenance and autonomous optimization. Harness the true power of your industrial data.'
    }
];

export default function LandingServices() {
    return (
        <section className={styles.section} id="services">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={styles.intro}
                >
                    <span className={styles.badge}>Next-Gen Ecosystems</span>
                    <h2 className={styles.title}>Connecting the physical <br />to the digital.</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px' }}>
                        Providing comprehensive IoT and Digital Twin solutions from Bangalore to the world.
                    </p>
                </motion.div>

                <div className={styles.grid}>
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={styles.card}
                        >
                            <div className={styles.iconWrapper}>
                                <span className={styles.icon}>{service.icon}</span>
                            </div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDesc}>{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
