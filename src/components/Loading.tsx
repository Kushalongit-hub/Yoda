import React, { useEffect, useRef } from 'react';
import './Loading.css';

interface LoadingProps {
  progressMsg: string;
}

export const Loading: React.FC<LoadingProps> = ({ progressMsg }) => {
  const starsRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stars
    if (starsRef.current && starsRef.current.children.length === 0) {
      for (let i = 0; i < 120; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const size = Math.random() * 2 + 0.5;
        s.style.cssText = `
          width:${size}px; height:${size}px;
          left:${Math.random()*100}%;
          top:${Math.random()*100}%;
          --d:${2+Math.random()*4}s;
          --delay:${-Math.random()*4}s;
          --op:${0.3+Math.random()*0.7};
        `;
        starsRef.current.appendChild(s);
      }
    }

    // Orbit rings
    if (orbitsRef.current && orbitsRef.current.children.length === 0) {
      function folderSVG(color: string, size: number) {
        const s = size;
        const d = Math.max(2, s * 0.15);
        return `
        <div style="
          width:${s}px; height:${s*0.75}px;
          position:relative;
          transform-style:preserve-3d;
          perspective:120px;
          animation: mini-spin-${Math.floor(Math.random()*3)} ${3+Math.random()*2}s ease-in-out infinite;
        ">
          <style>
            @keyframes mini-spin-0 { 0%,100%{transform:rotateY(-20deg) rotateX(8deg)} 50%{transform:rotateY(20deg) rotateX(-5deg)} }
            @keyframes mini-spin-1 { 0%,100%{transform:rotateY(15deg) rotateX(-8deg)} 50%{transform:rotateY(-25deg) rotateX(6deg)} }
            @keyframes mini-spin-2 { 0%,100%{transform:rotateY(-30deg) rotateX(5deg)} 50%{transform:rotateY(10deg) rotateX(-8deg)} }
          </style>
          <div style="
            position:absolute; top:0; left:${s*0.06}px;
            width:${s*0.35}px; height:${s*0.18}px;
            background:${color}cc; border-radius:2px 2px 0 0;
            transform-style:preserve-3d;
          ">
            <div style="position:absolute;inset:0;background:${color};border-radius:inherit;transform:translateZ(${d}px);"></div>
          </div>
          <div style="
            position:absolute; top:${s*0.15}px; left:0;
            width:${s}px; height:${s*0.6}px;
            border-radius:2px 3px 3px 3px;
            transform-style:preserve-3d;
          ">
            <div style="position:absolute;inset:0;background:linear-gradient(135deg,${color}dd,${color}77);border-radius:inherit;transform:translateZ(${d}px);border:1px solid ${color}66;"></div>
            <div style="position:absolute;inset:0;background:${color}22;border-radius:inherit;transform:translateZ(-${d}px);"></div>
            <div style="position:absolute;top:0;right:0;width:${d}px;height:100%;background:${color}44;transform:rotateY(90deg) translateZ(0);transform-origin:right center;"></div>
          </div>
        </div>`;
      }

      const rings = [
        { count: 5, radius: 270, speed: '18s', scale: 0.85, reverse: false,
          colors: ['#4d8fff','#1a6bff','#6aaeff','#ff6b2b','#4d8fff'],
          sizes:  [18, 14, 16, 13, 15], ops: [0.9, 0.7, 0.8, 0.75, 0.85] },
        { count: 4, radius: 210, speed: '12s', scale: 0.7,  reverse: true,
          colors: ['#ff6b2b','#4d8fff','#1a6bff','#ff6b2b'],
          sizes:  [13, 15, 12, 14], ops: [0.6, 0.8, 0.65, 0.7] },
        { count: 3, radius: 155, speed: '8s',  scale: 0.55, reverse: false,
          colors: ['#6aaeff','#ff6b2b','#4d8fff'],
          sizes:  [10, 11, 10], ops: [0.5, 0.55, 0.5] },
      ];

      rings.forEach(ring => {
        for (let i = 0; i < ring.count; i++) {
          const wrap = document.createElement('div');
          wrap.className = `orbit-ring${ring.reverse ? ' reverse' : ''}`;
          const angle = (360 / ring.count) * i;
          wrap.style.cssText = `
            position:absolute;
            width:${ring.radius}px; height:${ring.radius}px;
            --r:${ring.radius}px;
            --speed:${ring.speed};
            transform:rotate(${angle}deg);
          `;

          const mini = document.createElement('div');
          mini.className = 'mini-folder';
          mini.style.cssText = `
            --r:${ring.radius}px;
            --speed:${ring.speed};
            --scale:${ring.scale};
            --col:${ring.colors[i]};
            --op:${ring.ops[i]};
            --sz:${ring.sizes[i]}px;
          `;
          mini.innerHTML = folderSVG(ring.colors[i], ring.sizes[i]);
          wrap.appendChild(mini);
          orbitsRef.current?.appendChild(wrap);
        }
      });
    }

    // Particles
    if (particlesRef.current && particlesRef.current.children.length === 0) {
      const pColors = ['#4d8fff','#1a6bff','#6aaeff','#ff6b2b','#ffffff'];
      for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const angle = Math.random() * 360;
        const dist = 100 + Math.random() * 80;
        const size = 1 + Math.random() * 2.5;
        const col  = pColors[Math.floor(Math.random() * pColors.length)];
        p.style.cssText = `
          --pw:${size}px; --pc:${col};
          --pa:${angle}deg; --pr:${dist}px;
          --pd:${1.5 + Math.random() * 2}s;
          --pdelay:-${Math.random() * 3}s;
        `;
        particlesRef.current.appendChild(p);
      }
    }
  }, []);

  return (
    <div className="loading-container">
      <div className="backdrop-glow"></div>
      <div className="stars" ref={starsRef}></div>

      <div className="scene">
        <div className="disk-wrap">
          <div className="disk"></div>
          <div className="disk"></div>
          <div className="disk"></div>
        </div>

        <div className="lens-ring"></div>
        <div className="horizon"></div>

        <div className="folder-core">
          <div className="folder-3d">
            <div className="f-tab"></div>
            <div className="f-body"></div>
            <div className="f-side-r"></div>
            <div className="f-side-l"></div>
            <div className="f-top"></div>
            <div className="f-bottom"></div>
            <div className="f-shine"></div>
          </div>
        </div>

        <div id="orbits" ref={orbitsRef}></div>
        <div className="particles" id="particles" ref={particlesRef}></div>

        <div className="status-wrap">
          <div className="status-label">Analyzing Repository</div>
          <div className="status-text" id="status-text">
            <span key={progressMsg}>{progressMsg || 'Initializing...'}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '100%', animation: 'pulse 2s infinite' }}></div>
            <div className="progress-ping"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
