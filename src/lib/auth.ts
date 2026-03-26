// Client-side authentication via localStorage

const AUTH_KEY = "spanish-course-auth";

// Wachtwoorden per leerjaar
const PASSWORDS: Record<string, string> = {
  cours: "Spanish2026!",
};

export interface AuthSession {
  year: string;
  loggedInAt: number;
}

export function login(year: string, password: string): boolean {
  const expected = PASSWORDS[year];
  if (!expected || password !== expected) return false;

  const session: AuthSession = { year, loggedInAt: Date.now() };
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  return true;
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(AUTH_KEY);
  if (!data) return null;
  try {
    const session: AuthSession = JSON.parse(data);
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    if (Date.now() - session.loggedInAt > thirtyDays) {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
    return session;
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getSession() !== null;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}
