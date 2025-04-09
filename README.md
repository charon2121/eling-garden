# Eling Notes

一个基于 Next.js 15 + App Router 的 MDX 技术笔记系统。

## 项目特点

- 基于 Next.js 15 和 App Router
- 使用 MDX 编写文章，支持自定义组件
- 层级化的内容组织：分类 > 子分类 > 系列 > 文章
- 模块化的设计，易于拓展

## 目录结构

```
.
├── content/ # 内容目录
│   └── os/
│       └── linux/
│           └── linux-namespace/ # 系列
│               ├── 01-intro/ # 文章1
│               │   ├── index.mdx
│               │   └── meta.json
│               └── 02-pidns/ # 文章2
│                   ├── index.mdx
│                   └── meta.json
├── src/
│   ├── app/ # Next.js App Router
│   │   ├── layout.tsx # 全局布局
│   │   ├── page.tsx # 首页
│   │   └── notes/[...slug]/ # 文章页面
│   │       └── page.tsx
│   ├── components/ # 组件
│   │   ├── MDXRenderer.tsx # MDX 渲染器
│   │   └── mdx/ # MDX 组件
│   │       ├── Callout.tsx
│   │       ├── CodePlayground.tsx
│   │       └── index.ts
│   └── lib/ # 工具函数
│       ├── mdx.ts # MDX 加载器
│       └── types.ts # 类型定义
└── package.json
```

## 文章组织

每篇文章需要包含：

1. `index.mdx`：文章内容
2. `meta.json`：文章元数据

元数据示例：

```json
{
  "title": "Linux Namespace 简介",
  "description": "详细介绍 Linux Namespace 的基本概念、用途和历史",
  "date": "2023-05-12",
  "category": "os",
  "subcategory": "linux",
  "series": "linux-namespace",
  "tags": ["Linux", "容器", "Namespace", "内核"],
  "author": "Eling",
  "order": 1
}
```

## 使用方法

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建

```bash
npm run build
```

### 启动生产服务器

```bash
npm run start
```

## 添加新文章

1. 在 `content/` 目录下按照分类/子分类/系列/文章的结构创建目录
2. 在文章目录中创建 `index.mdx` 和 `meta.json` 文件
3. 编写文章内容，可以使用自定义组件如 `<Callout>` 和 `<CodePlayground>`

## 拓展指南

### 添加新的 MDX 组件

1. 在 `src/components/mdx/` 目录下创建新组件
2. 在 `src/components/mdx/index.ts` 中注册该组件

### 添加新页面类型

1. 在 `src/app/` 目录下创建相应的路由组件
2. 使用 `lib/mdx.ts` 中的函数获取文章数据

## License

MIT
