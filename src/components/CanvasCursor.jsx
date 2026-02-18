import React, { useEffect, useRef } from "react";

const CanvasCursor = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        // State
        const particles = [];
        const mouse = { x: -100, y: -100 };
        const lastMouse = { x: -100, y: -100 };

        let isCursorVisible = true;

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Check if mouse is over footer
            if (e.target.closest('footer')) {
                isCursorVisible = false;
            } else {
                isCursorVisible = true;
            }
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Interpolate mouse movement for smooth trails
            const dx = mouse.x - lastMouse.x;
            const dy = mouse.y - lastMouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Spawn particles along the path if mouse moved AND cursor is visible
            if (dist > 1 && isCursorVisible) {
                const steps = Math.min(dist, 10); // cap steps
                for (let i = 0; i < steps; i++) {
                    const t = i / steps;
                    const x = lastMouse.x + dx * t;
                    const y = lastMouse.y + dy * t;

                    // Randomize slightly
                    particles.push({
                        x: x + (Math.random() - 0.5) * 5,
                        y: y + (Math.random() - 0.5) * 5,
                        vx: (Math.random() - 0.5) * 1,
                        vy: (Math.random() - 0.5) * 1,
                        life: 1,
                        size: Math.random() * 3 + 1,
                        color: `hsla(${Math.random() * 60 + 250}, 100%, 70%, 1)` // Purple/Blue/Pink
                    });
                }
            }
            lastMouse.x = mouse.x;
            lastMouse.y = mouse.y;

            // Update and Draw Particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Physics
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02; // Fade speed

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    i--;
                    continue;
                }

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;

                ctx.globalAlpha = p.life;
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0;
            }

            // Draw Main Cursor (Glowing Star) - ONLY if visible
            if (mouse.x !== -100 && isCursorVisible) {
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = "white";
                ctx.shadowBlur = 20;
                ctx.shadowColor = "#915EFF";
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-50"
        />
    );
};

export default CanvasCursor;
