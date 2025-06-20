import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { AppService } from '../../../core-module/services/app.service';
declare var $ : any;
/**
 * Author : Padma Priya CK
 * Desc :  user info
 */
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  /**
   * get image path
   */
  @Input() public userInput :any = {};
  /**
   * output data
   */
  @Output() public choosedVal: EventEmitter<boolean> = new EventEmitter();
  /**
   * userDetail
   */
  public userDetail :Array<any>=[];
   /**
   * Desc: on closing alert add class close design 
   */
  public toClose: boolean = false;
  constructor(private appService: AppService) { }

  public ngOnInit() : void{ 
    // console.log(this.userInput,this.userDetail);
    $('body').css("overflow", "hidden");
  }
  public ngOnChanges(){
    console.log(this.userInput['module'],this.userInput['value'] , this.userInput['action'],"action");
    this.appService.httpPost(this.userInput['module'],this.userInput['value'] , this.userInput['action'],'false').subscribe((data) => {
       console.log(data);
        this.userDetail = data.content;
      });
  }
  // public getval(data1,data2){
  //   console.log(data1,data2);
  // }
  public closeModal(val: boolean) : void {
    // console.log($('#reason').val());
    // if(this.userInput.reason){
      const dataVal : any = {
        flag : val
      }
        this.toClose = true;
        // $('.cls-popup').addClass('close-ani');
        $('#fn-background').removeClass('cls-background');
        $('body').css("overflow", "auto");
        setTimeout(() => {
          this.choosedVal.emit(dataVal);
        }, 400);
  }
}
