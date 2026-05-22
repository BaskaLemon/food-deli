/* eslint-disable @next/next/no-img-element */
export default function Offer() {
  return (
    <div className="relative w-full h-150 overflow-hidden rounded-[40px] bg-[#f5f1ea] flex items-center justify-center">
      <div className="absolute inset-0 flex flex-wrap content-start text-[90px] font-extrabold uppercase leading-none opacity-10 tracking-tight select-none">
        <p className="mr-10 text-[#ff5c47]">Say Cheese</p>
        <p className="mr-10">Delivered!</p>
        <p className="mr-10 text-[#ff5c47]">Fresh</p>
        <p className="mr-10">Delivered!</p>
        <p className="mr-10 text-[#ff5c47]">Say Cheese</p>
        <p className="mr-10">Delivered!</p>
        <p className="mr-10 text-[#ff5c47]">Say Cheese</p>
        <p className="mr-10">Delivered!</p>
        <p className="mr-10 text-[#ff5c47]">Say Cheese</p>
        <p className="mr-10">Delivered!</p>
        <p className="mr-10 text-[#ff5c47]">Say Cheese</p>
        <p className="mr-10">Delivered!</p>
        <p className="mr-10 text-[#ff5c47]">Say Cheese</p>
        <p className="mr-10">Delivered!</p>
        <p className="mr-10 text-[#ff5c47]">Say Cheese</p>
        <p className="mr-10">Delivered!</p>
        <p className="mr-10 text-[#ff5c47]">Say Cheese</p>
        <p className="mr-10">Delivered!</p>
      </div>
      <div className="relative w-[95%] h-80 bg-[#0f0f13] rounded-[50px] flex items-center justify-between px-14 shadow-2xl border-b-14 border-[#ff5c47]  ">
        <div className="flex flex-col gap-5">
          <h1 className="text-white text-[80px] font-extrabold leading-none uppercase">
            Today’s
          </h1>

          <button className="bg-[#ff5c47] text-white text-[30px] font-bold px-10 py-3 rounded-full shadow-lg border-b-[6px] border-white uppercase w-fit">
            Steak Society
          </button>
        </div>
        <h1 className=" text-white text-[80px] font-extrabold uppercase leading-none">
          Offer!
        </h1>
        <img
          src="/offerFood.png"
          alt="food"
          className="absolute left-1/2 -translate-x-1/2 -bottom-105 w-265 "
        />
        <img
          src="/offerExtra.png"
          alt="cake"
          className="absolute -top-50 right-50 w-100 "
        />
        <div className="absolute top-10 right-155 text-[#ff5c47] text-[70px] font-bold ">
          +
        </div>
      </div>
    </div>
  );
}
