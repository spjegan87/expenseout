import { Component, Output, OnDestroy, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppService } from 'src/app/core-module/services/app.service';
// tslint:disable-next-line: no-any
declare var $: any;
// tslint:disable-next-line: no-any
declare var moment: any;
/**
 * Author: Padma Priya CK
 * Desc: filter
 */
@Component({
  selector: 'app-common-filter',
  templateUrl: './common-filter.component.html',
  styleUrls: ['./common-filter.component.scss']
})
export class CommonFilterComponent implements OnChanges, OnDestroy {
  /**
   * Disable Reset button
   */
  public disabled: boolean;
  /**
   * Set form value in localstorage  
   */
  public filterValue: any = {};
  /** 
   * Final data
   */
  public finalData: any;
  constructor(public datepipe: DatePipe, private appService: AppService) { }
  /**
   * Output filter value
   */
  @Output() public filterVal: EventEmitter<any> = new EventEmitter();
  /**
   * Get Filter Data
   */
  @Input() public filterData: Array<any> = [];
  /**
   * Get module Name
   */
  // @Input() public module: any;
  /**
   * Get Module name (dashboard)
   */
  @Input() public moduleName: string = "";
  /**
   * Get Module name (Approver dashboard)
   */
  @Input() public approverModule: string = "";
  /**
   * Send Module name to tab component
   */
  @Output() public filterResponse = new EventEmitter();
  /**
   * Filter formgroup
   */
  public filter: FormGroup = new FormGroup({
    fromDate: new FormControl([Validators.required]),
    toDate: new FormControl([Validators.required])
  });
  /**
   * Desc : ngOnDestroy
   */
  public ngOnDestroy(): void {
    $('#daterange').remove();
  }
  /**
   * Desc :ng onchanges
   */
  public ngOnChanges(): void {
    this.filterData.map(data => {
      this.filter.addControl(data.form_control, new FormControl(null, [Validators.required]))
    });
    this.resetFilter();
    // console.log(this.filterData, this.filter);

    if (this.filterData.length > 0) {
      if (localStorage.getItem("filter")) {
        let decrypt = localStorage.getItem("filter");
        let final = JSON.parse(this.appService.dataDecrypt(decrypt));
        this.finalData = final;
        // console.log(final, this.finalData);
        // console.log(final && this.moduleName == final.name)
        // if(this.filter.controls['dateInterval'] != undefined) 
        //  this.filter.controls['dateInterval'].setValue('Today');
        // this.filterResponse.emit(this.finalData);

        if (this.finalData && this.finalData != null && this.moduleName === this.finalData.name && window.localStorage.getItem('back')) {
          this.filterResponse.emit(this.finalData.name);

          this.filter.setValue(this.finalData.filter);
          this.filter.controls['fromDate'].setValue(this.finalData.filter.fromDate);
          this.filter.controls['toDate'].setValue(this.finalData.filter.toDate);
          // console.log(this.finalData.label);
          (this.finalData.label != undefined || this.finalData.label != null) ? this.filter.controls['dateInterval'].setValue(this.finalData.label) : this.filter.controls['dateInterval'].setValue('Today');
          this.applyFilter();
          window.localStorage.removeItem("back");

        }
        // if (this.finalData.filter['dateInterval']['from'] == "" && this.finalData.filter['dateInterval']['to'] == ""){
        //   console.log("check");
        //   // this.filter.controls['dateInterval'].setValue('Today');
        //   this.applyFilter();
        // }
      }
    }
    this.formValidator();

    /**
     * Desc : Time Period Daterange picker 
     */
    setTimeout(() => {
      // tslint:disable-next-line: no-any
      const comp: any = this;
      $('.customrange').daterangepicker(
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
            ],
            'Last Year': [moment().subtract(1, "y").startOf("year"), moment().subtract(1, "y").endOf("year")],
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
          if (label === 'Date Range') {
            comp.filter.controls.dateInterval.setValue(label);
            setTimeout(() => {
              $('.customrange').val(comp.date);
            }, 0);
          } else {
            comp.filter.controls.dateInterval.setValue(label);
            setTimeout(() => {
              $('.customrange').val(label);
            }, 0);
          }
        }
      );
      $('.customrange').on('apply.daterangepicker', function (_ev: any, picker: any) {
        comp.filter.controls.fromDate.setValue(picker.startDate.format('DD-MMM-YYYY'));
        comp.filter.controls.toDate.setValue(picker.endDate.format('DD-MMM-YYYY'));
        // console.log($('.customrange').data('daterangepicker').chosenLabel);
        comp.filter.controls.dateInterval.setValue($('#timeperiod').data('daterangepicker').chosenLabel);
        comp.formValidator();
      });
    }, 0);
    if (localStorage.getItem('filter') === null) {
      setTimeout(() => {
        this.defaultDate();
      }, 500);
    }
    // this.applyFilter();

  }
  /**
   * Admin Report time period 
   */
  public defaultDate(): void {
    if (this.moduleName && (this.moduleName == 'adminReportExpense')) {
      this.commonDateFilter();
      $('.daterangepicker .ranges li:nth-child(1)').click();
    }
    if (this.moduleName && (this.moduleName == 'adminDashboard' || this.moduleName == 'dashBoard')) {
      this.commonDateFilter();
      $('.daterangepicker .ranges li:nth-child(4)').click();
    }
  }
  public commonDateFilter() {
    let firstDay = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.filter.controls['fromDate'].setValue(firstDay);
    this.filter.controls['toDate'].setValue(firstDay);
  }

  /**
   * Send filter value to Tab component
   * @param str 
   */
  public applyFilter(str: string = ''): void {
    let filterChoosedVal = this.filter.value;
    filterChoosedVal['dateInterval'] = {};
    filterChoosedVal['dateInterval'] = {
      'from': moment(this.filter.value.fromDate, "DD-MMM-YYYY").format("YYYY-MM-DD"),
      'to': moment(this.filter.value.toDate, "DD-MMM-YYYY").format("YYYY-MM-DD")
    };
    if (filterChoosedVal['dateInterval']['from'] === "Invalid date") {
      filterChoosedVal['dateInterval']['from'] = '';
      filterChoosedVal['dateInterval']['to'] = '';
    }
    // delete filterChoosedVal['fromDate'];
    // delete filterChoosedVal['toDate'];
    this.formValidator();
    // if (window.localStorage.getItem("filter") != undefined && window.localStorage.getItem("filter") != null) {
    // alert("1");
    // console.log(true)
    this.filterValue = {
      name: this.moduleName,
      filter: this.filter.value
    }
    let data = this.filterValue;
    data.label = $('#timeperiod').val();
    let encryptData = this.appService.dataEncryption(JSON.stringify(this.filterValue));
    window.localStorage.setItem("filter", encryptData);
    // }
    console.log(this.disabled,!this.disabled,str,(!this.disabled || str == 'reset'),"check");
    if (!this.disabled || str == 'reset')
      this.filterVal.emit(filterChoosedVal);
  }
  /**
   * To reset the filter value
   */
  public resetFilter(): void {
    let validate = this.filterData.filter(data => this.filter.controls[data.form_control].value);
    if (validate.length > 0) {
      this.filter.reset();
      this.applyFilter('reset');
    }
    // let validate = this.filterData.filter(data=> 
    // this.filter.controls[data.form_control].value);
    // this.applyFilter('reset');
    // this.formValidator();
  }

  /**
   * To disable reset button 
   */
  public formValidator() {
    let validate = this.filterData.filter(data => !this.filter.controls[data.form_control].value || this.filter.controls[data.form_control].value != null || this.filter.controls[data.form_control].value != '');
    this.disabled = validate.length > 0 ? false : true;
  }
  /**
   * Search Filter 
   * @param aa 
   * @param bb 
   */
  public filterFunction(aa: any, bb: any) {
    this.appService.commonSearchFilter(aa, bb);
  }
  /**
   * showFilter for mobile view
   */
  // public showFilter() : void {
  //   $('.cls-filter-container').addClass('cls-filter-close');
  // }
  /**
   * close modal mobile view
   */
  public closeModal() {
    $('.cls-mbl-filter').addClass('cls-close-ani');
    setTimeout(() => {
      $('.cls-filter-container').removeClass('cls-filter-close');
      $('.cls-mbl-filter').removeClass('cls-close-ani');
    }, 400);
  }

  /**
   * Desc : Form field dropdown value set
   * @param name 
   * @param control 
   * @param value 
   * @param id 
   */
  public setFilterValue(name: string, control: string, value: string, id: string) {
    this.formValidator();
    this.filter.controls[control].setValue(value);
    this.filter.addControl(id, new FormControl(''));
    this.filter.controls[id].setValue(name);
  }
}
