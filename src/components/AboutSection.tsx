'use client';
import { motion } from 'framer-motion';
import { TextReveal } from './TextReveal';
import styles from './AboutSection.module.css';

const aboutBoxes = [
    {
        marker: 'STRATEGIC_VISION',
        title: 'Our Vision',
        desc: 'To revolutionize industrial technology through innovative, connected solutions that empower manufacturers to achieve unprecedented levels of efficiency and productivity.'
    },
    {
        marker: 'OPERATIONAL_MISSION',
        title: 'Our Mission',
        desc: 'To deliver cutting-edge automation and monitoring solutions that transform manufacturing operations, driving efficiency and fostering sustainable growth.'
    },
    {
        marker: 'INDUSTRIAL_IMPACT',
        title: 'Our Impact',
        desc: "We've helped companies cut costs by up to 30% through smarter workflows and predictive maintenance, making industrial operations more efficient and sustainable."
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const
        }
    }
};

export default function AboutSection() {
    return (
        <section className={styles.section} id="about">
            <div className="container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <motion.span variants={itemVariants} className={styles.badge}>
                        About Calypsion
                    </motion.span>
                    <motion.h2 
                        variants={itemVariants}
                        className={styles.title} 
                        style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', maxWidth: '900px', margin: '0 auto 24px' }}
                    >
                        <TextReveal text="Building the Future of Industry — One Smart Solution at a Time" />
                    </motion.h2>
                    <motion.div variants={itemVariants} style={{ maxWidth: '800px', margin: '0 auto', opacity: 0.8 }}>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 500 }}>
                            Smarter factories aren&apos;t the future — they&apos;re already here, and we&apos;re making them even better.
                        </p>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Founded in Bangalore, Calypsion is a team of engineers, makers, and industrial tech problem-solvers 
                            building the next generation of connected solutions for manufacturing.
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className={styles.boxGrid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {aboutBoxes.map((box, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                            className={`${styles.industrialBox} ${i === 1 ? styles.themedBox : ''}`}
                        >
                            <span className={styles.marker}>
                                <TextReveal text={box.marker} justifyContent="flex-start" />
                            </span>
                            <h3 className={styles.boxTitle}>
                                <TextReveal text={box.title} justifyContent="flex-start" delay={0.2} />
                            </h3>
                            <p className={styles.boxDesc}>
                                <TextReveal text={box.desc} justifyContent="flex-start" delay={0.4} />
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
