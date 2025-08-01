import React, { useId } from 'react';
import { cn } from '@/lib/utils';

interface AccessibleFormProps {
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent) => void;
  className?: string;
  noValidate?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const AccessibleForm: React.FC<AccessibleFormProps> = ({
  children,
  onSubmit,
  className,
  noValidate = true,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}) => {
  return (
    <form
      onSubmit={onSubmit}
      noValidate={noValidate}
      className={className}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...props}
    >
      {children}
    </form>
  );
};

interface AccessibleFieldProps {
  children: React.ReactNode;
  className?: string;
}

export const AccessibleField: React.FC<AccessibleFieldProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {children}
    </div>
  );
};

interface AccessibleLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
}

export const AccessibleLabel: React.FC<AccessibleLabelProps> = ({
  children,
  htmlFor,
  required = false,
  className
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'block text-sm font-medium text-foreground',
        className
      )}
    >
      {children}
      {required && (
        <span 
          className="text-red-500 ml-1" 
          aria-label="campo obrigatório"
        >
          *
        </span>
      )}
    </label>
  );
};

interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  showRequiredIndicator?: boolean;
}

export const AccessibleInput: React.FC<AccessibleInputProps> = ({
  label,
  error,
  hint,
  required = false,
  showRequiredIndicator = true,
  className,
  id,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  const describedBy = [errorId, hintId].filter(Boolean).join(' ');

  return (
    <AccessibleField>
      {label && (
        <AccessibleLabel 
          htmlFor={inputId} 
          required={required && showRequiredIndicator}
        >
          {label}
        </AccessibleLabel>
      )}
      
      {hint && (
        <p 
          id={hintId}
          className="text-sm text-muted-foreground"
        >
          {hint}
        </p>
      )}
      
      <input
        id={inputId}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        className={cn(
          'w-full px-3 py-2 border border-input bg-background rounded-md',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      
      {error && (
        <p 
          id={errorId}
          className="text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </AccessibleField>
  );
};

interface AccessibleTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  showRequiredIndicator?: boolean;
}

export const AccessibleTextarea: React.FC<AccessibleTextareaProps> = ({
  label,
  error,
  hint,
  required = false,
  showRequiredIndicator = true,
  className,
  id,
  ...props
}) => {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const errorId = error ? `${textareaId}-error` : undefined;
  const hintId = hint ? `${textareaId}-hint` : undefined;

  const describedBy = [errorId, hintId].filter(Boolean).join(' ');

  return (
    <AccessibleField>
      {label && (
        <AccessibleLabel 
          htmlFor={textareaId} 
          required={required && showRequiredIndicator}
        >
          {label}
        </AccessibleLabel>
      )}
      
      {hint && (
        <p 
          id={hintId}
          className="text-sm text-muted-foreground"
        >
          {hint}
        </p>
      )}
      
      <textarea
        id={textareaId}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        className={cn(
          'w-full px-3 py-2 border border-input bg-background rounded-md',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'resize-vertical min-h-[100px]',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      
      {error && (
        <p 
          id={errorId}
          className="text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </AccessibleField>
  );
};

interface AccessibleSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  showRequiredIndicator?: boolean;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
}

export const AccessibleSelect: React.FC<AccessibleSelectProps> = ({
  label,
  error,
  hint,
  required = false,
  showRequiredIndicator = true,
  options,
  placeholder,
  className,
  id,
  ...props
}) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  const errorId = error ? `${selectId}-error` : undefined;
  const hintId = hint ? `${selectId}-hint` : undefined;

  const describedBy = [errorId, hintId].filter(Boolean).join(' ');

  return (
    <AccessibleField>
      {label && (
        <AccessibleLabel 
          htmlFor={selectId} 
          required={required && showRequiredIndicator}
        >
          {label}
        </AccessibleLabel>
      )}
      
      {hint && (
        <p 
          id={hintId}
          className="text-sm text-muted-foreground"
        >
          {hint}
        </p>
      )}
      
      <select
        id={selectId}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        className={cn(
          'w-full px-3 py-2 border border-input bg-background rounded-md',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p 
          id={errorId}
          className="text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </AccessibleField>
  );
};

interface AccessibleCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  hint?: string;
}

export const AccessibleCheckbox: React.FC<AccessibleCheckboxProps> = ({
  label,
  error,
  hint,
  className,
  id,
  ...props
}) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;
  const errorId = error ? `${checkboxId}-error` : undefined;
  const hintId = hint ? `${checkboxId}-hint` : undefined;

  const describedBy = [errorId, hintId].filter(Boolean).join(' ');

  return (
    <AccessibleField>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={checkboxId}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          className={cn(
            'mt-1 h-4 w-4 rounded border-input text-primary',
            'focus:ring-2 focus:ring-primary focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        
        <div className="flex-1">
          <label 
            htmlFor={checkboxId}
            className="text-sm font-medium text-foreground cursor-pointer"
          >
            {label}
          </label>
          
          {hint && (
            <p 
              id={hintId}
              className="text-sm text-muted-foreground mt-1"
            >
              {hint}
            </p>
          )}
          
          {error && (
            <p 
              id={errorId}
              className="text-sm text-red-600 mt-1"
              role="alert"
              aria-live="polite"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </AccessibleField>
  );
};

// Hook para validação de formulário acessível
export const useAccessibleForm = () => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const setFieldError = (field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const clearFieldError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const setFieldTouched = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isFieldTouched = (field: string) => touched[field] || false;
  const getFieldError = (field: string) => errors[field];
  const hasErrors = () => Object.keys(errors).length > 0;

  const validateField = (field: string, value: any, rules: any) => {
    // Implementação básica de validação
    if (rules.required && (!value || value.trim() === '')) {
      setFieldError(field, 'Este campo é obrigatório');
      return false;
    }

    if (rules.minLength && value.length < rules.minLength) {
      setFieldError(field, `Mínimo de ${rules.minLength} caracteres`);
      return false;
    }

    if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setFieldError(field, 'Email inválido');
      return false;
    }

    clearFieldError(field);
    return true;
  };

  return {
    errors,
    touched,
    setFieldError,
    clearFieldError,
    setFieldTouched,
    isFieldTouched,
    getFieldError,
    hasErrors,
    validateField
  };
};