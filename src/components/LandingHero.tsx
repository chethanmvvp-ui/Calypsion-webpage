'use client';
import { motion } from 'framer-motion';
import { TextReveal } from './TextReveal';
import styles from './LandingHero.module.css';
import { useRouter } from 'next/navigation';

export default function LandingHero() {
    const router = useRouter();

    return (
        <section className={styles.hero}>
            <motion.div
                className={styles.assetDecoration}
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, 0.5, -0.5, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <motion.div
                    className={styles.badge}
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.03,
                                delayChildren: 0.2
                            }
                        }
                    }}
                >
                    {"Driving Innovation in Industry 4.0".split("").map((char, index) => (
                        <motion.span
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
                                visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>

                <h1 className={styles.title}>
                    <TextReveal text="DRIVING INDUSTRIAL INNOVATION" />
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className={styles.subtitle}
                >
                    Harnessing the power of Fullstack IoT, AI, and Digital Twins to <br />
                    transform traditional manufacturing into the smart factories of tomorrow.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={styles.ctaContainer}
                >
                    <button
                        onClick={() => router.push('/platform')}
                        className={styles.mainBtn}
                    >
                        Explore Platform
                    </button>
                    <button
                        onClick={() => (window.location.href = '#about')}
                        className={styles.secBtn}
                    >
                        Learn More
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
}
