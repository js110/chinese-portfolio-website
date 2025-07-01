#!/bin/bash

# 服务器端一键更新脚本
# 适用于 Ubuntu/Debian 系统

set -e

echo "🚀 开始更新作品集网站..."

# 检查是否为root用户
if [ "$EUID" -eq 0 ]; then
    echo "❌ 请不要使用root用户运行此脚本"
    exit 1
fi

# 项目目录
PROJECT_DIR="/var/www/portfolio"

# 检查项目目录是否存在
if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ 项目目录不存在: $PROJECT_DIR"
    echo "请先运行部署脚本: ./deploy.sh"
    exit 1
fi

# 进入项目目录
cd $PROJECT_DIR

# 备份数据
if [ -f "data/portfolio.json" ]; then
    echo "💾 备份现有数据..."
    cp data/portfolio.json data/portfolio.json.backup.$(date +%Y%m%d_%H%M%S)
fi

# 拉取最新代码
echo "📥 拉取最新代码..."
git pull origin main

# 安装依赖
echo "📦 安装项目依赖..."
npm install --legacy-peer-deps

# 构建项目
echo "🔨 构建项目..."
npm run build

# 重启应用
echo "🔄 重启应用..."
pm2 restart portfolio-website

# 检查应用状态
echo "📊 检查应用状态..."
pm2 status

echo "✅ 更新完成！"
echo "🌐 网站地址: http://$(curl -s ifconfig.me)"
echo "📝 查看日志: pm2 logs portfolio-website"
echo "📁 数据文件位置: $PROJECT_DIR/data/portfolio.json" 