import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { config } from '../../config/app';
import { AppService } from '../../services/app.service';
import { urlConfig } from '../../config/url';
import { IDataTypeConfig } from '../../interfaces/dataType.interface';
import { environment } from "../../../../environments/environment";

/**
 * Author: Shailesh R
 * Desc: Header component
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private appService: AppService, private router: Router) { 
    // Stable the active menu when refresh the page
    if(location.pathname.indexOf('/'+urlConfig.ROUTES.home+'/') !== -1){
      this.currentIndex = JSON.parse(localStorage.getItem('activeIndex') || '{}');
    };
  }
  /**
   * userName
   */
  public userName : any;
  /**
   * Desc: Differentiate before and after login headers
   */
  @Input() public home: boolean = config.AUTH_STATUS;
  @Input() public  currentRouter : String = '';
  @Input() public  routerPath : String = '';
  @Input() public  userInfo : any = [];
  dashboardRoute :any;
   /**
   * Desc: Language value
   */
  public languageData: IDataTypeConfig = {};
  /**
   * Desc: Language value
   */
  public choosenLanguage: IDataTypeConfig = {
    name: ''
  };
  /**
   * Desc: Store current language
   */
  public language: any = config.CURRENTLANGUAGE;
  /**
   * Desc: Menu
   */
  public menu: any = [];
  /**
   * Desc: expenseMenu
   */
  public expenseMenu: any = [];
  /**
   * Desc: Url data
   */
  public urlData = urlConfig.ROUTES;
  /**
   * Desc: currentIndex
   */
  public currentIndex : number = 0;
  /**
   * Desc: component initialisation
   */
  public ngOnInit(): boolean {
    this.userName = config;
    // console.log(config,config.USER_NAME,this.userName);
    return true;
  }
  /**
   * Desc: setLanguage
   */
  public setLanguage(index: any): void {
    config.CURRENTLANGUAGE = this.languageData.index;
    this.choosenLanguage = this.languageData.index;
    window.localStorage.setItem('language', index);
  }
  /**
   * active index
   */
  public activeIndex(index: number) : void {
    this.currentIndex = index;
    localStorage.setItem('activeIndex', JSON.stringify(this.currentIndex));
  }
  /**
   * Desc: Logout
   */
  public logOut(): void {
    this.appService.httpPost("logout", 'user logout', "", 'false').subscribe((data: any) => {
      if (data.content.logout === true) {
        this.home = false;
        config.AUTH_STATUS = false;
        this.appService.deleteAllCookies();
        localStorage.clear();
        if (this.appService.SSODetails !== "") {
          document.location.href = environment.aypPath.replace(
            "index",
            "logout"
          );
        } else {
          this.router.navigate(["./" + urlConfig.ROUTES.auth]);
        }
        // hideLoader();
      }
    });
    this.currentIndex = 0;
    localStorage.removeItem('activeIndex');
  }
  /**
   * user profile
   */
  public userProfile() : void {
    this.router.navigate(['e83249bd3ba79932e16fb1fb5100dafade9954c2/fce68ce51c366128a156a0801b4b7bccb129bcbc'])
  }
}
