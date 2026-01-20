'use client';

import React from 'react';

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  width?: string;
  height?: string;
  topColor?: string;
  bottomColor?: string;
  outlineColor?: string;
  className?: string;
}

const Button3D: React.FC<Button3DProps> = ({
  label = 'Click Me!',
  width = '140px',
  height = '50px',
  topColor = 'rgb(255, 255, 238)',
  bottomColor = 'rgb(229, 229, 199)',
  outlineColor = 'rgb(36, 38, 34)',
  className = '',
  onClick,
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      // Group allows us to control children styles when the parent is active/hovered
      className={`group relative m-0 p-0 border-none bg-transparent outline-none cursor-pointer select-none touch-manipulation ${className}`}
      style={{ width, height }}
      {...props}
    >
      {/* 
        LAYER 1: Deepest Shadow 
        This is the gray background that sits at the very bottom
      */}
      <div
        className="absolute top-[14px] -left-px w-[calc(100%+2px)] h-full rounded-[7mm] border-2 z-0 pointer-events-none"
        style={{
          backgroundColor: 'rgb(140, 140, 140)',
          borderColor: outlineColor,
        }}
      />

      {/* 
        LAYER 2: Button Body (Bottom) 
        This is the "side" of the 3D button
      */}
      <div
        className="absolute top-[10px] left-0 w-full h-full rounded-[7mm] border-2 z-10 pointer-events-none"
        style={{
          backgroundColor: bottomColor,
          borderColor: outlineColor,
        }}
      >
        {/* Decorative stitches */}
        <span
          className="absolute bottom-0 left-[15%] w-[2px] h-[9px]"
          style={{ backgroundColor: outlineColor }}
        />
        <span
          className="absolute bottom-0 left-[85%] w-[2px] h-[9px]"
          style={{ backgroundColor: outlineColor }}
        />
      </div>

      {/* 
        LAYER 3: Button Face (Top)
        This is the clickable area that moves down
      */}
      <div
        className="relative w-full h-full flex items-center justify-center rounded-[7mm] border-2 overflow-hidden z-20 transition-transform duration-200 group-active:translate-y-[10px]"
        style={{
          backgroundColor: topColor,
          borderColor: outlineColor,
          color: outlineColor,
          fontSize: '16px',
          fontWeight: 600,
        }}
      >
        {/* The Glare Effect */}
        <div
          className="absolute -left-[20px] w-[15px] h-full bg-black/10 -skew-x-30 transition-all duration-250 group-active:left-[120%]"
        />

        {/* Text Label */}
        <span className="relative z-10 font-bold tracking-wide">
          {label}
        </span>
      </div>
    </button>
  );
};

export default Button3D;