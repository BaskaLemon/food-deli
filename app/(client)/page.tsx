/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Offer from "../components/Offer";
import Footer from "../components/Footer";
import DishSection from "../components/DishSection";
import CategoryFilter from "../components/CategoryFilter";
import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useAlertStore } from "@/lib/alertStore";

type Dish = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
  category_id: number;
};

const CATEGORIES = [
  { id: 1, title: "Appetizers" },
  { id: 2, title: "Salads" },
  { id: 3, title: "Pizzas" },
  { id: 4, title: "Lunch Favorites" },
  { id: 5, title: "Main Dishes" },
  { id: 6, title: "Side Dish" },
  { id: 7, title: "Brunch" },
  { id: 8, title: "Desserts" },
  { id: 9, title: "Beverages" },
  { id: 10, title: "Fish & Sea Foods" },
];

export default function Home() {
  const show = useAlertStore((s: { show: any }) => s.show);
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dishes")
      .then((r) => r.json())
      .then((data) => {
        setAllDishes(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center gap-22 w-screen h-fit bg-neutral-600 font-sans">
      {show && (
        <Alert className="alert-fade fixed z-50 top-15 max-w-md bg-black text-white border border-white">
          <CheckCircle2Icon />
          <AlertTitle>Food has been added to the cart!</AlertTitle>
        </Alert>
      )}

      <div className="w-full">
        <Header />
        <Offer />
      </div>

      <div id="all" className="container flex flex-col items-center gap-13.5">
        <CategoryFilter />

        {CATEGORIES.map((cat) => (
          <div key={cat.id} id={`category-${cat.id}`} className="w-full">
            <DishSection
              title={cat.title}
              categoryId={cat.id}
              dishes={allDishes.filter((d) => d.category_id === cat.id)}
              loading={loading}
            />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
