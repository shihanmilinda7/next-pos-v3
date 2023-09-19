import React from "react";

const HtmlSelectInputField = ({
  label,
  value,
  onChange,
  id,
  optionValues,
  disabled = false,
}: {
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id?: any;
  optionValues:any[]
  disabled?: boolean;
}) => {
  return (
    <div className="flex flex-col mb-1 w-full">
      <label
        htmlFor={id}
        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
      >
        {label}
      </label>
      <div className="relative">
        <select
          className="text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          onChange={onChange}
          value={value}
        >
          {optionValues.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default HtmlSelectInputField;
