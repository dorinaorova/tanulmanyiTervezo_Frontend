import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { AuthenticationService } from "../services/auth.service";


@Injectable()
export class UnauthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
            alert("A munkamenet lejárt!")
        }
        return throwError(err);
    }))
}
}

export const unAathInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: UnauthInterceptor, multi: true }
];