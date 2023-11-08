"use client";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";



interface User {
  id: number;
  email: string;
  role: string;
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


  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    
    if (token) {
      const decodedToken = jwt_decode(token) as User;
      setUser(decodedToken);
      console.log(token)

    }
    
  },[]);

  const handleLogout = () => {
    // Clear the token by setting its expiration to the past
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null); // Reset the user state to null after logout
    route.push("/");
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
                  
                  <span className="text-gray-900 mr-2"><Link href={"/profile"}>Admin:{user.email}</Link></span>
                ) : (
                  <span className="text-gray-900 mr-2">User:{user.email}</span>
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
