'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import styles from './GoBack.module.css';

export default function GoBack() {
    const router = useRouter();
    const pathname = usePathname();
    const [isOnSage, setIsOnSage] = useState(false);

    // Only show if NOT on the home page
    const isSubPage = pathname !== '/';

    useEffect(() => {
        const toggleTheme = () => {
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

        window.addEventListener('scroll', toggleTheme);
        toggleTheme(); // Initial check
        return () => window.removeEventListener('scroll', toggleTheme);
    }, []);

    const handleBack = () => {
        router.back();
    };

    return (
        <AnimatePresence>
            {isSubPage && (
                <motion.button
                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.8 }}
                    onClick={handleBack}
                    className={`${styles.goBack} ${isOnSage ? styles.onSage : ''}`}
                    aria-label="Go back"
                >
                    <div className={styles.iconWrapper}>
                        <ArrowLeft size={18} />
                    </div>
                    <span className={styles.text}>BACK</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
