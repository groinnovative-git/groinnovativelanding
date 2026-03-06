import { useEffect, useRef, useState } from 'react';
import './EyeFollowIcon.css';

export default function EyeFollowIcon() {
    const leftEyeRef = useRef(null);
    const rightEyeRef = useRef(null);
    const leftPupilRef = useRef(null);
    const rightPupilRef = useRef(null);
    const rafRef = useRef(null);

    const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const isHovering = useRef(false);
    const mouseIsActive = useRef(false);

    // Lerp state tracking
    const currentPupilL = useRef({ x: 0, y: 0, scale: 1 });
    const currentPupilR = useRef({ x: 0, y: 0, scale: 1 });

    // ── Blink state (mobile/tablet only) ──
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(max-width: 1023px)').matches;
    });
    const [reducedMotion, setReducedMotion] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });

    // Listen for viewport and reduced-motion changes
    useEffect(() => {
        const mobileQuery = window.matchMedia('(max-width: 1023px)');
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleMobileChange = (e) => setIsMobile(e.matches);
        const handleMotionChange = (e) => setReducedMotion(e.matches);

        mobileQuery.addEventListener('change', handleMobileChange);
        motionQuery.addEventListener('change', handleMotionChange);

        return () => {
            mobileQuery.removeEventListener('change', handleMobileChange);
            motionQuery.removeEventListener('change', handleMotionChange);
        };
    }, []);

    // ── Blink interval (mobile/tablet only, respects reduced motion) ──
    useEffect(() => {
        if (!isMobile || reducedMotion) return;

        const doBlink = () => {
            const leftEye = leftEyeRef.current;
            const rightEye = rightEyeRef.current;
            if (!leftEye || !rightEye) return;

            // Close eyelids (120ms)
            leftEye.style.transition = 'transform 120ms ease-in';
            rightEye.style.transition = 'transform 120ms ease-in';
            leftEye.style.transform = 'scaleY(0.1)';
            rightEye.style.transform = 'scaleY(0.1)';

            // Stay closed (60ms), then open (120ms)
            setTimeout(() => {
                leftEye.style.transition = 'transform 120ms ease-out';
                rightEye.style.transition = 'transform 120ms ease-out';
                leftEye.style.transform = 'scaleY(1)';
                rightEye.style.transform = 'scaleY(1)';

                // Reset transition after open completes
                setTimeout(() => {
                    if (leftEye) leftEye.style.transition = 'transform 0.1s ease';
                    if (rightEye) rightEye.style.transition = 'transform 0.1s ease';
                }, 130);
            }, 180); // 120ms close + 60ms hold
        };

        const intervalId = setInterval(doBlink, 3000);

        return () => clearInterval(intervalId);
    }, [isMobile, reducedMotion]);

    // ── Eye tracking (desktop mouse follow) ──
    useEffect(() => {
        // Feature detect touch devices — skip tracking entirely on mobile
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (isTouch) return; // No mouse to track — save CPU

        const handleMouseMove = (e) => {
            mouseIsActive.current = true;
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeaveDoc = () => { mouseIsActive.current = false; };

        // Global mouse tracking
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeaveDoc);

        const lerp = (start, end, factor) => start + (end - start) * factor;

        const updateEye = (eye, pupil, currentPos) => {
            if (!eye || !pupil) return;

            const rect = eye.getBoundingClientRect();
            const eyeCenterX = rect.left + rect.width / 2;
            const eyeCenterY = rect.top + rect.height / 2;

            let targetX = 0;
            let targetY = 0;

            if (mouseIsActive.current) {
                const dx = mousePos.current.x - eyeCenterX;
                const dy = mousePos.current.y - eyeCenterY;
                const angle = Math.atan2(dy, dx);

                const maxRadius = (rect.width / 2) - (pupil.offsetWidth / 2) - 3;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Track faster/closer on hover - distance multiplier
                const radius = Math.min(maxRadius, dist * 0.12);

                targetX = Math.cos(angle) * radius;
                targetY = Math.sin(angle) * radius;
            }

            // Target scale (dilation on hover)
            const targetScale = isHovering.current ? 1.15 : 1.0;

            // Determine tracking speed (faster on hover)
            const trackingSpeed = isHovering.current ? 0.50 : 0.35;

            // Apply smooth lerping
            currentPos.x = lerp(currentPos.x, targetX, trackingSpeed);
            currentPos.y = lerp(currentPos.y, targetY, trackingSpeed);
            currentPos.scale = lerp(currentPos.scale, targetScale, 0.35);

            pupil.style.transform = `translate(${currentPos.x}px, ${currentPos.y}px) scale(${currentPos.scale})`;
        };

        const animate = () => {
            updateEye(leftEyeRef.current, leftPupilRef.current, currentPupilL.current);
            updateEye(rightEyeRef.current, rightPupilRef.current, currentPupilR.current);
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeaveDoc);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <span
            className="eye-follow-wrapper"
            onMouseEnter={() => { isHovering.current = true; }}
            onMouseLeave={() => { isHovering.current = false; }}
        >
            <div ref={leftEyeRef} className="eye-follow-icon">
                <div ref={leftPupilRef} className="eye-follow-pupil">
                    <div className="eye-pupil-glint"></div>
                </div>
            </div>
            <div ref={rightEyeRef} className="eye-follow-icon">
                <div ref={rightPupilRef} className="eye-follow-pupil">
                    <div className="eye-pupil-glint"></div>
                </div>
            </div>
        </span>
    );
}
