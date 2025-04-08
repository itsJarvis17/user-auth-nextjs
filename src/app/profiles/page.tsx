"use client";
import axios from "axios";
import { set } from "mongoose";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";

function ProfilePage() {
  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("user logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };
  const [user, setUser] = React.useState({ id: "", fullName: "" });
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("/api/users/me");
      // console.log(response.data.user);
      setUser({
        id: response.data.user._id,
        fullName: response.data.user.fullName,
      });
      // console.log(user);
    };
    fetchUser();
  }, []);

  // const getUser = async () => {
  //   const response = await axios.get("/api/users/me");
  //   console.log(response.data.user);
  //   setUser({
  //     id: response.data.user._id,
  //     fullName: response.data.user.fullName,
  //   });
  //   console.log(user);
  // };
  return (
    <>
      <div className="flex flex-col justify-center text-center self-center items-center h-svh">
        Profile Page
        <button
          onClick={onLogout}
          type="submit"
          className="cursor-pointer p-2 border-2 mb-1.5 bg-blue-500 rounded-lg"
        >
          Log out
        </button>
        {/* <button
          onClick={getUser}
          type="submit"
          className="cursor-pointer p-2 border-2 mb-1.5 bg-blue-500 rounded-lg"
        >
          Get User Details
        </button> */}
        <Link href={`/profiles/${user.fullName}`}>{user.fullName}</Link>
      </div>
      <ToastContainer />
    </>
  );
}

export default ProfilePage;
