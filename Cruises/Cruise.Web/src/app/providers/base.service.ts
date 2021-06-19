import { Observable, Subscription, throwError } from 'rxjs';

import { map, catchError, tap } from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class RestApiService implements OnInit {
  private baseUrl: string;
  private headers: HttpHeaders;
  private httpOptions: any;
  private filterObj = {};

  private dataFilterSubscription: Subscription;

  constructor(private _http: HttpClient,
  ) {
    this.baseUrl = '';
     this.headers = new HttpHeaders({
       'Content-Type': 'application/json'
     });
     this.httpOptions = {
       headers: this.headers
     };
  }
ngOnInit()
{

}
  public get = (url: string): Observable<any> => {
    console.log('sending get request at: ' + url);
    return this._http.get<any>(url).pipe(
        // .map((response) => response)
        catchError(this.handleError.bind(this)));
  }

  public post = (url: string, data: any): Observable<any> => {

    const dataToPost = JSON.stringify(data);
    console.log('sending post request at: ' + url);
    return this._http.post<any>(
      url, dataToPost, this.httpOptions).pipe(
        // .map((response) => response)
        catchError(this.handleError.bind(this)));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    // return observableThrowError(errorMessage);
    return throwError(errorMessage);
  }

  

}
