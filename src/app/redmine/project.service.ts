import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpHeaders, RequestOptions } from '@angular/common/http';








import { ConfigService, Config } from '../config/config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';

export interface Project {
  id: number;
  name: string;
  identifier: string;
  description: string;
  status: number;
  is_public: boolean;
  created_on: Date;
  updated_on: Date;
  homepage: String;
}

export interface Projects {
  projects: Project[];
  projects$: Observable<Project[]>;
  total_count: number;
  offset: number;
  limit: number;
}

@Injectable()
export class ProjectService {

  constructor(private configService: ConfigService, private http: HttpClient) {

  }
// ??????????????????????????????????????
  getProjectsList(): Observable<Projects> {
    return (
      this.configService.getConfig()
        .pipe(switchMap(configData => {
          this.http.get(`${configData.redmineUrl}/projects.json`, {
            headers: { 'Access-Control-Allow-Origin': '*', 'X-Redmine-API-Key': configData.redmineApiKey },
            params: { 'key': configData.redmineApiKey }
          })
            .pipe(
              retry(3),
              catchError(this.handleError) // then handle the error
            )
        }
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
      'Something bad happened; please try again later.');
  }

}