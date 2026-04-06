'use client';

import { motion, AnimatePresence } from 'framer-motion';
import styles from './IframeModal.module.css';
import { useState, useEffect } from 'react';
import { MonitorSmartphone, ShieldCheck } from 'lucide-react';
import { registerModal, unregisterModal } from '@/services/modalManager';

interface IframeModalProps {
    url: string;
    title: string;
    onClose: () => void;
}

export function IframeModal({ url, title, onClose }: IframeModalProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        registerModal();
        const updateViewport = () => setIsMobile(window.innerWidth < 640);
        updateViewport();
        window.addEventListener('resize', updateViewport);
        const timer = setTimeout(() => setIsLoading(false), 2000); // Minimum loading state for effect
        return () => {
            document.body.style.overflow = 'auto';
            unregisterModal();
            window.removeEventListener('resize', updateViewport);
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.backdrop}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 50 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className={styles.modalContent}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.modalInner}>
                        <div className={styles.modalHeader}>
                            <span className={styles.modalTag}>Industrial Link // Verified</span>
                            <h2 className={styles.modalTitle}>{title} Platform</h2>
                        </div>

                        <button className={styles.closeBtn} onClick={onClose}>
                            Exit View &times;
                        </button>

                        {isMobile && (
                            <div className={styles.mobileNotice} role="status" aria-live="polite">
                                <MonitorSmartphone size={18} className={styles.mobileNoticeIcon} />
                                <p className={styles.mobileNoticeText}>
                                    For the best viewing experience, switch to desktop site in your browser or open this module on a desktop or tablet.
                                </p>
                            </div>
                        )}

                        <div className={styles.iframeWrapper}>
                            {isLoading && (
                                <div className={styles.loadingOverlay}>
                                    <ShieldCheck size={40} className={styles.loaderPulse} color="var(--bg-secondary)" />
                                    <span className={styles.loadingText}>Synchronizing Environment...</span>
                                    <div className={styles.loaderPulse} />
                                </div>
                            )}
                            <iframe
                                src={url}
                                className={styles.iframe}
                                title={title}
                                onLoad={() => setIsLoading(false)}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
