import type { HTMLAttributes, ReactNode } from 'react';
import type { MantiTone } from '@manti-ui/tokens';

import { cx } from '../../internal/props';

export interface AlertProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> {
  /** Semantic tone. */
  tone?: MantiTone;
  /** Soft (default) or solid fill. */
  variant?: 'soft' | 'solid';
  /** Bold leading line. */
  title?: ReactNode;
  /** Leading status icon. */
  icon?: ReactNode;
  /** When provided, renders a dismiss button that calls this handler. */
  onDismiss?: () => void;
  /** Accessible label for the dismiss button. */
  dismissLabel?: string;
}

/**
 * An inline, tonal message with an icon, title, description, and an optional
 * dismiss action. Defaults to `role="status"`, escalating to `role="alert"` for
 * the danger and warning tones.
 */
export function Alert({
  tone = 'info',
  variant = 'soft',
  title,
  icon,
  onDismiss,
  dismissLabel = 'Dismiss',
  role,
  className,
  children,
  ...rest
}: AlertProps) {
  const resolvedRole =
    role ?? (tone === 'danger' || tone === 'warning' ? 'alert' : 'status');

  return (
    <div
      data-scope="alert"
      data-part="root"
      data-tone={tone}
      data-variant={variant}
      role={resolvedRole}
      className={cx(className)}
      {...rest}
    >
      {icon != null && (
        <span data-scope="alert" data-part="icon" aria-hidden>
          {icon}
        </span>
      )}
      <div data-scope="alert" data-part="content">
        {title != null && (
          <div data-scope="alert" data-part="title">
            {title}
          </div>
        )}
        {children != null && (
          <div data-scope="alert" data-part="description">
            {children}
          </div>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          data-scope="alert"
          data-part="dismiss"
          aria-label={dismissLabel}
          onClick={onDismiss}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
