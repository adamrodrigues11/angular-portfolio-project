import { Component, Input } from '@angular/core';
import { Project } from '../model/project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {
  @Input() project?: Project;
}
