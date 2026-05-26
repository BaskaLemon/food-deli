"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
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
};

export default function DishSection({ title, categoryId }: Props) {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const trigger = useAlertStore((s) => s.trigger);

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
        setLoading(false);
      });
  }, [categoryId]);
  if (loading) return <DishSectionSkeleton />;
  if (dishes.length === 0) return null;

  return (
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
            className="group bg-white rounded-[30px] p-5 flex flex-col gap-5 shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <div className=" relative overflow-hidden rounded-3xl">
              <img
                src={dish.image_url || "https://placehold.co/600x400"}
                alt={dish.name}
                className="w-full h-87.5 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={() => {
                  addToCart({
                    id: dish.id,
                    name: dish.name,
                    price: Number(dish.price),
                    image_url: dish.image_url,
                  });
                  trigger();
                }}
                className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center  mt-auto bg-white text-black py-3 text-2xl font-bold z-10 hover:bg-[#ff5c47] transition-colors duration-200 "
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
  );
}
