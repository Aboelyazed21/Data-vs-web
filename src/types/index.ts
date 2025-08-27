export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'dashboard' | 'analytics' | 'visualization' | 'reporting';
  technologies: string[];
  image: string;
  codeSnippet?: string;
  githubUrl?: string;
  liveUrl?: string;
  metrics: {
    performance: number;
    complexity: number;
    impact: number;
  };
  featured: boolean;
  createdAt: string;
}

export interface UploadedFile {
  file: File;
  preview: string;
  type: 'image' | 'code';
}