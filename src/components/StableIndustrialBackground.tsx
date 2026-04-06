'use client';
import { useRef, useEffect, useState } from 'react';
import styles from './StableIndustrialBackground.module.css';

export default function StableIndustrialBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particlesArray: Particle[] = [];
        const mouse = { x: -1000, y: -1000, radius: 150 };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        class Particle {
            x: number;
            y: number;
            dx: number;
            dy: number;
            size: number;

            constructor(x: number, y: number, dx: number, dy: number, size: number) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.size = size;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = 'rgba(0, 59, 50, 0.6)'; // Moderately darker Sage/Teal
                ctx.fill();
            }

            update() {
                if (this.x > window.innerWidth || this.x < 0) this.dx = -this.dx;
                if (this.y > window.innerHeight || this.y < 0) this.dy = -this.dy;

                this.x += this.dx;
                this.y += this.dy;

                this.draw();
            }
        }

        const init = () => {
            particlesArray = [];
            // Adaptive particle count based on screen size
            const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 15000);
            for (let i = 0; i < numParticles; i++) {
                const size = Math.random() * 1.5 + 0.5;
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                const dx = (Math.random() - 0.5) * 0.3; // Very slow, stable drift
                const dy = (Math.random() - 0.5) * 0.3;
                particlesArray.push(new Particle(x, y, dx, dy, size));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }

            connect();
            requestAnimationFrame(animate);
        };

        const connect = () => {
            for (let a = 0; a < particlesArray.length; a++) {
                // Connection between nodes
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        const opacity = 1 - (distance / 100);
                        ctx.strokeStyle = `rgba(0, 59, 50, ${opacity * 0.3})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }

                // Connection to mouse
                const dxMouse = mouse.x - particlesArray[a].x;
                const dyMouse = mouse.y - particlesArray[a].y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distMouse < mouse.radius) {
                    const opacity = 1 - (distMouse / mouse.radius);
                    ctx.strokeStyle = `rgba(202, 219, 199, ${opacity * 0.4})`; // Sage Glow
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        };

        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    if (!isMounted) return <div className={styles.container} />;

    return (
        <div className={styles.container}>
            <div className={styles.grid} />
            <div className={styles.scanBeam} />
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.vignette} />
        </div>
    );
}
