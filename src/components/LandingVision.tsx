'use client';
import { motion } from 'framer-motion';
import styles from './LandingVision.module.css';

export default function LandingVision() {
    return (
        <section className={styles.section} id="vision">
            <div className={`container ${styles.layout}`}>
                <div className={styles.content}>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={styles.heading}
                    >
                        Industrial Vision.<br />Engineering the Future.
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={styles.text}
                    >
                        Calypsion specializes in fullstack IoT, Digital Twinning, and Smart Hardware Solutions. 
                        Based in Bangalore, we leverage cutting-edge R&D to empower industries with 
                        connected ecosystems that are robust, scalable, and intelligent.
                    </motion.p>
                    
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <motion.h4 animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>200+</motion.h4>
                            <p>Assets Connected</p>
                        </div>
                        <div className={styles.statItem}>
                            <motion.h4 animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }}>15%</motion.h4>
                            <p>OEE Increment</p>
                        </div>
                    </div>
                </div>

                <div className={styles.visual}>
                    <motion.div 
                        className={`${styles.shape} ${styles.s1}`}
                        animate={{ rotateX: 360, rotateY: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                        className={`${styles.shape} ${styles.s2}`}
                        animate={{ rotateX: -360, rotateY: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                        className={`${styles.shape} ${styles.s3}`}
                        animate={{ rotateX: 180, rotateY: 180 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    <div className={styles.glow} />
                </div>
            </div>
        </section>
    );
}
