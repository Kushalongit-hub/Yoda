import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter, sans-serif'
});

export const Mermaid: React.FC<{ chart: string }> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && chart) {
      const renderChart = async () => {
        try {
          // Remove markdown code block syntax if present
          let cleanChart = chart.replace(/\r/g, '').trim();
          if (cleanChart.startsWith('```mermaid')) {
            cleanChart = cleanChart.substring(10);
          }
          if (cleanChart.endsWith('```')) {
            cleanChart = cleanChart.substring(0, cleanChart.length - 3);
          }
          
          const id = `mermaid-${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8)}`;
          const { svg } = await mermaid.render(id, cleanChart);
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error("Mermaid rendering failed:", error);
          if (containerRef.current) {
            containerRef.current.innerHTML = `<div class="text-red-500 p-4 border border-red-500/30 rounded bg-red-500/10">Failed to render diagram</div>`;
          }
        }
      };
      renderChart();
    }
  }, [chart]);

  return <div ref={containerRef} className="flex justify-center my-8 overflow-x-auto" />;
};
