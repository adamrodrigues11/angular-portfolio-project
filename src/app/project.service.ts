import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Project } from './model/project';
import { Category } from './model/category';
import { Tag } from './model/tag';
import { PROJECTS } from './data/projects';
import projectArrayUnion from './ProjectArrayUnion';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectsByCategories: Project[];
  projectsByTags: Project[];
  constructor() {
    this.projectsByCategories = [];
    this.projectsByTags = [];
  }
  
  private isEmptyOrUndefined(array?: Array<any>): boolean {
    return array === undefined || array.length === 0;
  }

  private filterProjectsByCategories(categoryFilters: Category[] ): void {
    // otherwise, filter projects raw data by category
    this.projectsByCategories = [...PROJECTS].filter(p => {
      return categoryFilters.some(c => c.id === p.category?.id);
    })
  }

  private filterProjectsByTags(tagFilters: Tag[] ): void {
    this.projectsByTags = [...PROJECTS].filter(p => {
      return tagFilters.some(t => p.tags.some(pt => pt.id === t.id));
    })
  }

  getProjects(categoryFilters?: Category[] , tagFilters?: Tag[] ): Observable<Project[]> {
    // if no filters or empty filters are passed to the method, return all projects
    if (this.isEmptyOrUndefined(categoryFilters) && this.isEmptyOrUndefined(tagFilters)) {
      return of([...PROJECTS]);
    }

    // if only category filters are passed to the method, return projects filtered by category
    if(this.isEmptyOrUndefined(tagFilters)) {
      this.filterProjectsByCategories(categoryFilters!);
      console.log('projectsByCategory', this.projectsByCategories)
      return of(this.projectsByCategories);
    }

    // if only tag filters are passed to the method, return projects filtered by tag
    if (this.isEmptyOrUndefined(categoryFilters)) {
      this.filterProjectsByTags(tagFilters!);
      console.log('projectsByTag', this.projectsByTags)
      return of(this.projectsByTags);
    }

    // otherwise, if both filter arrays are passed and non-empty, get the union of the filtered projects by category and tag
    this.filterProjectsByCategories(categoryFilters!);
    this.filterProjectsByTags(tagFilters!);
    const filteredProjects = projectArrayUnion(this.projectsByCategories, this.projectsByTags);
    console.log('projects', filteredProjects)
    return of(filteredProjects);
  }
}