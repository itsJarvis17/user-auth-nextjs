import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      { message: "User logged out successfully" },
      { status: 200 }
    );
    response.cookies.delete("jwt-token");
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong while logging out" },
      { status: 500 }
    );
  }
}
