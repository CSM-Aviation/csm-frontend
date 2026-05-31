import { cn } from "@/lib/utils";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  hint?: string;
}

/**
 * Text input control (§08): label always visible above (never placeholder-only),
 * a --fog-sunk well with a 1px --line border, --focus ring on focus, and an
 * --error border + message when invalid. Pairs label/description for a11y (§18).
 */
export function Field({ label, name, error, hint, required, className, ...rest }: FieldProps) {
  const describedBy = error ? `${name}-error` : hint ? `${name}-hint` : undefined;
  return (
    <div className="flex flex-col gap-s2">
      <label htmlFor={name} className="text-small font-medium text-ink">
        {label}
        {required && <span className="text-error"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "rounded-md border bg-fog-sunk px-s4 py-s3 text-body text-ink outline-none transition-colors duration-fast placeholder:text-ink-faint focus-visible:border-focus focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
          error ? "border-error" : "border-line",
          className,
        )}
        {...rest}
      />
      {error ? (
        <p id={`${name}-error`} className="text-small text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${name}-hint`} className="text-small text-ink-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
