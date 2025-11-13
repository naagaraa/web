// src/app/[locale]/(tools)/apps/editor/components/CategoryButton.tsx
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
  icon,
  label,
  active,
  onClick,
  isMobile = false,
}: Props) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`
        relative flex items-center justify-center
        transition-all duration-200
        ${isMobile ? "w-14 h-14 rounded-xl" : "w-12 h-12 rounded-xl"}
        ${
          active
            ? "text-line-600 bg-line-50"
            : "text-gray-500 hover:bg-gray-100"
        }
        focus:outline-none focus:ring-0
      `}
    >
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>

      {/* Active indicator (opsional) */}
      {active && !isMobile && (
        <span className="absolute -right-1 top-1/2 w-1.5 h-1.5 bg-line-500 rounded-full transform -translate-y-1/2" />
      )}
    </button>
  );
};

export default CategoryButton;
