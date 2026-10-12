import { FC } from 'react';

interface FieldProps {
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    autoComplete?: string;
    error?: string;
}

// Satu kolom form: label, input, dan pesan error validasi dari server
const Field: FC<FieldProps> = ({ name, label, value, onChange, type = 'text', placeholder, autoComplete, error }) => (
    <div className={`field${error ? ' has-error' : ''}`}>
        <label className="field__label" htmlFor={name}>{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input"
            placeholder={placeholder}
            autoComplete={autoComplete}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${name}-error` : undefined}
        />
        {error && <p id={`${name}-error`} className="field__error" role="alert">{error}</p>}
    </div>
);

export default Field;
