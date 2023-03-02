import { Injectable } from '@angular/core';
import { Category } from './model/category';
import { CATEGORIES } from './data/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor() { }
  getCategories(): Category[] {
    return CATEGORIES;
  }
}
