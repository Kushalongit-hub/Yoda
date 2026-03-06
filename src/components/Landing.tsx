import React, { useState, useRef } from 'react';
import { Moon, Search, Bell, Terminal, Code2, Smartphone, Box, FileCode2, RefreshCw, Link as LinkIcon, Network, MessageSquare, Zap, Eye } from 'lucide-react';

interface LandingProps {
  onAnalyze: (url: string, provider: 'google' | 'nvidia') => void;
}

export const Landing: React.FC<LandingProps> = ({ onAnalyze }) => {
  const [url, setUrl] = useState('');
  const [provider, setProvider] = useState<'google' | 'nvidia'>('google');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim(), provider);
    }
  };

  const handleSeeYodaInAction = () => {
    searchInputRef.current?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-void text-white font-sans selection:bg-blue-glow/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-void/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <span className="font-bold text-xl tracking-tight">Yoda - your github know it all</span>
        </div>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSubmit} className="hidden md:block relative w-64">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-muted" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Find open source repos"
              className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-white placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-blue-glow/50 focus:border-blue-glow/50 transition-all"
            />
          </form>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Moon className="w-5 h-5 text-muted" />
          </button>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6 max-w-6xl mx-auto space-y-40">
        {/* Hero Section */}
        <section className="text-center space-y-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-dim/30 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
          
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            A new perspective on development for the agentic era.
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Gemini-generated documentation, always up-to-date.
          </p>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto relative mt-12 space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-muted group-focus-within:text-blue-glow transition-colors" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Find open source repos"
                className="w-full bg-deep border border-white/10 rounded-full py-4 pl-12 pr-4 text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-glow/50 focus:border-blue-glow/50 transition-all text-lg shadow-[0_0_15px_rgba(26,107,255,0.1)]"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex bg-deep rounded-full p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => setProvider('google')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    provider === 'google' 
                      ? 'bg-blue-glow/20 text-blue-glow border border-blue-glow/30' 
                      : 'text-muted hover:text-white'
                  }`}
                >
                  Google Gemini
                </button>
                <button
                  type="button"
                  onClick={() => setProvider('nvidia')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    provider === 'nvidia' 
                      ? 'bg-[#76b900]/20 text-[#76b900] border border-[#76b900]/30' 
                      : 'text-muted hover:text-white'
                  }`}
                >
                  NVIDIA NIM
                </button>
              </div>
            </div>
          </form>

          {/* Floating Cubes Graphic */}
          <div className="mt-32 relative h-64 flex justify-center items-center perspective-1000">
             <div className="relative w-48 h-48 animate-spin-cube">
                {/* Front */}
                <div className="absolute inset-0 border border-blue-glow/30 bg-blue-dim/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(77,143,255,0.2)]" style={{ transform: 'translateZ(96px)' }}>
                  <Code2 className="w-16 h-16 text-blue-glow/50" />
                </div>
                {/* Back */}
                <div className="absolute inset-0 border border-blue-glow/30 bg-blue-dim/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(77,143,255,0.2)]" style={{ transform: 'rotateY(180deg) translateZ(96px)' }}>
                  <Terminal className="w-16 h-16 text-blue-glow/50" />
                </div>
                {/* Left */}
                <div className="absolute inset-0 border border-blue-glow/30 bg-blue-dim/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(77,143,255,0.2)]" style={{ transform: 'rotateY(-90deg) translateZ(96px)' }}>
                  <Box className="w-16 h-16 text-blue-glow/50" />
                </div>
                {/* Right */}
                <div className="absolute inset-0 border border-blue-glow/30 bg-blue-dim/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(77,143,255,0.2)]" style={{ transform: 'rotateY(90deg) translateZ(96px)' }}>
                  <Network className="w-16 h-16 text-blue-glow/50" />
                </div>
                {/* Top */}
                <div className="absolute inset-0 border border-blue-glow/30 bg-blue-dim/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(77,143,255,0.2)]" style={{ transform: 'rotateX(90deg) translateZ(96px)' }}>
                  <Zap className="w-16 h-16 text-blue-glow/50" />
                </div>
                {/* Bottom */}
                <div className="absolute inset-0 border border-blue-glow/30 bg-blue-dim/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(77,143,255,0.2)]" style={{ transform: 'rotateX(-90deg) translateZ(96px)' }}>
                  <RefreshCw className="w-16 h-16 text-blue-glow/50" />
                </div>
             </div>
          </div>
        </section>

        {/* Try it with your own private repository */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-semibold tracking-tight">Try it with your own private repository</h2>
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/80">
              Coming Soon
            </div>
            <p className="text-muted text-lg leading-relaxed">
              Stop documenting. Start understanding. Connect your repository and get a fully interactive Yoda that stays perfectly in sync with every change. No more stale docs. Ever.
            </p>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-colors">
              <Bell className="w-4 h-4" />
              Notify me when available
            </button>
          </div>
          <div className="relative h-[400px] rounded-3xl bg-deep border border-white/5 overflow-hidden flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.8)]">
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
             <pre className="text-xs text-muted font-mono p-6 absolute inset-0 overflow-hidden opacity-40">
               {`// Page styling and animations
const style = document.createElement('style');
style.textContent = \`
  body {
    background-color: #0e0e0e;
    color: #ffffff;
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    overflow: hidden;
  }
\`;
document.head.appendChild(style);`}
             </pre>
             {/* Glowing Cube */}
             <div className="relative w-32 h-32 z-10 perspective-1000">
                <div className="absolute inset-0 bg-blue-glow/20 blur-2xl rounded-full"></div>
                <div className="w-full h-full border border-blue-glow/40 bg-blue-dim/30 backdrop-blur-md rounded-xl transform rotate-12 rotate-x-12 flex items-center justify-center shadow-[0_0_30px_rgba(77,143,255,0.3)]">
                  <Box className="w-12 h-12 text-blue-glow" />
                </div>
             </div>
          </div>
        </section>

        {/* Read your app for the first time */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative h-[450px] rounded-3xl bg-deep border border-white/5 overflow-hidden flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(77,143,255,0.1)_0%,transparent_70%)]"></div>
            {/* Abstract Document Graphic */}
            <div className="relative w-72 h-80 border border-white/10 bg-white/5 rounded-2xl p-6 flex flex-col gap-4 backdrop-blur-sm z-10 shadow-2xl">
              <div className="w-3/4 h-3 bg-white/20 rounded"></div>
              <div className="w-full h-2 bg-white/10 rounded"></div>
              <div className="w-5/6 h-2 bg-white/10 rounded"></div>
              <div className="w-full h-2 bg-white/10 rounded"></div>
              <div className="mt-auto w-full h-32 border border-blue-glow/30 bg-blue-dim/20 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(77,143,255,0.1)]">
                <Network className="w-10 h-10 text-blue-glow/60" />
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-semibold tracking-tight">Read your app for the first time</h2>
              <p className="text-muted text-lg">
                Code documentation that works for you, not the other way around.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Search className="w-5 h-5 text-white/80" />
                </div>
                <h3 className="font-semibold">Understand your code section by section</h3>
                <p className="text-sm text-muted">Focus on the code you care about. Auto-generated docs are broken down to easily find what you need.</p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Zap className="w-5 h-5 text-white/80" />
                </div>
                <h3 className="font-semibold">Generated automatically</h3>
                <p className="text-sm text-muted">Our AI agent automatically generates and maintains a rich, interactive knowledge base from your code.</p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <RefreshCw className="w-5 h-5 text-white/80" />
                </div>
                <h3 className="font-semibold">Always up-to-date</h3>
                <p className="text-sm text-muted">Every time a pull request is merged, the relevant documentation is automatically updated.</p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <LinkIcon className="w-5 h-5 text-white/80" />
                </div>
                <h3 className="font-semibold">Linked back to your code</h3>
                <p className="text-sm text-muted">Instantly jump from an architectural overview to the exact service, or from a function's description to its definition in the repository.</p>
              </div>
              <div className="space-y-3 sm:col-span-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Network className="w-5 h-5 text-white/80" />
                </div>
                <h3 className="font-semibold">Diagrams</h3>
                <p className="text-sm text-muted">Instead of piecing together complex systems in your head, watch as your code is transformed into rich, intuitive visual diagrams that show your architecture to life.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Talk to your codebase */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-semibold tracking-tight">Talk to your codebase</h2>
              <p className="text-muted text-lg">
                Ask questions about your architecture, find function definitions, and understand complex logic in natural language. It's like having an engineer on call, 24/7.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 shrink-0">
                  <MessageSquare className="w-5 h-5 text-white/80" />
                </div>
                <h3 className="font-semibold text-lg">Chat with your codebase</h3>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 shrink-0">
                  <Search className="w-5 h-5 text-white/80" />
                </div>
                <h3 className="font-semibold text-lg">Find what you need instantly</h3>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 shrink-0">
                  <Zap className="w-5 h-5 text-white/80" />
                </div>
                <h3 className="font-semibold text-lg">Low latency, high-quality</h3>
              </div>
            </div>
          </div>
          <div className="relative h-[450px] rounded-3xl bg-deep border border-white/5 overflow-hidden flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(77,143,255,0.1)_0%,transparent_70%)]"></div>
            {/* Abstract Chat Graphic */}
            <div className="relative w-80 flex flex-col gap-6 z-10">
              <div className="self-end w-[85%] bg-blue-dim/30 border border-blue-glow/20 rounded-2xl rounded-tr-sm p-5 backdrop-blur-sm shadow-lg">
                <div className="w-full h-2 bg-blue-glow/40 rounded mb-3"></div>
                <div className="w-3/4 h-2 bg-blue-glow/40 rounded"></div>
              </div>
              <div className="self-start w-[85%] bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-5 backdrop-blur-sm shadow-lg">
                <div className="w-full h-2 bg-white/20 rounded mb-3"></div>
                <div className="w-5/6 h-2 bg-white/20 rounded mb-3"></div>
                <div className="w-4/6 h-2 bg-white/20 rounded"></div>
              </div>
              <div className="self-end w-[85%] bg-blue-dim/30 border border-blue-glow/20 rounded-2xl rounded-tr-sm p-5 backdrop-blur-sm shadow-lg">
                <div className="w-1/2 h-2 bg-blue-glow/40 rounded"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-10 py-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-dim/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Add the missing dimensions to your software</h2>
          <div className="flex justify-center mt-12">
            <button 
              onClick={handleSeeYodaInAction}
              className="flex items-center gap-3 px-8 py-4 bg-white text-void rounded-full font-bold hover:bg-gray-200 transition-colors text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Eye className="w-5 h-5" />
              See Yoda in action
            </button>
          </div>
          <div className="mt-32 flex justify-center perspective-1000">
             <div className="w-64 h-64 border border-blue-glow/30 bg-blue-dim/20 backdrop-blur-md rounded-3xl transform rotate-12 rotate-x-12 shadow-[0_0_60px_rgba(77,143,255,0.2)] flex items-center justify-center">
                <Box className="w-24 h-24 text-blue-glow/60" />
             </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6 bg-deep">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-muted font-semibold tracking-tight">
            Google for Developers
          </div>
          <div className="flex items-center gap-8 text-sm text-muted font-medium">
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
            <a href="#" className="hover:text-white transition-colors">Feedback</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

