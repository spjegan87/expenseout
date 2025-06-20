import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { config } from '../config/app';
import { urlConfig } from '../config/url';

/**
 * Author: Shailesh R
 * Desc: Guard for controlling routes of the appication
 */

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  /**
   * Desc: Method which activates the routes specified in app routing
   */
  // tslint:disable-next-line: max-line-length
  public canActivate(): boolean {
    if (config.AUTH_STATUS === false) {
      this.router.navigate(['./' + urlConfig.ROUTES.auth]);
      localStorage.clear;
    }
    return config.AUTH_STATUS;
  }
}

/**
 * Desc: Guard to deactivate auth module while user logged in
 */
@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  /**
   * Desc: Method which deactivate auth module route while user logged in
   */
  public canActivate(): boolean {
    return !config.AUTH_STATUS;
  }
}
