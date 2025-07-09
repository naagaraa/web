const CategoryButton = ({
  id,
  icon,
  label,
  active,
  onClick,
  isMobile = false,
}: Props) => {
  const baseStyle =
    "flex items-center justify-center p-2 rounded transition-all";
  const activeStyle = active
    ? "bg-blue-100 text-blue-600 scale-105"
    : "hover:bg-gray-100 text-gray-600";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${activeStyle} ${
        isMobile ? "flex-col gap-1 w-16 h-16 text-center" : ""
      }`}
    >
      <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
      {isMobile && (
        <span className="text-[10px] leading-tight min-h-[1.5rem] truncate">
          {label}
        </span>
      )}
    </button>
  );
};
interface Props {
  id: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  isMobile?: boolean;
}
export default CategoryButton;
