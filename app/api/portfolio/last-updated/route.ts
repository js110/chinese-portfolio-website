import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'portfolio.json')

// GET - 获取最后更新时间
export async function GET() {
  try {
    const stats = await fs.stat(DATA_FILE_PATH)
    return NextResponse.json({ 
      lastUpdated: stats.mtime.toISOString() 
    })
  } catch (error) {
    // 如果文件不存在，返回null
    return NextResponse.json({ lastUpdated: null })
  }
} 