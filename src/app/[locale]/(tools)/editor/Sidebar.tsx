"use client";

import CategoryButton from "./CategoryButton";
import { categories } from "./tools/toolsMap";
import UserDropdown from "../UserDropdown";
import { useRouter } from "next/navigation";

interface Props {
  active: string | null;
  handleClick: (id: string) => void; // untuk kategori tanpa slug
}

const Sidebar = ({ active, handleClick }: Props) => {
  const router = useRouter();

  const handleCategoryClick = (catId: string, slug?: string) => {
    if (slug) {
      router.push(`/${slug}`); // langsung redirect jika ada slug
    } else {
      handleClick(catId); // toggle active untuk kategori dengan tools
    }
  };

  return (
    <aside className="hidden md:flex flex-col w-16 bg-white border-r border-gray-200 items-center py-4 gap-3 relative">
      <div className="flex-1 flex flex-col items-center gap-3 overflow-y-auto w-full">
        {categories.map((cat) => (
          <CategoryButton
            key={cat.id}
            id={cat.id}
            icon={cat.icon}
            label={cat.label}
            active={active === cat.id}
            onClick={() => handleCategoryClick(cat.id, cat.slug)}
          />
        ))}
      </div>

      <div className="w-full border-t border-gray-200 mt-2" />
      <UserDropdown />
    </aside>
  );
};

export default Sidebar;
