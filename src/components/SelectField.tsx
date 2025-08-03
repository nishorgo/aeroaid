interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder = `Select ${label.toLowerCase()}`,
  required = false,
  className = '',
}: SelectFieldProps) => {
  return (
    <div className="space-y-1">
      <label className="block text-md font-semibold tracking-widest uppercase text-gray-600">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full h-12 px-3 rounded bg-gray-100 ${value ? 'text-gray-700' : 'text-gray-400'} focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none ${className}`}
      >
        <option value="" className="text-gray-400">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-gray-700">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
