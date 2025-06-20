import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { urlConfig } from '../../core-module/config/url';
import { DatepickerService } from '../../core-module/services/datepicker.service';
declare var $ : any;
declare var toastr: any;
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  /**
   * Desc: submitted
   */
  public submitted: boolean = false;
  /**
   * days list
   */
  public daysList:Array<any> = [];
  /**
   * email array
   */
  public emailArray:Array<any> = [];
  /**
   * day list array
   */
  public daysListArray:Array<any> = [];
  /**
   *  array for days
   */
  public finalDays:Array<any> = [];
  /**
   * time list
   */
  public timeList:Array<any> = [];
  /**
   * edit data
   */
  public editData: any;
  /**
   * roll for next
   */
  public rollForData:Array<any> = [];
  /**
   * roll for next date array
   */
  public rollForDateArray:Array<any> = [];
  /**
   * roll final date
   */
  public finalRollDate:Array<any> = [];
  /**
   * tab menu
   */
  public menu: Array<any> = [];

  constructor(private router: Router,
    private _DatepickerService: DatepickerService,
    private fb: FormBuilder) { }
  /**
   * sehedule Form
   */
  public scheduleForm: FormGroup = this.fb.group({
    time: new FormControl('',Validators.required),
    fromDate: new FormControl('',Validators.required),
    toDate: new FormControl('',Validators.required),
    email:new FormControl('',[Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
  });
  ngOnInit(): void {
    this.daysList = [
      {
        name:'Monday',
        id:'0',
        status:'N'
      },
      {
        name:'Tuesday',
        id:'1',
        status:'N'
      },
      {
        name:'Wednesday',
        id:'2',
        status:'N'
      },{
        name:'Thursday',
        id:'3',
        status:'N'
      }
      ,{
        name:'Friday',
        id:'4',
        status:'N'
      }
      ,{
        name:'Saturday',
        id:'5',
        status:'N'
      },
      {
        name:'Sunday',
        id:'6',
        status:'N'
      }
    ];
    this.menu = [
      {
        id: '1',
        name: 'Saved Report',
        key:'savedReport'
      },
      {
        id: '2',
        name: 'Scheduled Report',
        key:'scheduledReport'
      }
    ];
    this.timeList = [
      {
        name:'1:00',
      },
      {
        name:'1:30',
      },
      {
        name:'2:00',
      },
      {
        name:'2:30',
      },
      {
        name:'3:00',
      },
      {
        name:'3:30',
      },
      {
        name:'4:00',
      },
      {
        name:'4:30',
      },
      {
        name:'5:00',
      },
      {
        name:'5:30',
      },
      {
        name:'6:00',
      },
      {
        name:'6:30',
      },
      {
        name:'7:00',
      },
      {
        name:'7:30',
      },
      {
        name:'8:00',
      },
      {
        name:'8:30',
      },
      {
        name:'9:00',
      },
      {
        name:'9:30',
      },
      {
        name:'10:00',
      },
      {
        name:'10:30',
      },
      {
        name:'11:00',
      },
      {
        name:'11:30',
      },
      {
        name:'12:00',
      },
      {
        name:'12:30',
      },
      {
        name:'13:00',
      },
      {
        name:'13:30',
      },
      {
        name:'14:00',
      },
      {
        name:'14:30',
      },
      {
        name:'15:00',
      },
      {
        name:'15:30',
      },
      {
        name:'16:00',
      },
      {
        name:'16:30',
      },
      {
        name:'17:00',
      },
      {
        name:'17:30',
      },
      {
        name:'18:00',
      },
      {
        name:'18:30',
      },
      {
        name:'19:00',
      },
      {
        name:'19:30',
      },
      {
        name:'20:00',
      },
      {
        name:'20:30',
      },
      {
        name:'21:00',
      },
      {
        name:'21:30',
      },
      {
        name:'22:00',
      },
      {
        name:'22:30',
      },
      {
        name:'23:00',
      },
      {
        name:'23:30',
      },
      {
        name:'00:00',
      },
      {
        name:'00:30',
      },
    ]
    this.editData = {
      "editValue": {
        "savedReportId": 1,
        "savedReportName": "nv",
        "scheduleStatus": "N",
        "reportAdditionalInfo": {
          "scheduleInfo": {
            
          },
          "savedReportInfo": {
            "reportName": "get-data-for-fields-conditions-group-request",
            "chosenFields": [
              "groupRequestId",
              "groupName",
              "requestType",
              "tripType",
              "tripCategory",
              "currency",
              "requestedExpectedFare",
              "userRemarks",
              "requestedDate",
              "statusOfRequest",
              "groupCategory",
              "createdBy",
              "sector",
              "countryOfOriginDestination",
              "requestedDepartureDate",
              "requestedFlightNumber",
              "requestUser",
              "requestedNoOfPax",
              "approvedDepartureDate",
              "approvedFlightNumber",
              "approvedNoOfPax",
              "responseFareFareQuoted",
              "airlinesRemarks",
              "transactionStatus",
              "lastActionedTime",
              "discountAmount",
              "ssrs",
              "ssrRevenue",
              "displacementFareRemarks",
              "adjustedAmount"
            ],
            "reportBasedOn": "group-request",
            "chosenConditions": {
              "pos": "DPS",
              "agentEmailId": "travelagent@infinitisoftware.net",
              "departureDate": {
                "endDate": "2021-02-27 23:59:59",
                "startDate": "2021-02-01 00:00:00"
              },
              "statusOfRequest": [
                "1",
                "2"
              ],
              "dateRangeOfRequests": {
                "endDate": "2021-02-20 23:59:59",
                "startDate": "2021-02-01 00:00:00"
              },
              "negotiationRequestedDate": {
                "endDate": "2021-02-27 23:59:59",
                "startDate": "2021-02-01 00:00:00"
              }
            }
          }
        }
      },
      "obj": "group-request",
      "conditionReportBasedOn": "groupRequest",
      "navigationId": 3
    }
    setTimeout(()=>{
      $('.cls-select').select2({
        placeholder: "Select"
      })
    },10)
    for (const [key, value] of Object.entries(this.editData.editValue.reportAdditionalInfo.savedReportInfo.chosenConditions)) {
      console.log(typeof(value),key,value);
      this.rollForData.push({key,value,'status':'N'});
    }
    console.log(this.rollForData);
  }
  /**
   * back
   */
  public back(){
    this.router.navigate( [
      './' +
      urlConfig.ROUTES.home +
      '/' +
      urlConfig.ROUTES.customReportList
    ]);
  }
  /**
   * status change
   */
  public actionPerform(){
    console.log(this.editData.editValue.scheduleStatus);
    this.editData.editValue.scheduleStatus = (this.editData.editValue.scheduleStatus === 'N') ? 'Y' : 'N';
    console.log(this.editData.editValue.scheduleStatus);
  }
  /**
   * add email
   */
  public addEmail(){
    if(this.scheduleForm.controls.email.valid){
      if(this.scheduleForm.controls.email.value != '' && this.scheduleForm.controls.email.value != null){
        if(!this.emailArray.includes(this.scheduleForm.controls.email.value)) {
            if(this.scheduleForm.controls.email.value !== null) {
              this.emailArray.push(this.scheduleForm.controls.email.value);
            }
          }
          else{
            toastr.error('Duplicate Email Not Allowed');
          }
        this.scheduleForm.controls.email.reset();
        this.submitted = false;
      }
    }
    else{
      this.submitted = true;
      toastr.error('Enter Valid Email');
    }
    console.log(this.emailArray);
  }
  /**
   * select checkbox
   */
  public selectCheckbox(status:any,index:number){
    this.daysList[index]['status'] = (status === 'N') ? 'Y' : 'N';
    this.daysListArray = this.daysList.filter((data: any) => data.status === 'Y');
    console.log(this.daysListArray);
  }
  /**
   * remove email
   */
  public removeEmail(index:number){
    console.log(index);
    this.emailArray.splice(index,1);
  }
  /**
   * create schedule
   */
  public createSchedule(){
    if(this.scheduleForm.status === 'VALID' && this.emailArray.length > 0){
      console.log(this.scheduleForm)
      this.router.navigate( [
        './' +
        urlConfig.ROUTES.home +
        '/' +
        urlConfig.ROUTES.customReport
      ]);
    }
    else{
      this.submitted = true;
      toastr.error('Enter All Mandatory Fields');
    }
  }
  /**
   * roll for next day
   */
  public clickRollForNext(status:any,index:number){
    console.log(status,index);
    this.rollForData[index].status = (status === 'N') ? 'Y' : 'N';
    this.rollForDateArray = this.rollForData.filter((data: any) => data.status === 'Y');
    console.log(this.rollForDateArray)
  }
  /**
   * Desc : chooseDate
   */
  public chooseDate(id: string): void{
    this._DatepickerService.setCalendar(id, this.scheduleForm, id, 0, '', new Date().toString());
  }
}
