import React from 'react';
import { X, Copy, ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface CodeModalProps {
  project: Project;
  onClose: () => void;
}

export const CodeModal: React.FC<CodeModalProps> = ({ project, onClose }) => {
  const copyToClipboard = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet);
      // You could add a toast notification here
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <p className="text-gray-300 mt-1">{project.description}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3 mt-4">
            {project.codeSnippet && (
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Code</span>
              </button>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-h-[60vh] overflow-y-auto">
          {project.codeSnippet ? (
            <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
              <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Github className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Code Snippet Available</h3>
              <p className="text-gray-600 mb-6">
                The code snippet for this project hasn't been added yet.
              </p>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Github className="w-5 h-5" />
                  <span>View on GitHub</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              {new Date(project.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};