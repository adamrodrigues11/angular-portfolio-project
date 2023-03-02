import { Injectable } from '@angular/core';
import { Project } from './model/project';
import { PROJECTS } from './data/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor() { }
  getProjects(): Project[] {
    return PROJECTS;
  }
}
