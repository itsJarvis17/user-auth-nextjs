import React from "react";

function UserProfilePage({ params }: any) {
  return (
    <div className="flex justify-center text-center self-center items-center h-svh">
      Profile Page {params.id}
    </div>
  );
}

export default UserProfilePage;
