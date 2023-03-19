import { Component } from '@angular/core';

import { Category } from './model/category';
import { Tag } from './model/tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css', 'app.component.scss']
})
export class AppComponent {
  title: string = 'SSD Portfolio';
  date: Date = new Date();
  author: string = 'Adam Rodrigues';
  // use empty arrays instead of undefined to simply updating logic
  categoryFilters: Category[] = []; 
  tagFilters: Tag[] = [];

  updateCategoryFilters(category: Category) {
    // if the category is in the list, remove it
    if(this.categoryFilters.find(c => c.id === category.id)) {
      this.removeCategoryFilter(category);
      return;     
    }
    // otherwise add it
    this.addCategoryFilter(category);
    console.log('categoryFilters parent', this.categoryFilters);
  }

  updateTagFilters(tag: Tag) {
    // if the tag is in the list, remove it
    if(this.tagFilters.find(t => t.id === tag.id)) {
      this.removeTagFilter(tag);
      return; 
    }
    // otherwise add it
    this.addTagFilter(tag);
    console.log('tagFilters parent', this.tagFilters);
  }

  // do not mutate input state directly in order to allow child component to detect changes onPush
  clearFilters() {
    this.categoryFilters = [];
    this.tagFilters = [];
  }
  addCategoryFilter(category: Category) {
    this.categoryFilters = [...this.categoryFilters, category]
  }
  removeCategoryFilter(category: Category) {
    this.categoryFilters = [...this.categoryFilters].filter(c => c.id !== category.id);
  }
  addTagFilter(tag: Tag) {
    this.tagFilters = [...this.tagFilters, tag]
  }
  removeTagFilter(tag: Tag) {
    this.tagFilters = [...this.tagFilters].filter(t => t.id !== tag.id);
  }
}
