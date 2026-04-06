'use client';
import { useRef, useEffect } from 'react';

export function InteractiveDustBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Handle high DPI displays for crisp rendering
        const dpr = window.devicePixelRatio || 1;

        const resize = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener('resize', resize);

        // Global Mouse Tracking
        const mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Ambient Fixed Dust Particles
        class Dust {
            x: number; y: number; size: number; speedX: number; speedY: number; baseOpacity: number;
            constructor() {
                this.x = Math.random() * window.innerWidth;
                this.y = Math.random() * window.innerHeight;
                this.size = Math.random() * 2 + 0.5; // Small, elegant dust
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.baseOpacity = Math.random() * 0.4 + 0.1;
            }

            update() {
                // Continuous fixed animation
                this.x += this.speedX;
                this.y += this.speedY;

                // Endless wrapping
                if (this.x < 0) this.x = window.innerWidth;
                if (this.x > window.innerWidth) this.x = 0;
                if (this.y < 0) this.y = window.innerHeight;
                if (this.y > window.innerHeight) this.y = 0;

                // Mouse Interaction: Kinematic Repulsion (Dust dodges the mouse)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let drawX = this.x;
                let drawY = this.y;

                const interactionRadius = 200;
                if (dist < interactionRadius) {
                    const fleeSpeed = (interactionRadius - dist) * 0.05;
                    drawX -= (dx / dist) * fleeSpeed;
                    drawY -= (dy / dist) * fleeSpeed;
                }

                ctx!.fillStyle = `rgba(0, 59, 50, ${this.baseOpacity})`;
                ctx!.beginPath();
                ctx!.arc(drawX, drawY, this.size, 0, Math.PI * 2);
                ctx!.fill();
            }
        }

        const particles = Array.from({ length: 120 }, () => new Dust());

        // Master Render Loop
        let animationFrameId: number;
        const render = () => {
            // Clear canvas structure
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // Update & Draw Dust
            particles.forEach(p => p.update());

            // Draw the beautiful Mouse Aura Flashlight directly onto the canvas
            // This gives the "background interacts with mouse" volumetric glow requirement
            if (mouse.x > -1000) {
                const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 600);
                gradient.addColorStop(0, 'rgba(202, 219, 199, 0.4)'); // Solid Sage inner glow
                gradient.addColorStop(1, 'rgba(253, 246, 243, 0)'); // Fades completely to transparent

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            }

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: 'var(--bg-primary)', pointerEvents: 'none', overflow: 'hidden' }}>
            {/* Subtle SVG film grain over everything for texture */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, mixBlendMode: 'multiply', zIndex: 10 }}>
                <filter id="noiseFilterAbs">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilterAbs)" />
            </svg>

            {/* Core interaction canvas layer */}
            <canvas ref={canvasRef} style={{ display: 'block', width: '100vw', height: '100vh' }} />
        </div>
    );
}
