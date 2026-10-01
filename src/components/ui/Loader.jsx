import { Loader2 } from 'lucide-react';

/**
 * Centralized Loader component for MKCE Alumni.
 *
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Spinner size
 * @param {boolean} [props.fullPage=false] - Whether to render centered full-page loader
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
  const sizes = { sm: 16, md: 24, lg: 32 };
  const iconSize = sizes[size] || sizes.md;

  if (inline) {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <Loader2 size={16} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
        {text && <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{text}</span>}
      </span>
    );
  }

  const containerClasses = fullPage
    ? 'min-h-[60vh] w-full flex flex-col items-center justify-center p-8'
    : 'py-16 w-full flex flex-col items-center justify-center p-6';

  return (
    <div className={`${containerClasses} ${className}`}>
      <Loader2
        size={iconSize}
        className="animate-spin"
        style={{ color: 'var(--color-primary)' }}
      />
      {text && (
        <p
          className="mt-3 text-[13px] font-medium text-center"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
