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
          
          // Remove outer code fences (```mermaid ... ```)
          if (cleanChart.startsWith('```mermaid')) {
            cleanChart = cleanChart.substring(10);
          }
          if (cleanChart.startsWith('```')) {
            cleanChart = cleanChart.substring(3);
          }
          if (cleanChart.endsWith('```')) {
            cleanChart = cleanChart.substring(0, cleanChart.length - 3);
          }
          
          cleanChart = cleanChart.trim();

          if (!cleanChart || cleanChart.length < 10) {
            throw new Error('Diagram content is empty or too short');
          }

          // Validate basic mermaid syntax (should start with graph, flowchart, etc.)
          const validPrefixes = ['graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 'erDiagram', 'gantt', 'pie', 'journey', 'requirementDiagram', 'gitGraph', 'mindmap', 'timeline', 'xychart-beta', 'sankey-beta'];
          const hasValidPrefix = validPrefixes.some(prefix => cleanChart.toLowerCase().startsWith(prefix));
          
          if (!hasValidPrefix) {
            console.warn('Mermaid diagram missing valid prefix:', cleanChart.substring(0, 100));
            // Still try to render - mermaid might auto-detect
          }

          const id = `mermaid-${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8)}`;
          const { svg } = await mermaid.render(id, cleanChart);
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (error: any) {
          console.error("Mermaid rendering failed:", error, "\nDiagram code:", chart);
          if (containerRef.current) {
            const errorMsg = error?.message || 'Failed to render diagram';
            containerRef.current.innerHTML = `
              <div class="text-red-500 p-4 border border-red-500/30 rounded bg-red-500/10 font-mono text-sm">
                <div class="font-bold">Mermaid Error</div>
                <div class="mt-2">${errorMsg.replace(/</g, '&lt;')}</div>
                <details class="mt-2">
                  <summary class="cursor-pointer text-blue-400 hover:underline">Show raw code</summary>
                  <pre class="mt-2 text-xs overflow-x-auto p-2 bg-black/30 rounded">${chart.replace(/</g, '&lt;')}</pre>
                </details>
              </div>
            `;
          }
        }
      };
      renderChart();
    }
  }, [chart]);

  return <div ref={containerRef} className="flex justify-center my-8 overflow-x-auto" />;
};
