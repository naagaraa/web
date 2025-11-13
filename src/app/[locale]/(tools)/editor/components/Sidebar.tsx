"use client";

import CategoryButton from "./CategoryButton";
import { categories } from "./toolsMap";
import UserDropdown from "./UserDropdown";

interface SidebarProps {
  active: string | null;
  handleClick: (id: string, slug?: string) => void;
}

const Sidebar = ({ active, handleClick }: SidebarProps) => {
  return (
    <aside className="hidden md:flex flex-col w-14 bg-white items-center py-3 gap-1 relative">
      <div className="flex-1 flex flex-col items-center gap-1 w-full overflow-y-auto px-1">
        {categories.map((cat) => (
          <div
            key={cat.id}
            title={cat.label}
            className="w-full flex items-center justify-center"
          >
            <CategoryButton
              id={cat.id}
              icon={cat.icon}
              label={cat.label}
              active={active === cat.id}
              onClick={() => handleClick(cat.id, cat.slug)}
            />
          </div>
        ))}
      </div>

      {/* Divider subtle (opsional) */}
      <div className="w-8 h-px bg-gray-200 my-1" />

      <div className="w-full flex items-center justify-center">
        <UserDropdown />
      </div>
    </aside>
  );
};

export default Sidebar;
