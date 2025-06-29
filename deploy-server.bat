@echo off
echo 开始部署到服务器...

REM 连接到服务器并执行部署命令
echo Jiangsheng520@ | ssh -o StrictHostKeyChecking=no root@47.92.140.204 "cd /var/www/portfolio && npx next build"

echo 构建完成，继续配置PM2...
echo Jiangsheng520@ | ssh -o StrictHostKeyChecking=no root@47.92.140.204 "cd /var/www/portfolio && cat > ecosystem.config.js << 'EOF'
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
EOF"

echo 启动PM2应用...
echo Jiangsheng520@ | ssh -o StrictHostKeyChecking=no root@47.92.140.204 "cd /var/www/portfolio && pm2 start ecosystem.config.js && pm2 save && pm2 startup"

echo 配置nginx...
echo Jiangsheng520@ | ssh -o StrictHostKeyChecking=no root@47.92.140.204 "tee /etc/nginx/sites-available/portfolio << 'EOF'
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
}
EOF"

echo 启用nginx站点...
echo Jiangsheng520@ | ssh -o StrictHostKeyChecking=no root@47.92.140.204 "ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/ && rm -f /etc/nginx/sites-enabled/default && nginx -t && systemctl restart nginx"

echo 配置防火墙...
echo Jiangsheng520@ | ssh -o StrictHostKeyChecking=no root@47.92.140.204 "ufw allow 22 && ufw allow 80 && ufw allow 443 && ufw --force enable"

echo 部署完成！
echo 网站地址: http://47.92.140.204
echo 查看状态: pm2 status
echo 查看日志: pm2 logs portfolio-website
pause 