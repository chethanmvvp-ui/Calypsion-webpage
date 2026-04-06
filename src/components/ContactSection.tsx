'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { sendEmail } from '@/services/emailService';
import styles from './ContactSection.module.css';
import { TextReveal } from './TextReveal';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+91',
        phone: '',
        company: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        const result = await sendEmail({
            name: formData.name,
            email: formData.email,
            phone: `${formData.countryCode} ${formData.phone}`,
            company: formData.company,
            message: formData.message,
            subject: 'New Website Message (Contact Form)',
            time: new Date().toLocaleString()
        });

        if (result.success) {
            setStatus('success');
            setFormData({ name: '', email: '', countryCode: '+91', phone: '', company: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } else {
            setStatus('error');
            setErrorMessage(result.error || 'Connection Failed');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <section className={styles.section} id="contact">
            <div className={styles.gridOverlay} />
            <div className={styles.laserLine} />
            <div className="container">
                <div className={styles.innerContainer}>
                    <div className={styles.header}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: [0, 1, 0.5, 1] }}
                            transition={{ duration: 0.5, times: [0, 0.2, 0.5, 0.8] }}
                            className={styles.terminalID}
                        >
                            PROTO_OUTREACH_V7.2
                        </motion.div>
                        <h2 className={styles.title}>
                            <TextReveal
                                text="Industrial Outreach Terminal"
                                className={styles.title}
                                justifyContent="flex-start"
                            />
                        </h2>
                    </div>

                    <div className={styles.layout}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className={styles.info}
                        >
                            <motion.div variants={itemVariants} className={styles.terminalShell}>
                                <div className={styles.shellHeader}>
                                    <div className={styles.dot} />
                                    <div className={styles.dot} />
                                    <div className={styles.dot} />
                                    <span>CONTACT_DATABASE</span>
                                </div>
                                <div className={styles.contactDetails}>
                                    {[
                                        { label: 'DIRECT_COMMS', value: '+91 89710 67207' },
                                        { label: 'ENCRYPTED_MAIL', value: 'info@calypsion.com' },
                                        { label: 'PHYSICAL_NODE (HQ)', value: 'Bomanahalli, Bangalore, KA 560068' }
                                    ].map((detail, idx) => (
                                        <motion.div key={idx} variants={itemVariants} className={styles.detail}>
                                            <span>{detail.label}</span>
                                            <b>{detail.value}</b>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                <motion.div variants={itemVariants} className={styles.certNode}>
                                    <div className={styles.verifiedStatus}>
                                        <div className={styles.verifiedDot} />
                                        SYSTEM_VERIFIED
                                    </div>
                                    <b>MSME_CERTIFIED_UNIT</b>
                                </motion.div>
                                <motion.div variants={itemVariants} className={styles.certNode}>
                                    <div className={styles.verifiedStatus}>
                                        <div className={styles.verifiedDot} />
                                        AUTHENTICATED
                                    </div>
                                    <b>STARTUP_INDIA_RECOGNIZED</b>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className={styles.formTerminal}
                        >
                            <div className={styles.formHeader}>
                                MESSAGE_TRANSMISSION_PROTOCOL
                            </div>
                            <form onSubmit={handleSubmit} className={styles.formGrid}>
                                {([
                                    { label: 'IDENTIFIER (FullName)', name: 'name' as const, type: 'text', placeholder: 'Enter Name...' },
                                    { label: 'SECURE_MAIL', name: 'email' as const, type: 'email', placeholder: 'Enter Industrial Email...' },
                                ] as const).map((field, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * idx }}
                                        className={styles.inputGroup}
                                    >
                                        <label>{field.label}</label>
                                        <input
                                            type={field.type}
                                            required
                                            placeholder={field.placeholder}
                                            value={formData[field.name]}
                                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                        />
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className={styles.inputGroup}
                                >
                                    <label>COMMS_CHANNEL (Phone)</label>
                                    <div className={styles.phoneInputRow}>
                                        <input
                                            type="text"
                                            className={styles.countryInput}
                                            placeholder="+91"
                                            value={formData.countryCode}
                                            onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Enter Phone Number..."
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                    className={styles.inputGroup}
                                >
                                    <label>ORGANIZATION</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Industrial Entity..."
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                    className={`${styles.inputGroup} ${styles.fullWidth}`}
                                >
                                    <label>PAYLOAD (Message)</label>
                                    <textarea
                                        rows={4}
                                        required
                                        placeholder="Describe the technical requirement..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 }}
                                    className={styles.fullWidth}
                                >
                                    {status === 'error' && errorMessage ? (
                                        <p role="alert" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 12 }}>
                                            {errorMessage}
                                        </p>
                                    ) : null}
                                    <button
                                        type="submit"
                                        className={styles.transmissionBtn}
                                        disabled={status === 'sending'}
                                        data-active={status === 'sending'}
                                    >
                                        {status === 'sending' ? 'ESTABLISHING_LINK...' : status === 'success' ? 'TRANSMISSION_COMPLETE' : 'INITIATE_HANDSHAKE'}
                                    </button>
                                </motion.div>
                            </form>
                        </motion.div>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.2, delayChildren: 0.5 }}
                        className={styles.legalFooter}
                    >
                        <motion.span
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            © 2025 <b>CALYPSION_INNOVATIONS</b>. ALL_RIGHTS_RESERVED.
                        </motion.span>
                        <motion.span
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            INDUSTRIAL_IDENTIFIER: <b>29AAUFC7397L1Z9</b> [GSTIN]
                        </motion.span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
