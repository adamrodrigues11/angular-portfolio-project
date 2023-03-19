import { Pipe, PipeTransform } from '@angular/core';
import { Project} from './model/project';
import { Tag } from './model/tag';

@Pipe({
  name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {

  transform(projects: Project[], tags?: Tag[]): Project[] {
    let filteredProjects: Project[] = [];
    if (tags?.length) {
      filteredProjects = projects.filter(project => {
        return tags.some(tag => {
          JSON.stringify(project.tags).indexOf(JSON.stringify(tag)) > -1;
        }); 
      });
    } else {
      filteredProjects = projects;
    }
    return filteredProjects;
  }
}

// need to return the union of both filtering arrays (pass a multidimensional array to the pipe)