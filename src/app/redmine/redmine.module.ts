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
import { IssuesComponent } from './issues/issues.component';
import { IssueComponent } from './issue/issue.component';

@NgModule({
  imports: [
    CommonModule,
    RedmineRoutingModule,
    MaterialModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectComponent,
    IssuesComponent,
    IssueComponent
  ],
  providers: [ProjectService, IssueService]
})
export class RedmineModule { }