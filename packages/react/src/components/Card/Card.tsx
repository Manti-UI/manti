import type { HTMLAttributes } from 'react';

import { cx, dataBool } from '../../internal/props';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Lift the card with a soft shadow instead of a border. */
  elevated?: boolean;
  /** Apply the smooth hover lift. Pair with real semantics (link, button, onClick). */
  interactive?: boolean;
}

type CardSlotProps = HTMLAttributes<HTMLDivElement>;

/**
 * The signature pillowy surface — the most recognizable Manti UI shape.
 * Compose with `Card.Header`, `Card.Title`, `Card.Description`, `Card.Body`,
 * and `Card.Footer`.
 */
export function Card({ elevated, interactive, className, ...rest }: CardProps) {
  return (
    <div
      data-scope="card"
      data-part="root"
      data-elevated={dataBool(elevated)}
      data-interactive={dataBool(interactive)}
      className={cx(className)}
      {...rest}
    />
  );
}

function CardHeader({ className, ...rest }: CardSlotProps) {
  return (
    <div
      data-scope="card"
      data-part="header"
      className={cx(className)}
      {...rest}
    />
  );
}

function CardTitle({ className, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-scope="card"
      data-part="title"
      className={cx(className)}
      {...rest}
    />
  );
}

function CardDescription({
  className,
  ...rest
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-scope="card"
      data-part="description"
      className={cx(className)}
      {...rest}
    />
  );
}

function CardBody({ className, ...rest }: CardSlotProps) {
  return (
    <div
      data-scope="card"
      data-part="body"
      className={cx(className)}
      {...rest}
    />
  );
}

function CardFooter({ className, ...rest }: CardSlotProps) {
  return (
    <div
      data-scope="card"
      data-part="footer"
      className={cx(className)}
      {...rest}
    />
  );
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Body = CardBody;
Card.Footer = CardFooter;
