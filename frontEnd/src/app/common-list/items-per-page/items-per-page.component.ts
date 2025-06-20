import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-items-per-page',
  templateUrl: './items-per-page.component.html',
  styleUrls: ['./items-per-page.component.scss']
})
/**
 * Name : Meenakshi Sundaram R
 * Date : 25-06-2021
 * Desc : Items per page Component
 */
export class ItemsPerPageComponent implements OnChanges {

  constructor() { }
/**
 * Show List data default item count
 */
  @Input() public defaultItem: number = 10;
  /**
   * Select Item in select box & send to list index component
   */
  @Output() public selectedItemPerPage = new EventEmitter();
  // public items: Array<any> = ['All', 1, 2, 3, 5, 10, 50, 100];
  /**
   * Select box page array item
   */
  public items: Array<any> = [2,5,10,20,50,100];
/**
 * To Store Selected item in Items per page 
 */
  public selectedItem: number = 0;

/**
 * ngOnChanges
 */
  ngOnChanges(): void {
    this.selectedItem = this.defaultItem;
    // this.selectItem(this.selectedItem);
    // this.selectedItem === 0 ? this.selectedItem = 'All' : this.selectedItem;
  }

  /**
   * Desc : To get the Selected item value & Send to List Index component
   * @param val 
   */
  public selectItem(val: any) {
    this.selectedItem = val;
    // let emitVal: any = val == 'All' ? 0 : val;
    // this.selectedItemPerPage.emit(emitVal);
    this.selectedItemPerPage.emit(val);  //Emits Selected item
  }

}
