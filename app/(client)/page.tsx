"use client";
import Header from "../components/Header";
import Offer from "../components/Offer";
import Footer from "../components/Footer";
import DishSection from "../components/DishSection";
import CategoryFilter from "../components/CategoryFilter";
import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useAlertStore } from "@/lib/alertStore";

export default function Home() {
  const show = useAlertStore((s) => s.show);

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

        <div id="category-1" className="w-full">
          <DishSection title="Appetizers" categoryId={1} />
        </div>
        <div id="category-2" className="w-full">
          <DishSection title="Salads" categoryId={2} />
        </div>
        <div id="category-3" className="w-full">
          <DishSection title="Pizzas" categoryId={3} />
        </div>
        <div id="category-4" className="w-full">
          <DishSection title="Lunch Favorites" categoryId={4} />
        </div>
        <div id="category-5" className="w-full">
          <DishSection title="Main Dishes" categoryId={5} />
        </div>
        <div id="category-6" className="w-full">
          <DishSection title="Side Dish" categoryId={6} />
        </div>
        <div id="category-7" className="w-full">
          <DishSection title="Brunch" categoryId={7} />
        </div>
        <div id="category-8" className="w-full">
          <DishSection title="Desserts" categoryId={8} />
        </div>
        <div id="category-9" className="w-full">
          <DishSection title="Beverages" categoryId={9} />
        </div>
        <div id="category-10" className="w-full">
          <DishSection title="Fish & Sea Foods" categoryId={10} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
