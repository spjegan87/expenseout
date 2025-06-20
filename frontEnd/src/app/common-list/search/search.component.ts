import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnChanges {
  searchQuery: any;

  constructor() { }

  @Input() public listSearch: any = {};
  @Output() public searchValue = new EventEmitter();

  ngOnChanges() {
  }

  /**
   * @param value : search value
   */
  public search(value: string) {
    let val = [];
    let results: Array<any> = [];
    if (value != '') {
      this.listSearch.list_body.map((data: any, index: number) => {
        for (let key in data) {
          if(typeof data[key] == 'string'){
            let lowerCaseVal: any = typeof data[key] == 'string' ? data[key].toLowerCase() : data[key] = "" + data[key];
            if (lowerCaseVal.indexOf(value.toLowerCase()) != -1) {
              if (results.indexOf(index) == -1)
                results.push(index);
            }
          }
          
        }
      });
      let getData = results.map((data: number) => { return this.listSearch.list_body[data] });
      val = getData;
    } else {
      val = this.listSearch['list_body'];
    }
    console.log(val, "val");

    let updateStatus = (value != '') ? false : true;
    this.searchValue.emit({ value: val, status: updateStatus });
    this.removeLetter(updateStatus);
  }
  remove() {
    let action = this.removeLetter(true);
    console.log(action);
    if (action) {
      $(".cls-remove").removeClass('d-block');
      $("#search").val('');
      this.searchValue.emit({ value: this.listSearch['list_body'], status: action });

    }
  }
  public removeLetter(status: boolean) {
    console.log(status, "status")
    if (!status) {
      $(".cls-remove").addClass('d-block');
    }
    else{
      $(".cls-remove").removeClass('d-block');

    }
    return status;
  }
}
