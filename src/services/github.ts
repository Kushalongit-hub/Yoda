export interface RepoFile {
  path: string;
  content: string;
}

export async function fetchRepoData(repoUrl: string, onProgress: (msg: string) => void): Promise<string> {
  const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    throw new Error("Invalid GitHub URL. Please provide a URL like https://github.com/owner/repo");
  }
  
  const owner = match[1];
  const repo = match[2];

  onProgress(`Fetching repository info for ${owner}/${repo}...`);
  
  // 1. Get default branch
  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
  if (!repoRes.ok) {
    throw new Error(`Failed to fetch repo info: ${repoRes.statusText}`);
  }
  const repoData = await repoRes.json();
  const defaultBranch = repoData.default_branch;

  onProgress(`Fetching file tree from branch '${defaultBranch}'...`);

  // 2. Get tree
  const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`);
  if (!treeRes.ok) {
    throw new Error(`Failed to fetch repo tree: ${treeRes.statusText}`);
  }
  const treeData = await treeRes.json();

  // 3. Filter files
  const validExtensions = new Set([
    'ts', 'tsx', 'js', 'jsx', 'py', 'rs', 'go', 'java', 'c', 'cpp', 'h', 'hpp', 'cs', 'rb', 'php', 
    'md', 'json', 'toml', 'yaml', 'yml', 'xml', 'html', 'css', 'scss', 'sql', 'sh', 'bat', 'ps1',
    'dockerfile', 'Makefile', 'lock'
  ]);

  const excludeDirs = new Set([
    'node_modules', 'vendor', 'dist', 'build', 'out', 'target', 'bin', 'obj', 
    '.git', '.github', '.vscode', '.idea', 'docs', 'tests', 'test', 'spec', 'assets', 'public',
    'coverage', '.next', '.nuxt', 'cache', 'tmp', 'temp'
  ]);

  let files = treeData.tree.filter((item: any) => {
    if (item.type !== 'blob') return false;
    
    const parts = item.path.split('/');
    const filename = parts[parts.length - 1];
    
    // Check excluded dirs
    if (parts.some((p: string) => excludeDirs.has(p))) return false;
    
    // Check extension
    const extMatch = filename.match(/\.([^.]+)$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : '';
    
    // Special files without extensions
    if (['Dockerfile', 'Makefile'].includes(filename)) return true;
    
    return validExtensions.has(ext);
  });

  // 4. Sort by importance
  const getScore = (path: string) => {
    const lower = path.toLowerCase();
    if (lower === 'readme.md') return 100;
    if (lower === 'package.json' || lower === 'cargo.toml' || lower === 'requirements.txt' || lower === 'pyproject.toml') return 90;
    if (lower.includes('main.') || lower.includes('index.') || lower.includes('app.') || lower.includes('server.')) return 80;
    if (path.startsWith('src/')) return 70;
    if (path.startsWith('lib/')) return 60;
    if (lower.includes('config') || lower.includes('settings')) return 50;
    return 10;
  };

  files.sort((a: any, b: any) => getScore(b.path) - getScore(a.path));

  // Token-aware limiting: estimated tokens = chars / 3 (more realistic for code)
  // Target ~600k tokens to leave room for system prompt (15k) and output (8k)
  const TOKEN_BUDGET = 600000;
  const ESTIMATED_TOKENS_PER_CHAR = 3; // more realistic for code
  let totalTokens = 0;
  const selectedFiles: any[] = [];

  for (const file of files) {
    // Skip large individual files (>50KB) that would consume too much budget alone
    if (file.size > 50000) {
      console.log(`Skipping ${file.path} (${file.size} bytes)`);
      continue;
    }
    
    const estimatedTokens = Math.ceil(file.size / ESTIMATED_TOKENS_PER_CHAR);
    
    if (totalTokens + estimatedTokens > TOKEN_BUDGET) {
      break; // Stop when we'd exceed budget
    }
    
    selectedFiles.push(file);
    totalTokens += estimatedTokens;
  }

  onProgress(`Selected ${selectedFiles.length} files (~${Math.round(totalTokens/1000)}k tokens)`);

  if (selectedFiles.length === 0) {
    throw new Error("No files selected for analysis. The repository may not contain any supported file types.");
  }

  // 6. Fetch contents
  let combinedContent = "";
  let fetchedCount = 0;

  for (const file of selectedFiles) {
    try {
      const rawRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${file.path}`);
      if (rawRes.ok) {
        const content = await rawRes.text();
        combinedContent += `\n\n--- ${file.path} ---\n` + content;
        fetchedCount++;
        onProgress(`Downloaded ${fetchedCount}/${selectedFiles.length} files...`);
      }
    } catch (e) {
      console.warn(`Failed to fetch ${file.path}`, e);
    }
  }

  onProgress(`Successfully downloaded ${fetchedCount} files. Total tokens: ~${Math.round(totalTokens/1000)}k`);
  return combinedContent;
}
