import { NextResponse } from "next/server";
import { createToken, verifyPassword, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  const { year, password } = await request.json();

  if (!year || !password) {
    return NextResponse.json(
      { error: "Year and password are required" },
      { status: 400 }
    );
  }

  if (!verifyPassword(year, password)) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  }

  const token = await createToken(year);

  const response = NextResponse.json({ success: true, year });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60, // 30 dagen
    path: "/",
  });

  return response;
}
