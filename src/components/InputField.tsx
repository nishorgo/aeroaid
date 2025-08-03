interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  max?: Date;
}

const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
}: InputFieldProps) => {
  return (
    <div className="space-y-1">
      <label className="block text-md font-semibold tracking-widest uppercase text-gray-600">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full h-10 px-3 rounded bg-gray-100 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
      />
    </div>
  );
};

export default InputField;
