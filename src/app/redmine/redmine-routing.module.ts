import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

// == Components
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';

const redmineRoute: Routes = [
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