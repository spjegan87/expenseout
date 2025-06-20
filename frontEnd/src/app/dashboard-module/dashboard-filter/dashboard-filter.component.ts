import { Component, OnInit,OnChanges,OnDestroy,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppService } from '../../core-module/services/app.service';
import { config } from '../../core-module/config/app';

// tslint:disable-next-line: no-any
declare var $: any; 
// tslint:disable-next-line: no-any
declare var moment: any;
/**
 * Author: Padma Priya CK,Naveen
 * Module : dashboard filter
 * Powered by : Infiniti software solutions
 * Created Date: 25-July-2020
 */
@Component({
  selector: 'app-dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.scss']
})
export class DashboardFilterComponent implements OnInit,OnChanges,OnDestroy {

  constructor(public datepipe: DatePipe,private appService: AppService) {}  
  /**
   * Output filter value
   */
  @Output() public filterVal : EventEmitter<any> = new EventEmitter();
  /**
   * filterChoosedVal
   */
  public filterChoosedVal : any ;
  /**
   * Desc : departmentCode
   */
  public departmentCode : any =[];
  /**
   * Desc : usertype
   */
  public userType : string ='';
  /**
   * reset button show flag
   */
  public resetFlag:boolean = false;
  /**
   * reset variable
   */
  public resetValue : any;
  public departmentValue : any;
  /**
   * Filter formgroup
   */
  public dashboardFilter : FormGroup = new FormGroup({
    department : new FormControl(''),
    // expenseType: new FormControl(''),
    dateInterval:new FormControl('This Month'),
    fromDate: new FormControl(),
    toDate: new FormControl()
  });
  /**
   * ngoninit
   */
  public ngOnInit() : void {
    this.defaultDate();
    this.ngOnChanges();
    this.userType = config.USER_TYPE;
    if(this.userType === 'Finance'){
      this.appService.httpPost('userSettings',{}, 'getDropDownList','false').subscribe((data) => {
        this.departmentCode = data.content.departmentCode;
      });
    }
    this.resetValue = this.dashboardFilter.controls.dateInterval.value;
    this.departmentValue = this.dashboardFilter.controls.department.value;
    this.resetShow();
  }
  /**
   * set data default
   */
  public defaultDate() : void {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth();
    var firstDay = this.datepipe.transform( new Date(y, m, 1), 'yyyy-MM-dd');
    var lastDay =  this.datepipe.transform(new Date(y, m + 1, 0), 'yyyy-MM-dd');
    this.dashboardFilter.controls['fromDate'].setValue(firstDay);
    this.dashboardFilter.controls['toDate'].setValue(lastDay);
  }
   /**
   * Desc : ngOnDestroy
   */
  public ngOnDestroy(): void {
    $('#daterange').remove();
  }
  /**
   * Desc :ng on change
   */
  public ngOnChanges(): void {
    /**
     * Desc : daterange picker
     */
    // setTimeout(() => {
      // tslint:disable-next-line: no-any
      const comp: any = this;
      $('.customfilterrange').daterangepicker(
        {
          parentEl: '#daterange',
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
          comp.dashboardFilter.controls.fromDate.setValue(comp.startDate);
          comp.dashboardFilter.controls.toDate.setValue(comp.endDate);
          comp.dashboardFilter.controls.dateInterval.setValue(label);
          // console.log(this.filter,label);
          if (label === 'Date Range') {
            // setTimeout(() => {
              $('.customfilterrange').val(comp.date);
            // }, 0);
          } else {
            // setTimeout(() => {
              $('.customfilterrange').val(label);
            // }, 0);
          }
        }
      );
      $('.customfilterrange').on('apply.daterangepicker', function (_ev: any, picker: any) {
        comp.dashboardFilter.controls.fromDate.setValue(picker.startDate.format('DD-MMM-YYYY'));
        comp.dashboardFilter.controls.toDate.setValue(picker.endDate.format('DD-MMM-YYYY'));
        comp.dashboardFilter.controls.dateInterval.setValue($('.customfilterrange').data('daterangepicker').chosenLabel);
      });
    // }, 0);
    this.dashboardFilter.get('dateInterval').valueChanges.subscribe(val => {
      this.resetValue = val;
      this.resetShow();
    });
    this.dashboardFilter.get('department').valueChanges.subscribe(val => {
      this.departmentValue = val;
      this.resetShow();
    });
  }
  /**
   * resetFilter
   */
  public resetFilter() : void {
    this.dashboardFilter.reset();
    this.defaultDate();
    this.applyFilter();
    this.dashboardFilter.controls['department'].setValue('');
    this.dashboardFilter.controls['dateInterval'].setValue('This Month');
  }
  /**
   * showFilter for mobile view
   */
  // public showFilter() : void {
  //   $('.cls-filter-container').addClass('cls-filter-close');
  // }
  /**
   * applyFilter
   */
  public applyFilter() : void {
    this.filterChoosedVal = this.dashboardFilter.value;
    this.filterChoosedVal['dateInterval'] = {};
    this.filterChoosedVal['dateInterval'] = {
      'from' : moment(this.dashboardFilter.value.fromDate, "DD-MMM-YYYY").format("YYYY-MM-DD"),
      'to' : moment(this.dashboardFilter.value.toDate, "DD-MMM-YYYY").format("YYYY-MM-DD")
      };
      if(this.filterChoosedVal['dateInterval']['from'] === "Invalid date"){
        this.filterChoosedVal['dateInterval']['from'] ='';
        this.filterChoosedVal['dateInterval']['to'] =''
      } 
    this.filterVal.emit(this.filterChoosedVal);
  }
  /**
   * close modal for moblie view
   */
  public closeModal(){
    $('.cls-mbl-filter').addClass('cls-close-ani');
    // setTimeout(() => {
      $('.cls-filter-container').removeClass('cls-filter-close');
      $('.cls-mbl-filter').removeClass('cls-close-ani');
    // }, 400);
  }
  /**
   * show reset filter
   */
  public resetShow(){
    if(this.userType != 'Finance'){
      if(this.resetValue === 'This Month'){
        this.resetFlag = false;
      }
      else{
        this.resetFlag = true;
      }
    }
    else{
      if(this.resetValue === 'This Month' && this.departmentValue === ''){
        this.resetFlag = false;
      }
      else{
        this.resetFlag = true;
      }
    }
  }
}
