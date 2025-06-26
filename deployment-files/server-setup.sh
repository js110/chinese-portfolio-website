#!/bin/bash

# 服务器初始化脚本 - Ubuntu系统
# 使用方法: sudo bash server-setup.sh

set -e

echo "开始初始化服务器环境..."

# 更新系统
echo "更新系统包..."
apt update && apt upgrade -y

# 安装Node.js 18.19.1
echo "安装Node.js 18.19.1..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# 验证Node.js版本
echo "Node.js版本: $(node --version)"
echo "npm版本: $(npm --version)"

# 安装PM2
echo "安装PM2..."
npm install -g pm2

# 安装Nginx
echo "安装Nginx..."
apt install -y nginx

# 创建部署目录
echo "创建部署目录..."
mkdir -p /var/www/chinese-portfolio-website
mkdir -p /var/log/pm2

# 创建部署用户
echo "创建部署用户..."
useradd -m -s /bin/bash deploy || echo "用户deploy已存在"
usermod -aG sudo deploy

# 设置目录权限
echo "设置目录权限..."
chown -R deploy:deploy /var/www/chinese-portfolio-website
chown -R deploy:deploy /var/log/pm2

# 配置防火墙
echo "配置防火墙..."
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable

# 启动并启用Nginx
echo "启动Nginx..."
systemctl start nginx
systemctl enable nginx

# 创建PM2日志目录
mkdir -p /var/log/pm2

echo "服务器初始化完成！"
echo "请执行以下步骤完成部署："
echo "1. 将代码上传到 /var/www/chinese-portfolio-website"
echo "2. 运行: cd /var/www/chinese-portfolio-website && npm install"
echo "3. 运行: npm run build"
echo "4. 运行: pm2 start ecosystem.config.js"
echo "5. 配置Nginx并重启" 