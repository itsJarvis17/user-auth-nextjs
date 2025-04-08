"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function LoginPage() {
  const [user, setUser] = useState({
    emailId: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onLogin = async (e: any) => {
    try {
      e.preventDefault();
      // Set is Loading true
      setIsLoading(true);
      //send post request
      const response = await axios.post("/api/users/login", user);

      console.log(response);
      setTimeout(() => {
        toast.success("Login successful!", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: true,
        });
      }, 1000);
      // Check if response is success
      if (response.status === 200) {
        router.push("/profiles");
      }
    } catch (error: any) {
      toast.error(`${error.response.data.message}`, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: true,
      });

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div
        className={`absolute top-1/2 left-1/2 -translate-1/2 flex flex-col border-2 border-white p-5 ${
          isLoading ? "" : "hidden"
        }`}
      >
        Loading...
        <ToastContainer />
      </div>
      <div
        className={`absolute top-1/2 left-1/2 -translate-1/2 flex flex-col border-2 border-white p-5 ${
          isLoading ? "hidden" : ""
        }`}
      >
        <h1 className="text-center text-3xl mb-4">Login</h1>
        <form
          action=""
          className="flex flex-col items-stretch justify-center gap-2 "
        >
          <hr className="text-black" />
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
            />
          </label>
          <hr className="text-black" />

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
            />
          </label>
          <hr className="text-black" />
          <button
            onClick={onLogin}
            type="submit"
            className="p-2 border-2 mb-1.5 bg-blue-500 rounded-lg"
          >
            Login
          </button>
        </form>
        <Link href="signup" className="text-center">
          Click here to signup
        </Link>
        <Link href="forgetpassword" className="text-center">
          Forget Password?
        </Link>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoginPage;
