import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';



@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    //base url
    baseRoot: any = environment.baseUrl;
    apiUrl: any = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: any = 'tidjrhoc9adpi6na5jvllma841';

        if (token) {
            request = request.clone({
                headers: request.headers.set('Authorization', token)
            },);
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Content-Type', 'application/x-www-form-urlencoded' ) });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                //duplicate session
                switch (error.error.reason) {

                }
                if (error.error.reason === 'authentication_failure' && error.error.data !== 'Auth Token not valid or expired or tampered') {
                   
                } else if (error.error.reason === 'authentication_failure' && error.error.data === 'Auth Token not valid or expired or tampered') {
                   
                }
                return throwError(error);
            }));
    }
}