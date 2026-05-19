import Image from "next/image";
import Login from "./create/page";
import Header from "./components/Header";
import Offer from "./components/Offer";
import Appetizers from "./components/Appetizers";
import Salads from "./components/Salads";
import Footer from "./components/Footer";
import Pizzas from "./components/Pizzas";
import MainDishes from "./components/MainDishes";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-22  w-fit h-fit bg-neutral-600">
      <div>
        <Header />
        <Offer />
      </div>
      <div className="container flex flex-col items-center gap-13.5">
        <Appetizers />
        <Salads />
        <Pizzas />
        <MainDishes />
      </div>
      <Footer />
    </div>
  );
}
