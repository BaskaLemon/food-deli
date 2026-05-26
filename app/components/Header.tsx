/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  email: string;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const stored = localStorage.getItem("user");
    if (token && stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    router.push("/");
  }

  return (
    <div className="bg-black flex justify-center items-center w-full">
      <div className="flex justify-between p-4 w-[90%]">
        <Link href="/" className="flex gap-2.5 items-center">
          <img src="/app-logo.svg" alt="NomNom logo" />
          <div>
            <div className="flex text-2xl">
              <p className="text-white">Nom</p>
              <p className="text-red-500">Nom</p>
            </div>
            <p className="text-white text-sm">Swift delivery</p>
          </div>
        </Link>

        {user ? (
          <div className="flex gap-4 items-center">
            <button className="flex items-center gap-2 border bg-white rounded-full px-4 py-2  text-sm hover:bg-gray-200 transition-colors">
              <svg
                className="w-4 h-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>
                <span className="text-red-500 font-medium">
                  Delivery address
                </span>
                : Add Location
              </span>
              <svg
                className="w-4 h-4 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <Link
              href="/cart"
              className="relative p-2 bg-white rounded-full border border-white/20 hover:bg-gray-200 transition-colors"
            >
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute w-fit right-0 mt-2  bg-white rounded-xl shadow-lg py-2 z-50">
                  <p className="px-4 py-2 text-sm text-gray-800 font-medium border-b border-gray-100">
                    {user.email}
                  </p>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link
              href="/sign-up"
              className="bg-white rounded-2xl px-4 py-2 text-sm font-medium hover:scale-105 transition-transform"
            >
              Sign up
            </Link>
            <Link
              href="/sign-in"
              className="bg-red-500 text-white rounded-2xl px-4 py-2 text-sm font-medium hover:scale-105 transition-transform"
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
