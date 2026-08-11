"use client";;
import React, { memo, forwardRef } from "react";
import { LiquidMetal as LiquidMetalShader } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

export const LiquidMetal = memo(function LiquidMetal({
    colorBack = "#aaaaac",
    colorTint = "#ffffff",
    speed = 0.5,
    repetition = 4,
    distortion = 0.1,
    scale = 1,
    className,
    style
}) {
    return (
        <div
            className={cn("absolute inset-0 z-0 overflow-hidden", className)}
            style={style}>
            <LiquidMetalShader
                colorBack={colorBack}
                colorTint={colorTint}
                speed={speed}
                repetition={repetition}
                distortion={distortion}
                softness={0}
                shiftRed={0.3}
                shiftBlue={-0.3}
                angle={45}
                shape="none"
                scale={scale}
                fit="cover"
                style={{ width: "100%", height: "100%" }} />
        </div>
    );
});

LiquidMetal.displayName = "LiquidMetal";

export const LiquidMetalButton = forwardRef((
    {
        children,
        icon,
        borderWidth = 4,
        metalConfig,
        size = "md",
        className,
        disabled,
        href,
        download,
        target,
        rel,
        ...props
    },
    ref
) => {
    const sizeStyles = {
        sm: "py-2 pl-2 pr-6 gap-3 text-sm",
        md: "py-3 pl-3 pr-8 gap-4 text-base",
        lg: "py-4 pl-4 pr-10 gap-6 text-lg",
    };

    const iconSizes = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
    };

    const Component = href ? "a" : "button";
    const extraProps = href
        ? { href, download, target: target || "_blank", rel: rel || "noopener noreferrer" }
        : { disabled };

    return (
        <Component
            ref={ref}
            className={cn(
                "relative group cursor-pointer border-none bg-transparent p-0 outline-none transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none inline-block no-underline",
                className
            )}
            {...extraProps}
            {...props}>
            <div
                className="relative rounded-full overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)]"
                style={{ padding: borderWidth }}>
                {/* Liquid Metal Border Layer */}
                <LiquidMetal
                    colorBack={metalConfig?.colorBack ?? "#888888"}
                    colorTint={metalConfig?.colorTint ?? "#ffffff"}
                    speed={metalConfig?.speed ?? 0.4}
                    repetition={metalConfig?.repetition ?? 4}
                    distortion={metalConfig?.distortion ?? 0.15}
                    scale={metalConfig?.scale ?? 1}
                    className="absolute inset-0 z-0 rounded-full" />

                {/* Inner Button Body */}
                <div
                    className={cn(
                        "relative z-10 rounded-full flex items-center backdrop-blur-md border border-white/10",
                        "bg-white/20 dark:bg-black/40",
                        "transition-all duration-300",
                        "group-hover:bg-white/30 dark:group-hover:bg-black/60",
                        sizeStyles[size]
                    )}>
                    {icon && (
                        <div
                            className={cn(
                                "rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10",
                                "bg-white/30 dark:bg-white/10",
                                "shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]",
                                iconSizes[size]
                            )}>
                            <span className="text-neutral-900 dark:text-neutral-100">
                                {icon}
                            </span>
                        </div>
                    )}
                    <span className="font-medium tracking-tight text-neutral-900 dark:text-white drop-shadow-sm">
                        {children}
                    </span>
                </div>
            </div>
        </Component>
    );
});

LiquidMetalButton.displayName = "LiquidMetalButton";

export default LiquidMetalButton;
