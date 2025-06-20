import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnChanges {

  constructor() { }

  /**
   * Category Data
   */
  @Input() public category: Array<any> = [];
  /**
   * Send Selected category value to list index component
   */
  @Output() public selectedCategory = new EventEmitter();
  /**
   * Back action get from list index component
   */
  @Input() public backToBack: boolean = false;
  /**
   * Back action event send to list index component
   */
  @Output() public backActionEvent = new EventEmitter();

  ngOnChanges(): void {

  }

  // radio btn functionality
  public clickusertype(id: string, userBased: boolean) {
    console.log(id, userBased);
    this.category?.map((data: any) => data.status = 'N');
    this.category?.filter((data: any) => data.id == id ? data.status = 'Y' : 'N');
    let request = {
      "tab": id,
      "userBased": userBased,
    }
    this.selectedCategory.emit(request);
  }
  backTo() {
    this.backToBack = false;
    this.backActionEvent.emit({"status":true});
  }
}
