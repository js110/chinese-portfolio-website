# 中文作品集网站

一个现代化的中文作品集网站，支持响应式设计，在手机、平板和桌面端都有优秀的显示效果。

## 特性

### 🎨 响应式设计
- **移动端优化**: 专为手机屏幕设计的布局和交互
- **平板适配**: 针对平板设备的中间断点优化
- **桌面端体验**: 充分利用大屏幕空间的完整功能
- **智能断点**: 使用语义化的断点系统 (xs: 320px, sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)

### 📱 移动端特性
- 汉堡菜单导航
- 触摸友好的按钮和交互
- 优化的图片加载
- 简化的动画效果

### 🖥️ 桌面端特性
- 完整的水平导航
- 多列网格布局
- 丰富的悬停效果
- 完整的动画体验

### ⚡ 性能优化
- 图片懒加载
- 响应式图片格式 (WebP, AVIF)
- 代码分割优化
- 按设备性能调整动画

## 技术栈

- **框架**: Next.js 14
- **样式**: Tailwind CSS
- **组件**: Radix UI
- **动画**: Framer Motion
- **类型**: TypeScript

## 响应式设计实现

### 断点系统
```typescript
// 自定义断点配置
screens: {
  'xs': '320px',    // 小屏手机
  'sm': '640px',    // 大屏手机
  'md': '768px',    // 平板
  'lg': '1024px',   // 小屏桌面
  'xl': '1280px',   // 大屏桌面
  '2xl': '1536px',  // 超大屏
}
```

### 响应式工具类
```typescript
// 容器类
container: 'container mx-auto px-4 sm:px-6 lg:px-8'

// 网格类
grid: {
  mobile: 'grid grid-cols-1 gap-4',
  tablet: 'grid grid-cols-2 gap-6',
  desktop: 'grid grid-cols-3 gap-8',
}

// 文本类
text: {
  h1: 'text-2xl sm:text-3xl lg:text-4xl font-bold',
  body: 'text-sm sm:text-base lg:text-lg',
}
```

### 组件级响应式
- `ResponsiveContainer`: 自适应容器组件
- `ResponsiveGrid`: 响应式网格组件
- `ResponsiveCard`: 响应式卡片组件
- `ResponsiveImage`: 响应式图片组件

## 开发

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```

### 响应式测试
在开发模式下，页面右下角会显示"响应式测试"按钮，可以实时预览不同设备的效果。

### 构建生产版本
```bash
pnpm build
```

## 部署

### Vercel 部署
```bash
vercel --prod
```

### 其他平台
项目已配置好生产环境优化，可直接部署到任何支持 Next.js 的平台。

## 响应式设计最佳实践

### 1. 移动优先设计
- 从移动端开始设计，然后逐步增强
- 使用 `sm:`, `md:`, `lg:` 前缀添加断点样式

### 2. 灵活的网格系统
- 使用 CSS Grid 和 Flexbox 组合
- 根据内容自动调整列数

### 3. 触摸友好
- 按钮最小 44px 高度
- 足够的点击间距
- 支持手势操作

### 4. 性能优化
- 图片懒加载
- 按需加载组件
- 简化移动端动画

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License 