import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

// == Components
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { IssuesComponent } from './issues/issues.component';

const redmineRoute: Routes = [
  { path: 'issues', component: IssuesComponent },
  { path: 'project/:id', component: ProjectComponent },
  {
    path: 'projects', component: ProjectsComponent, children: [
      { path: 'detail/:id', component: ProjectComponent }
    ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(redmineRoute)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RedmineRoutingModule { }