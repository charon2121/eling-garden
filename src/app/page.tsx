import { getAllArticleSlugs, getArticleMeta } from '@/lib/mdx';
import Link from 'next/link';
import { ArticleMeta } from '@/lib/types';
import { HeroTest } from '@/components/HeroTest';

// 按照分类组织文章
function organizeArticlesByCategory(articles: ArticleMeta[]): Record<string, ArticleMeta[]> {
  const categorized: Record<string, ArticleMeta[]> = {};
  
  for (const article of articles) {
    const category = article.category || '未分类';
    if (!categorized[category]) {
      categorized[category] = [];
    }
    categorized[category].push(article);
  }
  
  // 按日期排序
  for (const category in categorized) {
    categorized[category].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  
  return categorized;
}

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // 获取所有文章
  const allSlugs = getAllArticleSlugs();
  const articles = allSlugs.map(getArticleMeta);
  
  // 按分类组织文章
  const categorizedArticles = organizeArticlesByCategory(articles);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Eling Notes</h1>
        
        {/* Hero UI 测试组件 */}
        <div className="mb-8 rounded-lg border">
          <HeroTest />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(categorizedArticles).map(([category, categoryArticles]) => (
            <div key={category} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 capitalize">
                <Link href={`/category/${category}`} className="text-blue-600 hover:text-blue-800">
                  {category}
                </Link>
              </h2>
              
              <ul className="space-y-3">
                {categoryArticles.map(article => (
                  <li key={article.slug}>
                    <Link 
                      href={`/notes/${article.slug}`}
                      className="block hover:bg-gray-50 p-2 -mx-2 rounded transition-colors"
                    >
                      <h3 className="font-medium text-gray-900">{article.title}</h3>
                      {article.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {article.description}
                        </p>
                      )}
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs text-gray-400">{article.date}</span>
                        {article.series && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            {article.series}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              
              {categoryArticles.length > 5 && (
                <div className="mt-4 text-right">
                  <Link 
                    href={`/category/${category}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    查看更多 →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
