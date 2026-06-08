"use client";
import Link from "next/link";
import { useState } from "react";
import DishSectionSkeleton from "./DishSectionSkeleton";
import { useAlertStore } from "@/lib/alertStore";
import { addToCart } from "@/lib/cart";

/* eslint-disable @next/next/no-img-element */

type Dish = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
};

type Props = {
  title: string;
  categoryId: number;
  dishes: Dish[];
  loading: boolean;
};

export default function DishSection({
  title,
  categoryId,
  dishes,
  loading,
}: Props) {
  const [selected, setSelected] = useState<Dish | null>(null);
  const [quantity, setQuantity] = useState(1);
  const trigger = useAlertStore((s) => s.trigger);

  const openDish = (dish: Dish) => {
    setSelected(dish);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (!selected) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: selected.id,
        name: selected.name,
        price: Number(selected.price),
        image_url: selected.image_url,
      });
    }
    trigger();
    setSelected(null);
  };

  if (loading) return <DishSectionSkeleton />;
  if (dishes.length === 0) return null;

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full px-10 py-16">
        <div className="w-full max-w-375 flex flex-col gap-14">
          <div className="flex items-center justify-between mb-5">
            <p className="text-5xl font-extrabold text-white tracking-tight">
              {title}
            </p>
            <Link
              href={`/category/${categoryId}`}
              className="text-white border border-white/30 px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-200"
            >
              View all
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-10">
          {dishes.slice(0, 6).map((dish) => (
            <div
              key={dish.id}
              onClick={() => openDish(dish)}
              className="group bg-white rounded-[30px] p-5 flex flex-col gap-5 shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={dish.image_url || "https://placehold.co/600x400"}
                  alt={dish.name}
                  className="w-full h-87.5 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      id: dish.id,
                      name: dish.name,
                      price: Number(dish.price),
                      image_url: dish.image_url,
                    });
                    trigger();
                  }}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center mt-auto bg-white text-black py-3 text-2xl font-bold z-10 hover:bg-[#ff5c47] transition-colors duration-200"
                >
                  +
                </button>
              </div>
              <div className="flex flex-col gap-3 px-1">
                <div className="flex items-start justify-between">
                  <p className="text-[22px] font-bold text-[#ff5c47]">
                    {dish.name}
                  </p>
                  <p className="text-black text-[20px] font-extrabold">
                    ${dish.price}
                  </p>
                </div>
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  {dish.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSelected(null)}
        />
      )}
      {selected && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-3xl shadow-2xl w-full max-w-2xl flex overflow-hidden">
          <div className="w-[45%] shrink-0 p-5">
            <img
              src={selected.image_url || "https://placehold.co/400x400"}
              alt={selected.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="flex-1 p-8 flex flex-col justify-between">
            <div className="flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              <h2 className="text-2xl font-black text-[#ff5c47]">
                {selected.name}
              </h2>
              <p className="text-gray-500 leading-relaxed text-sm">
                {selected.description}
              </p>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    Total price
                  </p>
                  <p className="text-2xl font-black text-gray-900">
                    ${(Number(selected.price) * quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-xl font-bold"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-black text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white rounded-2xl py-4 font-bold text-base hover:bg-gray-800 transition-colors"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
