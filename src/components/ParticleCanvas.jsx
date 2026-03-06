import { useEffect, useRef, useState } from 'react';

export default function ParticleCanvas() {
    const canvasRef = useRef(null);
    // Detect mobile once at mount — no re-renders needed
    const [isMobile] = useState(() =>
        typeof window !== 'undefined' &&
        (window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches)
    );

    useEffect(() => {
        // Skip entirely on mobile — parent provides CSS gradient fallback
        if (isMobile) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let animId;

        const STAR_COUNT = 3000; // Original high density
        const FOCAL_LENGTH = 3000;

        let stars = [];
        let targetRotation = { x: 0, y: 0 };
        let currentRotation = { x: 0, y: 0 };

        const onMouseMove = (e) => {
            targetRotation.x = (e.clientX / width - 0.5) * 0.4;
            targetRotation.y = (e.clientY / height - 0.5) * 0.4;
        };
        window.addEventListener('mousemove', onMouseMove, { passive: true });

        const onResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };
        window.addEventListener('resize', onResize);

        class Star {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = (Math.random() - 0.5) * 3000;
                this.y = (Math.random() - 0.5) * 3000;
                this.z = Math.random() * 2000;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.vz = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random();
                this.twinkleSpeed = 0.01 + Math.random() * 0.03;
                this.baseOpacity = 2 + Math.random() * 0.6;
                this.isGreen = Math.random() > 0.8;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.z += this.vz;
                if (this.z < 1) this.z = 2000;
                if (this.z > 2000) this.z = 1;
                if (Math.abs(this.x) > 1500) this.x *= -0.99;
                if (Math.abs(this.y) > 1500) this.y *= -0.99;
                this.opacity += this.twinkleSpeed;
                if (this.opacity > 1 || this.opacity < 0) this.twinkleSpeed *= -1;
            }

            project(rx, ry) {
                let x = this.x;
                let y = this.y;
                let z = this.z;
                let cosRy = Math.cos(ry);
                let sinRy = Math.sin(ry);
                let z1 = z * cosRy - x * sinRy;
                let x1 = z * sinRy + x * cosRy;
                let cosRx = Math.cos(rx);
                let sinRx = Math.sin(rx);
                let y2 = y * cosRx - z1 * sinRx;
                let z2 = y * sinRx + z1 * cosRx;
                const scale = FOCAL_LENGTH / (FOCAL_LENGTH + z2);
                this.screenX = x1 * scale + width / 2;
                this.screenY = y2 * scale + height / 2;
                this.scale = scale;
                this.depthOpacity = Math.max(0, (1 - z2 / 2000) * this.baseOpacity);
            }
        }

        function init() {
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push(new Star());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            // No shadowBlur — removed for performance
            ctx.shadowBlur = 0;

            currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
            currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

            for (let s of stars) {
                s.update();
                s.project(currentRotation.y, currentRotation.x);
                const size = (1.2 + Math.random() * 0.5) * s.scale;
                const alpha = s.depthOpacity * s.opacity;

                ctx.beginPath();
                ctx.arc(s.screenX, s.screenY, size, 0, Math.PI * 2);
                ctx.fillStyle = s.isGreen
                    ? `rgba(16, 185, 129, ${alpha})`
                    : `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();
            }

            animId = requestAnimationFrame(animate);
        }

        init();
        animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [isMobile]);

    // On mobile, render nothing — parent CSS handles the background
    if (isMobile) return null;

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.9,
                mixBlendMode: 'screen'
            }}
        />
    );
}