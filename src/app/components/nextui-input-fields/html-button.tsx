import React from "react";

const HtmlButton = ({
  label,
  onClick,
  style = "bg-blue-600 hover:bg-blue-700",
}: {
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center focus:outline-none text-white text-sm sm:text-base ${style} rounded py-2 w-full transition duration-150 ease-in`}
    >
      {label}
    </button>
  );
};

export default HtmlButton;
