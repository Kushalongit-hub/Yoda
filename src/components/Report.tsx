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
            <h1 className="font-bold text-lg leading-tight text-white">Due Diligence Report</h1>
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
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
          prose-h1:text-4xl prose-h1:mb-8 prose-h1:pb-4 prose-h1:border-b prose-h1:border-blue-dim/30 prose-h1:text-blue-glow
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:uppercase prose-h2:tracking-widest prose-h2:text-sm prose-h2:text-muted
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-white
          prose-p:leading-relaxed prose-p:text-white/80
          prose-a:text-blue-glow prose-a:no-underline hover:prose-a:underline
          prose-strong:font-bold prose-strong:text-white
          prose-code:text-sm prose-code:font-mono prose-code:bg-deep prose-code:text-orange-acc prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-blue-dim/30
          prose-pre:bg-deep prose-pre:text-white prose-pre:p-4 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:border prose-pre:border-blue-dim/30
          prose-table:w-full prose-table:text-sm
          prose-th:bg-deep prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:text-blue-glow prose-th:border-b prose-th:border-blue-dim/50
          prose-td:p-3 prose-td:border-b prose-td:border-blue-dim/20
          prose-ul:list-disc prose-ul:pl-5
          prose-ol:list-decimal prose-ol:pl-5
          prose-li:my-1
        ">
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
