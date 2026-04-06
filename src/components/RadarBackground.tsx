'use client';

import { motion } from 'framer-motion';
import styles from './RadarBackground.module.css';

export function RadarBackground() {
    return (
        <div className={styles.container}>
            {/* 1. Radar Sweep / Scanning Beam */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className={styles.radarSweep}
            />

            {/* 2. Hexagonal Data Grid Overlay */}
            <div className={styles.hexGrid} />

            {/* 3. Glowing Data Nodes */}
            <div className={styles.nodesContainer}>
                {/* We place these roughly on hex intersections */}
                <div className={`${styles.node} ${styles.n1}`} />
                <div className={`${styles.node} ${styles.n2}`} />
                <div className={`${styles.node} ${styles.n3}`} />
                <div className={`${styles.node} ${styles.n4}`} />
                <div className={`${styles.node} ${styles.n5}`} />
                <div className={`${styles.node} ${styles.n6}`} />
                <div className={`${styles.node} ${styles.n7}`} />
            </div>

            {/* 4. Radial Vignette to soften the edges toward the border */}
            <div className={styles.vignette} />
        </div>
    );
}
