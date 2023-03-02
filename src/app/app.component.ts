import { Component } from '@angular/core';

import { ProjectsComponent } from './projects/projects.component';
import { TagsComponent } from './tags/tags.component';
import { CategoriesComponent } from './categories/categories.component';

import { Category } from './model/category';
import { Tag } from './model/tag';
import { Project } from './model/project';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css', 'app.component.scss']
})
export class AppComponent {
  title: string = 'SSD Portfolio';
  date: Date = new Date();
  author: string = 'Adam Rodrigues';
  
  categoryFilter: Category | undefined = undefined;
  setCategoryFilter(category: Category | undefined) {
    this.categoryFilter = category;
  }

  tagFilter: Tag | undefined = undefined;
  setTagFilter(tag: Tag | undefined) {
    this.tagFilter = tag;
  }

  clearFilters() {
    this.categoryFilter = undefined;
    this.tagFilter = undefined;
  }

  // setCategoryFilterOnSelect(event: Event) {
  //   const id = (event.target as HTMLSelectElement).value;
  //   const selectedCategory = this.categories.find(
  //     category => category.id === parseInt(id)
  //   )
  //   this.setCategoryFilter(selectedCategory); 
  // }

  // setTagFilterOnSelect(event: Event) {
  //   const id = (event.target as HTMLSelectElement).value;
  //   const selectedTag = this.tags.find(
  //     tag => tag.id === parseInt(id)
  //   )
  //   this.setTagFilter(selectedTag); 
  // }

}
