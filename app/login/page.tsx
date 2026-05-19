import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex items-center w-screen h-screen">
      <div className="container w-[40%] flex justify-center ">
        <div className="flex flex-col gap-7 w-[50%] ">
          <Link
            href={"/"}
            className="flex w-8 h-8 border border-stone-200 rounded-md justify-center items-center hover:scale-105 transition-transform"
          >
            <img src={"./Vector.svg"} />
          </Link>
          <div>
            <p className="text-2xl font-bold ">Create your account</p>
            <p className="text-gray-400">
              Sign up to explore your favorite dishes.
            </p>
          </div>
          <input
            type="text"
            placeholder="Enter your email address"
            className="border border-stone-300 rounded-md w-full p-2 "
          />
          <button className="bg-black text-white rounded-md p-2">
            Let's go
          </button>
          <div className="flex gap-3 justify-center">
            <p>Already have an account?</p>
            <Link href={"./create"} className="text-blue-400 hover:opacity-60">
              Log in
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[60%] h-[90%] p-10">
        <img className="rounded-4xl h-full  " src={"./food-bike.jpg"} />
      </div>
    </div>
  );
}
