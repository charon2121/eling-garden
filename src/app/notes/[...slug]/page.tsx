import { loadMdxContent, getArticleMeta, getRelatedArticles } from '@/lib/mdx';
import { mdxComponents } from '@/components/mdx';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// 动态生成元数据
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  // 需要等待 params
  const paramValues = await params;
  try {
    const slug = paramValues.slug.join('/');
    const meta = getArticleMeta(slug);

    return {
      title: `${meta.title} | Eling Notes`,
      description: meta.description || `${meta.title} - Eling Technical Notes`,
      keywords: meta.tags,
    };
  } catch {
    return {
      title: 'Article Not Found | Eling Notes',
    };
  }
}

export default async function NotePage({ params }: { params: { slug: string[] } }) {
  try {
    // 需要等待 params
    const paramValues = await params;
    console.log('paramValues', paramValues);
    const slug = paramValues.slug.join('/'); // 将路径数组合并为实际文件路径
    const meta = getArticleMeta(slug);
    const content = await loadMdxContent(slug, mdxComponents);
    const relatedArticles = getRelatedArticles(slug);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4">
          <div className="w-full lg:w-3/4">
            <div className="mdx-content">
              <div className="article-meta mb-8">
                <h1 className="mb-2 text-3xl font-bold">{meta.title}</h1>
                {meta.description && <p className="mb-4 text-gray-500">{meta.description}</p>}
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="text-gray-500">{meta.date}</span>
                  {meta.tags &&
                    meta.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                </div>
              </div>

              <div className="mdx-wrapper prose prose-lg max-w-none">{content}</div>

              {relatedArticles.length > 0 && (
                <div className="related-articles mt-12 border-t pt-8">
                  <h3 className="mb-4 text-xl font-bold">系列相关文章</h3>
                  <ul className="space-y-2">
                    {relatedArticles.map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={`/notes/${article.slug}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {article.order ? `${article.order}. ` : ''}
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/4">
            <div className="sticky top-6 rounded-lg bg-gray-50 p-4">
              <h3 className="mb-3 text-lg font-bold">文章信息</h3>
              {meta.category && (
                <div className="mb-2">
                  <span className="text-sm text-gray-500">分类：</span>
                  <Link
                    href={`/category/${meta.category}`}
                    className="text-blue-500 hover:underline"
                  >
                    {meta.category}
                  </Link>
                </div>
              )}
              {meta.series && (
                <div className="mb-2">
                  <span className="text-sm text-gray-500">系列：</span>
                  <Link href={`/series/${meta.series}`} className="text-blue-500 hover:underline">
                    {meta.series}
                  </Link>
                </div>
              )}
              {meta.tags && meta.tags.length > 0 && (
                <div className="mb-2">
                  <span className="mb-1 block text-sm text-gray-500">标签：</span>
                  <div className="flex flex-wrap gap-1">
                    {meta.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${tag}`}
                        className="rounded-full bg-gray-200 px-2 py-1 text-xs hover:bg-gray-300"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4">
                <Link href="/" className="inline-block text-sm text-gray-600 hover:text-gray-900">
                  ← 返回首页
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('文章加载失败:', error);
    notFound();
  }
}
