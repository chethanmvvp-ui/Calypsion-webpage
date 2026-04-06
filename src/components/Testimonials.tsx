/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import styles from './Testimonials.module.css';
import { FadeIn, StaggerContainer } from './FadeIn';
import { motion } from 'framer-motion';
import { TextReveal } from './TextReveal';
import { PilotRequestModal } from './PilotRequestModal';

const testimonials = [
    {
        quote: "Calypsion flagged a recurring spindle fault two weeks early, saving us thousands in unplanned downtime.",
        author: "Plant Manager",
        role: "Automotive OEM",
        isDark: true
    },
    {
        quote: "Simulation helped us avoid a layout decision that would have reduced our line throughput by 15%.",
        author: "Industrial Engineer",
        role: "Electronics Manufacturer",
        isDark: false
    },
    {
        quote: "Energy Core gave us the data to shift heavy processing to off-peak hours, cutting our monthly utility spend by 18%.",
        author: "Operations Director",
        role: "Metallurgy Plant",
        isDark: false
    },
    {
        quote: "The Command Hub syncs our multi-site KPIs in real-time. We've seen a 22% increase in OEE across the board.",
        author: "VP of Operations",
        role: "Global Logistics",
        isDark: true
    }
];

export default function Testimonials() {
    const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);

    return (
        <>
            <section className={`section ${styles.testimonialsSection}`} id="company">
                <div className={`container ${styles.container}`}>
                    <FadeIn direction="up" className={styles.header}>
                        <h2 className={styles.title}>
                            <TextReveal text="Proven on the plant floor." />
                        </h2>
                    </FadeIn>

                    <StaggerContainer className={styles.cardContainer}>
                        {testimonials.map((t, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 40, rotateX: -10, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                                transition={{ 
                                    delay: i * 0.1, 
                                    duration: 0.8, 
                                    ease: [0.16, 1, 0.3, 1] 
                                }}
                                viewport={{ once: true, margin: "-50px" }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className={`bordered-box ${i % 2 === 0 ? 'cut-corner-bl' : 'cut-corner-tr'} ${styles.quoteCard}`}
                                style={{ 
                                    backgroundColor: t.isDark ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                                    color: t.isDark ? 'var(--text-primary)' : '#001E19'
                                }}
                            >
                                <div className={styles.quoteIcon} style={{ color: t.isDark ? 'var(--bg-secondary)' : '#001E19' }}>&ldquo;</div>
                                <div className={styles.quoteWrapper}>
                                    <h3 className={styles.quoteText}>
                                        <TextReveal text={t.quote} />
                                    </h3>
                                </div>
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + (i * 0.1), duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className={styles.author}
                                >
                                    <div className={styles.authorName}>{t.author}</div>
                                    <div className={styles.authorRole}>{t.role}</div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            <section className={`section ${styles.ctaSection}`} id="contact">
                <div className={`container ${styles.ctaContainer}`}>
                    <FadeIn direction="up" className={`bordered-box cut-corner-bl ${styles.ctaBox}`}>
                        <h2 className={styles.ctaTitle}>
                            <TextReveal text="Start your transformation" />
                        </h2>
                        <p className={styles.ctaSubtitle}>
                            30-day pilot. No IT overhaul. No production disruption.
                        </p>
                        <div className={styles.ctaActions}>
                            <button 
                                onClick={() => setIsPilotModalOpen(true)}
                                className="btn btn-primary"
                            >
                                Request Pilot Program
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <PilotRequestModal 
                isOpen={isPilotModalOpen} 
                onClose={() => setIsPilotModalOpen(false)} 
            />
        </>
    );
}
