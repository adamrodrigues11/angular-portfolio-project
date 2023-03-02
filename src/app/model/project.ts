import { Category } from './category';

export interface Project {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  url: string | null;
  published_date: string | null;
  image: string | null;
  thumb: string | null;
  category_id: number | null;
  created_at: string;
  updated_at: string;
  category: Category | null;
  tags: any;
}