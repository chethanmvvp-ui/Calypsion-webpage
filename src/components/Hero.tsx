/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import styles from './Hero.module.css';
import { FadeIn, StaggerContainer } from './FadeIn';
import { TextReveal } from './TextReveal';
import { PilotRequestModal } from './PilotRequestModal';

export default function Hero() {
    const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'pilot' | 'demo'>('pilot');

    const openModal = (mode: 'pilot' | 'demo') => {
        setModalMode(mode);
        setIsPilotModalOpen(true);
    };

    return (
        <section className={styles.hero}>
            <div className={`container ${styles.container}`}>

                <div className={`cut-corner-hero ${styles.mediaBox}`}>
                    {/* We'll use a very dark solid color to act as a placeholder for an industrial photo, matching the reference's dark block */}
                    <div className={styles.mediaOverlay}></div>
                    <StaggerContainer className={styles.textWrap}>
                        <h1 className={styles.title}>
                            <TextReveal text="Connect your" /><br />
                            <TextReveal text="factory floor to" delay={0.1} /><br />
                            <TextReveal text="predictive intelligence" delay={0.2} />
                        </h1>
                    </StaggerContainer>
                </div>

                <FadeIn delay={0.4} direction="up" className={styles.bottomBar}>
                    <p className={styles.subtitle}>
                        OEE monitoring, vibration analytics, and live simulation.<br />
                        Deploy one, scale to all in under 2 weeks.
                    </p>
                    <div className={styles.ctaGroup}>
                        <button 
                            onClick={() => openModal('pilot')}
                            className="btn btn-primary"
                        >
                            Request Pilot Program
                        </button>
                        <button 
                            onClick={() => openModal('demo')}
                            className="btn btn-outline"
                        >
                            Watch Demo
                        </button>
                    </div>
                </FadeIn>

            </div>
            <PilotRequestModal 
                isOpen={isPilotModalOpen} 
                onClose={() => setIsPilotModalOpen(false)} 
                mode={modalMode}
            />
        </section>
    );
}
