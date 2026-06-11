import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import type { MantiTone } from '@manti-ui/tokens';

import { cx, dataBool } from '../../internal/props';

export interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  /** Field label. */
  label?: ReactNode;
  /** Helper text shown below the control when there is no error. */
  hint?: ReactNode;
  /** Error message. Presence sets the invalid state and replaces the hint. */
  error?: ReactNode;
  /** Control size. */
  size?: 'sm' | 'md' | 'lg';
  /** Tone used for the focus ring. */
  tone?: MantiTone;
  /** Stretch to fill the available inline space. */
  fullWidth?: boolean;
  /** Content rendered inside the control, before the input. */
  leadingAddon?: ReactNode;
  /** Content rendered inside the control, after the input. */
  trailingAddon?: ReactNode;
}

/**
 * A text input with label, hint, error, and optional adornments. Wires up label
 * association and `aria-describedby`/`aria-invalid` automatically.
 */
export function TextField({
  label,
  hint,
  error,
  size = 'md',
  tone = 'primary',
  fullWidth,
  leadingAddon,
  trailingAddon,
  id,
  required,
  className,
  'aria-describedby': ariaDescribedby,
  ...rest
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const invalid = error != null;
  const hintId = hint != null ? `${inputId}-hint` : undefined;
  const errorId = invalid ? `${inputId}-error` : undefined;
  const describedBy =
    [errorId, hintId, ariaDescribedby].filter(Boolean).join(' ') || undefined;

  return (
    <div
      data-scope="field"
      data-part="root"
      data-size={size}
      data-tone={tone}
      data-invalid={dataBool(invalid)}
      data-full-width={dataBool(fullWidth)}
      className={cx(className)}
    >
      {label != null && (
        <label data-scope="field" data-part="label" htmlFor={inputId}>
          {label}
          {required && (
            <span data-scope="field" data-part="required" aria-hidden>
              *
            </span>
          )}
        </label>
      )}
      <div data-scope="field" data-part="control" data-size={size}>
        {leadingAddon != null && (
          <span data-scope="field" data-part="addon">
            {leadingAddon}
          </span>
        )}
        <input
          data-scope="field"
          data-part="input"
          {...rest}
          id={inputId}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
        />
        {trailingAddon != null && (
          <span data-scope="field" data-part="addon">
            {trailingAddon}
          </span>
        )}
      </div>
      {invalid ? (
        <p data-scope="field" data-part="error" id={errorId}>
          {error}
        </p>
      ) : (
        hint != null && (
          <p data-scope="field" data-part="hint" id={hintId}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}
