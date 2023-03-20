import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../model/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @Input() categoryFilters?: Category[];
  @Output() onCategoryClicked = new EventEmitter<Category>();
  @Output() onClearCategoriesClicked = new EventEmitter<void>();
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {
   }

  getCategories(): void {
    this.categories = this.categoryService.getCategories();
  }
  ngOnInit(): void {
    this.getCategories();
  }

  handleCategoryClicked(category: Category) {
    this.onCategoryClicked.emit(category);
  }

  handleClearCategoriesClicked() {
    this.onClearCategoriesClicked.emit();
  }

  isActiveFilter(category: Category): boolean {
    return this.categoryFilters?.some(c => c.id === category.id) ?? false;
  }

}
