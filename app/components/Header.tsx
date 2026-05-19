import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-black flex justify-center items-center w-full ">
      <div className="flex justify-between p-4 w-[90%]">
        <Link href={"./"} className="flex gap-2.5 items-center">
          <img src={"./app-logo.svg"} />
          <div>
            <div className="flex text-2xl">
              <p className="text-white">Nom</p>
              <p className="text-red-500">Nom</p>
            </div>
            <p className="text-white">Swift delivery</p>
          </div>
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            href={"./create"}
            className="bg-white rounded-2xl p-2 hover:scale-105 transition-transform"
          >
            Sign up
          </Link>
          <Link
            href={"./login"}
            className="bg-red-500 text-white rounded-2xl p-2 hover:scale-105 transition-transform"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
