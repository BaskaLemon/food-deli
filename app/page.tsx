import Header from "./components/Header";
import Offer from "./components/Offer";
import Footer from "./components/Footer";
import DishSection from "./components/DishSection";
import FoodDetailSheet from "./components/FoodDetailSheet";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-22 w-screen h-fit bg-neutral-600">
      <div className="w-full">
        <Header />
        <Offer />
      </div>
      <div className="container flex flex-col items-center gap-13.5">
        <DishSection title="Appetizers" categoryId={1} />
        <DishSection title="Salads" categoryId={2} />
        <DishSection title="Pizzas" categoryId={3} />
        <DishSection title="Lunch Favorites" categoryId={4} />
        <DishSection title="Main Dishes" categoryId={5} />
        <DishSection title="Side Dish" categoryId={6} />
        <DishSection title="Brunch" categoryId={7} />
        <DishSection title="Desserts" categoryId={8} />
        <DishSection title="Beverages" categoryId={9} />
        <DishSection title="Fish & Sea Foods" categoryId={10} />
      </div>
      <FoodDetailSheet />
      <Footer />
    </div>
  );
}
