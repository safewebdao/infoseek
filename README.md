# InfoTracker

InfoTracker 是一个基于关键词的多平台信息聚合和追踪系统。

## 环境设置

1. 克隆此仓库到本地机器。
2. 运行 `npm install` 安装所有依赖。
3. 在项目根目录创建一个 `.env` 文件。
4. 在 `.env` 文件中添加以下内容，并用您的 Supabase 项目信息替换占位符：

   ```
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

5. 运行 `npm run dev` 启动开发服务器。

请确保不要将 `.env` 文件提交到版本控制系统，因为它包含敏感信息。

## 可用的脚本

- `npm run dev`: 启动开发服务器
- `npm run build`: 构建生产版本
- `npm run preview`: 本地预览生产构建

## 技术栈

- 前端：React, TypeScript, Vite, Tailwind CSS
- 后端：Supabase
- 状态管理：React Context API
- 路由：React Router
- 图表：Recharts

## 贡献

欢迎提交 Pull Requests。对于重大更改，请先开 issue 讨论您想要改变的内容。

## 许可

[MIT](https://choosealicense.com/licenses/mit/)