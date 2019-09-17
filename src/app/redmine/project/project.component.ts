import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

// Services 
import { ProjectService, Project } from '../project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  //TODO: Add service and loading one project information
  project: Project;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.title = "Project card";

    let id: string = this.route.snapshot.paramMap.get('id');

    // TOFIX: зацикливание подписок - что-то непонятно. Надо исправлять.

    this.projectService.getProject(id)
      .subscribe((projectData: Project) => {
        this.project = projectData;
        this.title = `Project ${projectData.name}`;
      });


  }

}