import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

declare var $ : any;
declare let bodymovin: any;
  
/**
 * Author : Logesh
 * Desc :  expense expiry alert
 */


@Component({
  selector: 'app-default-popup',
  templateUrl: './default-popup.component.html',
  styleUrls: ['./default-popup.component.scss']
})
export class DefaultPopupComponent implements OnInit {

  @Input() public approvalPopup : any =[];

  @Output() public choosedVal : EventEmitter<boolean> = new EventEmitter();

  public toClose :boolean = false;

  constructor() { }
  
  public ngOnInit() : void {
  }
  
  ngOnChanges() {
    $('body').css("overflow", "hidden");
  }

  public closeModal(val:boolean) : void {
    this.toClose = true;
        $('#fn-background').removeClass('cls-background');
        $('body').css("overflow", "auto");
        setTimeout(() => {
          val=false;
          this.choosedVal.emit(val);
        }, 500);
  }
}



