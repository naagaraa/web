import React from "react";

interface Props {
  id: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  isMobile?: boolean;
}

const CategoryButton = ({
  id,
  icon,
  label,
  active,
  onClick,
  isMobile = false,
}: Props) => {
  const baseStyle =
    "flex items-center justify-center p-2 rounded transition-all duration-200";
  const activeStyle = active
    ? "bg-indigo-100 text-indigo-600 scale-105 shadow-sm"
    : "hover:bg-indigo-50 text-gray-600";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${activeStyle} ${
        isMobile ? "flex-col gap-1 w-16 h-16 text-center" : ""
      }`}
    >
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
      {isMobile && (
        <span className="text-xs leading-tight truncate mt-1">{label}</span>
      )}
    </button>
  );
};

export default CategoryButton;
