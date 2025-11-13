// src/lib/searchData.ts

import { categories } from "../components/toolsMap";

export type SearchableItem = {
  id: string;
  name: string;
  description: string;
  slug: string;
  category: string;
  icon: React.ReactNode;
};

// Flatten semua tools jadi satu array
export const searchableItems: SearchableItem[] = categories
  .flatMap((cat) =>
    (cat.tools || []).map((tool) => ({
      id: tool.slug,
      name: tool.name,
      description: tool.description,
      slug: tool.slug,
      category: cat.label,
      icon: tool.icon,
    }))
  )
  .filter((item) => item.name.trim() !== ""); // hindari empty
