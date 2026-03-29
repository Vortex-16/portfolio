import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

export default function InteractiveDotGrid({
    dotSize = 3,
    dotSpacing = 36,
    dotColorLight = "rgba(0, 0, 0, 0.4)",
    dotColorDark = "rgba(255, 255, 255, 0.3)",
    backgroundColorLight = "transparent",
    backgroundColorDark = "transparent",
    distortionRadius = 150,
    distortionStrength = 50,
    animationSpeed = 0.15
}) {
    const canvasRef = useRef(null);
    const mousePos = useRef({ x: -1000, y: -1000 });
    const animationFrameId = useRef();
    const needsUpdateRef = useRef(true);
    const dotsRef = useRef([]);
    const { isDark } = useTheme();

    const dotColor = isDark ? dotColorDark : dotColorLight;
    const backgroundColor = isDark ? backgroundColorDark : backgroundColorLight;

    // Initialize dots based on canvas size
    const initializeDots = (width, height) => {
        const cols = Math.ceil(width / dotSpacing);
        const rows = Math.ceil(height / dotSpacing);
        dotsRef.current = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * dotSpacing + dotSpacing / 2;
                const y = row * dotSpacing + dotSpacing / 2;
                dotsRef.current.push({
                    originalX: x,
                    originalY: y,
                    currentX: x,
                    currentY: y,
                    randomOffsetX: 0,
                    randomOffsetY: 0,
                    isRandomized: false,
                    col,
                    row
                });
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            initializeDots(canvas.width, canvas.height);
            needsUpdateRef.current = true;
        };

        // Initial setup
        resizeCanvas();
        console.log("InteractiveDotGrid Initialized:", { width: canvas.width, height: canvas.height });

        // Add resize observer
        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
        });
        resizeObserver.observe(canvas.parentElement);

        const animate = () => {
            // Only clear and redraw if something changed
            if (needsUpdateRef.current) {
                // Clear the canvas
                if (backgroundColor === "transparent") {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                } else {
                    ctx.fillStyle = backgroundColor;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                // Calculate which dots to check based on mouse position
                const mouseCol = Math.floor(mousePos.current.x / dotSpacing);
                const mouseRow = Math.floor(mousePos.current.y / dotSpacing);
                const checkRadius = Math.ceil(distortionRadius / dotSpacing) + 1;

                // Batch rendering
                ctx.fillStyle = dotColor;
                ctx.beginPath();
                let hasMovingDots = false;

                dotsRef.current.forEach(dot => {
                    // Only check distance for dots near the mouse
                    const colDiff = Math.abs(dot.col - mouseCol);
                    const rowDiff = Math.abs(dot.row - mouseRow);

                    if (colDiff <= checkRadius && rowDiff <= checkRadius) {
                        const dx = mousePos.current.x - dot.originalX;
                        const dy = mousePos.current.y - dot.originalY;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        let targetX = dot.originalX;
                        let targetY = dot.originalY;

                        if (distance < distortionRadius) {
                            if (!dot.isRandomized) {
                                dot.randomOffsetX = (Math.random() - 0.5) * distortionStrength * 2;
                                dot.randomOffsetY = (Math.random() - 0.5) * distortionStrength * 2;
                                dot.isRandomized = true;
                            }
                            targetX = dot.originalX + dot.randomOffsetX;
                            targetY = dot.originalY + dot.randomOffsetY;
                        } else {
                            if (dot.isRandomized) {
                                dot.isRandomized = false;
                            }
                        }

                        // Smooth interpolation
                        dot.currentX += (targetX - dot.currentX) * animationSpeed;
                        dot.currentY += (targetY - dot.currentY) * animationSpeed;

                        // Check if still moving
                        if (
                            Math.abs(dot.currentX - targetX) > 0.1 ||
                            Math.abs(dot.currentY - targetY) > 0.1
                        ) {
                            hasMovingDots = true;
                        }
                    } else {
                        // Reset dots far from mouse
                        if (dot.isRandomized) {
                            dot.isRandomized = false;
                        }
                        const targetX = dot.originalX;
                        const targetY = dot.originalY;

                        dot.currentX += (targetX - dot.currentX) * animationSpeed;
                        dot.currentY += (targetY - dot.currentY) * animationSpeed;

                        if (
                            Math.abs(dot.currentX - targetX) > 0.1 ||
                            Math.abs(dot.currentY - targetY) > 0.1
                        ) {
                            hasMovingDots = true;
                        }
                    }

                    // Move to the dot position to draw a circle
                    ctx.moveTo(dot.currentX + dotSize / 2, dot.currentY);
                    ctx.arc(dot.currentX, dot.currentY, dotSize / 2, 0, Math.PI * 2);
                });

                ctx.fill();

                // Only continue animating if dots are still moving
                needsUpdateRef.current = hasMovingDots;
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMoveGlobal = (e) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mousePos.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            needsUpdateRef.current = true;
        };

        const handleMouseLeaveGlobal = () => {
            mousePos.current = { x: -1000, y: -1000 };
            needsUpdateRef.current = true;
        };

        window.addEventListener("mousemove", handleMouseMoveGlobal);
        window.addEventListener("mouseleave", handleMouseLeaveGlobal);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            resizeObserver.disconnect();
            window.removeEventListener("mousemove", handleMouseMoveGlobal);
            window.removeEventListener("mouseleave", handleMouseLeaveGlobal);
        };
    }, [dotSize, dotSpacing, dotColor, backgroundColor, distortionRadius, distortionStrength, animationSpeed]);

    return (
        <div
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ position: 'fixed', top: 0, left: 0 }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block"
                }}
            />
        </div>
    );
}
