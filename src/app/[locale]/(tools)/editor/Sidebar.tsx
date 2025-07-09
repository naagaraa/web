import CategoryButton from "./CategoryButton";
import { categories } from ".//tools/toolsMap";
import UserDropdown from "../UserDropdown";

const Sidebar = ({
  active,
  handleClick,
}: {
  active: string | null;
  handleClick: (id: string) => void;
}) => (
  <aside className="hidden md:flex flex-col w-14 bg-white border-r items-center py-4 gap-2 relative">
    <div className="flex-1 flex flex-col items-center gap-2 overflow-y-auto w-full">
      {categories.map((cat) => (
        <CategoryButton
          key={cat.id}
          id={cat.id}
          icon={cat.icon}
          label={cat.label}
          active={active === cat.id}
          onClick={() => handleClick(cat.id)}
        />
      ))}
    </div>
    <div className="w-full border-t my-2" />
    <UserDropdown />
  </aside>
);

export default Sidebar;
