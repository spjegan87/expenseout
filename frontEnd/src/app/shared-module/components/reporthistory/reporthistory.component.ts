import { Component,Output,EventEmitter,Input, OnChanges} from '@angular/core';
declare var $ : any;
/**
 * Author : Padma Priya CK
 * Desc :  report history
 */
@Component({
  selector: 'app-reporthistory',
  templateUrl: './reporthistory.component.html',
  styleUrls: ['./reporthistory.component.scss']
})
export class ReporthistoryComponent implements OnChanges{
/**
 * historyInput
 */
@Input() public historyInput : any =[];
/**
 * close button flag
 */
public toClose :boolean = false;
/**
 * Desc : output to close modal
 */
@Output() public closePopup : EventEmitter<boolean> = new EventEmitter();

  public ngOnChanges() : void {
    $('body').addClass('cls-body-hidden');
    // console.log(this.historyInput);
  }
  /**
 * Close modal
 */
  public closeModal(val:boolean) : void {
    this.toClose = true;
    $('body').removeClass('cls-body-hidden');
    setTimeout(()=>{
      this.closePopup.emit(val);
    },400);
  }
}
