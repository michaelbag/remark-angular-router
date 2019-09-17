import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpHeaders, RequestOptions } from '@angular/common/http';
import { ConfigService, Config } from '../config/config.service';
import { Observable, throwError, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, retry, switchMap } from 'rxjs/operators';
import { MessageService } from '../message.service';

export interface Project {
  id: number;
  name: string;
  identifier: string;
  description: string;
  status: number;
  is_public: boolean;
  created_on: Date;
  updated_on: Date;
  homepage: string;
}

export interface Projects {
  projects: Project[];
  projects$: Observable<Project[]>;
  total_count: number;
  offset: number;
  limit: number;
}

export interface ProjectJson {
  project: Project;
}

@Injectable()
export class ProjectService {

  projectsList: Subject<Projects>;
  project: Subject<Project>;
  projectsURL: Subject<String>;

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  checkConfig() {
    if (!this.projectsURL) {
      this.projectsURL = new Subject<string>();
    };
    this.messageService.add('Should subscribe to config observer into projectService.');
    this.configService.getConfig()
      .subscribe((data: Config) => {
        this.projectsURL.next(data.redmineUrl);
        this.messageService.add(`Configuration loaded. Projects URL: ${data.redmineUrl}.`);
      });
  }

  getProjectsList(): Observable<Projects> {
    /*
    return
    this.configService.getConfig()
      .pipe(map((configData) => {
        console.log(`Projects list URL: ${configData.redmineUrl}/projects.json`);
        this.http.get<Projects>(`${configData.redmineUrl}/projects.json`)
          .pipe(retry(3),
          catchError(this.handleError))
      }));
    */



    this.checkConfig();

    if (!this.projectsList) {
      this.projectsList = new Subject<Projects>();
    };
    this.messageService.add('Should subscribe to projects observer.');
    this.projectsURL.subscribe((v) => {
      this.http.get(`${v}/projects.json`)
        .pipe(retry(3),
          catchError(this.handleError))
        .subscribe((projectsData: Projects) => {
          this.projectsList.next(projectsData);
        });
      this.messageService.add(`Try to load ${v}/projects.json`);
    });

    return this.projectsList;
  }

  getProject(id: string): Observable<Project> {

    this.checkConfig();
    if (!this.project) {
      this.project = new Subject<Project>();
    }

    this.messageService.add(`Try to get project from project/${id}.json`);

    // TODO: Put here "normal" code without static project id.
    this.projectsURL.subscribe((v) => {
      this.http.get(`${v}/project/${id}.json`)
        .pipe(
          retry(3),
          catchError(this.handleError),
        )
        .subscribe((projectData: ProjectJson) => {
          this.project.next(projectData.project);
          this.messageService.add(`Got project from ${v}/project/${id}.json`);
        });
    });

    return (this.project);
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
      'Something bad happened; please try again later.');
  }

}