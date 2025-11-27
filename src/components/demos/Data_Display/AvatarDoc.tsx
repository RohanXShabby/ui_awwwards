import React from 'react';
import { CodeViewer } from '../../CodeViewer';
import { ComponentPreview } from '../../ComponentPreview';

export const AvatarDoc: React.FC = () => {
  const exampleCode = `import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'busy';
  className?: string;
}

export const Avatar = ({ 
  src, 
  alt, 
  fallback, 
  size = 'md', 
  status,
  className = '' 
}: AvatarProps) => {
  
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-slate-500",
    busy: "bg-red-500",
  };

  return (
    <div className={\`relative inline-block \${className}\`}>
      <div className={\`
        \${sizeClasses[size]} 
        rounded-full overflow-hidden bg-slate-800 border border-slate-700
        flex items-center justify-center text-slate-300 font-medium
      \`}>
        {src ? (
          <img src={src} alt={alt || fallback} className="w-full h-full object-cover" />
        ) : (
          <span>{fallback}</span>
        )}
      </div>
      {status && (
        <span className={\`
          absolute bottom-0 right-0 block rounded-full ring-2 ring-slate-950
          \${statusColors[status]}
          \${size === 'lg' ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5'}
        \`} />
      )}
    </div>
  );
};`;

  return (
    <div className="w-full mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Avatar</h1>
        <p className="text-muted-foreground text-lg">
          A graphical representation of a user or entity, often with a status indicator.
        </p>
      </div>

      {/* Preview Area */}
      <ComponentPreview>
        Avatar Code Preview
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