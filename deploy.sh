#!/bin/bash

# 作品集网站部署脚本
# 适用于 Ubuntu/Debian 系统

set -e

echo "🚀 开始部署作品集网站..."

# 检查是否为root用户
if [ "$EUID" -eq 0 ]; then
    echo "❌ 请不要使用root用户运行此脚本"
    exit 1
fi

# 更新系统包
echo "📦 更新系统包..."
sudo apt update && sudo apt upgrade -y

# 安装Node.js 18.x
echo "📦 安装Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js 已安装: $(node --version)"
fi

# 安装PM2进程管理器
echo "📦 安装PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
else
    echo "✅ PM2 已安装: $(pm2 --version)"
fi

# 安装nginx
echo "📦 安装nginx..."
if ! command -v nginx &> /dev/null; then
    sudo apt install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
else
    echo "✅ nginx 已安装"
fi

# 创建项目目录
PROJECT_DIR="/var/www/portfolio"
echo "📁 创建项目目录: $PROJECT_DIR"
sudo mkdir -p $PROJECT_DIR
sudo chown $USER:$USER $PROJECT_DIR

# 如果项目已存在，备份数据
if [ -f "$PROJECT_DIR/data/portfolio.json" ]; then
    echo "💾 备份现有数据..."
    cp $PROJECT_DIR/data/portfolio.json $PROJECT_DIR/data/portfolio.json.backup.$(date +%Y%m%d_%H%M%S)
fi

# 进入项目目录
cd $PROJECT_DIR

# 如果是从git克隆
if [ ! -d ".git" ]; then
    echo "📥 从GitHub克隆项目..."
    git clone https://github.com/js110/chinese-portfolio-website.git .
fi

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 创建数据目录
echo "📁 创建数据目录..."
mkdir -p data
chmod 755 data

# 构建项目
echo "🔨 构建项目..."
npm run build

# 配置PM2
echo "⚙️ 配置PM2..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'portfolio-website',
    script: 'npm',
    args: 'start',
    cwd: '$PROJECT_DIR',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# 启动应用
echo "🚀 启动应用..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 配置nginx
echo "⚙️ 配置nginx..."
sudo tee /etc/nginx/sites-available/portfolio << EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # 静态文件缓存
    location /_next/static {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# 启用站点
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# 测试nginx配置
sudo nginx -t

# 重启nginx
sudo systemctl restart nginx

# 配置防火墙
echo "🔥 配置防火墙..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

echo "✅ 部署完成！"
echo "🌐 网站地址: http://$(curl -s ifconfig.me)"
echo "📊 PM2状态: pm2 status"
echo "📝 查看日志: pm2 logs portfolio-website"
echo "🔄 重启应用: pm2 restart portfolio-website"
echo "📁 数据文件位置: $PROJECT_DIR/data/portfolio.json" 