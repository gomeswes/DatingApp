import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    return throwError(error.statusText);
                }
                // const applicationError = error.headers.get('Application-Error'); //not working on dotnetcore 2.2
                const applicationError = error.error;
                if ( typeof applicationError === 'string' ) {
                    return throwError(applicationError);
                }
                const serverError = applicationError.errors;
                let modalStateErrors = '';
                if (serverError && typeof serverError === 'object') {
                    for (const key in serverError) {
                        if (serverError[key]) {
                            modalStateErrors += serverError[key] + '\n';
                        }
                    }
                }
                return throwError(modalStateErrors || serverError || 'Server Error');
            }
          })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
