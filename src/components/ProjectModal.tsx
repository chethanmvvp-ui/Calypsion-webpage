'use client';

import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import styles from './ProjectModal.module.css';
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface ProjectModalProps {
    module?: {
        id?: string;
        title: string;
        description: string;
        fullDescription?: string;
        slides: string[];
        bullets?: string[];
        launchUrl?: string;
        status?: string;
    };
    product?: {
        id?: string;
        title: string;
        desc: string;
        image: string;
        features?: string[];
        specs?: Record<string, string>;
    };
    onClose: () => void;
    onLaunch?: (url: string) => void;
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
};

const staggerContainer: Variants = {
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export function ProjectModal({ module, product, onClose, onLaunch }: ProjectModalProps) {
    const title = product?.title || module?.title || '';
    const description = module?.fullDescription || product?.desc || module?.description || '';
    const images = product?.image ? [product.image] : (module?.slides || []);
    const id = product?.id || module?.id || '';
    const technicalList = product?.features || module?.bullets || [];

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.backdrop}
                onClick={onClose}
            />
            <motion.div
                layoutId={`module-card-${title}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={styles.modalContent}
            >
                <div className={styles.modalInner}>
                    <button className={styles.closeBtn} onClick={onClose}>
                        Close &times;
                    </button>

                    <div className={styles.headerArea}>
                        <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className={styles.topId}
                        >
                            {id || 'ASET_ID: 000-CAL'}
                        </motion.span>
                        <motion.h2 layoutId="pilot-title" className={styles.title}>
                            {title}
                        </motion.h2>
                    </div>

                    <div className={styles.projectBody}>
                        <motion.div 
                            className={styles.imageGrid}
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            {images.length > 0 && (
                                <motion.img 
                                    variants={itemVariants}
                                    src={images[0]} 
                                    alt="Technical view" 
                                    className={styles.detailImage} 
                                />
                            )}
                            
                            <motion.p variants={itemVariants} className={styles.description}>
                                {description}
                            </motion.p>
                        </motion.div>

                        <motion.div 
                            className={styles.textContent}
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            {/* Technical Specifications (Product only) */}
                            {product?.specs && (
                                <motion.div variants={itemVariants} className={styles.technicalSection}>
                                    <span className={styles.sectionLabel}>System Specifications</span>
                                    <div className={styles.specsTable}>
                                        {Object.entries(product.specs).map(([key, val], i) => (
                                            <div key={i} className={styles.specRow}>
                                                <span className={styles.specKey}>{key}</span>
                                                <span className={styles.specValue}>{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Technical Bullet Points (Features or Module Bullets) */}
                            {technicalList.length > 0 && (
                                <motion.div variants={itemVariants} className={styles.technicalSection}>
                                    <span className={styles.sectionLabel}>Core Capabilities</span>
                                    <ul className={styles.featuresList}>
                                        {technicalList.map((f, i) => (
                                            <motion.li 
                                                key={i}
                                                variants={{
                                                    hidden: { opacity: 0, x: -10 },
                                                    visible: { opacity: 1, x: 0 }
                                                }}
                                            >
                                                {f}
                                            </motion.li>
                                        ))}
                                    </ul>

                                    {/* Moved Launch Project button here */}
                                    {module?.launchUrl && (
                                        <div className={styles.modalActionWrapper}>
                                            {module.status === 'Coming Soon' ? (
                                                <div className={styles.comingSoonLabel}>
                                                    Coming Soon <span className={styles.statusDot} />
                                                </div>
                                            ) : (
                                                <button 
                                                    className={styles.launchBtn} 
                                                    onClick={() => {
                                                        if (onLaunch && module.launchUrl) {
                                                            onLaunch(module.launchUrl);
                                                        } else if (module.launchUrl) {
                                                            window.open(module.launchUrl, '_blank');
                                                        }
                                                    }}
                                                >
                                                    Launch Project <ArrowRight size={16} />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
