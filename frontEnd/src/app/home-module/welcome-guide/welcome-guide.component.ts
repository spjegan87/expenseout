import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../core-module/services/app.service';

declare var $: any;
/**
 * Author : Logesh
 * Desc :  welcome guide
 */

@Component({
    selector: 'app-welcome-guide',
    templateUrl: './welcome-guide.component.html',
    styleUrls: ['./welcome-guide.component.scss']
})
export class WelcomeGuideComponent implements OnInit {
    /**
    * Desc: on closing guide add class close design 
    */
    public toClose: boolean = false;
    /**
   *  slide position
   */
    public nextSlide: number = 1;
    /**
   *  json for slide data
   */
    public slideData: any;

    /**
   *  number of slides
   */
    public slidecount: number = 0;

    public widget:any [];
    /**
     * send flag
     */
    @Output() public showGuide: EventEmitter<boolean> = new EventEmitter();

    constructor(private appService: AppService) {
        this.widget=[];
        // this.widget = [
		// 	{
		// 		no: 1,
		// 		status: 'Y',
		// 		initial_no: 1,
		// 	},
		// 	{
		// 		no: 2,
		// 		status: 'Y',
		// 		initial_no: 2
		// 	},
		// 	{
		// 		no: 3,
		// 		status: 'N',
		// 		initial_no: 3
		// 	},
		// 	{
		// 		no: 4,
		// 		status: 'N',
		// 		initial_no: 4
		// 	},
		// 	{
		// 		no: 5,
		// 		status: 'N',
		// 		initial_no: 5
		// 	},
		// 	{
		// 		no: 6,
		// 		status: 'N',
		// 		initial_no: 6
		// 	},
		// 	{
		// 		no: 7,
		// 		status: 'N',
		// 		initial_no: 7
		// 	},
		// 	{
		// 		no: 8,
		// 		status: 'N',
		// 		initial_no: 8
		// 	},
		// 	{
		// 		no: 9,
		// 		status: 'N',
		// 		initial_no: 9
		// 	}
		// ];
    }

    ngOnInit() {
        /**
       * request for json file
       */
        this.appService.httpPost('notificationService', '', 'welcomeGuideContent').subscribe((data: any) => {
            this.slideData = data.content[0];
            this.widgetJsonBuilder();
            this.slideCounter();
        });
    }
      
     /**
   *  widget json formation for number of slides
   */
      public widgetJsonBuilder() {
        this.widget=[];
        this.slidecount = 0;
        this.slideData.forEach((topics: any) => {
            topics.content.forEach((value: any) => {
                this.titleStyleChanger(value);
                this.slidecount += 1;
                this.widget[this.slidecount-1]={
                    no: this.slidecount,
            		status: this.slidecount==1?'Y':'N',
            		initial_no: this.slidecount
                }
            })
        })
    }
    public titleStyleChanger(value){
        let title=value.title.split("<span>");
        value.title=title;
    }
    public widgetStatusChanger(currentStatus:number = 1){
        /* change all the status of widgets to N */
        this.widget.map((val: any) => {
            val.status = 'N';
        });
        /* change the status of widgets to Y until equal to current slide count*/
        this.widget.map((val: any) => {
            if (val.no <= currentStatus) {
              val.status = 'Y';
            }
          });
    }



    /**
   *  total slides calculator and adding a slide format for given json
   */
    public slideCounter() {
        this.slideData['slideSetup']=[];
        this.slidecount = 0;
        this.slideData.forEach((topics: any,i:number) => {
            this.slideData['slideSetup'][i]=[];
            topics.content.forEach((contents: any) => {
                this.slidecount += 1;
                contents.no = this.slidecount;
                    this.slideData['slideSetup'][i].push(this.slidecount);
            })
        })
    }
    ngOnChanges() {
        $('body').css("overflow", "hidden");
        
    }

    /**
   *  buttons handler
   */
    public closeModal(val: string): void {
        if (val == "close") {
            this.showGuide.emit(false);
        } else if (val == "next") {
            this.nextSlide += 1;
            this.widgetStatusChanger(this.nextSlide);
            $(".side-menu").removeClass("side-menu-clicked");
            /* dark background add ony selected */
            this.slideData.slideSetup.forEach((sidemenu:any , i:number)=>{
                if(sidemenu.indexOf(this.nextSlide) != -1){ 
                    $(".side-menu").removeClass("side-menu-clicked");
                    $('#side-menu-'+i).addClass("side-menu-clicked");
                }
            })
        } else if (val == "previous") {
            this.nextSlide -= 1;
            this.widgetStatusChanger(this.nextSlide);
            $(".side-menu").removeClass("side-menu-clicked");
            /* dark background add ony selected */
            this.slideData.slideSetup.forEach((sidemenu:any , i:number)=>{
                if(sidemenu.indexOf(this.nextSlide) != -1){ 
                    $(".side-menu").removeClass("side-menu-clicked");
                    $('#side-menu-'+i).addClass("side-menu-clicked");
                }
            })
        }
    }

    /**
   *  change the slide by side tab button
   */
    public slideChange(clicked, id) {
        /* dark background remove */
        $(".side-menu").removeClass("side-menu-clicked");
        /* dark background add ony selected */
        $(id).addClass("side-menu-clicked");
        /* selected slide made visible*/
        this.nextSlide = clicked;
        this.widgetStatusChanger(this.nextSlide);
        /* if selected side menu empty them last slide shown*/
        if (this.nextSlide == null) {
            this.nextSlide = this.slidecount;
            this.widgetStatusChanger(this.nextSlide);
        }
    }
}
