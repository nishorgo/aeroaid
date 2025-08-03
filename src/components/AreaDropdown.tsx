import SelectField from "./SelectField";
import { areas } from '@/data/dropdown';


interface AreaDropdownProps {
  value: string;
  onChange: (value: string) => void;
  locations?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  className?: string;
}

const AreaDropdown = ({
  value,
  onChange,
  locations = areas,
  required = false,
  placeholder = 'Select Your Area',
  className = '',
}: AreaDropdownProps) => {
  return (
    <div className={className}>
      <SelectField
        label="Area"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        options={locations}
        required={required}
      />
    </div>
  );
};

export default AreaDropdown;