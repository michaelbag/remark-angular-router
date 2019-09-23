import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IssueService, Issues } from '../issue.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  issues: Issues;

  constructor(private issueService: IssueService) { }

  ngOnInit() {

    this.issueService.getIssues()
    .subscribe((issuesData:Issues) => {
      this.issues = issuesData;
    });

  }

}