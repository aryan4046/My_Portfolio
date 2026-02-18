import React, { useEffect, useRef } from "react";

const AntigravityBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        let width = window.innerWidth;
        let height = window.innerHeight;

        let mouse = { x: -1000, y: -1000 };
        let particles = [];

        // Configuration
        const SPACING = 30;
        const RADIUS = 1.5;
        const MOUSE_RADIUS = 150;
        const FORCE_FACTOR = 5;
        const FRICTION = 0.9;
        const EASE = 0.1;

        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            particles = [];
            for (let x = 0; x < width; x += SPACING) {
                for (let y = 0; y < height; y += SPACING) {
                    particles.push({
                        x: x,
                        y: y,
                        originX: x,
                        originY: y,
                        vx: 0,
                        vy: 0,
                        driftVx: (Math.random() - 0.5) * 0.3,
                        driftVy: (Math.random() - 0.5) * 0.3,
                        color: `rgba(145, 94, 255, ${Math.random() * 0.4 + 0.3})`, // Brighter
                    });
                }
            }
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleResize = () => {
            init();
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                // Continuous Drift
                p.originX += p.driftVx;
                p.originY += p.driftVy;

                // Wrap around screen
                if (p.originX > width) p.originX = 0;
                if (p.originX < 0) p.originX = width;
                if (p.originY > height) p.originY = 0;
                if (p.originY < 0) p.originY = height;

                // Calculate distance to mouse
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;

                // Repulsion logic
                let force = 0;
                if (distance < MOUSE_RADIUS) {
                    force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
                    force *= FORCE_FACTOR;

                    p.vx -= forceDirectionX * force;
                    p.vy -= forceDirectionY * force;
                }

                // Return to origin (Spring)
                const springDx = p.originX - p.x;
                const springDy = p.originY - p.y;

                p.vx += springDx * EASE;
                p.vy += springDy * EASE;

                // Friction
                p.vx *= FRICTION;
                p.vy *= FRICTION;

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, RADIUS, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Listeners
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        init();
        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
        />
    );
};

export default AntigravityBackground;
