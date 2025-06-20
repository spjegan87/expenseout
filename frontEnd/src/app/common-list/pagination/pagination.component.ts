import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
/**
 * Name : Meenakshi Sundaram R
 * Date : 25-06-2021
 * Desc : Pagination Component
 */
export class PaginationComponent implements OnChanges {

  constructor() { }
/**
 * Get No.of pages in list  
 */
  @Input() public pages: number = 0;
  /**
   * Get Current page in list
   */
  @Input() public currentPage: number = 1;
  /**
   * Get List body length
   */
  @Input() public totalRecords: number = 0;
  /**
   * Get No.of items show in list
   */
  @Input() public pageItem: number = 0;
  /**
   * Send current page no in list index component
   */
  @Output() public currentPageVal = new EventEmitter();
  /**
   * List data page no 
   */
  public items: Array<any> = [];
  /**
   * Default / Selected page no
   */
  public selectedPage: number = 1;
  /**
   * Pagination change list items show from data calculate in default data
   */
  public showFrom: number = 0;
  /**
   * Pagination change list items show to data calculate in default data
   */
  public showTo: number = 0;
  @Input() public defaultData: number = 0;

  ngOnChanges() {
    this.selectedPage = this.currentPage;  //Current page
    // console.log(this.selectedPage,this.currentPage,"sp1");
    this.items = [];
    for (let i = 0; i < this.pages; i++) {
      this.items.push((i + 1))   //Page no
    }
    this.loadPage();
   (this.selectedPage != 0) ? this.showPageList(this.selectedPage) : this.showPageList(1); //No of items show on condition based
  }

  /**
   * Desc : Move to Previous & Next page
   * @param item
   * @returns 
   */
  moveToPage(item: number) {
    this.selectedPage = item;
    this.loadPage();
    this.showPageList(item)
    return this.currentPageVal.emit(item);
  }

  /**
   * Desc : Show From & to value in list & change page from & to value change calculation based on list body length
   * @param val 
   */
  public showPageList(val: number) {
    let defaultShowData = (this.defaultData == this.pageItem) ? this.defaultData : this.pageItem;  //Default Show data in List 
    this.showFrom = ((val - 1) * defaultShowData) + 1;  //First value
    this.showTo = (this.showFrom + defaultShowData); 
    // console.log("from " + (this.showFrom) + " to " + ((this.showTo - 1) > this.totalRecords ? this.totalRecords : (this.showTo - 1)));
    this.showTo = ((this.showTo - 1) > this.totalRecords ? this.totalRecords : (this.showTo - 1));//Last value
  }

  /**
   * List page value increases then show ellipsis dynamically in pagination
   */
  loadPage() {
    let thisVar = this;
    let beforeElement = '<li class="cls-pagination-item ellipsis" id="pagePrev"><a class="page-link" href="javascript:;" title="pageprev"><em class="icon-62-openmenu"></em> </a></li>';
    let afterElement = '<li class="cls-pagination-item ellipsis" id="pageNext"><a class="page-link" href="javascript:;" title="pagenext"><em class="icon-62-openmenu"></em> </a></li>';
    setTimeout(function () {
      let totalCount = thisVar.pages;
      let currentValue = thisVar.selectedPage;
      $('.ellipsis').remove();
      $('.cls-pagination-item').css('display', 'none');
      $('.cls-pagination-item.active').css('display', 'block');
      $('.cls-pagination-item.active').prev('li').css('display', 'block');
      $('.cls-pagination-item.active').next('li').css('display', 'block');
      if (currentValue != 1 && currentValue != 2 && currentValue != 3) {
        $('.cls-pagination-item.active').prev('li').before(beforeElement).css('display', 'block');
      }
      if (currentValue != (totalCount) && currentValue != (totalCount - 1) && currentValue != (totalCount - 2)) {
        $('.cls-pagination-item.active').next('li').after(afterElement).css('display', 'block');
      }
    }, 50);
  }
}