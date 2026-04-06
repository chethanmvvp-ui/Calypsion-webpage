'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { useExpo } from '@/context/ExpoContext';
import ExpoModal from './ExpoModal';
import styles from './ExpoBanner.module.css';

export default function ExpoBanner() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { settings } = useExpo();

    if (!settings.isVisible) return null;

    return (
        <>
            <motion.div 
                className={styles.banner}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.pulseBadge}>
                            <span className={styles.dot} />
                            LIVE_EVENT
                        </div>
                        <span className={styles.divider} />
                        <div className={styles.eventInfo}>
                            <Calendar size={14} className={styles.icon} />
                            <span className={styles.dateText}>{settings.date}</span>
                            <span className={styles.locationTextDesktop}>| {settings.title.toUpperCase()} | {settings.location}</span>
                            <span className={styles.locationTextMobile}>{settings.title.toUpperCase()}</span>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <button 
                            className={styles.detailsBtn}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span className={styles.detailsLabelDesktop}>VIEW EXPO DETAILS</span>
                            <span className={styles.detailsLabelMobile}>DETAILS</span>
                            <ArrowRight size={14} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isModalOpen && (
                    <ExpoModal 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                    />
                )}
            </AnimatePresence>
        </>
    );
}
