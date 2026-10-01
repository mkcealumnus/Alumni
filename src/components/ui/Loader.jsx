import React from 'react';

/**
 * Centralized, theme-aware common Loader component for NextStep.
 * 
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Spinner size
 * @param {boolean} [props.fullPage=false] - Whether to render centered full-page / view container loader
 * @param {string} [props.text='Loading...'] - Optional loading text
 * @param {boolean} [props.inline=false] - Compact inline mode (e.g. inside buttons)
 * @param {string} [props.className] - Extra wrapper classes
 */
const Loader = ({
  size = 'md',
  fullPage = false,
  text = 'Loading...',
  inline = false,
  className = ''
}) => {
  if (inline) {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <i className="ri-loader-4-line animate-spin text-primary"></i>
        {text && <span>{text}</span>}
      </span>
    );
  }

  const spinnerSizes = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl'
  };

  const containerClasses = fullPage
    ? 'min-h-[60vh] w-full flex flex-col items-center justify-center p-8 transition-all duration-300'
    : 'py-12 w-full flex flex-col items-center justify-center p-6 transition-all duration-300';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse"></div>

        {/* Outer Ring Animation */}
        <div className={`${spinnerSizes[size].split(' ')[0]} ${spinnerSizes[size].split(' ')[1]} rounded-full border-2 border-primary/20 border-t-primary animate-spin`}></div>

        {/* Central Brand Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <i className={`ri-seedling-fill text-primary animate-pulse ${spinnerSizes[size].split(' ')[2]}`}></i>
        </div>
      </div>

      {text && (
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark-theme:text-gray-400 animate-pulse text-center">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
