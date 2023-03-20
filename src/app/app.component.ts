import { Component } from '@angular/core';

import { Category } from './model/category';
import { Tag } from './model/tag';
import { Project } from './model/project';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title: string = 'SSD Portfolio';
  date: Date = new Date();
  author: string = 'Adam Rodrigues';
  selectedProject?: Project;
  // use empty arrays instead of undefined to simply updating logic
  categoryFilters: Category[] = []; 
  tagFilters: Tag[] = [];
  showSidebar: boolean = false;

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  };

  handleProjectSelected(project: Project): void {
    this.selectedProject = project;
  }

  handleProjectDeselected(): void {
    this.selectedProject = undefined;
  }

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
  clearCategoryFilters() {
    this.categoryFilters = [];
  }

  clearTagFilters() {
    this.tagFilters = [];
  }

  clearAllFilters() {
    this.clearCategoryFilters();
    this.clearTagFilters();
  }

  private addCategoryFilter(category: Category) {
    this.categoryFilters = [...this.categoryFilters, category]
  }
  private removeCategoryFilter(category: Category) {
    this.categoryFilters = [...this.categoryFilters].filter(c => c.id !== category.id);
  }
  private addTagFilter(tag: Tag) {
    this.tagFilters = [...this.tagFilters, tag]
  }
  private removeTagFilter(tag: Tag) {
    this.tagFilters = [...this.tagFilters].filter(t => t.id !== tag.id);
  }
  
}
