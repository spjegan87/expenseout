import { Component, OnInit, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { AppService } from "../../core-module/services/app.service";
import { config } from "../../core-module/config/app";
import { Router } from "@angular/router";
import { fadeAnimation } from "../../core-module/animation/route-animation";
import { urlConfig } from "../../core-module/config/url";
import { environment } from "../../../environments/environment";
import { Subject } from "rxjs";
import { takeUntil, take } from "rxjs/operators";
import { CompressionService } from "../../core-module/services/compression.service";
import { NgxImageCompressService } from 'ngx-image-compress';
import { CommonService } from "../../core-module/services/common.service";
declare var feather: any;
// declare function loginSuccess(): any;
declare var $: any;
declare let CryptoJS: any;
declare let CryptoJSAesJson: any;
declare var toastr: any;
/**
 * Modified By: Padma Priya CK
 * Module : home component
 * Powered by : Infiniti software solutions
 */
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [fadeAnimation],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   *UnSubscribe Observable
   */
  destroy$: Subject<boolean> = new Subject<boolean>();
  /**
   * My Eligibility
   */

  constructor(
    public appService: AppService,
    private router: Router,
    private compressImage: CompressionService,
		private imageCompress: NgxImageCompressService,
    public commonService: CommonService
  ) { }

  /**
   * Desc: Menu
   */
  public menus: any = [];
  /**
   * notification array
   */
  public notification: any = [];
  /**
   * userName
   */
  public userName: string = "";
  /**
   * Desc : currentlanguage
   */
  public currentLanguage: any;
  /**
   * Desc : user type
   */
  public userType: string = "";
  /**
   * active route
   */
  public activeRoute: string = "";
  /**
   * Desc : theme colour
   */
  public themeColour: string = "";
  /**
   * show notification
   */
  public showNotify: boolean = false;
  /**
   * Desc :email id
   */
  public emailId: string = "";
  /**
   * Logo path
   */
  public logoPath: string = "";
  /**
   * redirect path
   */
  public redirectPath: string = "";
  /**
   * the flag
   */
  public status: boolean = false;
  public openNotify: boolean = false;
  /**
   * animation
   */
  public toClose: boolean = true;
  /**
   * mobile view menu variable
   */
  public mobileMenu: any = [];

  /* *
  * config
  */
  public config: any;
  /**
   * Desc: component initialisation
   */
  /**
   * Eligibility Creteria
   */
  public eligibilityCreteria: any = [];

  public localCompressedURl:any;
  // create file from byte
  public imageFile:any;
  /**
   * 
   */
  public elgViolate;
  /**
   * 
   */
  public eligibilityCreteriaStatus: any;
  /**
   * eligibility Creteria Value
   */
  public eligibilityCreteriaValue: any = [];
  /**
   * Des:get the current url
   */
  public currentURL:any;
    /**
   * Des:get the current url
   */
  public adminUserType :any= {
    user: 'Admin',
    code: 'admin',
  }; 
  /**
   * lastLoginData
   */
  public lastLoginData : string = '';
  /**
   * is admin view
   */
  public isAdminView : boolean = true; //true
  /**
   * ngoninit
   */
  public ngOnInit(): boolean {
    this.config  = config;
    this.mobileMenu = {
      new: [
        {
          icon: "icon-1-home",
          name: "Home",
          action_name: "f90453ec712ce4505cc425e7e881e1d58ea274c3",
        },
        {
          icon: "icon-54-mbl-create",
          name: "Create Report",
          action_name: "B5241A3978E7463B6D5B40C5F6E1EB65A04FC001",
        },
        {
          icon: "icon-20-scan",
          name: "Scan Recipt",
          action_name: "0838A5F7D2D5AFA07539379F6FF4768AB0CC3B24",
        },
      ],
    };
    
    if(config.USER_TYPE == 'Corporate Admin'){
      // this.typeOfUser('Admin','admin');
      if(this.config.CONFIGSETTINGS?.defaultView){
        this.typeOfUser(this.config.CONFIGSETTINGS.defaultView , this.config.CONFIGSETTINGS.defaultView.toLowerCase());
      }
      else{
        this.typeOfUser('Admin','admin');
      }  
    }
    this.redirectPath = environment.aypPath;
    this.eligibilityCreteriaStatus = config.ELIGIBILITY_CRITERIA;
    this.logoPath = JSON.parse(
      CryptoJS.AES.decrypt(
        window.atob(localStorage.getItem("logoPath")),
        environment.DECRYPTION_KEY,
        { format: CryptoJSAesJson }
      ).toString(CryptoJS.enc.Utf8)
    );
    if (this.eligibilityCreteriaStatus === 'Y') {
      this.appService.httpPost("allowanceEligibilityCriteria", {}, "getAllowanceCriteriaDetails", 'false').pipe(takeUntil(this.destroy$)).subscribe((data) => {
        this.elgViolate = data.content.status;
        this.eligibilityCreteria = data.content;
        if (this.eligibilityCreteria.length > 0) {
          setTimeout(() => {
            this.changeLevel("Class A", 0);
          }, 1);
        }
      });
    }
    if ($("body").hasClass("dark")) {
      this.themeColour = "dark";
    } else {
      this.themeColour = "light";
    }
    this.language("en", "English");
    this.userName = config.USER_NAME;
    this.userType = config.USER_TYPE;
    this.emailId = config.USER_EMAIL;
    this.lastLoginData = this.appService.lastLoginData;
    this.openNotification();
    
    // config.AUTH_STATUS === true ? this.getMenu() : (this.menus = this.menus);

    // code for view default as user
    if(this.config.CONFIGSETTINGS?.defaultView){

      if(config.USER_TYPE !== 'Corporate Admin'){
        config.AUTH_STATUS === true ?  this.getMenu() : (this.menus = this.menus);
      }
      else{
        config.AUTH_STATUS === true ? (this.menus = this.menus) : this.getMenu();//this.getMenu() : (this.menus = this.menus);
      }
    }
    else{
      config.AUTH_STATUS === true ? this.getMenu() : (this.menus = this.menus);
    }

    return true;
  }
  public createReport(category: string) {
    if (category == "Create Report")
      this.appService.httpPost('expenseActions', { "userId": config.USER_ID }, 'reportNameGenerator').subscribe((data: any) => {
        this.router.navigate([
          './' +
          urlConfig.ROUTES.home +
          '/' +
          urlConfig.ROUTES.createExpense
        ], { state: { fetchData: data.content.result } });
      })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  /**
   * file upload
   */
  public onSelectFile(event) {
    var size = event.target.files[0].size;
    let image: File = event.target.files[0];
    if (event.target.files[0].type === 'application/pdf') {
			const fileData: any = new FormData();
			fileData.append('module', 'receiptHandler');
			fileData.append('action', 'fetchReceipt');
			fileData.append('file', event.target.files[0]);
			this.appService.httpPost('receiptHandler', fileData, 'fetchReceipt').subscribe((data) => {
				if (data.content.error !== true) {
         this.router.navigate([
          "./" + urlConfig.ROUTES.home + "/" + urlConfig.ROUTES.expenseVault,
          ]);
				}
				else{
					toastr.error('File Size is More than 2MB');
				}
			});
		} else{
      if (size < 2097152) {
        var reader = new FileReader();
          reader.onload = (event: any) => {
                this.compressFile(event.target.result, image.name, image);
          }
          reader.readAsDataURL((<HTMLInputElement>event.target).files[0]);
      } else {
        this.compressImage.compress(image)
        .pipe(take(1))
        .subscribe(compressedImage => {
          // now you can do upload the compressed image
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.compressFile(event.target.result, compressedImage.name, compressedImage);
            }
            reader.readAsDataURL(compressedImage);
        });
      }
    }
   
  }
  /**
   * service for list receipt
   */
  public service(val: any) {
    const fileData: any = new FormData();
    fileData.append("module", "receiptHandler");
    fileData.append("action", "fetchReceipt");
    fileData.append("file", val);
    let data = {
      module:'receiptHandler',
      action:'fetchReceipt',
      file:val
    }
    this.appService.httpPost("receiptHandler", data, "fetchReceipt", 'false').subscribe((_data) => {
        // window.location.reload();
        this.router.navigate([
          "./" + urlConfig.ROUTES.home + "/" + urlConfig.ROUTES.expenseVault,
        ]);
      });
  }

  /*
  * Des: Compress technic
  */

  public compressFile(image, fileName, val): void {
		var orientation = -1;
		this.imageCompress.compressFile(image, orientation, 50, 50).then((result) => {
			this.localCompressedURl = result;
			// create file from byte
			const imageName = fileName;
			this.imageFile = new File([ result ], imageName, { type: 'image/jpeg' });
			this.imageFile = new File([ result ], fileName, { type: 'image/jpeg' });
			let imageVal: any = {
				name: val.name,
				type: val.type,
				image: image
			};
      if(this.imageFile.size <= 2097152 && val.size <= 2097152){
        if (val.size <= 2097152) {
          imageVal['image'] = image;
          imageVal['size'] = val.size;
        } else {
          if (this.imageFile.size <= 2097152) {
            imageVal['image'] = this.localCompressedURl;
            imageVal['size'] = this.imageFile.size;
          } else {
            toastr.error('File too large even after compression');
          }
        }
        const formData: any = {
          name: val.name,
          size: val.size,
          type: val.type,
          image: image
        };
        this.appService
          .httpPost('receiptHandler', formData, 'scanForDuplicateReceipt')
          .subscribe((datadup) => {
            if (datadup.content.status === 'success') {
              this.appService
                .httpPost('receiptHandler', imageVal, 'insertReceipt')
                .subscribe((data) => {
                  // hideLoader();
                  if (data.content.error != true) {
                    config.EXPENSE_VAULT_CHANGES = true;
                    this.router.navigate([
                      "./" + urlConfig.ROUTES.home + "/" + urlConfig.ROUTES.expenseVault,
                    ]);
                  }
                });
            }
          });
      }
      else {
        toastr.error('File too large even after compression');
      } 
   });  
  
	}

  /**
   * showProfile
   */
  public showProfile(): void {
    this.router.navigate(
      ["./" + urlConfig.ROUTES.home + "/" + urlConfig.ROUTES.myProfile],
      {
        state: {
          type: "myprofile",
          userId: config.USER_ID,
        },
      }
    );
    $(".cls-user-profile").removeClass("show");
  }
  /**
   * Desc : animation function
   */
  // tslint:disable-next-line: no-any
  public getRouterOutletState(outlet: any): any {
    this.activeRoute = /[^/]*$/.exec(this.router.url)[0];
    return outlet.isActivated ? outlet.activatedRoute : "";
  }
  /**
   * Language
   */
  public language(code: string, type: string): void {
    $(".cls-langactive .dropdown-item").removeClass("active");
    $(".cls-" + code).addClass("active");
    config.CURRENTLANGUAGE = code;
    window.localStorage.setItem("language", code);
    // this.currentLanguage = type;
    this.currentLanguage = {
      language: type,
      code: code,
    };
  }
  /**
   * Desc: Logut
   */
  public logOut(): void {
    this.commonService.logOut('user logout');
    // config.CURRENTLANGUAGE = "EN";
    // window.localStorage.setItem("language", "en");
    // this.currentIndex = 0;
    // localStorage.removeItem('activeIndex');
  }
  @Input() public currentRouter: String = "";
  @Input() public routerPath: String = "";

  /**
   * Desc: Get menu from server
   */
  public getMenu(): boolean {
    this.appService.httpPost("menu", "", "displayMenu", 'false').subscribe((data) => {
      this.menus = data.content.menu;
      // setTimeout(() => {
      // feather.replace();
      // }, 200);
    });
    return true;
  }
  public ngAfterViewInit(): void {
    feather.replace();
  }
  /**
   * Desc : menu
   */
  public menuRouter(path: string): void {
    var resultRoute = /[^/]*$/.exec(this.router.url)[0];
    if (resultRoute === "B5241A3978E7463B6D5B40C5F6E1EB65A04FC001") {
      // alert("Please save changes in your form")
    } else {
      const pathRoute = "/e83249bd3ba79932e16fb1fb5100dafade9954c2/" + path;
      this.router.navigate([pathRoute]);
    }
  }
  /**
   * Desc: theme
   */
  public theme(value: string): void {
    this.themeColour = value;
    $(".cls-light-dark .dropdown-item").removeClass("active");
    $(".cls-" + value + "-img").addClass("active");
    if (value === "dark") {
      $("body").addClass(value);
    } else {
      $("body").removeClass("dark").addClass(value);
    }
  }
  /**
   * open theme box
   */
  public openTheme() {
    $(".cls-background").removeClass("d-none");
    $(".cls-theme-box").addClass("open-ani");
    $("body").addClass("cls-body-hidden");
  }

  public showGuide:boolean =false;

  public closeModel($event){
    this.showGuide = $event;
  }
  
  public welcomeGuideFlag(){
    this.showGuide = true;
  }

  /**
   * close theme box
   */
  public closeTheme() {
    $(".cls-background").removeClass("d-block").addClass("d-none");
    $(".cls-theme-box").removeClass("open-ani");
    $("body").removeClass("cls-body-hidden");
  }
  /**
   * change menu bg
   */
  public changeMenubg(val: string, cls: string) {
    $(".fn-bg-active").removeClass("active");
    $(".cls-" + cls).addClass("active");
    if (val === "white") {
      $(".fn-background")
        .removeClass("cls-lite-dark")
        .removeClass("cls-blue")
        .addClass("cls-normal");
    } else if (val === "dark") {
      $(".fn-background")
        .removeClass("cls-normal")
        .removeClass("cls-blue")
        .addClass("cls-lite-dark");
    } else {
      $(".fn-background")
        .removeClass("cls-normal")
        .removeClass("cls-lite-dark")
        .addClass("cls-blue");
    }
  }
  /**
   *
   */
  public changeStatus() {
    this.status == true ? (this.status = false) : (this.status = true);
    // this.openNotify == true ? this.openNotify = false : this.openNotify = true;
  }
  /**
   * open Notification
   */
  public openNotification() {
    this.appService
      .httpPost("notificationService", "", "getNotificationContent", "false")
      .subscribe((data: any) => {
        this.notification = data;
        this.showNotify = true;
        this.appService.notification = this.notification.content.count;
      });
  }
  /**
   * viewReport
   */
  public viewReport(usertype: any, reportValue: any, id: number): void {
    $(".cls-notification-bar").removeClass("show");
    let data = {
      reportname: reportValue.reportname,
      reportCode: reportValue.reportCode,
      reportId: reportValue.reportId,
    };
    this.router.navigate(
      ["./" + urlConfig.ROUTES.home + "/" + urlConfig.ROUTES.createExpense],
      {
        state: {
          reportid: data,
          path: usertype,
          tabName: 1,
          notificationId: id,
        },
      }
    );
  }
  /**
   * mark as read
   */
  public markAsRead() {
    this.appService
      .httpPost("notificationService", "", "markAsRead", 'false')
      .subscribe(() => {
        this.openNotification();
      });
  }
  /**
   * close menu bar
   */
  public closeNavigation() {
    $(".navigation").removeClass("open");
    $(".overlay").removeClass("overlay");
  }
  /**
   * My Eligibility
   */
  public openToggle() {
    $("#fn-eligibility-background").removeClass("d-none");
    $("#fn-eligibility-wrapper").addClass("open-ani");
    $("body").addClass("cls-body-hidden");
  }
  /**
   * close Eligibility
   */
  public closeToggle() {
    $("#fn-eligibility-wrapper").removeClass("open-ani");
    $("#fn-eligibility-background").removeClass("d-block").addClass("d-none");
    $("body").removeClass("cls-body-hidden");
  }
  /**
   * change eligiblity level
   */
  public changeLevel(value: string, id: number) {
    $(".cls-eligible .cls-eligible-a").removeClass("active");
    $(".cls-eligible-key" + id).addClass("active");
    this.eligibilityCreteriaValue = this.eligibilityCreteria[0][value];
  }
  public ngDoCheck() {
    this.currentURL=this.router.url.split("/") as any;
    
  }
  /*
  *Des: User Type
  *Au: Venkat
  */
 public typeOfUser(userType:string,code:string){
  let loaderTxt : string;
  //  console.log(userType,code);
   if(userType === 'Admin'){
     this.isAdminView = true;
    loaderTxt = 'Switching to admin view';
    // $(".switch-label-1").removeClass("cls-switch-ani").addClass("cls-switch-ani-1");
    // $(".switch-span-1").removeClass("cls-text-color");
    // $(".switch-span-2").addClass("cls-text-color");
    if(this.mobileMenu?.new?.length > 0){
      const tempObj = {
        icon: "fa fa-file-text-o",
        name: "Reports",
        action_name: "809D6F6292FE58719C5DF2582034B613E67159A8",
      }
      this.mobileMenu.new[1] = tempObj;
    }
   }
   else{
     this.isAdminView = false;
     loaderTxt = 'Switching to user view';
     const obj = {
        icon: "icon-54-mbl-create",
        name: "Create Report",
        action_name: "B5241A3978E7463B6D5B40C5F6E1EB65A04FC001",
      }
      this.mobileMenu.new[1] = obj;
    // $(".switch-label-1").removeClass("cls-switch-ani-1").addClass("cls-switch-ani");
    // $(".switch-span-2").removeClass("cls-text-color");
    // $(".switch-span-1").addClass("cls-text-color");
   }
  //  $(".cls-langactive .dropdown-item").removeClass("active");
  //  $(".cls-" + code).addClass("active");
   config.ADMIN_TYPE = code;
   let userView = code == 'user' ? 'adminUserView' : 'adminView';
   this.adminUserType = {
    user: userType,
    code: code,
   }
   this.appService.httpPost("menu", {view:userView}, "displayMenu",{val:'',text:loaderTxt} ).subscribe((data) => {
    this.menus = data.content.menu;
    const pathRoute = "/e83249bd3ba79932e16fb1fb5100dafade9954c2/" + this.menus[0].action_name;
    this.router.navigate([pathRoute]);
  });
 }

}
