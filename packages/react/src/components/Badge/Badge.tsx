import type { HTMLAttributes } from 'react';
import type { MantiTone } from '@manti-ui/tokens';

import { cx } from '../../internal/props';

export type BadgeVariant = 'solid' | 'soft' | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual emphasis. */
  variant?: BadgeVariant;
  /** Semantic tone. */
  tone?: MantiTone;
  /** Chip size. */
  size?: 'sm' | 'md';
  /** Show a leading status dot. */
  dot?: boolean;
}

/** A compact status or label chip. */
export function Badge({
  variant = 'soft',
  tone = 'neutral',
  size = 'sm',
  dot = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      data-scope="badge"
      data-part="root"
      data-variant={variant}
      data-tone={tone}
      data-size={size}
      className={cx(className)}
      {...rest}
    >
      {dot && <span data-scope="badge" data-part="dot" aria-hidden />}
      {children}
    </span>
  );
}
