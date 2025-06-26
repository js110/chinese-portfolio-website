@echo off
echo 准备部署文件...

echo 创建部署包...
mkdir deployment-files 2>nul

echo 复制必要文件...
copy ecosystem.config.js deployment-files\
copy deploy.sh deployment-files\
copy nginx.conf deployment-files\
copy server-setup.sh deployment-files\
copy README-DEPLOYMENT.md deployment-files\

echo 部署文件准备完成！
echo 请将 deployment-files 文件夹中的文件上传到服务器
echo 然后在服务器上执行以下命令：
echo 1. chmod +x deploy.sh server-setup.sh
echo 2. sudo bash server-setup.sh
echo 3. 按照 README-DEPLOYMENT.md 中的步骤完成部署 