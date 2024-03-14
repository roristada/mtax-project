"use client";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface User {
  id: number;
  email: string;
  role: string;
  exp: string;
}

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "About",
    url: "/about",
  },
  {
    id: 3,
    title: "Services",
    url: "/Services",
  },
  {
    id: 4,
    title: "Knowledge",
    url: "/blog",
  },
  {
    id: 5,
    title: "Contact",
    url: "/Contact",
  },
  {
    id: 6,
    title: "Appointment",
    url: "/appointment",
  },
];

const Navbar = () => {
  const route = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isClient, setIsClient] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    setIsClient(true);
    if (token) {
      try {
        const decoded: User = jwt_decode(token);
        const isExpired = Date.parse(decoded.exp) < Date.now();
        setUser(decoded);

        if (isExpired) {
          Cookies.remove("token");
          route.push("/login");
        }
      } catch (error) {
        // If token is invalid or expired
        console.error("Invalid token:", error);
        route.push("/login"); // Redirect to login page
      }
    }
  }, [route, token]);

  const handleLogout = () => {
    Cookies.remove("token"); // Clear the token
    setUser(null);
    route.push("/");
    localStorage.setItem("loggedOut", "true"); // Optional: similar logic can be applied for logout
  };

  return (
    <nav className=" bg-white border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-5">
        <Link className="text-2xl font-medium" href="/">
          Mtax
        </Link>
        <div className="hidden. w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
            {links.map((link) => (
              <li key={link.id} className="my-auto">
                <Link
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  key={link.id}
                  href={link.url}
                >
                  {link.title}
                </Link>
              </li>
            ))}

            {user ? (
              <li className="my-auto">
                {user.role === "admin" ? (
                  <span className="text-gray-900 mr-2">
                    <Link href={"/profile"}>Admin:{user.email}</Link>
                  </span>
                ) : (
                  <Link href={"/dashboard"}>
                    <span className="text-gray-900 mr-2">
                      User:{user.email}
                    </span>
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="my-auto">
                <Link href={"/login"}>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 "
                  >
                    Login
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
