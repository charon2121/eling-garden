// 文章元数据类型
export interface ArticleMeta {
  title: string;
  slug: string;
  description?: string;
  date: string;
  category?: string;
  subcategory?: string;
  series?: string;
  tags?: string[];
  author?: string;
  draft?: boolean;
  order?: number;
}

// 系列类型
export interface Series {
  title: string;
  slug: string;
  description?: string;
  articles: ArticleMeta[];
}

// 分类类型
export interface Category {
  title: string;
  slug: string;
  description?: string;
  subcategories?: Category[];
  series?: Series[];
  articles?: ArticleMeta[];
} 