"use client"
import React from 'react';
import { CodeViewer } from '../../CodeViewer';
import { ComponentPreview } from '../../ComponentPreview';
import Button3D from '@/content/Actions/Button3D';

export const Button3dDemo: React.FC = () => {

  const exampleCode = `'use client';

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
      
      className={\`group relative m-0 p-0 border-none bg-transparent outline-none cursor-pointer select-none touch-manipulation \${className}\`}
      style={{ width, height }}
      {...props}
    >
      <div
        className="absolute top-[14px] -left-px w-[calc(100%+2px)] h-full rounded-[7mm] border-2 z-0 pointer-events-none"
        style={{
          backgroundColor: 'rgb(140, 140, 140)',
          borderColor: outlineColor,
        }}
      />
      <div
        className="absolute top-[10px] left-0 w-full h-full rounded-[7mm] border-2 z-10 pointer-events-none"
        style={{
          backgroundColor: bottomColor,
          borderColor: outlineColor,
        }}
      >
        <span
          className="absolute bottom-0 left-[15%] w-[2px] h-[9px]"
          style={{ backgroundColor: outlineColor }}
        />
        <span
          className="absolute bottom-0 left-[85%] w-[2px] h-[9px]"
          style={{ backgroundColor: outlineColor }}
        />
      </div>
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
        <div
          className="absolute -left-[20px] w-[15px] h-full bg-black/10 -skew-x-30 transition-all duration-250 group-active:left-[120%]"
        />
        <span className="relative z-10 font-bold tracking-wide">
          {label}
        </span>
      </div>
    </button>
  );
};

export default Button3D;
`;

  return (
    <div className="w-full mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">3D Button</h1>
        <p className="text-muted-foreground text-lg">
          A playful, interactive 3D button with press animations and customizable colors. Perfect for CTAs and game-like interfaces.
        </p>
      </div>

      {/* Preview Area */}
      <ComponentPreview>
        <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center p-8 rounded-md">
          {/* 1. Default Style */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">Default</span>
            <Button3D onClick={() => console.log('Clicked!')} />
          </div>

          {/* 2. Custom Dimensions & Colors */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">Cyan Theme</span>
            <Button3D
              label="Submit"
              width="160px"
              height="60px"
              topColor="#E0F7FA"     // Light Cyan
              bottomColor="#4DD0E1"  // Cyan
              outlineColor="#006064" // Dark Cyan
              onClick={() => console.log('Submit Clicked!')}
            />
          </div>

          {/* 3. Pink Theme */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">Pink Theme</span>
            <Button3D
              label="Buy Now"
              topColor="#ffc8dd"
              bottomColor="#ffafcc"
              outlineColor="#590d22"
              onClick={() => console.log('Buy Now Clicked!')}
            />
          </div>
        </div>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">CLI Installation</h2>
        <CodeViewer code="npx ui-awwwards add button-3d" language="bash" title="Terminal" />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Manual Installation</h2>
        <CodeViewer code={exampleCode} language="tsx" title="content/Actions/Button3D.tsx" />
      </div>

      {/* API Reference */}
      <div className="space-y-8 pt-6">
        <h2 className="text-2xl font-semibold text-foreground">API Reference</h2>

        <div className="space-y-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Props</h3>

          <div className="rounded-md overflow-hidden bg-card-bg/20 ring-1 ring-card-border/30">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-card-bg/40 border-b border-card-border/30 text-xs font-semibold text-muted-foreground uppercase">
                    <th className="py-4 px-6 whitespace-nowrap">Prop</th>
                    <th className="py-4 px-6 whitespace-nowrap">Type</th>
                    <th className="py-4 px-6 whitespace-nowrap">Default</th>
                    <th className="py-4 px-6 min-w-[200px]">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-card-border/30">
                  {/* label */}
                  <tr>
                    <td className="py-4 px-6 font-mono text-accent font-medium">label</td>
                    <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                    <td className="py-4 px-6 font-mono text-muted-foreground">'Click Me!'</td>
                    <td className="py-4 px-6 text-foreground/80">The text to display on the button.</td>
                  </tr>

                  {/* width */}
                  <tr>
                    <td className="py-4 px-6 font-mono text-accent font-medium">width</td>
                    <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                    <td className="py-4 px-6 font-mono text-muted-foreground">'140px'</td>
                    <td className="py-4 px-6 text-foreground/80">Width of the button (e.g., "140px", "100%").</td>
                  </tr>

                  {/* height */}
                  <tr>
                    <td className="py-4 px-6 font-mono text-accent font-medium">height</td>
                    <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                    <td className="py-4 px-6 font-mono text-muted-foreground">'50px'</td>
                    <td className="py-4 px-6 text-foreground/80">Height of the button.</td>
                  </tr>

                  {/* topColor */}
                  <tr>
                    <td className="py-4 px-6 font-mono text-accent font-medium">topColor</td>
                    <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                    <td className="py-4 px-6 font-mono text-muted-foreground">'rgb(255, 255, 238)'</td>
                    <td className="py-4 px-6 text-foreground/80">The main face color of the button.</td>
                  </tr>

                  {/* bottomColor */}
                  <tr>
                    <td className="py-4 px-6 font-mono text-accent font-medium">bottomColor</td>
                    <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                    <td className="py-4 px-6 font-mono text-muted-foreground">'rgb(229, 229, 199)'</td>
                    <td className="py-4 px-6 text-foreground/80">The 3D side/shadow color.</td>
                  </tr>

                  {/* outlineColor */}
                  <tr>
                    <td className="py-4 px-6 font-mono text-accent font-medium">outlineColor</td>
                    <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                    <td className="py-4 px-6 font-mono text-muted-foreground">'rgb(36, 38, 34)'</td>
                    <td className="py-4 px-6 text-foreground/80">The border and text color.</td>
                  </tr>

                  {/* className */}
                  <tr>
                    <td className="py-4 px-6 font-mono text-accent font-medium">className</td>
                    <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                    <td className="py-4 px-6 font-mono text-muted-foreground">-</td>
                    <td className="py-4 px-6 text-foreground/80">Additional CSS classes for the button.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};