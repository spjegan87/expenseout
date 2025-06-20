import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
declare var $ : any;
declare let bodymovin: any;
/**
 * Author: Padma Priya CK
 * Powered by : Infiniti software solutions
 * Desc: approval alert 
 */
@Component({
  selector: 'app-approval-alert',
  templateUrl: './approval-alert.component.html',
  styleUrls: ['./approval-alert.component.scss']
})
export class ApprovalAlertComponent implements OnInit {
/**
 * approval alert input data
 */
@Input() public approvalAlertInput : any =[];
/**
 * Desc : output to close modal
 */
@Output() public choosedVal : EventEmitter<boolean> = new EventEmitter();
/**
 * close button flag
 */
public toClose :boolean = false;
/**
 * approval head
 */
@Input() public approvalAlertHead : string;
/**
 * onInit
 */
public ngOnInit() : void {
    $('body').addClass('cls-body-hidden');
    this.lotyAnimation();
  }
   /**
   * animation
   */
  public lotyAnimation(): void {
    // setTimeout(() => {
      bodymovin.loadAnimation({
        container: document.getElementById('bodymovin'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: '../../../../assets/data/lottie-success-animation.json'
      });
    // }, 1);
    // setTimeout(() => {
      $('.cls-alert-text').removeClass('d-none');
    // });
  }
/**
 * Close modal
 */
public closeModal(val:boolean) : void {
  this.toClose = true;
  $('body').removeClass('cls-body-hidden');
  // setTimeout(()=>{
    this.choosedVal.emit(val);
  // },500);
}
}
