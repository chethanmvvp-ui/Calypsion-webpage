'use client';
import { useEffect, useRef } from 'react';
import styles from './NetworkBackground.module.css';

export function NetworkBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particlesArray: Particle[] = [];
        const mouse = { x: -1000, y: -1000, radius: 180 }; // Radius of connection

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
                ctx.fillStyle = 'rgba(0, 59, 50, 0.5)'; // Deep Teal Dots
                ctx.fill();
            }

            update() {
                // Bounce off walls
                if (this.x > window.innerWidth || this.x < 0) this.dx = -this.dx;
                if (this.y > window.innerHeight || this.y < 0) this.dy = -this.dy;

                this.x += this.dx;
                this.y += this.dy;

                this.draw();
            }
        }

        const init = () => {
            particlesArray = [];
            const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 10000);
            for (let i = 0; i < numParticles; i++) {
                const size = Math.random() * 2 + 1;
                const x = Math.random() * (window.innerWidth - size * 2) + size;
                const y = Math.random() * (window.innerHeight - size * 2) + size;
                const dx = (Math.random() - 0.5) * 0.8; // Slow drift
                const dy = (Math.random() - 0.5) * 0.8;
                particlesArray.push(new Particle(x, y, dx, dy, size));
            }
        };

        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }

            connect();

            // Draw a subtle ring tracking the mouse
            if (mouse.x !== -1000 && mouse.y !== -1000) {
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(0, 59, 50, 0.4)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        };

        const connect = () => {
            let opacityValue = 1;

            for (let a = 0; a < particlesArray.length; a++) {
                // Connect nodes to mouse directly!
                const dxMouse = mouse.x - particlesArray[a].x;
                const dyMouse = mouse.y - particlesArray[a].y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distMouse < mouse.radius) {
                    opacityValue = 1 - (distMouse / mouse.radius);
                    ctx.strokeStyle = `rgba(0, 59, 50, ${opacityValue * 0.35})`;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }

                // Connect nodes to each other
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) { // Connect nodes if within 120px
                        opacityValue = 1 - (distance / 120);
                        ctx.strokeStyle = `rgba(0, 59, 50, ${opacityValue * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Delay init to ensure window dims are captured accurately
        setTimeout(() => handleResize(), 100);
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.canvas} />;
}
