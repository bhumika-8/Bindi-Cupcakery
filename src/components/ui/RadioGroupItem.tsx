import * as React from "react";

interface RadioGroupItemProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ label, value, checked, onChange }) => {
  return (
    <label
      className={`flex items-center space-x-3 cursor-pointer p-2 border rounded-lg ${
        checked ? "border-blue-500 bg-blue-100" : "border-gray-300"
      }`}
    >
      <input
        type="radio"
        name="radio-group"
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
          checked ? "border-blue-500" : "border-gray-400"
        }`}
      >
        {checked && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
      </div>
      <span className="text-gray-800">{label}</span>
    </label>
  );
};
