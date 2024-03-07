"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const register = () => {
  
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    c_password: "",
    company_name: "",
    address: "",
    telephone: "",
    role: "user",
  });
  const [user1, setUser1] = useState({
    email: "",
    password: "",
    company_name: "",
    address: "",
    telephone: "",
    role: "",
  });
  const [checkEmail, setcheckEmail] = useState(true)
  const errorMessage = `Email "${user.email}" is already in use.`;
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  //console.log(user);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (user.password !== user.c_password) {
      setPasswordMatchError(true);
      return;
    }
    console.log(user);
    const { c_password, ...user1 } = user;
    setUser1(user1);
    console.log(user1);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user1),
      });
      
        if (response.status === 400) {
        setcheckEmail(false)
        //alert(errorMessage);
        return;
      }
      
      

      if (response.ok) {
        console.log("User registered successfully");
        router.push("/login");
      } else {
        console.error("Registration failed:", response.statusText);
        // Handle registration failure, show error to the user, etc.
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="w-full h-full py-10 bg-[url('/images/Meteor.svg')] bg-no-repeat">
      <div className="w-[60%] max-w-5xl mx-auto bg-slate-800 p-8 text-center rounded-xl">
        <div className="avtar">
          <Image
            src="/images/user.png"
            width={100}
            height={100}
            alt="Picture of the author"
            className="mx-auto my-3"
          />
        </div>
        <h2 className=" text-white font-medium text-4xl">Sign-Up</h2>
        <h3 className=" text-white font-medium text-xl mt-2">
          Welcome to Mtax
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="w-[50%] mx-auto my-6">
            <div className="my-3 w-[80%] mx-auto ">
              <label className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                id="first_name"
                className="mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Example@example.com"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                  setcheckEmail(true);
                }}
                required
              />
              <div className="error-message">
                {!checkEmail && <p className=" text-red-600">{errorMessage}</p>}
              </div>
            </div>

            <div className="my-3 w-[80%] mx-auto">
              <label className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="************"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>

            {/* Confirm Password input */}
            <div className="my-3 w-[80%] mx-auto">
              <label className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                className={`mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  passwordMatchError ? "border-red-500" : ""
                }`}
                placeholder="•••••••••"
                value={user.c_password}
                onChange={(e) => {
                  setUser({ ...user, c_password: e.target.value });
                  setPasswordMatchError(false); // Reset the error when input changes
                }}
                required
              />
              {/* Display error message */}
              {passwordMatchError && (
                <p className="text-red-500 text-sm mt-1">
                  Passwords do not match
                </p>
              )}
            </div>
            <div className="my-3 w-[80%] mx-auto ">
              <label className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Company Name
              </label>
              <input
                type="text"
                id="Company_Name"
                className="mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Example@example.com"
                value={user.company_name}
                onChange={(e) =>
                  setUser({ ...user, company_name: e.target.value })
                }
                required
              />
            </div>
            <div className="my-3 w-[80%] mx-auto ">
              <label className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <input
                type="text"
                id="large-input"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                required
              />
            </div>
            <div className="my-3 w-[80%] mx-auto ">
              <label className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Telephone
              </label>

              <input
                type="text"
                id="telephone"
                className="mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Example@example.com"
                value={user.telephone}
                onChange={(e) =>
                  setUser({ ...user, telephone: e.target.value })
                }
                required
              />
            </div>
            <div className="my-3 w-[80%] mx-auto ">
              <label className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Role
              </label>

              <select
                id="role"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option selected>Choose a country</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="text-white mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg mt-3 text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default register;
