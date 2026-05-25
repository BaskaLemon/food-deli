/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-black w-full h-fit flex flex-col gap-20 items-center">
      <div className="bg-red-500 w-full h-20 mt-20 overflow-hidden">
        <div className="flex w-max items-center gap-20 text-white text-4xl h-full animate-scroll">
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
          <p>Fresh fast delivered</p>
        </div>
      </div>
      <div className="text-white w-[70%] flex justify-between space-x-8">
        <Link href={"./"} className="gap-2.5 items-center">
          <img className="self-center" src="/app-logo.svg" alt="" />
          <div>
            <div className="flex text-2xl">
              <p className="text-white">Nom</p>
              <p className="text-red-500">Nom</p>
            </div>
            <p className="text-white">Swift delivery</p>
          </div>
        </Link>
        <div className="flex gap-40">
          <div className="space-y-2">
            <p className="text-stone-500">NOMNOM</p>
            <p>Home</p>
            <p>Contact us</p>
            <p>Delivery zone</p>
          </div>
          <div className="space-y-2 flex flex-col">
            <p className="text-stone-500">MENU</p>

            <Link
              href={`/category/1`}
              className="hover:text-red-500 transition-colors"
            >
              Appetizers
            </Link>

            <Link
              href={`/category/2`}
              className="hover:text-red-500 transition-colors"
            >
              Salads
            </Link>

            <Link
              href={`/category/3`}
              className="hover:text-red-500 transition-colors"
            >
              Pizzas
            </Link>

            <Link
              href={`/category/4`}
              className="hover:text-red-500 transition-colors"
            >
              Lunch Favorites
            </Link>

            <Link
              href={`/category/5`}
              className="hover:text-red-500 transition-colors"
            >
              Main dishes
            </Link>
          </div>

          <div className="space-y-2 flex flex-col">
            <p className="text-black">BOO</p>

            <Link
              href={`/category/6`}
              className="hover:text-red-500 transition-colors"
            >
              Side dish
            </Link>

            <Link
              href={`/category/7`}
              className="hover:text-red-500 transition-colors"
            >
              Brunch
            </Link>

            <Link
              href={`/category/8`}
              className="hover:text-red-500 transition-colors"
            >
              Desserts
            </Link>

            <Link
              href={`/category/9`}
              className="hover:text-red-500 transition-colors"
            >
              Beverages
            </Link>

            <Link
              href={`/category/10`}
              className="hover:text-red-500 transition-colors"
            >
              Fish and Sea food
            </Link>
          </div>
          <div className="space-y-2">
            <p className="text-stone-500">FOLLOW US</p>
            <div className="flex gap-5">
              <img className="w-8 h-8" src="/fb-logo.png" alt="" />
              <img className="w-8 h-8" src="/ig-logo.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex text-stone-500 w-[70%] gap-15 border-t border-stone-500 py-10">
        <p>Copy right 2024 © Nomnom LLC</p>
        <p>Privacy policy </p>
        <p>Terms and condition</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
}
