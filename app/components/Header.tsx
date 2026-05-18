export default function Header() {
  return (
    <div className="bg-black flex justify-center items-center w-full ">
      <div className="flex justify-between p-4 w-[90%]">
        <div className="flex gap-2.5 items-center">
          <img src={"./app-logo.svg"} />
          <div>
            <div className="flex text-2xl">
              <p className="text-white">Nom</p>
              <p className="text-red-500">Nom</p>
            </div>
            <p className="text-white">Swift delivery</p>
          </div>
        </div>
        <div className="flex gap-2.5 items-center">
          <button className="bg-white rounded-2xl p-2">Sign up</button>
          <button className="bg-red-500 text-white rounded-2xl p-2">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
