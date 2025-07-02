import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { PortfolioData, defaultPortfolioData } from '@/types/portfolio'

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'portfolio.json')

// 确保数据目录存在
async function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE_PATH)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// 读取数据文件
async function readDataFile(): Promise<PortfolioData> {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // 如果文件不存在或读取失败，返回默认数据
    return defaultPortfolioData
  }
}

// 写入数据文件
async function writeDataFile(data: PortfolioData): Promise<void> {
  await ensureDataDirectory()
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

// GET - 获取作品集数据
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fields = searchParams.get('fields')?.split(',').map(f => f.trim()).filter(Boolean)
    const projectLimit = parseInt(searchParams.get('projectLimit') || '', 10)
    const data = await readDataFile()
    let result: any = {}
    if (fields && fields.length > 0) {
      for (const field of fields) {
        if (field === 'projects' && !isNaN(projectLimit)) {
          result.projects = data.projects.slice(0, projectLimit)
        } else {
          result[field] = data[field as keyof typeof data]
        }
      }
    } else {
      result = { ...data }
    }
    return NextResponse.json(result)
  } catch (error) {
    console.error('获取数据失败:', error)
    return NextResponse.json(defaultPortfolioData)
  }
}

// POST - 保存作品集数据
export async function POST(request: NextRequest) {
  try {
    const data: PortfolioData = await request.json()
    await writeDataFile(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('保存数据失败:', error)
    return NextResponse.json({ success: false, error: '保存失败' }, { status: 500 })
  }
}

// DELETE - 清除所有数据
export async function DELETE() {
  try {
    await ensureDataDirectory()
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(defaultPortfolioData, null, 2), 'utf-8')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('清除数据失败:', error)
    return NextResponse.json({ success: false, error: '清除失败' }, { status: 500 })
  }
} 