import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cx } from '../../lib/cx';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'spark';
export type ButtonSize = 'md' | 'sm';

interface StyleProps {
  /** primary = cobalt, once per view; secondary = outlined; ghost = low emphasis; spark = on dark bands only. */
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function classes({ variant = 'secondary', size = 'md' }: StyleProps, className?: string) {
  return cx(styles.button, styles[variant], size === 'sm' && styles.sm, className);
}

export interface ButtonProps extends StyleProps, ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** An action button. Labels are sentence case and start with a verb. */
export function Button({ variant, size, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={classes({ variant, size }, className)} {...rest} />;
}

export interface ButtonLinkProps extends StyleProps, LinkProps {
  children: ReactNode;
}

/** A link styled as a button, for navigation (uses client-side routing). */
export function ButtonLink({ variant, size, className, ...rest }: ButtonLinkProps) {
  return <Link className={classes({ variant, size }, className)} {...rest} />;
}
