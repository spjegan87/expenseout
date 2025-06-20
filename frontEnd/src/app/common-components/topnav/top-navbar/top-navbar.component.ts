import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnChanges {
  /**
   * Top nav data
   */
  @Input() public tabData: Array<any> = [];
  /**
   * Send tab Index to parent 
   */
  @Output() public emitTab = new EventEmitter();
  /**
   * Selected index
   */
  public clickedIndex: number = 0;
  /**
   * Get Top navbar count from tab component
   */
  @Input() public tabCount: Array<any> = [];
  /**
   * Loader
   */
  @Input() public loader: boolean = false;

  constructor() { }

  ngOnChanges(): void {
// console.log(this.tabCount,"ccc")
  }

  public masterDataCall(index: number, data: object = {}) {
    this.clickedIndex = index;
    let request = {
      "index": this.clickedIndex,
      "value": data
    };
    // console.log(request);
    this.emitTab.emit(request);  //Emits request to parent
  }

}
