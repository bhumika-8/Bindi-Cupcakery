import * as React from "react";

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ value, onChange, options }) => {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center space-x-3 cursor-pointer p-3 border rounded-lg ${
            value === option.value ? "border-blue-500 bg-blue-100" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="radio-option"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="hidden"
          />
          <div
            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
              value === option.value ? "border-blue-500" : "border-gray-400"
            }`}
          >
            {value === option.value && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
          </div>
          <span className="text-gray-800">{option.label}</span>
        </label>
      ))}
    </div>
  );
};
