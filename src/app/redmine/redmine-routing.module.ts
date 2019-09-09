import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

// == Components
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';

const redmineRoute: Routes = [
  { path: 'projects', component: ProjectsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(redmineRoute)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class RedmineRoutingModule { }