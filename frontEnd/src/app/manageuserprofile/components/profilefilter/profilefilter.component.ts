import { Component,Output ,EventEmitter,Input,OnChanges,OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
// tslint:disable-next-line: no-any
declare var $: any;
// tslint:disable-next-line: no-any
declare var moment: any;
/**
 * Author: Padma Priya CK.
 * Module : user management filter
 * Powered by : Infiniti software solutions
 */
@Component({
  selector: 'app-profilefilter',
  templateUrl: './profilefilter.component.html',
  styleUrls: ['./profilefilter.component.scss']
})
export class ProfilefilterComponent implements OnChanges,OnInit {

  constructor(public datepipe: DatePipe) {}
  /**
   * Input currentPage
   */
  @Input() public currentPage : string ='';
  /**
   * Output filter value
   */
  @Output() public filterVal : EventEmitter<any> = new EventEmitter();
  /**
   * Desc : filterchoosedval
   */
  public filterChoosedVal : any ={};
  /**
   * Filter formgroup
   */
  public filter : FormGroup = new FormGroup({
    name : new FormControl(''),
    employeeId : new FormControl(''),
    role: new FormControl(''),
    dateInterval:new FormControl(''),
    fromDate: new FormControl(),
    toDate: new FormControl()
  });
  public ngOnInit() : void {
    // console.log("init");
    this.ngOnChanges();
  }
  /**
   * Desc :ng on change
   */
  public ngOnChanges(): void {
    
    // console.log("Asa")
    /**
     * Desc : daterange picker
     */
    // setTimeout(() => {
      // tslint:disable-next-line: no-any
      const comp: any = this;
      $('.customrange1').daterangepicker(
        {
          parentEl: '#filterprofile',
          locale: {
            format: 'DD-MMM-YYYY',
            customRangeLabel: 'Date Range'
          },
          // startDate: new Date(),
          endDate: moment(),
          startDate: moment(),
          // autoApply : true,
          autoUpdateInput: false,
          maxDate: new Date(),
          ranges: {
            // 'Select Time Period': 'Invalid Date',
            Today: [moment(), moment()],
            Yesterday: [
              moment().subtract(1, 'days'),
              moment().subtract(1, 'days')
            ],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [
              moment()
                .subtract(1, 'month')
                .startOf('month'),
              moment()
                .subtract(1, 'month')
                .endOf('month')
            ]
          }
        },
        // tslint:disable-next-line: no-any
        (start: any, end: any, label: string) => {
          comp.date =
            start.format('DD-MMM-YYYY') + '  -  ' + end.format('DD-MMM-YYYY');
          comp.startDate = start.format('DD-MMM-YYYY');
          comp.endDate = end.format('DD-MMM-YYYY');
          comp.filter.controls.fromDate.setValue(comp.startDate);
          comp.filter.controls.toDate.setValue(comp.endDate);
          comp.filter.controls.dateInterval.setValue(label);
          if (label === 'Date Range') {
            // setTimeout(() => {
              $('.customrange1').val(comp.date);
            // }, 0);
          } else {
            // setTimeout(() => {
              $('.customrange1').val(label);
            // }, 0);
          }
        }
      );
      $('.customrange1').on('apply.daterangepicker', function (_ev: any, picker: any) {
        comp.filter.controls.fromDate.setValue(picker.startDate.format('DD-MMM-YYYY'));
        comp.filter.controls.toDate.setValue(picker.endDate.format('DD-MMM-YYYY'));
        comp.filter.controls.dateInterval.setValue($('.customrange1').data('daterangepicker').chosenLabel);
      });
    // }, 0);
  }
  public applyFilter(): void {
    this.filterChoosedVal = this.filter.value;
    this.filterChoosedVal['dateInterval'] = {};
    this.filterChoosedVal['dateInterval'] = {
      'from' : this.datepipe.transform(this.filter.value.fromDate, 'yyyy-MM-dd'),
      'to' : this.datepipe.transform(this.filter.value.toDate, 'yyyy-MM-dd')
      };
    delete this.filterChoosedVal['fromDate'];
    delete this.filterChoosedVal['toDate'];
    this.filterVal.emit(this.filterChoosedVal);
  }
  public resetFilter():void{
    this.filter.reset();
    this.applyFilter();
  }

}
