import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-in-production"
);

const COOKIE_NAME = "spanish-course-token";

export interface TokenPayload {
  year: string;
  iat: number;
  exp: number;
}

export async function createToken(year: string): Promise<string> {
  return new SignJWT({ year })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function verifyPassword(year: string, password: string): boolean {
  const envKey = `${year.toUpperCase()}_PASSWORD`;
  const expected = process.env[envKey];
  if (!expected) return false;
  return password === expected;
}

export { COOKIE_NAME };
