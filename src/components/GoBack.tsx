'use client';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import styles from './GoBack.module.css';

export default function GoBack() {
    const router = useRouter();
    const pathname = usePathname();

    // Only show if NOT on the home page
    const isSubPage = pathname !== '/';

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
                    className={styles.goBack}
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
