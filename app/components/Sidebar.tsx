import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import Link from "next/link";

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
    title: "Register",
    url: "/register",
  },
  {
    id: 3,
    title: "Appointment",
    url: "/appointment/manage",
  },
  {
    id: 4,
    title: "Upload Data",
    url: "/dashboard/upload_data",
  },
  {
    id: 5,
    title: "Post Blog",
    url: "/blog/post_blog",
  },
  {
    id: 6,
    title: "Manage Blog",
    url: "/blog/manage_blog",
  },
  {
    id: 7,
    title: "Support",
    url: "/support",
  },
];

const linksUser = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },

  {
    id: 2,
    title: "Dashboard",
    url: "/dashboard/",
  },
  {
    id: 3,
    title: "Chart",
    url: "/dashboard/chart",
  },
  {
    id: 4,
    title: "Employee",
    url: "/dashboard/employee",
  },
  {
    id: 5,
    title: "Compare Data",
    url: "/dashboard/compare_data",
  },
  {
    id: 6,
    title: "Support",
    url: "/support",
  },
];

const Sidebar = () => {
  const [role, setRole] = useState("");
  const token = Cookies.get("token");
  const route = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get token from cookies
    if (token) {
      try {
        const decoded: User = jwt_decode(token);
        setRole(decoded.role);
      } catch (error) {
        // If token is invalid or expired
        console.error("Invalid token:", error);
        route.push("/login"); // Redirect to login page
      }
    } else {
      route.push("/login"); // Redirect to login page if token not found
    }
  }, [route]);

  const handleLogout = () => {
    Cookies.remove("token"); // Clear the token
    setUser(null);
    route.push("/");
    localStorage.setItem("loggedOut", "true"); // Optional: similar logic can be applied for logout
  };
  // console.log("role is :" ,role)

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64">
        {/* Sidebar content */}
        <div className="p-4 ">
          <h2 className="text-xl font-bold">Menu</h2>
          {role === "admin" ? (
            <ul className="mt-4">
              {links.map((link) => (
                <li
                  key={link.id}
                  className="py-2 hover:bg-gray-700 cursor-pointer hover:rounded-md text-center"
                >
                  <Link
                    className="py-2 hover:bg-gray-700 cursor-pointer hover:rounded-md text-center"
                    key={link.id}
                    href={link.url}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Logout
              </button>
            </ul>
          ) : (
            <ul className="mt-4">
              {linksUser.map((linkUser) => (
                <li
                  key={linkUser.id}
                  className="py-2 hover:bg-gray-700 cursor-pointer hover:rounded-md text-center"
                >
                  <Link
                    className="py-2 hover:bg-gray-700 cursor-pointer hover:rounded-md text-center"
                    key={linkUser.id}
                    href={linkUser.url}
                  >
                    {linkUser.title}
                  </Link>
                </li>
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Logout
              </button>
              {/* Add more menu items as needed */}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
