import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { urlConfig } from '../../../core-module/config/url';
/**
 * Author : Padma Priya CK
 * Desc :  unauthorized
 */
@Component({
  selector: 'app-unauthorized-page',
  templateUrl: './unauthorized-page.component.html',
  styleUrls: ['./unauthorized-page.component.scss']
})
export class UnauthorizedPageComponent{
  // constructor(private router: Router) { }
  
  /**
   * Desc : Refresh page
   */
  public login(): void {
    // console.log("dsdsd");
    window.location.reload();
    // this.router.navigate([ './' + urlConfig.ROUTES.auth ]);
  }

}
