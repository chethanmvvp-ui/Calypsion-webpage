'use client';

import { motion, AnimatePresence } from 'framer-motion';
import styles from './PilotRequestModal.module.css';
import { useState, useEffect } from 'react';
import { registerModal, unregisterModal } from '@/services/modalManager';
import { sendEmail } from '@/services/emailService';

interface PilotRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode?: 'pilot' | 'demo' | 'tech-data' | 'rd-program';
}

export function PilotRequestModal({ isOpen, onClose, mode = 'pilot' }: PilotRequestModalProps) {
    const [formData, setFormData] = useState({
        email: '',
        countryCode: '+1',
        phone: '',
        company: '',
        description: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const content = {
        pilot: {
            title: 'Pilot Program Request',
            id: 'pilot-program-01',
            infoTitle: 'Industrial Partnership',
            desc: "Deploy Calypsion's edge intelligence at your facility. Our 30-day pilot program is designed for rapid integration with zero production downtime.",
            bullets: ['Full Hardware/Software Audit', 'Live Data Sync in 48 Hours', 'Custom KPI Dashboards', 'Dedicated Field Engineer'],
            btnText: 'Send Request Pilot'
        },
        demo: {
            title: 'Schedule Live Demo',
            id: 'live-demo-v3',
            infoTitle: 'Technical Walkthrough',
            desc: "Experience a live technical deep-dive into the Calypsion ecosystem. We'll show you real-time data flows, predictive models, and hardware integrations tailored to your floor.",
            bullets: ['Virtual Tour of Architecture', 'Live Model Benchmarking', 'Custom ROI Calculation', 'Q&A with Engineering Team'],
            btnText: 'Schedule Technical Demo'
        },
        'tech-data': {
            title: 'Technical Data Request',
            id: 'tech-dossier-v4',
            infoTitle: 'Engineering Documentation',
            desc: 'Access the complete engineering dossier for our industrial units, including API documentation, hardware schematics, and performance validation reports.',
            bullets: ['Full API Documentation', 'Hardware Integration Guides', 'Performance Validation Reports', 'Security Whitepapers'],
            btnText: 'Request Technical Data'
        },
        'rd-program': {
            title: 'R&D Initiative Request',
            id: 'rd-collab-v5',
            infoTitle: 'Joint Development',
            desc: "Collaborate with Calypsion's R&D labs to build custom industrial solutions. We partner with forward-thinking organizations to pilot new technologies in AI, Robotics, and IoT.",
            bullets: ['Custom Algorithm Development', 'Hardware Protoyping', 'Joint IP Opportunities', 'Direct Access to Lab Engineers'],
            btnText: 'Initialize R&D Project'
        }
    }[mode];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        const result = await sendEmail({
            name: formData.company, 
            email: formData.email,
            phone: `${formData.countryCode} ${formData.phone}`,
            company: formData.company,
            message: formData.description,
            subject: `New ${mode === 'pilot' ? 'Pilot' : mode === 'demo' ? 'Demo' : mode === 'tech-data' ? 'Tech-Data' : 'R&D'} Request: ${formData.company}`,
            time: new Date().toLocaleString()
        });

        if (result.success) {
            setStatus('success');
        } else {
            console.error('Submission failed:', result.error);
            setStatus('error');
            setErrorMessage(result.error || 'Connection Failed');
        }
    };

    useEffect(() => {
        if (isOpen) {
            registerModal();
            return () => {
                unregisterModal();
            };
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.backdrop}
                        onClick={onClose}
                    />
                    <motion.div
                        layoutId="pilot-modal"
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

                            {status === 'success' ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={styles.successState}
                                >
                                    <div className={styles.successIcon}>✓</div>
                                    <h2 className={styles.title}>Request Received</h2>
                                    <p className={styles.description}>
                                        Our industrial engineering team will review your pilot request and contact you within 24 hours.
                                    </p>
                                    <button className="btn btn-primary" onClick={onClose} style={{ marginTop: '2rem' }}>Back to Dashboard</button>
                                </motion.div>
                            ) : (
                                <>
                                    <div className={styles.headerArea}>
                                        <motion.span 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className={styles.topId}
                                        >
                                            {content.id}
                                        </motion.span>
                                        <motion.h2 layoutId="pilot-title" className={styles.title}>
                                            {content.title}
                                        </motion.h2>
                                    </div>

                                    <div className={styles.projectBody}>
                                        <div className={styles.imageGrid}>
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className={styles.pilotInfo}
                                            >
                                                <h3 className={styles.infoTitle}>{content.infoTitle}</h3>
                                                <p className={styles.description}>
                                                    {content.desc}
                                                </p>
                                                <motion.ul 
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={{
                                                        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
                                                    }}
                                                    className={styles.featuresList}
                                                >
                                                    {content.bullets.map((b, i) => (
                                                        <motion.li 
                                                            key={i}
                                                            variants={{
                                                                hidden: { opacity: 0, x: -10 },
                                                                visible: { opacity: 1, x: 0 }
                                                            }}
                                                        >
                                                            {b}
                                                        </motion.li>
                                                    ))}
                                                </motion.ul>
                                            </motion.div>
                                        </div>

                                        <div className={styles.textContent}>
                                            <motion.form 
                                                onSubmit={handleSubmit} 
                                                className={styles.form}
                                                initial="hidden"
                                                animate="visible"
                                                variants={{
                                                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } }
                                                }}
                                            >
                                                <motion.div 
                                                    variants={{
                                                        hidden: { opacity: 0, y: 10 },
                                                        visible: { opacity: 1, y: 0 }
                                                    }}
                                                    className={styles.inputGroup}
                                                >
                                                    <label>Corporate Email</label>
                                                    <input 
                                                        type="email" 
                                                        required 
                                                        placeholder="name@company.com"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                    />
                                                </motion.div>

                                                <motion.div 
                                                    variants={{
                                                        hidden: { opacity: 0, y: 10 },
                                                        visible: { opacity: 1, y: 0 }
                                                    }}
                                                    className={styles.row}
                                                >
                                                    <div className={styles.inputGroup}>
                                                        <label>Phone Number</label>
                                                        <div className={styles.phoneRow}>
                                                            <input 
                                                                type="text" 
                                                                className={styles.countryInput}
                                                                placeholder="+1"
                                                                value={formData.countryCode}
                                                                onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                                                            />
                                                            <input 
                                                                type="tel" 
                                                                required 
                                                                placeholder="000 000 0000"
                                                                value={formData.phone}
                                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className={styles.inputGroup}>
                                                        <label>Company Name</label>
                                                        <input 
                                                            type="text" 
                                                            required 
                                                            placeholder="Industrial Ltd."
                                                            value={formData.company}
                                                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                                                        />
                                                    </div>
                                                </motion.div>

                                                <motion.div 
                                                    variants={{
                                                        hidden: { opacity: 0, y: 10 },
                                                        visible: { opacity: 1, y: 0 }
                                                    }}
                                                    className={styles.inputGroup}
                                                >
                                                    <label>Project Scope / Description</label>
                                                    <textarea 
                                                        required 
                                                        placeholder="Tell us about the industrial challenges you'd like to solve..."
                                                        rows={4}
                                                        value={formData.description}
                                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                                    />
                                                </motion.div>

                                                <motion.div 
                                                    variants={{
                                                        hidden: { opacity: 0, scale: 0.95 },
                                                        visible: { opacity: 1, scale: 1 }
                                                    }}
                                                    className={styles.actionArea}
                                                >
                                                    {status === 'error' && errorMessage ? (
                                                        <p role="alert" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 12 }}>
                                                            {errorMessage}
                                                        </p>
                                                    ) : null}
                                                    <button 
                                                        type="submit" 
                                                        className={`btn btn-primary ${styles.submitBtn}`}
                                                        disabled={status === 'sending'}
                                                    >
                                                        {status === 'sending' ? 'ESTABLISHING_HUB...' : content.btnText}
                                                    </button>
                                                </motion.div>
                                            </motion.form>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
