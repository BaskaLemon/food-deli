/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react"; // useEffect нэмсэн
import { addToCart } from "@/lib/cart";

type Dish = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

type Props = {
  dish: Dish | null;
  onClose: () => void;
};

export default function FoodDetailSheet({ dish, onClose }: Props) {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (dish) {
      setQty(1);
    }
  }, [dish?.id]);

  if (!dish) return null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: dish.id,
        name: dish.name,
        price: Number(dish.price),
        image_url: dish.image,
      });
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4xl overflow-hidden flex shadow-2xl w-160 max-w-[95vw] h-85"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative shrink-0 w-65">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-7 py-6 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-black transition-all text-lg font-bold"
          >
            ×
          </button>

          {/* Title */}
          <h2 className="text-[28px] font-extrabold text-[#E74C3C] pr-10 leading-tight">
            {dish.name}
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-sm mt-3 leading-relaxed line-clamp-4">
            {dish.description}
          </p>

          <div className="flex-1" />

          {/* Bottom section */}
          <div className="flex items-end justify-between mb-5">
            {/* Price */}
            <div className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Total price
              </p>

              <p className="text-3xl font-extrabold text-gray-900">
                ${(Number(dish.price) * qty).toFixed(2)}
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 bg-gray-100 rounded-full px-4 py-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="text-[#E74C3C] text-2xl font-bold hover:scale-110 transition-transform"
              >
                −
              </button>

              <span className="font-bold text-lg text-gray-900 min-w-5 text-center">
                {qty}
              </span>

              <button
                onClick={() => setQty((q) => q + 1)}
                className="text-[#E74C3C] text-2xl font-bold hover:scale-110 transition-transform"
              >
                +
              </button>
            </div>
          </div>

          {/* Add button */}
          <button
            onClick={handleAdd}
            className="w-full bg-gray-900 hover:bg-[#E74C3C] active:scale-[0.98] text-white py-3 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
