"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  firstColor = "254, 119, 67", // accent color in RGB
  secondColor = "239, 68, 68", // error color
  thirdColor = "254, 119, 67", // info color
  fourthColor = "254, 149, 27", // success color
  fifthColor = "245, 158, 11", // warning color
  pointerColor = "254, 119, 67", // accent color
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set CSS variables on the container
    containerRef.current.style.setProperty("--first-color", firstColor);
    containerRef.current.style.setProperty("--second-color", secondColor);
    containerRef.current.style.setProperty("--third-color", thirdColor);
    containerRef.current.style.setProperty("--fourth-color", fourthColor);
    containerRef.current.style.setProperty("--fifth-color", fifthColor);
    containerRef.current.style.setProperty("--pointer-color", pointerColor);
    containerRef.current.style.setProperty("--size", size);
    containerRef.current.style.setProperty("--blending-value", blendingValue);
  }, [
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  ]);

  useEffect(() => {
    let raf = 0;

    function step() {
      if (!interactiveRef.current) return;

      setCurX((prev) => {
        const next = prev + (tgX - prev) / 20;
        return next;
      });
      setCurY((prev) => {
        const next = prev + (tgY - prev) / 20;
        return next;
      });
      const x = Math.round(interactiveRef.current.style.transform ?
        Number(interactiveRef.current.style.transform.match(/translate\(([-0-9]+)px,\s*([-0-9]+)px\)/)?.[1]) || 0 : 0);
      const y = Math.round(interactiveRef.current.style.transform ?
        Number(interactiveRef.current.style.transform.match(/translate\(([-0-9]+)px,\s*([-0-9]+)px\)/)?.[2]) || 0 : 0);

      // Using tgX/tgY and small easing to compute next transform to keep visual in sync
      const nextX = Math.round(x + (tgX - x) / 20);
      const nextY = Math.round(y + (tgY - y) / 20);
      interactiveRef.current.style.transform = `translate(${nextX}px, ${nextY}px)`;

      // Stop when close enough to targets to avoid unnecessary frames
      if (Math.abs(tgX - nextX) > 0.5 || Math.abs(tgY - nextY) > 0.5) {
        raf = requestAnimationFrame(step);
      }
    }

    raf = requestAnimationFrame(step);

    return () => cancelAnimationFrame(raf);
  }, [tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-full w-screen relative overflow-hidden top-0 left-0",
        "bg-background",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("relative z-10", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg absolute inset-0",
          isSafari ? "blur-2xl" : "filter-[url(#blurMe)_blur(40px)"
        )}
      >
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,rgba(var(--first-color),0.8)_0,rgba(var(--first-color),0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-(--size) h-(--size) top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `origin-[center_center]`,
            `animate-first`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,rgba(var(--second-color),0.8)_0,rgba(var(--second-color),0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-(--size) h-(--size) top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `origin-[calc(50%-400px)]`,
            `animate-second`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,rgba(var(--third-color),0.8)_0,rgba(var(--third-color),0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-(--size) h-(--size) top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `origin-[calc(50%+400px)]`,
            `animate-third`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,rgba(var(--fourth-color),0.8)_0,rgba(var(--fourth-color),0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-(--size) h-(--size) top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `origin-[calc(50%-200px)]`,
            `animate-fourth`,
            `opacity-70`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,rgba(var(--fifth-color),0.8)_0,rgba(var(--fifth-color),0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-(--size) h-(--size) top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `origin-[calc(50%-800px)_calc(50%+800px)]`,
            `animate-fifth`,
            `opacity-100`
          )}
        ></div>

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,rgba(var(--pointer-color),0.8)_0,rgba(var(--pointer-color),0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
              `opacity-70`
            )}
          ></div>
        )}
      </div>
    </div>
  );
};