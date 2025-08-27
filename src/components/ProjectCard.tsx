import React, { useState } from 'react';
import { 
  ExternalLink, 
  Github, 
  Code, 
  TrendingUp, 
  Zap, 
  Target,
  Eye,
  Star,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewCode: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onViewCode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors = {
      dashboard: 'from-blue-500 to-cyan-500',
      analytics: 'from-purple-500 to-pink-500',
      visualization: 'from-green-500 to-emerald-500',
      reporting: 'from-orange-500 to-red-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getMetricIcon = (metric: string) => {
    const icons = {
      performance: <Zap className="w-4 h-4" />,
      complexity: <Target className="w-4 h-4" />,
      impact: <TrendingUp className="w-4 h-4" />
    };
    return icons[metric as keyof typeof icons];
  };

  return (
    <div
      className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform ${
        isHovered ? 'scale-105 -translate-y-2' : 'scale-100'
      }`}
      style={{ 
        animationDelay: `${index * 150}ms`,
        transform: `translateY(${isHovered ? '-8px' : '0'}) scale(${isHovered ? '1.02' : '1'})`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
            <Star className="w-3 h-3" />
            <span>Featured</span>
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex space-x-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Live Demo</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center space-x-1"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(project.category)} mb-3`}>
          {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-xs">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="flex items-center justify-center mb-1">
                {getMetricIcon(key)}
              </div>
              <div className="text-lg font-bold text-gray-900">{value}%</div>
              <div className="text-xs text-gray-500 capitalize">{key}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
          
          <button
            onClick={() => onViewCode(project)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-300"
          >
            <Code className="w-4 h-4" />
            <span>View Code</span>
            <ArrowRight className={`w-3 h-3 transition-transform duration-300 ${
              isHovered ? 'translate-x-1' : ''
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
};