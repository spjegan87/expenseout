import { Component,Output, OnDestroy ,EventEmitter,Input,OnChanges} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
// tslint:disable-next-line: no-any
declare var $: any;
// tslint:disable-next-line: no-any
declare var moment: any;
/**
 * Author: Padma Priya CK
 * Desc: filter
 */
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnChanges,OnDestroy{  
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
  /*
  * DES: Filter Json
  */
  @Input() public additinalfields:any;
  /*
  * DES: Validation Flag
  */
 public validationFlag: boolean = true;

  /**
   * Filter formgroup
   */

  public filter : FormGroup = new FormGroup({
    searchReport : new FormControl(''),
    employeeName : new FormControl(''),
    reportId: new FormControl(''),
    dateInterval:new FormControl(),
    fromDate: new FormControl(),
    toDate: new FormControl()
  });
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
     // For Validation 
    this.filter.valueChanges.subscribe((data:any)=>{
      let count = 0;
      Object.entries(data).forEach(([_key,value]) => {
        (value)? '' : count++;
      });
      (Object.keys(data).length == count) ? this.validationFlag = true : this.validationFlag = false ;
    })

    if(this.additinalfields && this.additinalfields.field){
      this.additinalfields.field.map((secondary:any)=>{
        this.filter.addControl(secondary?.id, new FormControl(''));
    });
     
    }

    /**
     * Desc : daterange picker
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
        //console.log(picker.startDate.format('DD-MMM-YYYY'),picker.endDate.format('DD-MMM-YYYY'));
        comp.filter.controls.fromDate.setValue(picker.startDate.format('DD-MMM-YYYY'));
        comp.filter.controls.toDate.setValue(picker.endDate.format('DD-MMM-YYYY'));
        comp.filter.controls.dateInterval.setValue($('.customrange').data('daterangepicker').chosenLabel);
      });
    }, 0);
    setTimeout(() => {
      this.defaultDate();
    }, 1000);
   
  }
  public defaultDate() : void {
    if(this.additinalfields && this.additinalfields.moduleName == 'adminReportExpense'){
      var firstDay = this.datepipe.transform( new Date(), 'yyyy-MM-dd');
      this.filter.controls['fromDate'].setValue(firstDay);
      this.filter.controls['toDate'].setValue(firstDay);
      $('.daterangepicker .ranges li:nth-child(1)').click();
    }
  }
  
  public applyFilter(): void {
    this.filterChoosedVal = this.filter.value;
    //console.log( this.filter.value,moment(this.filter.value.fromDate).format("yyyy-MM-dd"),this.datepipe.transform(this.filter.value.fromDate, 'yyyy-MM-dd'));
    this.filterChoosedVal['dateInterval'] = {};
    this.filterChoosedVal['dateInterval'] = {
      'from' : moment(this.filter.value.fromDate, "DD-MMM-YYYY").format("YYYY-MM-DD"),
      'to' : moment(this.filter.value.toDate, "DD-MMM-YYYY").format("YYYY-MM-DD")
      };
      if(this.filterChoosedVal['dateInterval']['from'] === "Invalid date"){
        this.filterChoosedVal['dateInterval']['from'] ='';
        this.filterChoosedVal['dateInterval']['to'] ='';
      } 
    delete this.filterChoosedVal['fromDate'];
    delete this.filterChoosedVal['toDate'];
    //console.log(this.filterChoosedVal);
    // //console.log(this.datepipe.transform(this.filter.value.fromDate, 'yyyy-MM-dd'));
    this.filterVal.emit(this.filterChoosedVal);
  }
  public resetFilter():void{
    this.filter.reset();
    this.applyFilter();
    // this.filter.controls['dateInterval'].setValue('Select Time Period');
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
  public closeModal(){
    $('.cls-mbl-filter').addClass('cls-close-ani');
    setTimeout(() => {
      $('.cls-filter-container').removeClass('cls-filter-close');
      $('.cls-mbl-filter').removeClass('cls-close-ani');
    }, 400);
  }
  public searchDropdown(id: any) {
		setTimeout(() => {
			$('#' + id).focus();
		}, 100);
	}
  	// search filter function
	public filterFunction(aa: any, bb: any) {
		var input, filter, ul, li, a, i, txtValue;
		input = document.getElementById(aa);
		filter = input.value.toUpperCase();
		ul = document.getElementById(bb);
		li = ul.getElementsByTagName('li');
		for (i = 0; i < li.length; i++) {
			a = li[i].getElementsByTagName('a')[0];
			txtValue = a.textContent || a.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				li[i].style.display = '';
			} else {
				li[i].style.display = 'none';
			}
		}
	}
  public setFilterValue(formCtrlName: string, optionVal: string) {
    this.filter.controls[formCtrlName].setValue(optionVal);
  }
}
