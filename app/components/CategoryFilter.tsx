"use client";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

const CATEGORY_ICONS: Record<string, string> = {
  Appetizers: "🥗",
  Salads: "🥙",
  Pizzas: "🍕",
  "Lunch favorites": "🥪",
  "Main dishes": "🍖",
  "Side dish": "🍟",
  Brunch: "🍳",
  Desserts: "🍰",
  Beverages: "🥤",
  "Fish & Sea foods": "🐟",
};

export default function CategoryFilter() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const handleSelect = (id: number | null) => {
    setSelected(id);
    if (id === null) {
      document.getElementById("all")?.scrollIntoView({ behavior: "smooth" });
    } else {
      document
        .getElementById(`category-${id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full px-10 py-8">
      <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4 text-center">
        Browse by category
      </p>
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap">
        <button
          onClick={() => handleSelect(null)}
          className={`shrink-0 flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
            selected === null
              ? "bg-white text-black shadow-lg scale-105"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <span className="text-2xl">🍽️</span>
          <span className="text-xs">All</span>
        </button>
        <div className="w-px h-10 bg-white/20 shrink-0" />

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`shrink-0 flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
              selected === cat.id
                ? "bg-white text-black shadow-lg scale-105"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <span className="text-2xl">{CATEGORY_ICONS[cat.name] ?? "🍴"}</span>
            <span className="text-xs whitespace-nowrap">{cat.name}</span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <p className="text-center text-white/40 text-xs mt-4">
          Showing{" "}
          <span className="text-white font-semibold">
            {categories.find((c) => c.id === selected)?.name}
          </span>
        </p>
      )}
    </div>
  );
}
