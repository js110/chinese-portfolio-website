import { NextRequest, NextResponse } from 'next/server'

// 建议用 process.env.ADMIN_PASSWORD，演示用硬编码
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const MAX_ATTEMPTS = 5
const LOCK_TIME = 10 * 60 * 1000 // 10分钟

// 内存存储失败次数和锁定时间（生产建议用redis等持久化）
const loginAttempts: Record<string, { count: number; lockUntil: number }> = {}

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const ip = request.headers.get('x-forwarded-for') || request.ip || 'unknown'
  const now = Date.now()

  if (!loginAttempts[ip]) loginAttempts[ip] = { count: 0, lockUntil: 0 }
  const attempt = loginAttempts[ip]

  if (attempt.lockUntil > now) {
    return NextResponse.json({ success: false, error: '尝试次数过多，请稍后再试' }, { status: 429 })
  }

  if (password === ADMIN_PASSWORD) {
    loginAttempts[ip] = { count: 0, lockUntil: 0 }
    return NextResponse.json({ success: true })
  } else {
    attempt.count++
    if (attempt.count >= MAX_ATTEMPTS) {
      attempt.lockUntil = now + LOCK_TIME
      attempt.count = 0
      return NextResponse.json({ success: false, error: '尝试次数过多，请10分钟后再试' }, { status: 429 })
    }
    return NextResponse.json({ success: false, error: '密码错误' }, { status: 401 })
  }
} 