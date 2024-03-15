"use client";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";

interface User {
  id: number;
  email: string;
  role: string;
}

function Profile() {
  const route = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get("token"); // Get token from cookies
    if (token) {
      try {
        const decoded: User = jwt_decode(token);
        setUser(decoded);
        console.log(decoded);
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
    // Clear the token
    Cookies.remove("token"); // Use js-cookie or similar library
    setUser(null);
    route.push("/");
  };

  if (user) {
    if (user.role === "admin") {
      return (
        <>
          <Navbar />
          <div>
            <div>Welcome Admin : {user.email}!</div>
            <div className="my-5">
              <Link
                className="bg-blue-500 mx-4 hover:bg-blue-700  py-2 px-4 rounded-xl text-white text-l font-medium"
                href="/register"
              >
                Register
              </Link>
              <Link
                className="bg-blue-500 mx-4 hover:bg-blue-700  py-2 px-4 rounded-xl text-white text-l font-medium"
                href="/appointment/manage"
              >
                Appointment Manange
              </Link>
              <Link
                className="bg-blue-500 mx-4 hover:bg-blue-700  py-2 px-4 rounded-xl text-white text-l font-medium"
                href="/blog/post_blog"
              >
                Post-blog
              </Link>
              <Link
                className="bg-blue-500 mx-4 hover:bg-blue-700  py-2 px-4 rounded-xl text-white text-l font-medium"
                href="/blog/manage_blog"
              >
                Manage-blog
              </Link>
              <Link
                className="bg-blue-500 mx-4 hover:bg-blue-700  py-2 px-4 rounded-xl text-white text-l font-medium"
                href="/dashboard/admin_db"
              >
                Dashboard
              </Link>
            </div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      );
    } else {
      return (
        <div>
          <div>Welcome user: {user.email}!</div>
          <button onClick={handleLogout}>Logout</button>
          {/* Render other authenticated user content */}
        </div>
      );
      // Render user components or redirect to user-specific pages
    }
  } 
}

export default Profile;
