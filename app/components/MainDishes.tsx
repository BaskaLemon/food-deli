export default function MainDishes() {
  return (
    <div className="flex flex-col w-fit items-center justify-center">
      <div className="space-y-14">
        <p className="text-4xl font-bold text-white font-sans ">Main dishes</p>
        <div className="grid grid-cols-3 place-items-center w-fit gap-10">
          <img src="https://placehold.co/400x350" />
          <img src="https://placehold.co/400x350" />
          <img src="https://placehold.co/400x350" />
        </div>
      </div>
    </div>
  );
}
