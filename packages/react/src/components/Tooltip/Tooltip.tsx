import { useId } from 'react';
import type { ReactNode } from 'react';
import { tooltip } from '@manti-ui/folds';
import { normalizeProps, useMachine } from '@zag-js/react';

import { cx } from '../../internal/props';

export interface TooltipProps {
  /** The tooltip content. */
  content: ReactNode;
  /** The trigger element (wrapped in an inline trigger). */
  children: ReactNode;
  /** Delay before opening, in ms. */
  openDelay?: number;
  /** Delay before closing, in ms. */
  closeDelay?: number;
  /** Keep open while hovering the content. */
  interactive?: boolean;
  id?: string;
  className?: string;
}

/**
 * A floating label backed by the Zag.js tooltip machine. The machine handles
 * positioning, hover/focus delays, and dismissal; the content fades and lifts in
 * smoothly. The trigger is an inline wrapper, so any focusable child works.
 */
export function Tooltip({
  content,
  children,
  openDelay,
  closeDelay,
  interactive,
  id,
  className,
}: TooltipProps) {
  const autoId = useId();
  const service = useMachine(tooltip.machine, {
    id: id ?? autoId,
    openDelay,
    closeDelay,
    interactive,
  });
  const api = tooltip.connect(service, normalizeProps);

  return (
    <>
      <span {...api.getTriggerProps()}>{children}</span>
      {api.open && (
        <div {...api.getPositionerProps()}>
          <div {...api.getContentProps()} className={cx(className)}>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
