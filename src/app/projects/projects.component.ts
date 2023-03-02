import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../model/project';
import { Category } from '../model/category';
import { Tag } from '../model/tag';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent {
  @Input() categoryFilter: Category | undefined;
  @Output() newCategoryFilterEvent = new EventEmitter<Category>();
  @Input() tagFilter: Tag | undefined;
  @Output() newTagFilterEvent = new EventEmitter<Tag>();
  selectedProject?: Project;

  constructor(private projectService: ProjectService) { }

  projects: Project[] = [];
  getProjects(): void {
    this.projects = this.projectService.getProjects();
  }
  ngOnInit(): void {
    this.getProjects();
  }

  setCategoryFilter(category: Category) {
    this.categoryFilter = category;
    this.newCategoryFilterEvent.emit(category);
  }

  setTagFilter(tag: Tag) {
    this.tagFilter = tag;
    this.newTagFilterEvent.emit(tag);
  }

  onSelect(project: Project): void {
    this.selectedProject = project;
  }

  clearSelectedProject(): void {
    this.selectedProject = undefined;
  }

  // clearFilters() {
  //   this.categoryFilter = undefined;
  //   this.tagFilter = undefined;
  //   this.newCategoryFilterEvent.emit(undefined);
  //   this.newTagFilterEvent.emit(undefined);
  // }

}
