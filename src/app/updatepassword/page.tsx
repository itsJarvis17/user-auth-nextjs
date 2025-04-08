"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
function page() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const updateNewPassword = async () => {
    try {
      if (confirmPassword !== newPassword) {
        console.log("Password and confirm password do not match!");
        return;
      }

      // Get token from URL
      const token = window.location.search.split("=")[1];

      //   console.log(token);
      const response = await axios.post("/api/users/updatepassword", {
        token,
        newPassword,
      });

      if (response.status === 200) {
        console.log("Password updated successfully!");
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error.message);
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
          New Password:
          <input
            type="password"
            name="passsword"
            id="password"
            className="bg-white my-1.5 px-1.5 text-black"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label
          htmlFor="email"
          className="my-2 mx-2 flex  items-center justify-stretch gap-0.5"
        >
          Confirm Password:
          <input
            type="password"
            name="passsword"
            id="password"
            className="bg-white my-1.5 px-1.5 text-black"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="p-2 border-2 mb-1.5 bg-blue-500 rounded-lg cursor-pointer"
          onClick={updateNewPassword}
        >
          Update Password
        </button>
      </div>
    </div>
  );
}

export default page;
