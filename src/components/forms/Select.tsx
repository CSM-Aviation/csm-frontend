import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Option[];
  error?: string;
  hint?: string;
  placeholder?: string;
}

/** Select control — matches Field's well/label/error treatment (§08). */
export function Select({
  label,
  name,
  options,
  error,
  hint,
  required,
  placeholder,
  className,
  ...rest
}: SelectProps) {
  const describedBy = error ? `${name}-error` : hint ? `${name}-hint` : undefined;
  return (
    <div className="flex flex-col gap-s2">
      <label htmlFor={name} className="text-small font-medium text-ink">
        {label}
        {required && <span className="text-error"> *</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "w-full appearance-none rounded-md border bg-fog-sunk px-s4 py-s3 pr-s8 text-body text-ink outline-none transition-colors duration-fast focus-visible:border-focus focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
            error ? "border-error" : "border-line",
            className,
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          strokeWidth={2}
          aria-hidden
          className="pointer-events-none absolute right-s4 top-1/2 -translate-y-1/2 text-ink-soft"
        />
      </div>
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
