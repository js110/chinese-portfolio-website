#!/bin/bash

# 部署脚本 - 中文作品集网站
# 使用方法: ./deploy.sh

set -e

echo "开始部署中文作品集网站..."

# 进入项目目录
cd /var/www/chinese-portfolio-website

# 拉取最新代码
echo "拉取最新代码..."
git pull origin main

# 安装依赖
echo "安装依赖..."
npm install

# 构建项目
echo "构建项目..."
npm run build

# 重启PM2进程
echo "重启PM2进程..."
pm2 restart chinese-portfolio

# 清理缓存
echo "清理缓存..."
npm cache clean --force

echo "部署完成！"
echo "应用运行在: http://47.92.140.204" 