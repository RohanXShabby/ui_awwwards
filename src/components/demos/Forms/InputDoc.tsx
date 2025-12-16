"use client"
import React from 'react';
import { CodeViewer } from '../../CodeViewer';
import { Search, Mail } from 'lucide-react';
import { ComponentPreview } from '../../ComponentPreview';

export const InputDoc: React.FC = () => {
  const exampleCode = `import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={\`
              w-full bg-slate-900 border rounded-lg text-sm text-slate-200 placeholder-slate-500
              focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed transition-all
              \${leftIcon ? 'pl-10 pr-3' : 'px-3'}
              \${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-700'}
              py-2.5
              \${className}
            \`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";`;

  return (
    <div className="w-full mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Input</h1>
        <p className="text-muted-foreground text-lg">
          A flexible input field that supports labels, icons, validation errors, and forward refs.
        </p>
      </div>

      {/* Preview Area */}
      <ComponentPreview>
        <div className="rounded-xl overflow-hidden">
          <div className="p-10 bg-background flex flex-col gap-6 max-w-md mx-auto">
            {/* Simulation */}
            <div className="w-full">
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Mail className="w-4 h-4" />
                </div>
                <input type="email" placeholder="you@example.com" className="w-full bg-secondary/20 rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pl-10 pr-3 py-2.5" />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm border-none outline-none font-medium text-muted-foreground mb-1.5">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Search className="w-4 h-4" />
                </div>
                <input type="text" placeholder="Search documentation..." className="w-full bg-secondary/20 rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pl-10 pr-3 py-2.5" />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Username</label>
              <input type="text" defaultValue="invalid_user" className="w-full bg-secondary/20 border border-red-500/50 rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent px-3 py-2.5" />
              <p className="mt-1.5 text-sm text-red-500">Username is already taken.</p>
            </div>
          </div>
        </div>
      </ComponentPreview>


      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">CLI Installation</h2>
        <CodeViewer code="npx next-forge-ui add input" language="bash" title="Terminal" />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Manual Installation</h2>
        <CodeViewer code={exampleCode} language="tsx" title="components/Input.tsx" />
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