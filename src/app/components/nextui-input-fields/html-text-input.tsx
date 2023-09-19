import React from "react";

const HtmlTextInputField = ({
  label,
  value,
  onChange,
  id,
  disabled = false,
}: {
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: any;
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
        <input
          id={id}
          type="text"
          name={id}
          className="text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          placeholder=""
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default HtmlTextInputField;
