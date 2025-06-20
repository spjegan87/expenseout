import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup , FormControl, FormBuilder } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnChanges {
  @Input() listSort: any;
  @Output() sortValue = new EventEmitter();
  public sorting = new FormGroup({});
  public sortingForm = new FormGroup({});
  public selectedValue:string;
  constructor(private fb:FormBuilder) { }

  ngOnChanges(): void {
    // console.log(this.listSort);
    this.sortingForm = this.fb.group({
      'sorting': new FormControl('')
    })
  }

  public sort(value: string) {
    // $('#sorting').val(value).attr("selected", "selected");
    // $('#sorting').val(value).change();
    // $('#sorting').val(value);
  //   $("select.sorting").change(() =>{
  //     var selectedCountry = $(this).children("option:selected").val();
  //     alert("You have selected the country - " + selectedCountry);
  // });
    // this.sortingForm.controls['sorting'].setValue(value);
    let head = this.listSort.list_header.filter(data => data.name == value)[0];
    let listData = this.listSort.list_body;
    if (head != undefined) {
    // this.selectedValue = head.name;
    // this.sortingForm.controls['sorting'].setValue(value);
      let list = listData.map((data: any) => data[head.template]);
      if (head.template == 'date' || (head.hasOwnProperty('format') && head.format == 'date')) {
          listData.sort((a:any,b:any)=>{
            return (new Date(a[head.template]).getTime() > new Date(b[head.template]).getTime())?1:-1
          })
        // list = list.map((data: any) => data = new Date(data.replace('|', '')));
        // list = list.sort((a: any, b: any) => a - b);
        // let month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'aug', 'nov', 'dec'];
        // let options = { hour: "2-digit", minute: "2-digit" };
        // list = list.map(data => data.getDate() + '-' + month[data.getMonth()] + '-' + data.getFullYear() + ' | ' + data.toLocaleTimeString("en-us", options));
      } else {
        list = list.sort(new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare);
        listData.sort((a: any, b: any) => list.indexOf(a[head.template]) > list.indexOf(b[head.template]) ? 1 : -1);
      }
    }
    this.sortValue.emit(listData);
  }
  setValue(value:string){
    this.sortingForm.controls['sorting'].setValue(value);
  }
}
