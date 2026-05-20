/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-black w-full h-fit flex flex-col gap-20 items-center">
      <div className="bg-red-500 w-screen h-20 mt-20 flex text-white text-4xl items-center justify-center gap-20 overflow-hidden">
        <p>Fresh fast delivered </p>
        <p>Fresh fast delivered </p>
        <p>Fresh fast delivered </p>
        <p>Fresh fast delivered </p>
        <p>Fresh fast delivered </p>
      </div>
      <div className="text-white w-[70%] flex justify-between">
        <Link href={"./"} className="gap-2.5 items-center">
          <img className="self-center" src={"./app-logo.svg"} alt="" />
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
          <div className="flex gap-40">
            <div className="space-y-2">
              <p className="text-stone-500">MENU</p>
              <p>Appetizers</p>
              <p>Salads</p>
              <p>Pizzas</p>
              <p>Main dishes</p>
              <p>Desserts</p>
            </div>
            <div className="space-y-2">
              <p className="text-black">BOO</p>
              <p>Side dish</p>
              <p>Brunch</p>
              <p>Desserts</p>
              <p>Beverages</p>
              <p>Fish and Sea food</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-stone-500">FOLLOW US</p>
            <div className="flex gap-5">
              <img className="w-8 h-8" src={"./fb-logo.png"} alt="" />
              <img className="w-8 h-8" src={"./ig-logo.png"} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex text-stone-500 w-[70%] gap-15 border-t border-stone-500 py-10">
        <p>Copy right 2024 © Nomnom LLC</p>
        <p>Privacy policy </p>
        <p>Terms and conditoin</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
}
