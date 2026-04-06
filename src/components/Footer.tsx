'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';
import { TextReveal } from './TextReveal';
import Image from 'next/image';

export default function Footer() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    } as const;

    return (
        <footer className={styles.footer}>
            <div className={styles.gridOverlay} />

            {/* System Scanner Line */}
            <motion.div
                className={styles.scannerLine}
                animate={{
                    top: ['-10%', '110%'],
                    opacity: [0, 0.3, 0.3, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <div className={styles.container}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={styles.footerGrid}
                >
                    <motion.div
                        variants={itemVariants}
                        animate={{
                            opacity: [1, 0.95, 1, 0.9, 1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            times: [0, 0.1, 0.2, 0.3, 1]
                        }}
                        whileHover={{ scale: 1.02 }}
                        className={styles.brandColumn}
                    >
                        <h2 className={styles.logo}>
                            <Image
                                src="/images/Logo2.png"
                                alt="Calypsion Logo"
                                width={40}
                                height={40}
                                className={styles.logoImage}
                            />
                            <TextReveal
                                text="Calypsion"
                                className={styles.logoText}
                                justifyContent="flex-start"
                            />
                        </h2>
                        <p className={styles.description}>
                            Advanced Industrial Intelligence. Connecting global manufacturing nodes to predictive engineering cores.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        animate={{
                            opacity: [1, 1, 0.9, 1, 0.95],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            times: [0, 0.4, 0.5, 0.6, 1]
                        }}
                        whileHover={{ scale: 1.02 }}
                        className={styles.navColumn}
                    >
                        <span className={styles.navLabel}>/DIRECTORY/PLATFORM/</span>
                        <ul className={styles.linkList}>
                            {[
                                { name: 'Protocol Overview', href: '/platform' },
                                { name: 'Interactive Solutions', href: '/platform#solutions' },
                                { name: 'Process Industries', href: '/platform#industries' }
                            ].map((link, idx) => (
                                <li key={idx}><Link href={link.href}>{link.name}</Link></li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        animate={{
                            opacity: [1, 0.9, 1, 0.95, 1],
                        }}
                        transition={{
                            duration: 4.5,
                            repeat: Infinity,
                            times: [0, 0.2, 0.3, 0.4, 1]
                        }}
                        whileHover={{ scale: 1.02 }}
                        className={styles.navColumn}
                    >
                        <span className={styles.navLabel}>/DIRECTORY/SYSTEM/</span>
                        <ul className={styles.linkList}>
                            {[
                                { name: 'About Node', href: '#about' },
                                { name: 'Outreach Terminal', href: '#contact' },
                                { name: 'Global Careers', href: '#careers' }
                            ].map((link, idx) => (
                                <li key={idx}><Link href={link.href}>{link.name}</Link></li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        animate={{
                            opacity: [1, 1, 0.95, 1, 0.85, 1],
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            times: [0, 0.6, 0.7, 0.8, 0.9, 1]
                        }}
                        whileHover={{ scale: 1.02 }}
                        className={styles.diagColumn}
                    >
                        <span className={styles.navLabel}>/GLOBAL_NODE_STATUS/</span>
                        <div className={styles.diagNode}>
                            <div className={styles.diagStatus}>
                                <div className={styles.diagPulse} />
                                CORE_SYSTEM_ONLINE
                            </div>
                            <div className={styles.metric}>
                                <span className={styles.metricName}>PROTOCOL:</span>
                                <span className={styles.metricValue}>CALYPSION_V7.2</span>
                            </div>
                            <div className={styles.metric}>
                                <span className={styles.metricName}>NODE_UPTIME:</span>
                                <span className={styles.metricValue}>99.98%</span>
                            </div>
                            <div className={styles.metric}>
                                <span className={styles.metricName}>REGION:</span>
                                <span className={styles.metricValue}>ASIA/IST</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <div className={styles.bottomBar}>
                    <div className={styles.copyright}>
                        © 2025 CALYPSION_LLP. SYSTEM_ENCRYPTED_OUTREACH.
                    </div>
                    <div className={styles.legalLinks}>
                        <p>PRIVACY_PROTOCOL</p>
                        <p>TERMS_OF_SERVICE</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
