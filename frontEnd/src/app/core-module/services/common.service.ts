import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { environment } from 'src/environments/environment';
import { config } from './../../core-module/config/app';

/**
 * Author : Naveen.s
 * Desc: Service for logout (sso and coporate login)
 * Powered by : Infiniti software solutions
 */

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(public appService: AppService) { }
  /**
   * logout
   */
  public logOut(type:string): void {
    this.appService.httpPost("logout", type, "", {val:'',text:'Signing Out'}).subscribe((data: any) => {
      if (data.content.logout === true) {
        config.AUTH_STATUS = false;
        this.appService.deleteAllCookies();
        localStorage.clear();
        if (this.appService.SSODetails !== "") {
          document.location.href = environment.aypPath.replace(
            "index",
            "logout"
          );
        } else {
          // this.router.navigate(["./" + urlConfig.ROUTES.auth]);
          window.sessionStorage.clear();
          window.location.reload();
        }
      }
    });
  }
}
