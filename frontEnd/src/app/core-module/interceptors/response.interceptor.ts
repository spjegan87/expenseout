import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { urlConfig } from '../config/url';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { config } from "../../core-module/config/app";

// tslint:disable-next-line: no-any
declare let CryptoJS: any;
declare function hideLoader(): any;
// tslint:disable-next-line: no-any
declare let CryptoJSAesJson: any;
/**
 * Author: Shailesh R
 * Modified By : Padma Priya CK
 * Response handler
 * Powered by : Infiniti software solutions
 */
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    /**
     * Desc:Retry flag sets true when the request needs retry
     */
    public retry: boolean = false;

    constructor(private router: Router, private appService: AppService) { }

    /**
     * Intercepts the response and decrypt the response data, and also handle errors
     * @param request input request
     * @param next next handler
     */
    // tslint:disable-next-line: no-any
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // tslint:disable-next-line: no-any
        return next.handle(request).pipe(map((event: any) => {

            if (event.type !== 0 && event.status === 200) {
                const response: object = JSON.parse(CryptoJS.AES.decrypt(window.atob(event.body), environment.DECRYPTION_KEY,
                    { format: CryptoJSAesJson }).toString(CryptoJS.enc.Utf8)
                );
                if (response['csrfToken'] != undefined && response['csrfToken'] != '') {
                    config.CSRF = response['csrfToken'];
                }
                event = event.clone({
                    body: response
                });
                if(event.body.content.case === 'JWT Expired'){
                    this.appService.httpPost('JWT', '', '', 'false').subscribe((data) => {
                        if (data['content']['token'] !== undefined) {
                            localStorage.setItem('token', data['content']['token']);
                        }
                    });
                }
            } else if (event.status === 403 || event.status === 401) {
                this.appService.httpPost('JWT', '', '', 'false').subscribe((data) => {
                    if (data['content']['token'] !== undefined) {
                        localStorage.setItem('token', data['content']['token']);
                    }
                });
            }
            return event;
        }), catchError((error: HttpErrorResponse) => {
            let data: object = {};
            data = {
                reason: error && error.error.reason ? error.error.reason : '',
                status: error.error
            };
            if (error.status === 404) {
                this.router.navigate(['./' + urlConfig.ROUTES.unauthorizedPage]);
                hideLoader();
            }
            return throwError(data);
        })
        );
    }
}
