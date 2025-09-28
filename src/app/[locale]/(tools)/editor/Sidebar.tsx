import CategoryButton from "./CategoryButton";
import { categories } from "./tools/toolsMap";
import UserDropdown from "../UserDropdown";

interface Props {
  active: string | null;
  handleClick: (id: string) => void;
}

const Sidebar = ({ active, handleClick }: Props) => (
  <aside className="hidden md:flex flex-col w-16 bg-white border-r border-gray-200 items-center py-4 gap-3 relative">
    <div className="flex-1 flex flex-col items-center gap-3 overflow-y-auto w-full">
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

    <div className="w-full border-t border-gray-200 mt-2" />
    <UserDropdown />
  </aside>
);

export default Sidebar;
