import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { environment } from '../../../environments/environment';
import { urlConfig } from '../config/url';
import { Router } from '@angular/router';
declare var jQuery: any;
// tslint:disable-next-line: no-any
declare let CryptoJS: any;

// tslint:disable-next-line: no-any
declare let CryptoJSAesJson: any;
/**
 * Author: Shailesh R
 * Modified By : Padma Priya CK
 * Request handler
 * Powered by : Infiniti software solutions
 */
@Injectable({
    providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    /**
     * Intercepts the request and encrypt request data and set headers
     * param request
     * param next
     */
    // tslint:disable-next-line: no-any
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!navigator.onLine && environment.networkError) {
            this.router.navigate(['./' + urlConfig.ROUTES.networkError]);
            return EMPTY;
        } else {
            if (request.body.action === "fetchReceipt" || request.body.action === "uploadReadFile" || request.body.action === "uploadMasterData") {
                let data: object | string = {};
                data = request.body.formData;
                request = request.clone({
                    body: data,
                    setHeaders: {
                        jwtAuthorization: localStorage.getItem('token'),
                        Authorization:
                            'Basic ' +
                            jQuery.base64.encode(environment.userName + ':' + environment.pwd)
                    },
                    withCredentials: true
                });
            }
            else if (request.body.module === 'JWT') {
                const formData: any = {
                    "jwtUserName": "expenseout",
                    "jwtPassword": "expenseout",
                    "module": "JWT"
                };
                const data: string = window.btoa(CryptoJS.AES.encrypt(JSON.stringify(formData), environment.ENCRYPTION_KEY,
                    { format: CryptoJSAesJson }).toString()
                );
                request = request.clone({
                    body: JSON.stringify(data),
                    setHeaders: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization:
                            'Basic ' +
                            jQuery.base64.encode(environment.userName + ':' + environment.pwd)
                    },
                    withCredentials: true,
                });
            } else {
                const data: string = window.btoa(CryptoJS.AES.encrypt(JSON.stringify(request.body), environment.ENCRYPTION_KEY,
                    { format: CryptoJSAesJson }).toString()
                );
                request = request.clone({
                    body: JSON.stringify(data),
                    setHeaders: {
                        'Content-type': 'application/x-www-form-urlencoded',
                        Authorization:
                            'Basic ' +
                            jQuery.base64.encode(environment.userName + ':' + environment.pwd),
                        jwtAuthorization: localStorage.getItem('token')
                    },
                    withCredentials: true,
                });
            }
            return next.handle(request);
        }
    }
}
