import React from 'react';
import { CodeViewer } from '../../CodeViewer';
import { Component } from 'lucide-react';
import { ComponentPreview } from '../../ComponentPreview';

export const CardDoc: React.FC = () => {
  const exampleCode = `import React from 'react';

interface CardProps {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ title, description, footer, children, className = '' }: CardProps) => {
  return (
    <div className={\`bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm \${className}\`}>
      {(title || description) && (
        <div className="px-6 py-5 border-b border-slate-800">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
        </div>
      )}
      <div className="px-6 py-5">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-800">
          {footer}
        </div>
      )}
    </div>
  );
};`;

  return (
    <div className="w-full mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Card</h1>
        <p className="text-muted-foreground text-lg">
          A versatile container for grouping related content and actions.
        </p>
      </div>

      {/* Preview Area */}
      <ComponentPreview>
        <div className="rounded-xl overflow-hidden">
          <div className="p-10 bg-background flex justify-center">
            {/* Simulation */}
            <div className="bg-card rounded-xl overflow-hidden shadow-sm max-w-sm w-full">
              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold text-foreground">Account Settings</h3>
                <p className="mt-1 text-sm text-muted-foreground">Manage your account preferences and security.</p>
              </div>
              <div className="px-6 py-5">
                <p className="text-muted-foreground text-sm">Your account is currently active. You can update your profile information below.</p>
              </div>
              <div className="px-6 py-4 bg-secondary/20  flex justify-end">
                <button className="text-sm font-medium text-primary hover:text-primary/80">Edit Profile</button>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>


      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">CLI Installation</h2>
        <CodeViewer code="npx next-forge-ui add card" language="bash" title="Terminal" />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Manual Installation</h2>
        <CodeViewer code={exampleCode} language="tsx" title="components/Card.tsx" />
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