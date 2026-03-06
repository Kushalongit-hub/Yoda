import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Mermaid } from './Mermaid';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';

interface ReportProps {
  repoUrl: string;
  reportContent: string;
  isGenerating: boolean;
  onReset: () => void;
}

export const Report: React.FC<ReportProps> = ({ repoUrl, reportContent, isGenerating, onReset }) => {
  const handleDownload = () => {
    const blob = new Blob([reportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `due-diligence-${repoUrl.split('/').pop()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-void text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-void/90 backdrop-blur-md border-b border-blue-dim/30 px-6 py-4 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <button
            onClick={onReset}
            className="p-2 hover:bg-blue-dim/20 text-blue-glow rounded-full transition-colors"
            title="Back to search"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-bold text-lg leading-tight text-white">Yoda Report</h1>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-blue-glow flex items-center gap-1 transition-colors"
            >
              {repoUrl.replace('https://github.com/', '')}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isGenerating && (
            <div className="flex items-center gap-2 text-sm font-semibold text-orange-acc bg-orange-acc/10 border border-orange-acc/20 px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(255,107,43,0.2)]">
              <div className="w-2 h-2 bg-orange-acc rounded-full animate-pulse" />
              Generating...
            </div>
          )}
          <button
            onClick={handleDownload}
            disabled={isGenerating || !reportContent}
            className="flex items-center gap-2 px-4 py-2 bg-blue-core text-white rounded-lg font-semibold hover:bg-blue-glow transition-colors disabled:opacity-50 shadow-[0_0_10px_rgba(26,107,255,0.4)]"
          >
            <Download className="w-4 h-4" />
            Export MD
          </button>
        </div>
      </header>

      {/* Content */}
       <main className="max-w-4xl mx-auto px-12 py-20 space-y-12">
        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                const isMermaid = match && match[1] === 'mermaid';
                
                if (isMermaid) {
                  return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                }
                
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              pre({ children, ...props }: any) {
                // If the child is our Mermaid component, don't wrap it in a <pre>
                const childArray = React.Children.toArray(children);
                const hasMermaid = childArray.some(
                  (child: any) => React.isValidElement(child) && child.type === Mermaid
                );
                
                if (hasMermaid) {
                  return <>{children}</>;
                }
                
                return <pre {...props}>{children}</pre>;
              }
            }}
          >
            {reportContent || "Initializing analysis..."}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
};
