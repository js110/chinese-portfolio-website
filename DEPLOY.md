# 🚀 快速部署指南

## 方法一：一键部署（推荐）

### 1. 连接到服务器
```bash
ssh root@your-server-ip
```

### 2. 创建普通用户（安全考虑）
```bash
adduser portfolio
usermod -aG sudo portfolio
su - portfolio
```

### 3. 下载并运行部署脚本
```bash
wget https://raw.githubusercontent.com/js110/chinese-portfolio-website/main/deploy.sh
chmod +x deploy.sh
./deploy.sh
```

## 方法二：手动部署

### 1. 安装依赖
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装PM2
sudo npm install -g pm2

# 安装nginx
sudo apt install -y nginx
```

### 2. 部署项目
```bash
# 创建项目目录
sudo mkdir -p /var/www/portfolio
sudo chown $USER:$USER /var/www/portfolio
cd /var/www/portfolio

# 克隆项目
git clone https://github.com/js110/chinese-portfolio-website.git .

# 安装依赖
npm install

# 创建数据目录
mkdir -p data
chmod 755 data

# 构建项目
npm run build
```

### 3. 配置PM2
```bash
# 创建PM2配置文件
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'portfolio-website',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/portfolio',
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
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. 配置nginx
```bash
# 创建nginx配置
sudo tee /etc/nginx/sites-available/portfolio << EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# 启用站点
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx
```

## 🔧 常用命令

### 查看应用状态
```bash
pm2 status
pm2 logs portfolio-website
```

### 重启应用
```bash
pm2 restart portfolio-website
```

### 更新代码
```bash
cd /var/www/portfolio
git pull origin main
npm install
npm run build
pm2 restart portfolio-website
```

### 备份数据
```bash
cp /var/www/portfolio/data/portfolio.json /var/www/portfolio/data/portfolio.json.backup.$(date +%Y%m%d_%H%M%S)
```

## 📁 重要文件位置

- **项目目录**: `/var/www/portfolio`
- **数据文件**: `/var/www/portfolio/data/portfolio.json`
- **PM2配置**: `/var/www/portfolio/ecosystem.config.js`
- **nginx配置**: `/etc/nginx/sites-available/portfolio`

## 🔒 安全建议

1. 配置防火墙
```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable
```

2. 设置SSL证书（可选）
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 🆘 故障排除

### 应用无法启动
```bash
pm2 logs portfolio-website
cd /var/www/portfolio
npm run build
pm2 restart portfolio-website
```

### nginx配置错误
```bash
sudo nginx -t
sudo systemctl status nginx
```

### 端口被占用
```bash
sudo netstat -tulpn | grep :3000
sudo kill -9 <PID>
``` 