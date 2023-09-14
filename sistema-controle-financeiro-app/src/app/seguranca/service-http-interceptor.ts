import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { AuthService } from '../seguranca/auth.service';
import { Observable, from } from "rxjs";
import { Injectable } from "@angular/core";
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class ServiceHttpInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido()) {
            return from(this.auth.obterNovoAccessToken())
                .pipe(
                    mergeMap(() => {
                        req = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });

                        return next.handle(req);
                    })
                );
        }

        return next.handle(req);
    }
}