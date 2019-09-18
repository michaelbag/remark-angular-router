import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
  redmineUrl: string;
  redmineApiKey: string;
  debug: boolean;
  production: boolean;
}

@Injectable()
export class ConfigService {

  config$: BehaviorSubject<Config>;
  /* = new BehaviorSubject<Config>({
    redmineApiKey: '', 
    redmineUrl: '', 
    debug: true, 
    production: false});
    */
  configLoaded: boolean = false;
  configUrl = '/assets/config.json';

  constructor(private http: HttpClient) { }

  loadConfig() {
    this.http.get<Config>(this.configUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      ).subscribe((configData: Config) => {
        this.config$.next(configData);
        // TODO: Remove. Control it by production parameter in Config.
        this.configLoaded = true;
      });
  }
  
  getConfigURL() {
    return this.configUrl;
  }

  reloadConfig() {
    this.loadConfig();
  }

  getConfigLoaded() {
    return this.configLoaded;
  }

  getConfig(): BehaviorSubject<Config> {
    if (!this.config$) {
      this.config$ = new BehaviorSubject<Config>({
        redmineApiKey: '', 
        redmineUrl: '', 
        debug: true, 
        production: false});
      this.loadConfig();
    }
    
    return (this.config$);
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
      'Config Service. Something bad happened; please try again later.');
  }
}