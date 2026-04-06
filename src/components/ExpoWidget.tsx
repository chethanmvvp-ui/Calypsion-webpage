'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import ExpoModal from './ExpoModal';
import styles from './ExpoWidget.module.css';

export default function ExpoWidget() {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.div 
                className={styles.widgetWrapper}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsModalOpen(true)}
            >
                <div className={styles.widget}>
                    <div className={styles.liveIndicator}>
                        <span className={styles.pulseDot} />
                        <span className={styles.liveLabel}>EXPO_UPCOMING</span>
                    </div>

                    <div className={styles.mainContent}>
                        <div className={styles.dateInfo}>
                            <span className={styles.dateHighlight}>7-9 APR</span>
                        </div>
                        
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div 
                                    className={styles.expandedInfo}
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 'auto', opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className={styles.boothInfo}>
                                        <MapPin size={10} />
                                        <span>BOOTH: 20D-113</span>
                                    </div>
                                    <span className={styles.detailLink}>
                                        VIEW DETAILS <ArrowRight size={10} />
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className={styles.accentCorner} />
                </div>
            </motion.div>

            <ExpoModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </>
    );
}
