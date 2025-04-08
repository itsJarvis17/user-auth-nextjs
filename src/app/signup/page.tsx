"use client";
import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SignupPage() {
  const [user, setUser] = useState({
    emailId: "",
    password: "",
    fullName: "",
  });
  const router = useRouter();
  const [buttonDisbaled, setButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onSignup = async (e: any) => {
    try {
      e.preventDefault();
      // Set is Loading true
      setIsLoading(true);
      // Send the request through axios
      const response = await Axios.post("/api/users/signup", user);
      setTimeout(() => {
        toast.success("Signup successful", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: true,
        });
      }, 2000);
      if (response.status === 200) {
        toast.success("User created successfully");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while siging user", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={`absolute top-1/2 left-1/2 -translate-1/2 flex flex-col border-2 border-white p-5 ${
          isLoading ? "hidden" : ""
        }`}
      >
        <div className={`${isLoading ? "" : "hidden"}`}>
          Loading...
          <ToastContainer />
        </div>
        <h1 className="text-center text-3xl mb-4">Sign In</h1>
        <form className="flex flex-col items-stretch justify-center gap-2 ">
          <label
            htmlFor=""
            id="full-name"
            className="flex gap-2 justify-between items-center "
          >
            Full Name:
            <input
              type="text"
              id="full-name"
              className="bg-white text-black p-2 rounded-sm"
              placeholder="John Smith"
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              required={true}
            />
          </label>

          <label
            htmlFor=""
            id="email-id"
            className="flex gap-2 justify-between items-center "
          >
            Email Id:
            <input
              type="email"
              id="email-id"
              className="bg-white text-black p-2 rounded-sm"
              placeholder="abc@xyz.com"
              onChange={(e) => setUser({ ...user, emailId: e.target.value })}
              required={true}
            />
          </label>

          <label
            htmlFor=""
            id="password"
            className="flex gap-2 justify-between items-center "
          >
            Password:
            <input
              type="password"
              id="password"
              className="bg-white text-black p-2 rounded-sm"
              placeholder="Enter your password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required={true}
            />
          </label>

          <button
            onClick={onSignup}
            type="submit"
            className="p-2 border-2 mb-1.5 bg-blue-500 rounded-lg"
            disabled={buttonDisbaled}
          >
            Sign in
          </button>
        </form>
        <Link href="login" className="text-center">
          Click here to login page
        </Link>
      </div>
      <ToastContainer />
    </>
  );
}

export default SignupPage;
