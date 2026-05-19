/* eslint-disable @next/next/no-img-element */
export default function Pizzas() {
  return (
    <div className="flex flex-col w-fit items-center justify-center">
      <div className="space-y-14">
        <p className="text-4xl font-bold text-white font-sans ">Pizzas</p>
        <div className="grid grid-cols-3 grid-rows-2 place-items-center w-fit gap-10">
          <img src="https://placehold.co/400x350" alt="" />
          <img src="https://placehold.co/400x350" alt="" />
          <img src="https://placehold.co/400x350" alt="" />
          <img src="https://placehold.co/400x350" alt="" />
          <img src="https://placehold.co/400x350" alt="" />
        </div>
      </div>
    </div>
  );
}
