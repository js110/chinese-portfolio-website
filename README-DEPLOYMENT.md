# 中文作品集网站部署指南

## 服务器信息
- IP地址: 47.92.140.204
- 端口: 3000
- 反向代理: Nginx
- 进程管理: PM2
- Node.js版本: 18.19.1

## 部署步骤

### 1. 服务器初始化
```bash
# 在服务器上执行
sudo bash server-setup.sh
```

### 2. 上传代码
```bash
# 在本地执行
git remote add production root@47.92.140.204:/var/www/chinese-portfolio-website
git push production main
```

### 3. 安装依赖和构建
```bash
# 在服务器上执行
cd /var/www/chinese-portfolio-website
npm install
npm run build
```

### 4. 启动PM2进程
```bash
# 在服务器上执行
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 5. 配置Nginx
```bash
# 复制Nginx配置
sudo cp nginx.conf /etc/nginx/sites-available/chinese-portfolio
sudo ln -s /etc/nginx/sites-available/chinese-portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. 验证部署
访问 http://47.92.140.204 验证网站是否正常运行。

## 日常维护

### 更新代码
```bash
# 在服务器上执行
cd /var/www/chinese-portfolio-website
./deploy.sh
```

### 查看日志
```bash
# PM2日志
pm2 logs chinese-portfolio

# Nginx日志
sudo tail -f /var/log/nginx/chinese-portfolio-access.log
sudo tail -f /var/log/nginx/chinese-portfolio-error.log
```

### 重启服务
```bash
# 重启PM2进程
pm2 restart chinese-portfolio

# 重启Nginx
sudo systemctl restart nginx
```

## 故障排除

### 检查服务状态
```bash
# 检查PM2状态
pm2 status

# 检查Nginx状态
sudo systemctl status nginx

# 检查端口占用
sudo netstat -tlnp | grep :3000
sudo netstat -tlnp | grep :80
```

### 常见问题
1. 如果网站无法访问，检查防火墙设置
2. 如果PM2进程异常，查看错误日志
3. 如果Nginx配置错误，检查配置文件语法

## 安全注意事项
- 定期更新系统和软件包
- 监控日志文件
- 备份重要数据
- 使用强密码
- 限制SSH访问 