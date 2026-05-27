"use client";
import Header from "../components/Header";
import Offer from "../components/Offer";
import Footer from "../components/Footer";
import DishSection from "../components/DishSection";
import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useAlertStore } from "@/lib/alertStore";

export default function Home() {
  const show = useAlertStore((s) => s.show);
  return (
    <div className="realtive flex flex-col justify-center items-center gap-22 w-screen h-fit bg-neutral-600 font-sans">
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
      <div className="container flex flex-col items-center gap-13.5">
        <DishSection title="Appetizers" categoryId={1} />
        <DishSection title="Lunch Favorites" categoryId={4} />
        <DishSection title="Main Dishes" categoryId={5} />
        <DishSection title="Desserts" categoryId={8} />
        <DishSection title="Beverages" categoryId={9} />
      </div>
      <Footer />
    </div>
  );
}
