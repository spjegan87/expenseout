import { Component, OnInit, DoCheck, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
// import { LoggerService } from './core-module/services/logger.service';
import { Router, NavigationStart } from '@angular/router';
import { config } from './core-module/config/app';
import { urlConfig } from './core-module/config/url';
import { environment } from './../environments/environment';
import { MessagingService } from './core-module/services/messaging.service';
import { LoginService } from './core-module/services/login.service';
import { AppService } from './core-module/services/app.service';
import { CommonService } from './core-module/services/common.service';
declare var $: any;
declare var toastr: any;
/**
 * Author: Shailesh Rge
 * Desc: Root component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  public title: string = "push-notification";
  /**
   * alert show flag
   */
  public showAlert: boolean = false;
  /**
   * noInternet
   */
  public noInternet: boolean = false;
  /**
   * alert content
   */
  public alertContent: any = {};
  /**
   * cookieshow
   */
  // public cookieShow : any ;
  /**
   * Desc: Header flag
   */
  public home: boolean = false;
  public route: String = '';
  public userName: String = '';
  public urlState: any;
  public getCurrentUrl: string = '';
  public userActivity;
  public userInactive: Subject<any> = new Subject();
  /**
   * loader
   */
  public loader: string = 'false';
  /**
   * loader text
   */
  public loaderText: string = '';
  public idleTime(): void {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 10 * 60 * 1000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.idleTime();
  }
  /**
   * Des: Before unload event for logout call
   */
  //  @HostListener('window:beforeunload', ['$event'])
  //  donothing($event: any): any {
  //    if (config.AUTH_STATUS) {
  //      return $event.returnValue = 'Changes you made may not be saved.';
  //    }
  //  }
  //  @HostListener('window:unload', [])
  //  leavefunction() {
  //   if (config.AUTH_STATUS) {
  //     this.logout();
  //    }
  //  }
  constructor(public appService: AppService, private router: Router,
    private loginService: LoginService,
    private messagingService: MessagingService,
    private commonService: CommonService
  ) {
    const paramHash = (window.location.href).split("user=");
    if (paramHash.length > 1) {
      const splitedParam = paramHash[1].split("&type=");
      this.appService.resetPasswordUrl = splitedParam[0];
      this.appService.resetPasswordType = splitedParam[1];
    }
    this.idleTime();
    this.userInactive.subscribe(() =>
      this.sessionOut()
    );
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.route = event.url.replace('/', '');
        this.urlState = this.route.split('/');
        this.urlState = this.getKeyByValue(urlConfig.ROUTES, this.urlState[1]);
        this.urlState = this.changeUpperCase(this.urlState);
      }
    });
    if (location.hash === '#/7886BB5849E7E5C8542CA79F1E58FF8AE03478A5') {
      this.router.navigate(['../../' + urlConfig.ROUTES.auth]);
    }
    // if(location.pathname.indexOf('/'+urlConfig.ROUTES.home+'/') !== -1){
    this.getCurrentUrl = location.pathname.replace('/' + urlConfig.ROUTES.home + '/', '');
    // };
  }
  /**
   * sessionOut
   */
  public sessionOut(): void {
    if (this.home === true) {
      toastr.error('System is idle for 10 minutes');
      // localStorage.setItem('cookie','false');
      this.commonService.logOut('auto logout');
      // localStorage.setItem('cookie','false');
      // this.router.navigate([urlConfig.ROUTES.auth]);
      // this.home = false;
      // config.AUTH_STATUS = false;
      // this.router.navigate([ './' + urlConfig.ROUTES.auth ]);
    }
  }
  /**
   * logout
   */
  // public logout(){
  //   this.appService.httpPost('logout', 'auto logout', '','false').subscribe((data: any) => {
  //     console.log(data,this.appService.SSODetails,'hh');
  //     if (data.content.logout === true) {
  //       this.home = false;
  //       config.AUTH_STATUS = false;
  //       this.cookieShow = false;
  //       this.appService.deleteAllCookies();
  //       localStorage.clear();
  //       if(this.appService.SSODetails !==''){
  //         document.location.href = environment.aypPath.replace("index","logout");
  //       } else{
  //         this.router.navigate([ './' + urlConfig.ROUTES.auth ]);
  //       }
  //     }
  //   });
  // }
  /**
   * Desc: Component initialisation
   */
  public ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    // this.cookieShow = localStorage.getItem('cookie');

    // this.jwtToken();
    if (environment.invalidAccessAlert) {
      $(document).keydown((event: any) => {
        let key: boolean = true;
        if (event.keyCode === 123) { // Prevent F12
          this.invalidAccess();
          key = false;
        } else if (event.ctrlKey && event.shiftKey && event.keyCode === 73 || (event.ctrlKey && (event.keyCode === 85))) {
          // Prevent Ctrl+Shift+I
          this.invalidAccess();
          key = false;
        }
        return key;
      });
      $(document).on('contextmenu', (comp: any) => {
        this.invalidAccess();
        comp.preventDefault();
      });
    }
    // if(location.pathname.indexOf('/sso/') == -1) {
    var loginCheckData = {
      formValue: {
        action: 'checkUserLogin',
        url: this.getCurrentUrl
      }
    }
    this.loginService.userLoginSSO(loginCheckData);
    // }
    return true;
  }
  /**
   * DoCheck
   */
  public ngDoCheck(): void {
    if (!navigator.onLine && environment.networkError) {
      this.noInternet = true;
    } else {
      this.noInternet = false;
    }
    if (this.appService.loader === '') {
      this.loader = this.appService.loader;
      this.loaderText = this.appService.loaderText;
    }
  }
  /**
   * movetoTop
   */
  public movetoTop(): void {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }
  /**
   * Desc: Component initialisation
   */
  public changeOfRoutes(): void {
    this.home = config.AUTH_STATUS;
    this.userName = config.USER_NAME;
    const userRoutes: any = ['auth', 'networkError', 'home', 'login', 'myProfile', 'unauthorizedPage', 'dashboard', 'createExpense', 'expenseVault', 'advanceModule','expenseReport'];
    const approverRoutes: any = ['auth', 'home', 'networkError', 'login', 'myProfile', 'unauthorizedPage', 'dashboard', 'createExpense', 'expenseVault', 'advanceModule', 'pendingApprovals','expenseReport'];
    const financeRoutes: any = ['auth', 'home', 'login', 'networkError', 'myProfile', 'unauthorizedPage', 'dashboard', 'createExpense', 'expenseVault', 'advanceModule', 'pendingApprovals', 'pendingSettlement','expenseReport'];
    const adminRoutes: any = ['auth', 'home', 'login', 'myProfile', 'networkError', 'unauthorizedPage', 'users', 'dashboard', 'createExpense', 'expenseVault', 'advanceModule', 'pendingApprovals', 'pendingSettlement', 'policySettings', 'manageprofile', 'masterData', 'expenseReport'];
    var str = this.router.url;
    var activeUrl = str.lastIndexOf("/");
    Object.keys(urlConfig.ROUTES).find(key => urlConfig.ROUTES[key] === str.substring(activeUrl + 1));
    var routeName = Object.keys(urlConfig.ROUTES).find(key => urlConfig.ROUTES[key] === str.substring(activeUrl + 1));
    switch (config.USER_TYPE) {
      case 'User':
        if (userRoutes.includes(routeName) === false) {
          this.home = false;
          config.AUTH_STATUS = false;
          this.router.navigate(['./' + urlConfig.ROUTES.auth]);
        }
        break;
      case 'Corporate Admin':
        if (adminRoutes.includes(routeName) === false) {
          this.home = false;
          config.AUTH_STATUS = false;
          this.router.navigate(['./' + urlConfig.ROUTES.auth]);
        }
        break;
      case 'Approver':
        if (approverRoutes.includes(routeName) === false) {
          this.home = false;
          config.AUTH_STATUS = false;
          this.router.navigate(['./' + urlConfig.ROUTES.auth]);
        }
        break;
      case 'Finance':
        if (financeRoutes.includes(routeName) === false) {
          this.home = false;
          config.AUTH_STATUS = false;
          this.router.navigate(['./' + urlConfig.ROUTES.auth]);
        }
        break;
      default:
        break;
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.route = event.url.replace('/', '');
        this.urlState = this.route.split('/');
        this.urlState = this.getKeyByValue(urlConfig.ROUTES, this.urlState[1]);
        this.urlState = this.changeUpperCase(this.urlState);
      }
    });
  }

  /**
   * Desc: Get url key
   */
  public getKeyByValue(object: any, value: string): any {
    return Object.keys(object).find(key => object[key] === value);
  }

  /**
   * Desc: Get first letter upper case of url
   */
  public changeUpperCase(value: string): any {
    if (typeof value == 'undefined')
      return '';
    let url = value.split(/(?=[A-Z])/).join(' ');
    let urlstate = url.toLowerCase();
    return urlstate && urlstate[0].toUpperCase() + urlstate.slice(1);
  }
  /**
   * Desc : Show alert
   */
  public invalidAccess(): void {
    this.showAlert = true;
    this.alertContent = {
      title: `You can't access this feature in this site`,
      button: [
        {
          label: 'Ok',
          status: true
        }
      ]
    };
  }
  /**
   * acceptCookie
   */
  public acceptCookie(): void {
    localStorage.setItem('cookie', 'false');
    //  this.cookieShow = false;
  }
  /**
   * DEsc : alertInfo
   */
  public alertInfo(_data: any): void {
    this.showAlert = false;
  }
}
