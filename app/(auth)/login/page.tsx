"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";

interface User {
  id: number;
  email: string;
  role: string;
}

const login = () => {
  const router = useRouter();
  const token = document.cookie;

  if (token) {
    useEffect(() => {
      router.push('/profile');
    }, []); // Empty dependency array ensures the effect runs once after the initial render
  }
  
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User login successfully");
        console.log(data.user); // You can access user data here
        router.push("/profile");
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.error);
        setError(errorData.error);
        // Handle login failure, show error to the user, etc.
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };
  return (
    <div className="w-full h-full py-10 bg-[url('/images/Meteor.svg')] bg-no-repeat">
      <div className="max-w-[400px] mx-auto bg-slate-800 p-8 text-center rounded-xl">
        <div className="avtar">
          <Image
            src="/images/user.png"
            width={100}
            height={100}
            alt="Picture of the author"
            className="mx-auto my-3"
          />
        </div>
        <h2 className=" text-white font-medium text-4xl">Login</h2>
        <h3 className=" text-white font-medium text-xl mt-2">
          Welcome to Mtax
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="w-[90%] mx-auto my-6 ">
            <div className="my-3 w-60 mx-auto">
              <label className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="text"
                id="first_name"
                className="mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Example@example.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div className="my-3 w-60 mx-auto">
              <label className=" text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="text"
                id="last_name"
                className="mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="**************"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg mt-3 text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">{"Password Invalid"}</p>
          )}
        </form>

        <a href="">
          <h5 className="text-white hover:text-blue-500">Forgot Password?</h5>
        </a>
      </div>
    </div>
  );
};

export default login;
