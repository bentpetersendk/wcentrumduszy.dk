import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type FieldShellProps = {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  success?: string;
  required?: boolean;
  children: ReactNode;
};

export function FieldShell({ id, label, helper, error, success, required, children }: FieldShellProps) {
  const messageId = `${id}-message`;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-text">
        {label}
        {required ? <span className="ml-1 text-error">required</span> : null}
      </label>
      {children}
      <p
        id={messageId}
        className={`text-sm ${error ? "text-error" : success ? "text-success" : "text-text-muted"}`}
      >
        {error ?? success ?? helper}
      </p>
    </div>
  );
}

export function TextInput({
  id,
  label,
  helper,
  error,
  success,
  required,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & Omit<FieldShellProps, "children">) {
  return (
    <FieldShell id={id} label={label} helper={helper} error={error} success={success} required={required}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${id}-message`}
        className="min-h-14 w-full rounded-md border border-border bg-surface px-4 text-base text-text outline-none transition-colors duration-200 placeholder:text-text-muted/70 focus:border-focus focus:ring-2 focus:ring-focus/20 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
    </FieldShell>
  );
}

export function TextArea({
  id,
  label,
  helper,
  error,
  success,
  required,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & Omit<FieldShellProps, "children">) {
  return (
    <FieldShell id={id} label={label} helper={helper} error={error} success={success} required={required}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${id}-message`}
        className="min-h-32 w-full rounded-md border border-border bg-surface px-4 py-3 text-base text-text outline-none transition-colors duration-200 placeholder:text-text-muted/70 focus:border-focus focus:ring-2 focus:ring-focus/20 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  helper,
  error,
  success,
  required,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & Omit<FieldShellProps, "children"> & { children: ReactNode }) {
  return (
    <FieldShell id={id} label={label} helper={helper} error={error} success={success} required={required}>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${id}-message`}
        className="min-h-14 w-full rounded-md border border-border bg-surface px-4 text-base text-text outline-none transition-colors duration-200 focus:border-focus focus:ring-2 focus:ring-focus/20 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}

export function CheckboxField({
  id,
  label,
  helper,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; helper?: string }) {
  return (
    <div className="flex gap-3">
      <input
        id={id}
        type="checkbox"
        className="mt-1 h-5 w-5 rounded border-border text-text focus:ring-focus"
        {...props}
      />
      <div>
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
        </label>
        {helper ? <p className="mt-1 text-sm text-text-muted">{helper}</p> : null}
      </div>
    </div>
  );
}

export function RadioField({
  id,
  label,
  helper,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; helper?: string }) {
  return (
    <div className="flex gap-3">
      <input id={id} type="radio" className="mt-1 h-5 w-5 border-border text-text focus:ring-focus" {...props} />
      <div>
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
        </label>
        {helper ? <p className="mt-1 text-sm text-text-muted">{helper}</p> : null}
      </div>
    </div>
  );
}

export function ToggleField({ id, label, helper, checked = false }: { id: string; label: string; helper?: string; checked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-md border border-border bg-surface p-4">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
        </label>
        {helper ? <p className="mt-1 text-sm text-text-muted">{helper}</p> : null}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        className={`relative h-7 w-12 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus ${
          checked ? "bg-success" : "bg-border"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-surface shadow-soft transition-transform duration-200 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

