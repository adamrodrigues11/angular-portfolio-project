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
  projectsData: Project[];
  constructor() {
    this.projectsData = [...PROJECTS];
  }
  
  private isEmptyOrUndefined(array?: Array<any>): boolean {
    return array === undefined || array.length === 0;
  }

  private filterProjectsByCategories(categoryFilters: Category[] ): Project[] {
    return this.projectsData.filter(p => {
      return categoryFilters.some(c => c.id === p.category?.id);
    });
  }

  private filterProjectsByTags(tagFilters: Tag[] ): Project[] {
    return this.projectsData.filter(p => {
      return tagFilters.some(t => p.tags.some(pt => pt.id === t.id));
    });
  }

  getProjects(categoryFilters?: Category[] , tagFilters?: Tag[] ): Observable<Project[]> {
    // if no filters or empty filters are passed to the method, return all projects
    if (this.isEmptyOrUndefined(categoryFilters) && this.isEmptyOrUndefined(tagFilters)) {
      return of([...PROJECTS]);
    }

    // if only category filters are passed to the method, return projects filtered by category
    if(this.isEmptyOrUndefined(tagFilters)) {
      return of(this.filterProjectsByCategories(categoryFilters!));
    }

    // if only tag filters are passed to the method, return projects filtered by tag
    if (this.isEmptyOrUndefined(categoryFilters)) {
      return of(this.filterProjectsByTags(tagFilters!));
    }

    // otherwise, if both filter arrays are passed and non-empty, get the union of the filtered projects by category and tag
    const filteredProjects = projectArrayUnion(
      this.filterProjectsByCategories(categoryFilters!), 
      this.filterProjectsByTags(tagFilters!)
    );
    return of(filteredProjects);
  }
}