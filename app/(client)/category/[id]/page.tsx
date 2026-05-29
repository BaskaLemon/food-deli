/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);
  const trigger = useAlertStore((s) => s.trigger);
  const show = useAlertStore((s) => s.show);

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
  if (loading) return <CategoryPageSkeleton />;
  return (
    <div className="min-h-screen bg-neutral-600 space-y-20  ">
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
              onClick={() => setSelected(dish)}
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
                <h3 className="text-black font-bold text-lg mb-1 ">
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
    </div>
  );
}
