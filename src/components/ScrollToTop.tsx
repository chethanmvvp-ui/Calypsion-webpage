'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import styles from './ScrollToTop.module.css';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [isOnSage, setIsOnSage] = useState(false);

    useEffect(() => {
        const toggleThemeAndVisibility = () => {
            // Visibility check
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // Theme detection logic
            const buttonPos = window.innerHeight - 40; // 40px from bottom
            const sageSections = document.querySelectorAll('[data-theme="sage"]');
            let foundSage = false;
            
            sageSections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (buttonPos >= rect.top && buttonPos <= rect.bottom) {
                    foundSage = true;
                }
            });
            
            setIsOnSage(foundSage);
        };

        window.addEventListener('scroll', toggleThemeAndVisibility);
        return () => window.removeEventListener('scroll', toggleThemeAndVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    onClick={scrollToTop}
                    className={`${styles.scrollTop} ${isOnSage ? styles.onSage : ''}`}
                    aria-label="Scroll to top"
                >
                    <div className={styles.iconWrapper}>
                        <ArrowUp size={20} />
                    </div>
                    <span className={styles.text}>TOP</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
