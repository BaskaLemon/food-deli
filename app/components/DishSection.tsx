"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

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
};

export default function DishSection({ title, categoryId }: Props) {
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    fetch(`/api/dishes?category_id=${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDishes(data);
        } else if (Array.isArray(data.dishes)) {
          setDishes(data.dishes);
        } else {
          setDishes([]);
        }
      });
  }, [categoryId]);

  if (dishes.length === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full px-10 py-16">
      <div className="w-full max-w-375 flex flex-col gap-14">
        <div className="flex items-center justify-between">
          <p className="text-5xl font-extrabold text-white tracking-tight">
            {title}
          </p>

          <button className="text-white border border-white/30 px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-200">
            View all
          </button>
        </div>

        <div className="grid grid-cols-3 gap-10">
          {dishes.slice(0, 3).map((dish) => (
            <Link
              href={"./FoodDetailSheet"}
              key={dish.id}
              className="group bg-white rounded-[30px] p-5 flex flex-col gap-5 shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={dish.image_url}
                  alt={dish.name}
                  className="w-full h-87.5 object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
              <button className="mt-auto bg-black text-white py-3 rounded-xl font-semibold hover:bg-[#ff5c47] transition-colors duration-200">
                Add to cart
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
