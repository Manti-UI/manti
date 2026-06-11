import { useId } from 'react';
import type { ReactNode } from 'react';
import { collapsible } from '@manti-ui/folds';
import { normalizeProps, useMachine } from '@zag-js/react';

import { cx } from '../../internal/props';

export interface CollapsibleProps {
  /** Trigger content. */
  trigger: ReactNode;
  /** Collapsible content. */
  children?: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Called whenever the open state changes. */
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

/**
 * A single open/close disclosure backed by the Zag.js collapsible machine. The
 * content animates its height smoothly via the machine's `--height` variable.
 */
export function Collapsible({
  trigger,
  children,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
  id,
  className,
}: CollapsibleProps) {
  const autoId = useId();
  const service = useMachine(collapsible.machine, {
    id: id ?? autoId,
    open,
    defaultOpen,
    disabled,
    onOpenChange: onOpenChange
      ? (details) => onOpenChange(details.open)
      : undefined,
  });
  const api = collapsible.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()} className={cx(className)}>
      <button {...api.getTriggerProps()}>{trigger}</button>
      <div {...api.getContentProps()}>{children}</div>
    </div>
  );
}
