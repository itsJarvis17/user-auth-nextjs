"use client";

import axios from "axios";
import React, { useEffect } from "react";
import Link from "next/link";

function VerifyEmailPage() {
  const [token, setToken] = React.useState("");
  const [error, setError] = React.useState(false);
  const [verified, setVerified] = React.useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.message);
    }
  };

  // On page load get token from URL
  useEffect(() => {
    const token = window.location.search.split("=")[1];
    setToken(token || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <>
      {verified && (
        <div>
          <h1>Email Verified</h1>
          <Link href="/login">Go to login page</Link>
        </div>
      )}
      {error && <h1>Fail to verify email</h1>}
    </>
  );
}

export default VerifyEmailPage;
