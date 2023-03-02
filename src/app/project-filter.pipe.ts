import { Pipe, PipeTransform } from '@angular/core';
import { Project} from './model/project';
import { Tag } from './model/tag';

@Pipe({
  name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {

  transform(projects: Project[], tag: Tag | undefined): Project[] {
    let filteredProjects: Project[] = [];
    if (tag) {
      filteredProjects = projects.filter(project => {
        return JSON.stringify(project.tags).indexOf(JSON.stringify(tag)) > -1;
      });
    } else {
      filteredProjects = projects;
    }
    return filteredProjects;
  }
}