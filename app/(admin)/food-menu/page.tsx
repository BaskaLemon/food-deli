"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */

type Category = {
  id: number;
  name: string;
};

type Dish = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
  category_id: number;
};

export default function FoodMenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/dishes").then((r) => r.json()),
    ]).then(([cats, dishs]) => {
      setCategories(cats);
      setDishes(dishs);
      setLoading(false);
    });
  }, []);

  const filteredDishes = selected
    ? dishes.filter((d) => d.category_id === selected)
    : dishes;

  const dishesByCategory = categories.map((cat) => ({
    ...cat,
    dishes: dishes.filter((d) => d.category_id === cat.id),
  }));

  const visibleCategories =
    selected !== null
      ? dishesByCategory.filter((c) => c.id === selected)
      : dishesByCategory;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-44 border-r border-gray-100 flex flex-col gap-2 p-4 pt-6 bg-white">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <img src="/app-logo.svg" alt="" />

          <div>
            <p className="font-black text-sm">NomNom</p>
            <p className="text-xs text-gray-400">Swift delivery</p>
          </div>
        </Link>
        <button className="flex items-center gap-2 text-sm text-white px-3 py-2 rounded-lg bg-gray-900 font-medium">
          <span>⊞</span> Food menu
        </button>
        <Link
          href={"/admin"}
          className="flex items-center gap-2 text-sm text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-50"
        >
          <span>🚚</span> Orders
        </Link>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100">
          <h1 className="text-xl font-black mb-4">Dishes category</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelected(null)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                selected === null
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              All Dishes
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  selected === null
                    ? "bg-white text-black"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {dishes.length}
              </span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelected(cat.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  selected === cat.id
                    ? "bg-black text-white border-black"
                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {cat.name}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    selected === cat.id
                      ? "bg-white text-black"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {dishes.filter((d) => d.category_id === cat.id).length}
                </span>
              </button>
            ))}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors text-lg font-bold">
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse"
                >
                  <div className="h-6 w-40 bg-gray-100 rounded mb-6" />
                  <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="rounded-2xl overflow-hidden">
                        <div className="h-36 bg-gray-100" />
                        <div className="p-3 space-y-2">
                          <div className="h-4 bg-gray-100 rounded w-3/4" />
                          <div className="h-3 bg-gray-100 rounded w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : visibleCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100"
                >
                  <h2 className="text-lg font-black mb-5">
                    {cat.name}{" "}
                    <span className="text-gray-400 font-normal text-base">
                      ({cat.dishes.length})
                    </span>
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <button className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-red-300 p-6 hover:border-red-400 hover:bg-red-50 transition-all min-h-50">
                      <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-2xl font-bold">
                        +
                      </div>
                      <p className="text-sm text-gray-500 text-center font-medium">
                        Add new Dish to {cat.name}
                      </p>
                    </button>
                    {cat.dishes.map((dish) => (
                      <div
                        key={dish.id}
                        className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="relative">
                          <img
                            src={
                              dish.image_url || "https://placehold.co/400x200"
                            }
                            alt={dish.name}
                            className="w-full h-36 object-cover"
                          />
                          <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow hover:bg-red-50 transition-colors">
                            <span className="text-red-500 text-sm">✏️</span>
                          </button>
                        </div>
                        <div className="p-3">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-sm font-bold text-red-500 leading-tight">
                              {dish.name}
                            </p>
                            <p className="text-sm font-black text-gray-800 whitespace-nowrap">
                              ${Number(dish.price).toFixed(2)}
                            </p>
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                            {dish.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
        </div>
      </main>
    </div>
  );
}
