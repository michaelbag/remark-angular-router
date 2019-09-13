import { Component, OnInit } from '@angular/core';
import { ProjectService, Projects, Project } from '../project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Projects;

  constructor(private projectService: ProjectService) { }
  
  ngOnInit() {
    
    this.projectService.getProjectsList()
      .subscribe( (projectsData) => {
        this.projects = projectsData
      });
    
  }

}