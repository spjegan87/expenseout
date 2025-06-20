import { Component,Input, Output, EventEmitter,OnInit } from '@angular/core';
declare var $ : any;
/**
 * Author: naveen
 * Powered by : Infiniti software solutions
 * Desc: image preview
 */
@Component({
  selector: 'app-imagepreview',
  templateUrl: './imagepreview.component.html',
  styleUrls: ['./imagepreview.component.scss']
})
export class ImagepreviewComponent implements OnInit{
  /**
   * get image path
   */
  @Input() public ImageUrl :string;
  /**
   * output data
   */
  @Output() public choosedVal: EventEmitter<boolean> = new EventEmitter();
   /**
   * Desc: on closing alert add class close design 
   */
  public toClose: boolean = false;
  /**
   * NgOninit
   */
  public ngOnInit() : void {
    $('body').css("overflow", "hidden");
    setTimeout (() => {
      // console.log("sadas")
    // $('#imah').zoom();
    $('#image').zoom({ on:'grab' });
    },10);
  }
  /**
   * close modal
   */
  public closeModal(){
    $('body').css("overflow", "auto");
    this.toClose = true;
    // setTimeout(() => {
      this.choosedVal.emit(false);
    // }, 400);
  }
}
