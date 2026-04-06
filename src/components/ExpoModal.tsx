'use client';
import { motion, AnimatePresence } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { X, Download, FileText, Video, Layout } from 'lucide-react';
import styles from './ExpoModal.module.css';
import { useEffect } from 'react';

interface ExpoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ExpoModal({ isOpen, onClose }: ExpoModalProps) {
    const resources: { name: string; icon: LucideIcon; type: string; path: string }[] = [
        { name: 'CALYPSION_PRESENTATION.PPT', icon: Layout, type: 'PPT', path: '/downloads/Calypsion_PPT.pdf' },
        { name: 'CALYPSION_BROCHURE.PDF', icon: FileText, type: 'Brochure', path: '/downloads/Calypsion_Brochure.pdf' },
        { name: 'CALYPSION_VIDEO.MP4', icon: Video, type: 'Video', path: '/downloads/Calypsion_Video.mp4' },
    ];

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 40, rotateX: 10 },
        visible: {
            opacity: 1, scale: 1, y: 0, rotateX: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const,
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        },
        exit: {
            opacity: 0, scale: 0.9, y: 40, rotateX: -10,
            transition: { duration: 0.4 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
            opacity: 1, scale: 1, y: 0,
            transition: { type: 'spring' as const, stiffness: 200, damping: 20 }
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('has-modal-open');
        } else {
            document.body.classList.remove('has-modal-open');
        }
        return () => {
            document.body.classList.remove('has-modal-open');
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay} onClick={onClose}>
                    <motion.div
                        className={styles.modal}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeBtn} onClick={onClose}>
                            <X size={24} />
                        </button>

                        <motion.div className={styles.headerImage} variants={itemVariants}>
                            <img
                                src="/images/expo/certificate.png"
                                alt="Expo Certification"
                                className={styles.certImage}
                            />
                            <div className={styles.imageOverlay} />

                            {/* SCANLINE ANIMATION */}
                            <motion.div
                                className={styles.scanLine}
                                initial={{ top: '-10%' }}
                                animate={{ top: '110%' }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />

                            <motion.div
                                className={styles.boothFloating}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                <span className={styles.boothLabel}>BOOTH IDENTIFIED: 20D-113</span>
                            </motion.div>
                        </motion.div>

                        <div className={styles.scrollBody}>
                            {/* MIDDLE: INFO */}
                            <div className={styles.bodyInfo}>
                                <motion.div className={styles.eventNameRow} variants={itemVariants}>
                                    <div className={styles.titleGroup}>
                                        <h2 className={styles.title}>GITEX Africa 2026</h2>
                                        <span className={styles.locationTag}>MARRAKESH, MOROCCO</span>
                                    </div>
                                    <motion.div
                                        className={styles.datesBadge}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 1 }}
                                    >
                                        7 - 8 - 9 APRIL
                                    </motion.div>
                                </motion.div>

                                <motion.p className={styles.desc} variants={itemVariants}>
                                    Connecting the next generation of industrial operations with our predictive AI ecosystem.
                                    Join our technical engineers for a deep-dive walkthrough.
                                </motion.p>
                            </div>

                            {/* BOTTOM: 3 DOWNLOADS */}
                            <div className={styles.resourceFooter}>
                                <div className={styles.resGrid}>
                                    {resources.map((res, idx) => (
                                        <motion.a
                                            key={idx}
                                            href={res.path}
                                            download
                                            className={styles.resCard}
                                            variants={cardVariants}
                                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className={styles.resVisual}>
                                                <res.icon size={18} strokeWidth={2} />
                                            </div>
                                            <div className={styles.resMeta}>
                                                <span className={styles.resTitle}>{res.name}</span>
                                                <span className={styles.resSubtitle}>{res.type} DOWNLOAD</span>
                                            </div>
                                            <div className={styles.downloadCircle}>
                                                <Download size={10} />
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
