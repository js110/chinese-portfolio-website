import { NextRequest, NextResponse } from 'next/server'
import {
  clearAdminSession,
  isAdminAuthenticated,
  setAdminSession,
  validateAdminPassword,
} from '@/lib/auth'

const MAX_ATTEMPTS = 5
const LOCK_TIME = 10 * 60 * 1000

const loginAttempts: Record<string, { count: number; lockUntil: number }> = {}

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const rawForwardedFor = request.headers.get('x-forwarded-for')
  const ip = rawForwardedFor?.split(',')[0]?.trim() || request.ip || 'unknown'
  const now = Date.now()

  if (!loginAttempts[ip]) loginAttempts[ip] = { count: 0, lockUntil: 0 }
  const attempt = loginAttempts[ip]

  if (attempt.lockUntil > now) {
    return NextResponse.json({ success: false, error: '尝试次数过多，请稍后再试' }, { status: 429 })
  }

  if (typeof password === 'string' && validateAdminPassword(password)) {
    loginAttempts[ip] = { count: 0, lockUntil: 0 }
    const response = NextResponse.json({ success: true })
    setAdminSession(response)
    return response
  }

  attempt.count++
  if (attempt.count >= MAX_ATTEMPTS) {
    attempt.lockUntil = now + LOCK_TIME
    attempt.count = 0
    return NextResponse.json({ success: false, error: '尝试次数过多，请10分钟后再试' }, { status: 429 })
  }

  return NextResponse.json({ success: false, error: '密码错误' }, { status: 401 })
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: isAdminAuthenticated(request) })
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  clearAdminSession(response)
  return response
}

