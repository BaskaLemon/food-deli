/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "next/navigation";
import { addToCart } from "@/lib/cart";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CategoryPageSkeleton from "@/app/components/CategoryPageSkeleton";
import { useAlertStore } from "@/lib/alertStore";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

type Dish = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
};

export default function CategoryPage() {
  const { id } = useParams();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [catName, setCatName] = useState("");
  const [selected, setSelected] = useState<Dish | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const trigger = useAlertStore((s: { trigger: any }) => s.trigger);
  const show = useAlertStore((s: { show: any }) => s.show);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    Promise.all([
      fetch(`/api/dishes?category_id=${id}`).then((res) => res.json()),
      fetch("/api/categories").then((res) => res.json()),
    ]).then(([dishesData, catsData]) => {
      setDishes(dishesData);
      const cat = catsData.find((c: any) => c.id === Number(id));
      if (cat) setCatName(cat.name);
      setLoading(false);
    });
  }, [id]);

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

  if (loading) return <CategoryPageSkeleton />;

  return (
    <div className="min-h-screen bg-neutral-600 space-y-20">
      <Header />

      <div className="max-w-7xl mx-auto">
        {show && (
          <Alert className="alert-fade fixed z-50 left-1/2 -translate-x-1/2 top-15 max-w-md bg-black text-white border border-white">
            <CheckCircle2Icon />
            <AlertTitle>Food has been added to the cart!</AlertTitle>
          </Alert>
        )}
        <div className="flex items-center gap-6 mb-10">
          <button
            onClick={() => window.history.back()}
            className="bg-white text-black py-2 px-6 rounded-xl font-bold hover:bg-gray-200 transition-all shadow-md"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight">
            {catName}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-4xl p-4 shadow-sm hover:shadow-xl transition-all group cursor-pointer border border-gray-100 hover:scale-105"
              onClick={() => openDish(dish)}
            >
              <div className="relative h-48 w-full rounded-3xl overflow-hidden mb-4">
                <img
                  src={dish.image_url || "https://placehold.co/600x400"}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                  className="absolute bottom-3 right-3 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-[#ff5c47] transition-colors duration-200"
                >
                  <span className="text-black text-2xl font-bold">+</span>
                </button>
              </div>

              <div className="px-1">
                <h3 className="text-black font-bold text-lg mb-1">
                  {dish.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="font-black text-red-500 text-xl">
                    ₮{Number(dish.price).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-400 text-[10px] mt-2 line-clamp-2">
                  {dish.description || "Delicious food."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {mounted &&
        selected &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelected(null)}
            />
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
                        ₮{(Number(selected.price) * quantity).toLocaleString()}
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
          </>,
          document.body,
        )}
    </div>
  );
}
