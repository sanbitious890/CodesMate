import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({ project }) => {
  return (
    <div className="glass-card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {project.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack?.slice(0, 3).map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
          >
            {tech}
          </span>
        ))}
        {project.techStack?.length > 3 && (
          <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>👥 {project.members?.length || 1}/{project.teamSize}</span>
        <span className={`px-2 py-1 rounded-full text-xs ${
          project.status === 'open' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
          project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {project.status || 'open'}
        </span>
      </div>
      <Link
        to={`/projects/${project._id}`}
        className="mt-4 block text-center btn-primary text-sm py-2"
      >
        View Details
      </Link>
    </div>
  )
}

export default ProjectCard