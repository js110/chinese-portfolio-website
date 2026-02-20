import { createHash, timingSafeEqual } from "crypto"
import { NextRequest, NextResponse } from "next/server"

const SESSION_COOKIE_NAME = "admin_session"
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8

function getAdminPassword(): string {
  const configured = process.env.ADMIN_PASSWORD?.trim()
  if (configured) return configured

  if (process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_PASSWORD is required in production.")
  }

  return "admin123"
}

function getSessionSalt(): string {
  return process.env.ADMIN_SESSION_SALT?.trim() || "dev-only-change-me"
}

function buildSessionToken(password: string): string {
  return createHash("sha256")
    .update(`${password}:${getSessionSalt()}`)
    .digest("hex")
}

function safeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  return timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

export function isAdminAuthenticated(request: NextRequest): boolean {
  let password: string
  try {
    password = getAdminPassword()
  } catch {
    return false
  }

  const cookieValue = request.cookies.get(SESSION_COOKIE_NAME)?.value
  if (!cookieValue) return false

  const expected = buildSessionToken(password)
  return safeEquals(cookieValue, expected)
}

export function setAdminSession(response: NextResponse): void {
  const password = getAdminPassword()
  const token = buildSessionToken(password)

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  })
}

export function clearAdminSession(response: NextResponse): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
}

export function validateAdminPassword(input: string): boolean {
  const password = getAdminPassword()
  return safeEquals(input, password)
}
