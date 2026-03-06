import React, { useState } from 'react';
import { Landing } from './components/Landing';
import { Report } from './components/Report';
import { Loading } from './components/Loading';
import { fetchRepoData } from './services/github';
import { generateReportStream } from './services/gemini';

export default function App() {
  const [repoUrl, setRepoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [reportContent, setReportContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAnalyze = async (url: string, provider: 'google' | 'nvidia' = 'google') => {
    setIsLoading(true);
    setProgressMsg('Initializing...');
    setReportContent('');
    
     try {
       // 1. Fetch GitHub Data
       const repoData = await fetchRepoData(url, setProgressMsg);
       
       // Debug: log what we're sending to the AI
       console.log('=== REPO DATA DEBUG ===');
       console.log('Total characters:', repoData.length);
       console.log('Estimated tokens:', Math.ceil(repoData.length / 4));
       console.log('First 1000 chars:\n', repoData.substring(0, 1000));
       console.log('=== END DEBUG ===');
       
       // Validate repo data is substantial
       if (!repoData || repoData.trim().length < 100) {
         throw new Error("Insufficient repository data fetched. The repository may be empty or inaccessible.");
       }
       
       // Warn if data seems too small (likely incomplete)
       const estimatedTokens = Math.ceil(repoData.length / 4);
       if (estimatedTokens < 10000) {
         console.warn(`Repo data is small (~${estimatedTokens} tokens). Report may be incomplete.`);
       }
       
       // 2. Switch to Report View
       setRepoUrl(url);
       setIsLoading(false);
       setIsGenerating(true);
      
      // 3. Start Streaming Report
      await generateReportStream(repoData, (chunk) => {
        setReportContent((prev) => prev + chunk);
      }, provider);
      
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message}`);
      setRepoUrl(null); // Reset on error
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setRepoUrl(null);
    setReportContent('');
    setProgressMsg('');
  };

  if (isLoading) {
    return <Loading progressMsg={progressMsg} />;
  }

  if (repoUrl) {
    return (
      <Report
        repoUrl={repoUrl}
        reportContent={reportContent}
        isGenerating={isGenerating}
        onReset={handleReset}
      />
    );
  }

  return (
    <Landing
      onAnalyze={handleAnalyze}
    />
  );
}
