import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, pluck } from 'rxjs/operators';

// Services 
import { IssueService, Issue } from '../issue.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private issueService: IssueService
    ) { }

  ngOnInit() {
  }

}