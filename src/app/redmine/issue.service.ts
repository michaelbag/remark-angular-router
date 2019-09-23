import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConfigService, Config } from '../config/config.service';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, retry, switchMap } from 'rxjs/operators';
import { MessageService } from '../message.service';

// import { Project } from './project.service';

// TODO: All objects structure bring to redmine json format

export interface Status {
  id: number;
  name: string;
}

export interface Priority {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface CustomFieldValue {
  value: string;
}

export interface CustomField {
  id: number;
  name: string;
  multiple: boolean;
  value: CustomFieldValue | string;
}

export interface Version {
  id: number;
  name: string;
};

export interface IssueProject { 
  id: number;
  name: string;
};

export interface Issue {
  id: number;
  project: IssueProject;
  status: Status;
  priority: Priority;
  author: User;
  assined_to: User;
  fixed_version: Version;

  category: Category; // ???

  subject: string;
  description: string;
  start_date: Date;
  due_date: Date;
  done_ratio: number;
  is_private: boolean;
  estimated_hours: number;
  custom_fields: CustomField[];
  created_on: Date;
  updated_: Date;
  closed_on: Date;

  /*
  <?xml version="1.0" encoding="UTF-8"?>
<issues type="array" count="1640">
  <issue>
    <id>4326</id>
    <project name="Redmine" id="1"/>
    <tracker name="Feature" id="2"/>
    <status name="New" id="1"/>
    <priority name="Normal" id="4"/>
    <author name="John Smith" id="10106"/>
    <category name="Email notifications" id="9"/>
    <subject>
      Aggregate Multiple Issue Changes for Email Notifications
    </subject>
    <description>
      This is not to be confused with another useful proposed feature that
      customFields do digest emails for notifications.
    </description>
    <start_date>2009-12-03</start_date>
    <due_date></due_date>
    <done_ratio>0</done_ratio>
    <estimated_hours></estimated_hours>
    <CustomFields>
      <CustomField name="Resolution" id="2">Duplicate</CustomField>
      <CustomField name="Texte" id="5">Test</CustomField>
      <CustomField name="Boolean" id="6">1</CustomField>
      <CustomField name="Date" id="7">2010-01-12</CustomField>
    </CustomFields>
    <created_on>Thu Dec 03 15:02:12 +0100 2009</created_on>
    <updated_on>Sun Jan 03 12:08:41 +0100 2010</updated_on>
  </issue>
  <issue>
    <id>4325</id>
    ...
  </issue>
</issues>*/

}

export interface Issues {
  issues: Issue[];
  total_count: number;
  offset: number;
  limit: number;
}

@Injectable()
export class IssueService {

  issues: Issues;

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    private messageService: MessageService) {

  }

  getIssues(): Observable<Issues> {
    return (
      this.configService.getConfig()
        .pipe(switchMap((config: Config) =>
          this.http.get<Issues>(`${config.redmineUrl}/issues.json?key=${config.redmineApiKey}`) //, 'callback')
          /*jsonp<Issues>*/ 
            .pipe(
              retry(3),
              catchError(this.handleError),
            )
        ))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'IssueService. Something bad happened; please try again later.');
  }

}