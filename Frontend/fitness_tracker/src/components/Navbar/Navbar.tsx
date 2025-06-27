"use client";

import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "../../app/assets/Logo_even_smaller.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useMediaQuery from "../../app/hooks/useMedia";

const NavBar = () => {
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();

  // SSR-safe rendering
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!hasMounted) return null;

  return (
    <nav>
      <div className={`${flexBetween} bg-primary-100 fixed top-0 z-40 w-full py-6 drop-shadow`}>
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            <Image className="mx-auto" src={Logo} alt="logo" />

            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full`}>
                <div className={`${flexBetween} gap-8 text-sm text-gray-500`}>
                  <Link href="/myhome">Home</Link>
                  <Link href="/workouts">Workouts</Link>
                  <Link href="/diary">Diary</Link>
                  <Link href="/history">My Journey</Link>
                </div>

                <div className="relative flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center text-sm font-bold"
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  >
                    U
                  </div>

                  {isProfileMenuOpen && (
                    <div className="absolute top-14 right-0 bg-white border rounded shadow-md py-2 w-40 z-50">
                      <button
                        className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router.push("/profile");
                        }}
                      >
                        View Profile
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                        onClick={handleLogout}
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                className="rounded-full bg-secondary-500 p-2"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <Bars3Icon className="h-6 w-6 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          <div className="ml-[33%] flex flex-col gap-10 text-2xl">
            <Link href="/myhome">Home</Link>
            <Link href="/workouts">Workouts</Link>
            <Link href="/diary">Diary</Link>
            <Link href="/history">My Journey</Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 transition duration-200"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
