import { Component, Input, Output,EventEmitter, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-jump-page',
  templateUrl: './jump-page.component.html',
  styleUrls: ['./jump-page.component.scss']
})
export class JumpPageComponent implements OnChanges {

  constructor() { }
  /**
   * Jump to page value
   */
 public name = new FormControl('');
 /**
  * Jump to page boolean 
  */
  public jumpVal: boolean = true;
  /**
 * Get No.of pages in list  
 */
  @Input() public noOfPage: number = 0;
  /**
 * Get Current page in list  
 */
  @Input() public currentPage: number = 1;
    /**
   * Send current page no in list index component
   */
  @Output() public jumpToPage = new EventEmitter();
  ngOnChanges() {
  }
 
  /**
   * Desc:Jump to another page
   */
  public jumpPage() {
    this.jumpVal = false;
    if (this.name.value != ''){
      if (this.name.value <= this.noOfPage) {
        this.jumpVal = true;
        this.jumpToPage.emit(this.name.value);
      }
    }      
  }

}
