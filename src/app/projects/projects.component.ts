import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../model/project';
import { Category } from '../model/category';
import { Tag } from '../model/tag';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectsComponent implements OnChanges {
  @Input() categoryFilters?: Category[];
  @Output() onCategoryClicked = new EventEmitter<Category>();
  @Input() tagFilters?: Tag[];
  @Output() onTagClicked = new EventEmitter<Tag>();
  selectedProject?: Project;

  constructor(private projectService: ProjectService) { 
  }

  // load projects from the project service asynchronously on init
  projects: Project[] = [];
  getProjects(): void {
    this.projectService
      .getProjects(this.categoryFilters, this.tagFilters)
      .subscribe(projects => this.projects = projects);
  }
  ngOnInit(): void {
    this.getProjects();
  }

  ngOnChanges(): void {
    this.getProjects();
    console.log('categoryFilters child', this.categoryFilters);
    console.log('tagFilters child', this.tagFilters);
  }

  handleProjectClicked(project: Project): void {
    this.selectedProject = project;
  }

  clearSelectedProject(): void {
    this.selectedProject = undefined;
  }

  handleCategoryClicked(category: Category): void {
    console.log('categoryFilters child', this.categoryFilters);
    this.onCategoryClicked.emit(category);
  }
  
  handleTagClicked(tag: Tag): void {
    console.log('tagFilters child', this.tagFilters);
    this.onTagClicked.emit(tag);
  }

}

// addCategoryFilter(category: Category) {
  //   // don't add the category if it's already in the list
  //   if(this.categoryFilters.find(c => c.id === category.id)) {
  //     return;
  //   }
  //   this.categoryFilters.push(category);
  //   this.handleCategoryClicked.emit(category);
  // }

  // removeCategoryFilter(category: Category) {
  //   this.categoryFilters = this.categoryFilters.filter(c => c.id !== category.id);
  //   this.handleCategoryClicked.emit(category);
  // }

  // addTagFilter(tag: Tag) {
  //   // don't add the tag if it's already in the list
  //   if(this.tagFilters.find(t => t.id === tag.id)) {
  //     return;
  //   }
  //   this.tagFilters.push(tag);
  //   this.handleTagClicked.emit(tag);
  // }

  // removeTagFilter(tag: Tag) {

  // clearFilters() {
  //   this.categoryFilter = undefined;
  //   this.tagFilter = undefined;
  //   this.newCategoryFilterEvent.emit(undefined);
  //   this.newTagFilterEvent.emit(undefined);
  // }