module.exports = {
  apps: [
    {
      name: 'chinese-portfolio',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/chinese-portfolio-website',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/pm2/chinese-portfolio-error.log',
      out_file: '/var/log/pm2/chinese-portfolio-out.log',
      log_file: '/var/log/pm2/chinese-portfolio-combined.log',
      time: true
    }
  ]
}; 