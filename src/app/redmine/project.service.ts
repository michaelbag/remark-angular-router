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

// TODO: Remove it
export interface ProjectJson {
  project: Project;
}

@Injectable()
export class ProjectService {

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getProject(id: string): Observable<Project> {
    return (this.configService.getConfig()
      .pipe(switchMap((config: Config) =>
        this.http.get(`${config.redmineUrl}/project/${id}.json`)
          .pipe(
            retry(3),
            catchError(this.handleError),
            map(data => { return data["project"] })
          )
      ))
    ); // return getProject2
  }

  getProjectsList(): Observable<Projects> {
    return (
      this.configService.getConfig()
      .pipe(switchMap((config:Config) => 
        this.http.get<Projects>(`${config.redmineUrl}/projects.json`)
        .pipe(
          retry(3),
          catchError(this.handleError)
        )
      ))
    )
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
      'PtojectService. Something bad happened; please try again later.');
  }

}