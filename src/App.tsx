import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List,
  TrendingUp,
  Award,
  Users,
  Eye,
  Sparkles,
  Database,
  BarChart3
} from 'lucide-react';
import { ProjectCard } from './components/ProjectCard';
import { ProjectUpload } from './components/ProjectUpload';
import { CodeModal } from './components/CodeModal';
import { Project } from './types';

// Sample projects data
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Global Development Insights with R',
description: 'A comprehensive data analysis project using the Gapminder dataset in R. The project showcases faceting, trend analysis, transformations, boxplots, and distribution comparisons to reveal global patterns in life expectancy and economic growth across continents.',

    category: 'visualization',
    technologies: ['R (Data Analysis & Visualization)', 'ggplot2 (Charts & Faceting)', 'dplyr (Data Manipulation)', 'Gapminder Dataset (Real-world data)'],

    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    codeSnippet: `// Advanced Sales Dashboard Component
packages <- c("dplyr", "gapminder", "ggplot2")
installed <- rownames(installed.packages())
for (p in packages) {
  if (!(p %in% installed)) {
    install.packages(p)
  }
}

library(dplyr)
library(gapminder)
library(ggplot2)

head(gapminder)

ggplot(gapminder, aes(x = gdpPercap, y = lifeExp)) +
  geom_point(alpha = 0.5, color = "steelblue") +
  scale_x_log10() +
  facet_wrap(~ continent) +
  labs(title = "GDP vs Life Expectancy across Continents")

gapminder %>%
  group_by(year, continent) %>%
  summarise(mean_lifeExp = mean(lifeExp)) %>%
  ggplot(aes(x = year, y = mean_lifeExp, color = continent)) +
  geom_line(size = 1.2) +
  labs(title = "Life Expectancy Trends by Continent")

ggplot(gapminder, aes(x = gdpPercap)) +
  geom_histogram(bins = 30, fill = "tomato", color = "white") +
  scale_x_log10() +
  labs(title = "Distribution of GDP per capita (log scale)")

ggplot(gapminder, aes(x = continent, y = lifeExp, fill = continent)) +
  geom_boxplot() +
  labs(title = "Life Expectancy by Continent")

gapminder %>%
  filter(continent %in% c("Africa", "Europe")) %>%
  ggplot(aes(x = lifeExp, fill = continent)) +
  geom_histogram(position = "identity", alpha = 0.6, bins = 30) +
  labs(title = "Comparing Life Expectancy Distributions: Africa vs Europe")
`,
    githubUrl: 'https://github.com/Aboelyazed21/project2.data.git',
    liveUrl: 'https://sales-dashboard-demo.com',
    metrics: {
      performance: 95,
      complexity: 85,
      impact: 92
    },
    featured: false,
    createdAt: '2025-08-27'
  },
//   {
//     id: '2',
//     title: 'Customer Analytics Platform',
//     description: 'Comprehensive customer behavior analysis platform with machine learning insights, segmentation tools, and predictive modeling capabilities.',
//     category: 'analytics',
//     technologies: ['Python', 'Pandas', 'Plotly', 'Streamlit', 'scikit-learn'],
//     image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800',
//     codeSnippet: `# Customer Analytics Platform
// import pandas as pd
// import plotly.express as px
// import streamlit as st
// from sklearn.cluster import KMeans

// def customer_segmentation(df):
//     # Prepare features for clustering
//     features = ['total_spent', 'frequency', 'recency']
//     X = df[features].values
    
//     # Apply K-means clustering
//     kmeans = KMeans(n_clusters=4, random_state=42)
//     df['segment'] = kmeans.fit_predict(X)
    
//     return df

// def create_dashboard():
//     st.title("Customer Analytics Platform")
    
//     # Load data
//     df = load_customer_data()
//     df = customer_segmentation(df)
    
//     # Create visualizations
//     fig = px.scatter(df, x='total_spent', y='frequency', 
//                     color='segment', title='Customer Segments')
//     st.plotly_chart(fig)`,
//     githubUrl: 'https://github.com/example/customer-analytics',
//     liveUrl: 'https://customer-analytics-demo.com',
//     metrics: {
//       performance: 88,
//       complexity: 92,
//       impact: 89
//     },
//     featured: false,
//     createdAt: '2024-01-10'
//   },
//   {
//     id: '3',
//     title: 'Financial Data Visualization',
//     description: 'Real-time financial market visualization with interactive charts, portfolio tracking, and risk analysis tools for investment decision making.',
//     category: 'visualization',
//     technologies: ['Vue.js', 'Chart.js', 'WebSocket', 'Express', 'MongoDB'],
//     image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=800',
//     metrics: {
//       performance: 91,
//       complexity: 78,
//       impact: 94
//     },
//     featured: true,
//     createdAt: '2024-01-05'
//   }
];

function App() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(sampleProjects);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedCategory]);

  const handleAddProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const stats = {
    totalProjects: projects.length,
    featuredProjects: projects.filter(p => p.featured).length,
    avgPerformance: Math.round(projects.reduce((acc, p) => acc + p.metrics.performance, 0) / projects.length),
    totalViews: '12 views'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="relative overflow-hidden bg-white shadow-xl border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5" />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Data Visualization 
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
             

              Showcasing elegant data visualizations that turn complex numbers into clear stories and smarter decisions.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { label: 'Total Projects', value: stats.totalProjects, icon: Database },
                { label: 'Featured', value: stats.featuredProjects, icon: Award },
                { label: 'Avg Performance', value: `${stats.avgPerformance}%`, icon: TrendingUp },
                { label: 'Total Views', value: stats.totalViews, icon: Eye }
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 500}ms` }}
                >
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Search & Filter */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Categories</option>
                <option value="dashboard">Dashboard</option>
                <option value="analytics">Analytics</option>
                <option value="visualization">Visualization</option>
                <option value="reporting">Reporting</option>
              </select>
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              
              <button
                onClick={() => setShowUpload(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                <span>Add Project</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Database className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Projects Found</h3>
            <p className="text-gray-600 mb-8">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Start by adding your first data visualization project.'}
            </p>
            <button
              onClick={() => setShowUpload(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Project</span>
            </button>
          </div>
        ) : (
          <div className={`grid ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          } gap-8`}>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onViewCode={setSelectedProject}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {showUpload && (
        <ProjectUpload
          onAddProject={handleAddProject}
          onClose={() => setShowUpload(false)}
        />
      )}

      {selectedProject && (
        <CodeModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default App;