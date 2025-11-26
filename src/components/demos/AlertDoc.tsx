import React from 'react';
import { CodeViewer } from '../CodeViewer';
import { ComponentPreview } from '../ComponentPreview';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

export const AlertDoc: React.FC = () => {
  // Updated example code: Cleaner styling in the snippet
  const exampleCode = `import React from 'react';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps {
  title: string;
  children?: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
}

export const Alert = ({ 
  title, 
  children, 
  variant = 'info',
  className 
}: AlertProps) => {
  
  const styles = {
    info: {
      container: "bg-info/10 text-info border-transparent",
      icon: <Info className="w-5 h-5" />
    },
    success: {
      container: "bg-success/10 text-success border-transparent",
      icon: <CheckCircle2 className="w-5 h-5" />
    },
    warning: {
      container: "bg-warning/10 text-warning border-transparent",
      icon: <AlertCircle className="w-5 h-5" />
    },
    error: {
      container: "bg-error/10 text-error border-transparent",
      icon: <XCircle className="w-5 h-5" />
    }
  };

  const style = styles[variant];

  return (
    <div className={cn(
      "p-4 rounded-xl border flex items-start gap-3 transition-colors",
      style.container,
      className
    )}>
      <div className="mt-0.5 shrink-0 opacity-90">
        {style.icon}
      </div>
      <div className="flex-1">
        <h5 className="font-semibold leading-none tracking-tight">{title}</h5>
        {children && (
          <div className="mt-2 text-sm opacity-90 leading-relaxed font-medium">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};`;

  return (
    <div className="w-full mx-auto space-y-8 pb-12">

      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Alert</h1>
        <p className="text-muted-foreground text-lg">
          A graphical representation of a user or entity, often with a status indicator.
        </p>
      </div>

      {/* Preview Area */}
      <ComponentPreview>
        <button>Alert box preview</button>
      </ComponentPreview>

      {/* CLI Installation */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">CLI Installation</h2>
        <CodeViewer code="npx next-forge-ui add avatar" language="bash" title="Terminal" />
      </div>

      {/* Manual Installation */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Manual Installation</h2>
        <CodeViewer code={exampleCode} language="tsx" title="components/Avatar.tsx" />
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
                    <tr className="bg-card-bg border-b border-card-border/30 text-sm font-semibold text-muted-foreground uppercase">
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