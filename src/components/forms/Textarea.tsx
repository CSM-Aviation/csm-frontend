import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  error?: string;
  hint?: string;
}

/** Multi-line form control — same well/label/error treatment as Field (§08). */
export function Textarea({
  label,
  name,
  error,
  hint,
  required,
  rows = 4,
  className,
  ...rest
}: TextareaProps) {
  const describedBy = error ? `${name}-error` : hint ? `${name}-hint` : undefined;
  return (
    <div className="flex flex-col gap-s2">
      <label htmlFor={name} className="text-small font-medium text-ink">
        {label}
        {required && <span className="text-error"> *</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "resize-y rounded-md border bg-fog-sunk px-s4 py-s3 text-body text-ink outline-none transition-colors duration-fast placeholder:text-ink-faint focus-visible:border-focus focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
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
