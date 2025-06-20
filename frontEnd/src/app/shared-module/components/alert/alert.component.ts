import { Component, OnChanges, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
declare var $: any;
declare var feather: any;
/**
 * Author : Naveen
 * Desc :  alert
 */
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnChanges, AfterViewInit {
  /**
 * get image path
 */
  @Input() public userInput: any = {};
  /**
   * output data
   */
  @Output() public choosedVal: EventEmitter<boolean> = new EventEmitter();
  /**
  * Desc: on closing alert add class close design 
  */
  public toClose: boolean = false;
  constructor() { }

  ngOnInit() {
    //   setTimeout(() => {
    //   feather.replace();
    // }, 200);
  }
  ngOnChanges() {
    $('body').css("overflow", "hidden");
    console.log(this.userInput,"get")
  }
  public ngAfterViewInit(): void {
    feather.replace();
  }
  public closeModal(val: boolean): void {
    // console.log($('#reason').val());
    // if(this.userInput.reason){
    const dataVal: any = {
      flag: val
    }
    if (val === true && this.userInput.reason) {
      // if(this.userInput.reason) {
      dataVal['data'] = {
        'comment': $('#reason').val()
      }
      if ($('#reason').val() !== '') {
        this.toClose = true;
        // $('.cls-popup').addClass('close-ani');
        $('#fn-background').removeClass('cls-background');
        $('body').css("overflow", "auto");
        setTimeout(() => {
          this.choosedVal.emit(dataVal);
        }, 400);
      } else {
        $('#reason').addClass('cls-error');
      }
      // } else {
      //     this.toClose = true;
      //     $('.cls-popup').addClass('close-ani');
      //     $('#fn-background').removeClass('cls-background');
      //     this.choosedVal.emit(dataVal);
      // }
    } else {
      this.toClose = true;
      // $('.cls-popup').addClass('close-ani');
      dataVal['data'] = {
        'comment': $('#reason').val()
      }
      $('#fn-background').removeClass('cls-background');
      $('body').css("overflow", "auto");
      setTimeout(() => {
        this.choosedVal.emit(dataVal);
      }, 400);
    }
  }
  /**
   * removeError
   */
  public removeError(): void {
    if ($('#reason').val().length > 0) {
      $('#reason').removeClass('cls-error');
    }
  }
}
