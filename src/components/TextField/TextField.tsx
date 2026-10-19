import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import styles from './TextField.module.css';

interface BaseProps {
  /** Always-visible label. Never rely on placeholder text alone. */
  label: string;
  /** Explains the expected format. */
  hint?: string;
  /** Plain-language error: what happened and how to fix it. */
  error?: string;
  className?: string;
}

type InputProps = BaseProps & { multiline?: false } & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'className'
  >;
type AreaProps = BaseProps & { multiline: true } & Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'className'
  >;

export type TextFieldProps = InputProps | AreaProps;

/** A labelled text input (or textarea with `multiline`), with optional hint and error. */
export function TextField(props: TextFieldProps) {
  const { label, hint, error, className, id: idProp, multiline, ...controlProps } = props;
  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  const shared = {
    id,
    className: styles.control,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  };

  return (
    <div className={cx(styles.field, error && styles.invalid, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {multiline ? (
        <textarea {...(controlProps as TextareaHTMLAttributes<HTMLTextAreaElement>)} {...shared} />
      ) : (
        <input {...(controlProps as InputHTMLAttributes<HTMLInputElement>)} {...shared} />
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
    </div>
  );
}
