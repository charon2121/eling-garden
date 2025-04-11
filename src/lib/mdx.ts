import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import React, { ComponentType } from 'react';
import { ArticleMeta } from './types';

// 从 meta.json 加载文章元数据
export function getArticleMeta(slug: string): ArticleMeta {
  try {
    const metaPath = path.join(process.cwd(), 'content', slug, 'meta.json');
    if (!fs.existsSync(metaPath)) {
      throw new Error(`元数据文件不存在: ${metaPath}`);
    }

    const metaData = JSON.parse(fs.readFileSync(metaPath, 'utf8')) as ArticleMeta;
    return {
      ...metaData,
      slug: slug, // 确保 slug 与目录路径一致
    };
  } catch (error) {
    console.error(`加载文章元数据错误:`, error);
    // 返回基本元数据
    return {
      title: slug.split('/').pop() || 'Untitled',
      slug: slug,
      date: new Date().toISOString().slice(0, 10),
    };
  }
}

// 编译并加载 MDX 内容
export async function loadMdxContent(
  slug: string,
  components: Record<string, ComponentType<any>> = {},
) {
  const filePath = path.join(process.cwd(), 'content', slug, 'index.mdx');

  try {
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      throw new Error(`MDX文件不存在: ${filePath}`);
    }

    const source = fs.readFileSync(filePath, 'utf8');

    // 使用 next-mdx-remote 编译 MDX
    const { content } = await compileMDX({
      source,
      components,
      options: {
        parseFrontmatter: false, // 不解析元数据
        mdxOptions: {
          development: process.env.NODE_ENV !== 'production',
        },
      },
    });

    return content;
  } catch (error) {
    console.error(`加载MDX内容错误:`, error);
    return React.createElement('div', { className: 'error-message' }, [
      React.createElement('h2', null, '内容加载错误'),
      React.createElement('p', null, `找不到文章: ${slug}`),
      React.createElement('p', null, `可用的文章路径: content/${slug}/index.mdx`),
      React.createElement(
        'p',
        { className: 'text-red-500' },
        (error as Error).message || String(error),
      ),
    ]);
  }
}

// 递归获取所有文章目录路径
export function getAllArticleSlugs(): string[] {
  function findMdxFiles(dir: string, basePath: string = ''): string[] {
    const slugs: string[] = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.join(basePath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // 检查目录中是否有 index.mdx 和 meta.json
        const hasMdx = fs.existsSync(path.join(fullPath, 'index.mdx'));
        const hasMeta = fs.existsSync(path.join(fullPath, 'meta.json'));

        if (hasMdx && hasMeta) {
          // 如果同时存在两个文件，则认为是一篇文章
          slugs.push(relativePath);
        } else {
          // 否则继续递归搜索
          slugs.push(...findMdxFiles(fullPath, relativePath));
        }
      }
    }

    return slugs;
  }

  const contentDir = path.join(process.cwd(), 'content');
  return findMdxFiles(contentDir);
}

// 根据 slug 获取相关文章（同系列）
export function getRelatedArticles(currentSlug: string): ArticleMeta[] {
  try {
    const currentMeta = getArticleMeta(currentSlug);
    if (!currentMeta.series) return [];

    // 查找同系列文章
    const allSlugs = getAllArticleSlugs();
    const seriesArticles = allSlugs
      .filter((slug) => {
        try {
          const meta = getArticleMeta(slug);
          return meta.series === currentMeta.series && slug !== currentSlug;
        } catch {
          return false;
        }
      })
      .map(getArticleMeta)
      .sort((a, b) => {
        // 优先按顺序排序
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        // 然后按日期排序
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

    return seriesArticles;
  } catch (error) {
    console.error('获取相关文章错误:', error);
    return [];
  }
}
