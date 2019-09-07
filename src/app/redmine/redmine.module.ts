import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// === Components
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';

// === Modules
import { MaterialModule } from '../material/material.module';
import { RedmineRoutingModule } from './redmine-routing.module';
import { ProjectService } from './project.service';
import { IssueService } from './issue.service';

@NgModule({
  imports: [
    CommonModule,
    RedmineRoutingModule,
    MaterialModule
  ],
  exports: [RedmineRoutingModule],
  declarations: [
    ProjectsComponent,
    ProjectComponent
  ],
  providers: [ProjectService, IssueService]
})
export class RedmineModule { }