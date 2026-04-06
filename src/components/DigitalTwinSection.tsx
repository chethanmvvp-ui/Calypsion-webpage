'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './DigitalTwinSection.module.css';

const telemetryData = [
    { label: 'TEMPERATURE', value: '22.6°C', unit: '°C' },
    { label: 'PRESSURE', value: '1 bar', unit: 'bar' },
    { label: 'FLOW RATE', value: '125.3 L/min', unit: 'L/min' },
    { label: 'VIBRATION', value: '1 mm/s', unit: 'mm/s' },
    { label: 'POWER', value: '43.2 kW', unit: 'kW' },
    { label: 'SPEED', value: '1.8 m/s', unit: 'm/s' }
];

const sensorColors = {
    Temperature: '#CADBC7', // Mint
    Pressure: '#10B981',    // Emerald
    FlowRate: '#003B32',   // Deep Forest Green
    Vibration: '#F59E0B',  // Amber (for mechanical health)
    Power: '#065F46',      // Dark Teal
    Speed: '#A7F3D0'       // Light Emerald
};

export default function DigitalTwinSection() {
    const [isPaused, setIsPaused] = useState(false);
    const [chartData, setChartData] = useState<number[][]>([[], [], [], [], [], []]);
    const chartContainerRef = useRef<HTMLDivElement>(null);

    // Simulate real-time data for the chart
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setChartData(prev => {
                return prev.map(line => {
                    const newValue = 40 + Math.random() * 60;
                    const newLine = [...line, newValue];
                    return newLine.slice(-20); // Keep last 20 points
                });
            });
        }, 800);

        return () => clearInterval(interval);
    }, [isPaused]);

    const generatePath = (data: number[]) => {
        if (data.length < 2) return "";
        const width = 100;
        const height = 100;
        const step = width / (data.length - 1);
        
        return data.map((val, i) => {
            const x = i * step;
            const y = height - val;
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    };

    return (
        <section className={`${styles.section} cut-corner-tl`} id="digital-twin">
            <div className="container">
                <div className={styles.headingArea}>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className={styles.title}
                    >
                        Digital Twin
                    </motion.h2>
                    <p className={styles.subtitle}>Interactive 3D visualization with real-time data</p>
                </div>

                <div className={styles.dashboardContainer}>
                    {/* Top Controls */}
                    <div className={styles.controls}>
                        <button className={styles.controlBtn} onClick={() => window.location.reload()}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                            Reset View
                        </button>
                        <button className={styles.controlBtn} onClick={() => setIsPaused(!isPaused)}>
                            {isPaused ? (
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                            ) : (
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
                            )}
                            {isPaused ? 'Resume' : 'Pause'}
                        </button>
                    </div>

                    {/* Main Robot Visualization Area */}
                    <div className={styles.visualizer}>
                        <Image 
                            src="/digital-twin-robotic.png"
                            alt="Robotic Factory Floor Simulation"
                            fill
                            className={styles.robotImage}
                            priority
                        />
                        <div className={styles.overlayGlow}></div>
                    </div>

                    {/* Metrics Dashboard */}
                    <div className={styles.metricsHeader}>METRICS</div>
                    <div className={styles.metricsGrid}>
                        {/* Real-time Chart */}
                        <div className={styles.chartPanel}>
                            <div className={styles.chartLegend}>
                                {Object.entries(sensorColors).map(([name, color]) => (
                                    <div key={name} className={styles.legendItem}>
                                        <span className={styles.dot} style={{ backgroundColor: color }}></span>
                                        {name}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.chartArea} ref={chartContainerRef}>
                                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="rgba(202, 219, 199, 0.1)" />
                                            <stop offset="100%" stopColor="transparent" />
                                        </linearGradient>
                                    </defs>
                                    {chartData.map((data, i) => (
                                        <motion.path
                                            key={i}
                                            d={generatePath(data)}
                                            fill="none"
                                            stroke={Object.values(sensorColors)[i]}
                                            strokeWidth="0.8"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1 }}
                                        />
                                    ))}
                                </svg>
                                
                                {/* Axis Labels */}
                                <div className={styles.yAxis}>
                                    <span>160</span>
                                    <span>100</span>
                                    <span>40</span>
                                    <span>0</span>
                                </div>
                                <div className={styles.xAxis}>
                                    <span>14:54:13</span>
                                    <span>14:58:04</span>
                                    <span>15:03:40</span>
                                </div>
                            </div>
                        </div>

                        {/* Telemetry Table */}
                        <div className={styles.telemetryTable}>
                            {telemetryData.map((item, i) => (
                                <div key={i} className={styles.telemetryRow}>
                                    <span className={styles.paramLabel}>{item.label}</span>
                                    <span className={styles.paramValue}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
