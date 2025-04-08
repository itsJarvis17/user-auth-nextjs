"use client";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// Create a page component for forget password
// Create an API for forget password
// As soon as someone clicks on button send an axios request to send mail
// With token and save same token into db
// On a new page verify token new password and confirm password
// Based on this validate token and update password field encrypt and save it
// Return response to user
function page() {
  const [emailId, setEmailId] = useState("");

  const onResetClick = async () => {
    try {
      // Send Email to the user with reset link
      await axios.post("/api/users/forgetpassword", {
        emailId,
      });
      setTimeout(() => {
        toast.success("Signup successful", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: true,
        });
      }, 2000);
    } catch (error: any) {
      toast.error(`${error.response.data.message}`, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: true,
      });
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center border-2 p-4">
        <h1 className="text-2xl m-1 p-1">Forget Password?</h1>
        <p>Don't worry we will help you to reset.</p>
        <label
          htmlFor="email"
          className="my-2 mx-2 flex  items-center justify-stretch gap-0.5"
        >
          Enter your email:
          <input
            type="email"
            name="email"
            id="email"
            className="bg-white my-1.5 px-1.5 text-black"
            placeholder="Enter your email id"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="p-2 border-2 mb-1.5 bg-blue-500 rounded-lg cursor-pointer"
          onClick={onResetClick}
        >
          Click to send reset link
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default page;
