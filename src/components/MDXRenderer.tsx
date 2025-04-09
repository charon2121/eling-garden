'use client';

import React from 'react';
import Link from 'next/link';
import { ArticleMeta } from '@/lib/types';

type MDXRendererProps = {
  Content: React.ComponentType<React.ComponentProps<'div'>>;
  meta?: ArticleMeta;
  relatedArticles?: ArticleMeta[];
};

export default function MDXRenderer({ Content, meta, relatedArticles = [] }: MDXRendererProps) {
  return (
    <div className="mdx-content">
      {meta && (
        <div className="article-meta mb-8">
          <h1 className="text-3xl font-bold mb-2">{meta.title}</h1>
          {meta.description && (
            <p className="text-gray-500 mb-4">{meta.description}</p>
          )}
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="text-gray-500">{meta.date}</span>
            {meta.tags && meta.tags.map(tag => (
              <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="mdx-wrapper prose prose-lg max-w-none">
        <Content />
      </div>
      
      {relatedArticles.length > 0 && (
        <div className="related-articles mt-12 pt-8 border-t">
          <h3 className="text-xl font-bold mb-4">系列相关文章</h3>
          <ul className="space-y-2">
            {relatedArticles.map(article => (
              <li key={article.slug}>
                <Link 
                  href={`/notes/${article.slug}`} 
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {article.order ? `${article.order}. ` : ''}{article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}