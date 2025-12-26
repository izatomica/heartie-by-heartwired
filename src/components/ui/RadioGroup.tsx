import { clsx } from 'clsx';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  className?: string;
}

export function RadioGroup({
  name,
  value,
  onChange,
  options,
  className,
}: RadioGroupProps) {
  return (
    <div className={clsx('space-y-3', className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className={clsx(
            'flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all',
            value === option.value
              ? 'border-teal-dark bg-teal-dark/5'
              : 'border-border hover:border-dusty-pink-light'
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 w-4 h-4 text-teal-dark border-border focus:ring-teal-dark focus:ring-offset-0"
          />
          <div className="flex-1">
            <span className="block text-sm font-medium text-text-primary">
              {option.label}
            </span>
            {option.description && (
              <span className="block text-xs text-text-muted mt-1">
                {option.description}
              </span>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}
