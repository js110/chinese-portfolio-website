import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const projectId = formData.get('projectId') as string;

    if (!file) {
      return NextResponse.json(
        { error: '没有找到文件' },
        { status: 400 }
      );
    }

    if (!projectId) {
      return NextResponse.json(
        { error: '项目ID是必需的' },
        { status: 400 }
      );
    }

    // 验证文件大小
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `文件大小不能超过 ${MAX_FILE_SIZE / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }

    // 验证文件类型
    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    if (!isImage) {
      return NextResponse.json(
        { error: '只允许上传图片类型' },
        { status: 400 }
      );
    }

    // 创建上传目录
    const uploadDir = join(process.cwd(), 'public', 'uploads', projectId);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // 生成唯一文件名
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}-${randomId}.${fileExtension}`;
    const filePath = join(uploadDir, fileName);

    // 保存文件
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // 返回文件信息
    const fileUrl = `/uploads/${projectId}/${fileName}`;
    
    return NextResponse.json({
      success: true,
      file: {
        id: `${timestamp}-${randomId}`,
        type: 'image',
        url: fileUrl,
        filename: file.name,
        size: file.size,
        createdAt: new Date().toISOString(),
        order: 0
      }
    });

  } catch (error) {
    console.error('文件上传失败:', error);
    return NextResponse.json(
      { error: '文件上传失败' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json(
        { error: '文件路径是必需的' },
        { status: 400 }
      );
    }

    // 验证路径安全性
    if (filePath.includes('..') || !filePath.startsWith('/uploads/')) {
      return NextResponse.json(
        { error: '无效的文件路径' },
        { status: 400 }
      );
    }

    const fullPath = join(process.cwd(), 'public', filePath);
    
    // 删除文件
    const { unlink } = await import('fs/promises');
    await unlink(fullPath);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('文件删除失败:', error);
    return NextResponse.json(
      { error: '文件删除失败' },
      { status: 500 }
    );
  }
} 