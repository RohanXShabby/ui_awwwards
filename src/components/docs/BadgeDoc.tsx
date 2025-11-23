import React from 'react';
import { CodeViewer } from '../CodeViewer';

export const BadgeDoc: React.FC = () => {
  const exampleCode = `import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}: BadgeProps) => {
  
  const variants = {
    default: "bg-white text-black border-transparent",
    secondary: "bg-slate-800 text-slate-300 border-slate-700",
    outline: "bg-transparent text-slate-300 border-slate-700",
    destructive: "bg-red-500/10 text-red-400 border-red-500/20",
    success: "bg-green-500/10 text-green-400 border-green-500/20",
  };

  const sizes = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-xs px-2.5 py-0.5",
  };

  return (
    <span className={\`
      inline-flex items-center font-medium rounded-full border
      \${variants[variant]}
      \${sizes[size]}
      \${className}
    \`}>
      {children}
    </span>
  );
};`;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Badge</h1>
        <p className="text-muted-foreground text-lg">
          A small visual indicator for states, categories, or numerical values.
        </p>
      </div>

      {/* Preview Area */}
      <div className="border border-border rounded-xl overflow-hidden">
        <div className="bg-secondary/30 p-4 border-b border-border flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preview</span>
        </div>
        <div className="p-10 bg-background flex flex-wrap gap-4 items-center justify-center">
          {/* Simulation */}
          <span className="inline-flex items-center font-medium rounded-full border bg-primary text-primary-foreground border-transparent text-xs px-2.5 py-0.5">
            New Feature
          </span>
          <span className="inline-flex items-center font-medium rounded-full border bg-secondary text-secondary-foreground border-border text-xs px-2.5 py-0.5">
            Documentation
          </span>
          <span className="inline-flex items-center font-medium rounded-full border bg-transparent text-muted-foreground border-border text-xs px-2.5 py-0.5">
            Outline
          </span>
          <span className="inline-flex items-center font-medium rounded-full border bg-green-500/10 text-green-400 border-green-500/20 text-xs px-2.5 py-0.5">
            Completed
          </span>
          <span className="inline-flex items-center font-medium rounded-full border bg-red-500/10 text-red-400 border-red-500/20 text-xs px-2.5 py-0.5">
            Failed
          </span>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">CLI Installation</h2>
        <CodeViewer code="npx next-forge-ui add badge" language="bash" title="Terminal" />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Manual Installation</h2>
        <CodeViewer code={exampleCode} language="tsx" title="components/Badge.tsx" />
      </div>


      {/* API Reference */}

      <div className="space-y-8 pt-6">
        <h2 className="text-2xl font-semibold text-foreground">API Reference</h2>

        <div className="space-y-8">
          {/* Dependencies Box - Cleaned up */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Dependencies</h3>
            <div className="inline-flex items-center gap-2 p-3 bg-card-bg/30 rounded-lg text-sm text-foreground ring-1 ring-card-border/50">
              <span className="text-accent font-mono">npm</span> install lucide-react
            </div>
          </div>

          {/* Props Table - Removed border, used subtle dividers */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Props</h3>

            <div className="rounded-xl overflow-hidden bg-card-bg/20 ring-1 ring-card-border/30">
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
                    <tr>
                      <td className="py-4 px-6 font-mono text-accent font-medium">title</td>
                      <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                      <td className="py-4 px-6 font-mono text-muted-foreground">-</td>
                      <td className="py-4 px-6 text-foreground/80">The title header of the alert.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-mono text-accent font-medium">variant</td>
                      <td className="py-4 px-6 font-mono text-muted-foreground">enum</td>
                      <td className="py-4 px-6 font-mono text-muted-foreground">'info'</td>
                      <td className="py-4 px-6 text-foreground/80">
                        One of <span className="opacity-70 bg-card-bg px-1 rounded">info</span>, <span className="opacity-70 bg-card-bg px-1 rounded">success</span>, <span className="opacity-70 bg-card-bg px-1 rounded">warning</span>, or <span className="opacity-70 bg-card-bg px-1 rounded">error</span>.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-mono text-accent font-medium">children</td>
                      <td className="py-4 px-6 font-mono text-muted-foreground">ReactNode</td>
                      <td className="py-4 px-6 font-mono text-muted-foreground">-</td>
                      <td className="py-4 px-6 text-foreground/80">Additional description or content.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-mono text-accent font-medium">className</td>
                      <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                      <td className="py-4 px-6 font-mono text-muted-foreground">-</td>
                      <td className="py-4 px-6 text-foreground/80">Additional CSS classes for the container.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};