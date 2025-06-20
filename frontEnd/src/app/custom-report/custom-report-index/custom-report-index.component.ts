import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { urlConfig } from '../../core-module/config/url';
import { DatepickerService } from '../../core-module/services/datepicker.service';
declare var $ : any;
declare var toastr: any;
//*************************************************

//  * Component Name------- Report Index
//  * HTML & CSS -------------- Naveen.s
//  * Created date -------------- 26-Feb-2020
//  * Powered by --------------- Infiniti software solutions

// *************************************************
@Component({
  selector: 'app-custom-report-index',
  templateUrl: './custom-report-index.component.html',
  styleUrls: ['./custom-report-index.component.scss']
})
export class CustomReportIndexComponent implements OnInit {  
  /**
   * tab data
   */
  public tabData: any = [];
   /**
   * side menu
   */
  public sideMenu: any = [];
  /**
   * tab index variable
   */
  public clickedIndex: number = 0;
  /**
   * tab content variable
   */
  public activeIndex: number = 0;
  /**
   * select all checkbox
   */
  public active: boolean = false;
  /**
   * fields variable
   */
  public Fields: any;
  /**
   *  condition data variable
   */
  public availableCondition: any = [];
  /**
   *  condition value array
   */
  public condtionCheck: Array<any> = [];
   /**
   *  checkbox value array
   */
  public checkboxArray: Array<any> = [];
   /**
   * condition array
   */
  public conditionArray: Array<any> = [];
  /**
   * condition name
   */
  public conditionName: Array<any> = [];
  /**
   * fields name
   */
  public fieldsName: Array<any> = [];
  /**
   * Desc: submitted
   */
  public submitted: boolean = false;
  /**
   * show and hide table variable
   */
  public tableShow: boolean = false;
  /**
   *  selected checkbox value array
   */
  public selectedCheckbox: any = [];
  /**
   *  unselected checkbox value array
   */
  public unSelectedCheckbox: any = [];
  /**
   * final available condition array
   */
  public finalAvailableField: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _DatepickerService: DatepickerService,
  ) { }
  /**
   * reportForm
   */
  public reportForm: FormGroup = this.fb.group({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    email: new FormControl(''),
    requestEmail: new FormControl(''),
    departureFrom: new FormControl(''),
    departureTo: new FormControl(''),
    groupCategory: new FormControl(''),
    sectorFrom: new FormControl(''),
    sectorTo: new FormControl(''),
    statusOfRequest: new FormControl(''),
    pos: new FormControl(''),
    travelAgency: new FormControl(''),
    userType: new FormControl(''),
    country: new FormControl(''),
    currency: new FormControl(''),
    agentResponseFrom: new FormControl(''),
    agentResponseTo: new FormControl(''),
    airlineResponseFrom: new FormControl(''),
    airlineResponseTo: new FormControl(''),
    fareExpiryFrom: new FormControl(''),
    fareExpiryTo: new FormControl(''),
    negotiationApprovedFrom: new FormControl(''),
    negotiationApprovedTo: new FormControl(''),
    negotiationExpiryFrom: new FormControl(''),
    negotiationExpiryTo: new FormControl(''),
    negotiationRequestStatus: new FormControl(''),
    negotiationRequestedFrom: new FormControl(''),
    negotiationRequestedTo: new FormControl(''),
    requestProcessedBy: new FormControl(''),
    agencyAccessStatus: new FormControl(''),
    agencyType: new FormControl(''),
    city: new FormControl(''),
    emailVerificationStatus: new FormControl(''),
    registeredDateFrom: new FormControl(''),
    registeredDateTo: new FormControl(''),
    userAccessStatus: new FormControl(''),
    reportName : new FormControl(''),
    // description : new FormControl('')
  });
  ngOnInit(): void {
    this.tabData = [
      {
        id: 1,
        name: 'Availabe Fields'
      },
      {
        id: 2,
        name: 'Available Conditions'
      },
      {
        id: 3,
        name: 'Review & Save'
      }
    ];
    this.sideMenu = [
      {key: "groupRequest", name: "Group Request"},
      {key: "standardReport", name: "Standard Report"},
      {key: "registeredAgents", name: "Registered Agents"},
      {key: "fareOverrideReport", name: "Fare Override Report"},
    ];
    this.Fields = [
      {
        head: 'Request Details',
        status:'N',
        checkbox: [
          {
            id: '1',
            name: 'Group Request Id',
            keys: 'groupRequestId',
            status: 'N'
          },
          {
            id: '2',
            name: 'Group Name',
            keys:  'groupName',
            status: 'N'
          },
          {
            id: '3',
            name: 'Request Type',
            keys:  'requestType',
            status: 'N'
          },
          {
            id: '4',
            name: 'Trip Type',
            keys:  'tripType',
            status: 'N'
          },
          {
            id: '5',
            name: 'Trip Category',
            keys:  'tripCategory',
            status: 'N'
          },
          {
            id: '6',
            name: 'Currency',
            keys: 'currency',
            status: 'N'
          },
          {
            id: '7',
            name: 'Requested Expected Fare',
            keys:  'requestedExpectedFare',
            status: 'N'
          },
          {
            id: '8',
            name: 'User Remarks',
            keys:  'userRemarks',
            status: 'N'
          },
          {
            id: '9',
            name: 'Requested Date',
            keys:  'requestedDate',
            status: 'N'
          },
          {
            id: '10',
            name: 'Status Of Request',
            keys:  'statusOfRequest',
            status: 'N'
          },
          {
            id: '11',
            name: 'Group Category',
            keys:  'groupCategory',
            status: 'N'
          },
          {
            id: '12',
            name:'Created By',
            keys: 'createdBy',
            status: 'N'
          },
          {
            id: '13',
            name: 'Sector',
            keys:  'sector',
            status: 'N'
          },
          {
            id: '14',
            name: 'Country Of Origin Destination',
            keys:  'countryOfOriginDestination',
            status: 'N'
          },
          {
            id: '15',
            name: 'Requested Departure Date',
            keys:  'requestedDepartureDate',
            status: 'N'
          },
          {
            id: '16',
            name: 'Requested Flight Number',
            keys:  'requestedFlightNumber',
            status: 'N'
          },
          {
            id: '17',
            name: 'Request User',
            keys:  'requestUser',
            status: 'N'
          },
          {
            id: '18',
            name: 'Requested No Of Pax',
            keys:  'requestedNoOfPax',
            status: 'N'
          }
        ]
      },
      {
        head: 'Evaluation Details',
        status:'N',
        checkbox: [
          {
            id: '1',
            name: 'Trasit Time',
            keys:  'trasitTime',
            status: 'N'
          },
          {
            id: '2',
            name:  'Flight Load',
            keys:  'flightLoad',
            status: 'N'
          },
          {
            id: '3',
            name: 'Exchange Rate',
            keys:  'exchangeRate',
            status: 'N'
          },
          {
            id: '4',
            name: 'Auto Pilot Policy',
            keys:  'autoPilotPolicy',
            status: 'N'
          },
          {
            id: '5',
            name: 'Request Processed By',
            keys:  'requestProcessedBy',
            status: 'N'
          },
          {
            id: '6',
            name: 'Airline Response Date',
            keys:  'airlineResponseDate',
            status: 'N'
          },
          {
            id: '7',
            name: 'Reference Request Id',
            keys:  'referenceRequestId',
            status: 'N'
          },
          {
            id: '8',
            name: 'Cabin',
            keys:  'cabin',
            status: 'N'
          },
          {
            id: '9',
            name: 'Base Fare',
            keys:  'baseFare',
            status: 'N'
          },
          {
            id: '10',
            name: 'Tax',
            keys:  'tax',
            status: 'N'
          },
          {
            id: '11',
            name: 'Group Fare',
            keys:  'groupFare',
            status: 'N'
          },
          {
            id: '12',
            name: 'Evaluated Fare',
            keys:  'evaluatedFare',
            status: 'N'
          },
          {
            id: '13',
            name: 'Stops',
            keys:  'stops',
            status: 'N'
          }
        ]
      },
      {
        head: 'Quoted Details',
        status:'N',
        checkbox: [
          {
            id: '1',
            name:  'Approved Departure Date',
            keys:  'approvedDepartureDate',
            status: 'N'
          },
          {
            id: '2',
            name: 'Approved Flight Number',
            keys:  'approvedFlightNumber',
            status: 'N'
          },
          {
            id: '3',
            name: 'Approved No Of Pax',
            keys:  'approvedNoOfPax',
            status: 'N'
          },
          {
            id: '4',
            name: 'Response Fare Fare Quoted',
            keys:  'responseFareFareQuoted',
            status: 'N'
          },
          {
            id: '5',
            name: 'Airlines Remarks',
            keys:  'airlinesRemarks',
            status: 'N'
          },
          {
            id: '6',
            name: 'Transaction Status',
            keys:  'transactionStatus',
            status: 'N'
          },
          {
            id: '7',
            name: 'Last Actioned Time',
            keys:  'lastActionedTime',
            status: 'N'
          },
          {
            id: '8',
            name: 'Discount Amount',
            keys:  'discountAmount',
            status: 'N'
          },
          {
            id: '9',
            name: 'ssrs',
            keys:  'ssrs',
            status: 'N'
          },
          {
            id: '10',
            name: 'Ssr Revenue',
            keys:  'ssrRevenue',
            status: 'N'
          },
          {
            id: '11',
            name: 'Displacement Fare Remarks',
            keys:  'displacementFareRemarks',
            status: 'N'
          },
          {
            id: '12',
            name: 'Adjusted Amount',
            keys:  'adjustedAmount',
            status: 'N'
          }
        ]
      },
      {
        head: ' TA /RU Response details',
        status:'N',
        checkbox: [
          {
            id: '1',
            name: 'Agent Accepted Fare',
            keys:  'agentAcceptedFare',
            status: 'N'
          },
          {
            id: '2',
            name:  'Agent Response Date',
            keys:  'agentResponseDate',
            status: 'N'
          },
          {
            id: '3',
            name: 'Agent Response Remarks',
            keys:  'agentResponseRemarks',
            status: 'N'
          },
          {
            id: '4',
            name: 'Agent Response Status',
            keys:  'agentResponseStatus',
            status: 'N'
          },
          {
            id: '5',
            name: 'Reason For Declining',
            keys:  'reasonForDeclining',
            status: 'N'
          },
          {
            id: '6',
            name: 'pnr',
            keys:  'pnr',
            status: 'N'
          },
          {
            id: '7',
            name: 'Pnr Status',
            keys:  'pnrStatus',
            status: 'N'
          },
          {
            id: '8',
            name: 'Fare Expiry Date',
            keys:  'fareExpiryDate',
            status: 'N'
          }
        ]
      },
      {
        head: 'Payment and Ticketings Details',
        status:'N',
        checkbox: [
          {
            id: '1',
            name: 'Amount Paid',
            keys:  'amountPaid',
            status: 'N'
          },
          {
            id: '2',
            name:  'Paid Percentage',
            keys:  'paidPercentage',
            status: 'N'
          },
          {
            id: '3',
            name: 'Payment Validity Expired',
            keys:  'paymentValidityExpired',
            status: 'N'
          },
          {
            id: '4',
            name: 'Update Name List Validity',
            keys:  'updateNameListValidity',
            status: 'N'
          }
        ]
      },
      {
        head: 'User Details',
        status:'N',
        checkbox: [
          {
            id: '1',
            name: 'Agency Name',
            keys:  'agencyName',
            status: 'N'
          },
          {
            id: '2',
            name:  'Agent Email Id',
            keys:  'agentEmailId',
            status: 'N'
          },
          {
            id: '3',
            name: 'Agent Id',
            keys:  'agentId',
            status: 'N'
          },
          {
            id: '4',
            name: 'Travel Iata Code',
            keys:  'travelIataCode',
            status: 'N'
          },
          {
            id: '5',
            name: 'pos',
            keys:  'pos',
            status: 'N'
          },
          {
            id: '6',
            name: 'Agent Type',
            keys:  'agentType',
            status: 'N'
          },
          {
            id: '7',
            name: 'Country',
            keys:  'country',
            status: 'N'
          },
          {
            id: '8',
            name: 'City',
            keys:  'city',
            status: 'N'
          }
        ]
      },
      {
        head: 'Negotiation Details',
        status:'N',
        checkbox: [
          {
            id: '1',
            name: 'Negotiation Requested Date',
            keys:  'negotiationRequestedDate',
            status: 'N'
          },
          {
            id: '2',
            name: 'Negotiation Rejected Date',
            keys:  'negotiationRejectedDate',
            status: 'N'
          },
          {
            id: '3',
            name: 'Negotiation Processed Count',
            keys:  'negotiationProcessedCount',
            status: 'N'
          },
          {
            id: '4',
            name: 'Negotiation Approved Date',
            keys:  'negotiationApprovedDate',
            status: 'N'
          },
          {
            id: '5',
            name: 'Negotiation Expiry Date',
            keys:  'negotiationExpiryDate',
            status: 'N'
          }
        ]
      },
    ];
    this.availableCondition = [
      {
        head: 'Condition Details',
        status:'N',
        checkbox: [
            {
              id: '1',
              name: 'Agent Email Id',
              keys: 'agentEmailId',
              formcontrolname : [
                {
                  name: 'email'
                }
              ],
              status: 'N'
            },
            {
              id: '2',
              name:  'Date Range Of Requests',
              keys: 'dateRangeOfRequests',
              formcontrolname : [
                {
                  name: 'fromDate'
                },
                {
                  name: 'toDate'
                }
              ],
              status: 'N'
            },
            {
              id: '3',
              name: 'Departure Date',
              keys: 'departureDate',
              formcontrolname : [
                {
                  name: 'departureFrom'
                },
                {
                  name: 'departureTo'
                }
              ],
              status: 'N'
            },
            {
              id: '4',
              name: 'Group Category',
              keys: 'groupCategory',
              formcontrolname : [
                {
                  name: 'groupCategory'
                }
              ],
              status: 'N'
            },
            {
              id: '5',
              name: 'pos',
              keys: 'pos',
              formcontrolname : [
                {
                  name: 'pos'
                }
              ],
              status: 'N'
            },
            {
              id: '6',
              name: 'Sector',
              keys: 'sector',
              formcontrolname : [
                {
                  name: 'sectorFrom'
                },
                {
                  name: 'sectorTo'
                }
              ],
              status: 'N'
            },
            {
              id: '7',
              name: 'Status Of Request',
              keys: 'statusOfRequest',
              formcontrolname : [
                {
                  name: 'statusOfRequest'
                }
              ],
              status: 'N'
            },
            {
              id: '8',
              name: 'Travel Agency',
              keys: 'travelAgency',
              formcontrolname : [
                {
                  name: 'travelAgency'
                }
              ],
              status: 'N'
            },
            {
              id: '9',
              name: 'Negotiation Requested Date',
              keys: 'negotiationRequestedDate',
              formcontrolname : [
                {
                  name: 'negotiationRequestedFrom'
                },
                {
                  name: 'negotiationRequestedTo'
                }
              ],
              status: 'N'
            },
            {
              id: '10',
              name: 'Negotiation Approved Date',
              keys: 'negotiationApprovedDate',
              formcontrolname : [
                {
                  name: 'negotiationApprovedFrom'
                },
                {
                  name: 'negotiationApprovedTo'
                }
              ],
              status: 'N'
            },
            {
              id: '11',
              name: 'Negotiation Expiry Date',
              keys: 'negotiationExpiryDate',
              formcontrolname : [
                {
                  name: 'negotiationExpiryFrom'
                },
                {
                  name: 'negotiationExpiryTo'
                }
              ],
              status: 'N'
            },
            {
              id: '12',
              name: 'Fare Expiry Date',
              keys: 'fareExpiryDate',
              formcontrolname : [
                {
                  name: 'fareExpiryFrom'
                },
                {
                  name: 'fareExpiryTo'
                }
              ],
              status: 'N'
            },
            {
              id: '13',
              name: 'Request Processed By',
              keys: 'requestProcessedBy',
              formcontrolname : [
                {
                  name: 'requestProcessedBy'
                }
              ],
              status: 'N'
            },
            {
              id: '14',
              name: 'Currency',
              keys: 'currency',
              formcontrolname : [
                {
                  name: 'currency'
                }
              ],
              status: 'N'
            },
            {
              id: '15',
              name: 'Negotiation Request Status',
              keys: 'negotiationRequestStatus',
              formcontrolname : [
                {
                  name: 'negotiationRequestStatus'
                }
              ],
              status: 'N'
            },
            {
              id: '16',
              name: 'Agent Response Date',
              keys: 'agentResponseDate',
              formcontrolname : [
                {
                  name: 'agentResponseFrom'
                },
                {
                  name: 'agentResponseTo'
                }
              ],
              status: 'N'
            },
            {
              id: '17',
              name: 'Airline Response Date',
              keys: 'airlineResponseDate',
              formcontrolname : [
                {
                  name: 'airlineResponseFrom'
                },
                {
                  name: 'airlineResponseTo'
                },
              ],
              status: 'N'
            }
          ]
      }
    ];
  }
  /**
   * output data for side menu
   */
  public getMenu(data: any){
    console.log(data);
    this.condtionCheck.map((data: any) => {
      data.checkbox.map((val: any) => {
        if(val.status === 'Y'){
          if (Array.isArray(val.formcontrolname)){
            val.formcontrolname.map((value: any) => {
              // console.log(value.name,'nnnn')
              this.reportForm.controls[value.name].clearValidators();
            });
          }
        }
      });
    });
    this.activeIndex = 0;
    this.clickedIndex = 0;
    this.checkboxArray = [];
    this.condtionCheck = [];
    this.conditionArray = [];
    this.conditionName = [];
    this.fieldsName = [];
    this.submitted = false;
    this.tableShow = false;
    this.reportForm.reset();
  }
  /**
   * select tab
   */
  public selectMenu(index: number){
    this.activeIndex = index;
    this.clickedIndex = index;
    this.submitted = false;
    this.tableShow = false;
    if (this.activeIndex === 0){
      this.fieldsName = [];
    }
    this.conditionName = [];
  }
  /**
   * select field checkbox
   */
  public getData(checkbox: any) {
    // console.log(checkbox);
    this.checkboxArray.push(checkbox);
    // console.log(this.checkboxArray);
    const tempArray = this.Fields.map((data: any) => data.head);
    // console.log(tempArray);
    this.selectedCheckbox = tempArray.map((head: any) => this.checkboxArray.filter((val: any) => val.checkbox.filter((data: any) => data.status === 'Y' && data.index.toLowerCase() === head.toLowerCase()).pop())[0]);
    this.selectedCheckbox = this.selectedCheckbox.filter((data: any) => data !== undefined);
    // console.log(this.selectedCheckbox);
  }
  /**
   * select condition checkbox
   */
  public getConditionData(data: any){
    // console.log(data);
    this.conditionArray.push(data);
    // console.log(this.conditionArray);
    const tempArray = this.availableCondition.map((data: any) => data.head);
    // console.log(tempArray);
    this.condtionCheck = tempArray.map((head: any) => this.conditionArray.filter((val: any) => val.checkbox.filter((data: any) => data.status === 'Y' && data.index.toLowerCase() === head.toLowerCase()).pop())[0]);
    this.condtionCheck = this.condtionCheck.filter((data: any) => data !== undefined);
    // console.log(this.condtionCheck);
  }
  /**
   * Click to move one tab to another
   */
  public proceed() {
    this.finalAvailableField = this.selectedCheckbox.filter((data: any) => data !== undefined);
    if (this.activeIndex === 0 && this.finalAvailableField.length > 0){
      this.activeIndex = this.activeIndex + 1;
      this.clickedIndex = this.activeIndex;
      this.finalAvailableField.map((data: any) => {
        data.checkbox.map((val: any) => {
          if (val.status === 'Y' ){
            this.fieldsName.push(val.keys);
          }
        });
      });
      console.log(this.finalAvailableField, this.condtionCheck);
    }
    else if (this.activeIndex === 1 && this.condtionCheck.length > 0){
      console.log(this.finalAvailableField, this.condtionCheck);
      this.activeIndex = this.activeIndex + 1;
      this.clickedIndex = this.activeIndex;
      setTimeout(()=>{
        $('.cls-select').select2({
          placeholder: "Select"
        })
      },10)
      this.condtionCheck.map((data: any) => {
        data.checkbox.map((val: any) => {
          if (val.status === 'Y'){
            if (Array.isArray(val.formcontrolname)){
              val.formcontrolname.map((value: any) => {
                this.reportForm.controls[value.name].setValidators([Validators.required]);
                this.reportForm.controls[value.name].updateValueAndValidity();
                if (value.name === 'email'){
                  this.reportForm.controls[value.name].setValidators([Validators.required, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)]);
                  this.reportForm.controls[value.name].updateValueAndValidity();
                }
              });
            }
            let objVal: any ={
              value:val.name,
              keys:val.keys
            }
            this.conditionName.push(objVal);
          }
          else if(val.status === 'N'){
            if (Array.isArray(val.formcontrolname)){
              val.formcontrolname.map((value: any) => {
                this.reportForm.controls[value.name].reset();
                this.reportForm.controls[value.name].setValidators([]);
              });
            }
          }
        });
      });
      console.log(this.conditionName);
    }
  }
  /**
   * string validation
   */
  public stringValidation(event: any) {
    console.log(event);
    const strOnly = /^[A-Za-z ]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!strOnly.test(inputChar)) {
      event.preventDefault();
    }
  }
   /**
   * show reports
   */
  public showReport(type:string){
    if(type === 'show'){
      this.reportForm.removeControl('reportName');
    }
    if (this.reportForm.valid){
      console.log(type)
    }
    else{
      this.submitted = true;
      toastr.error('Enter All Mandatory Fields');
    }
  }
  /**
   * saved Reports
   */
  public savedReports(){
    this.router.navigate( [
      './' +
      urlConfig.ROUTES.home +
      '/' +
      urlConfig.ROUTES.customReportList
    ]);
  }
  /**
   * Desc : chooseDate
   */
  public chooseDate(id: string): void{
    this._DatepickerService.setCalendar(id, this.reportForm, id, 0, '', new Date().toString());
  }
  /**
   * add report name 
   */
  public addReportName(){
    // console.log('bbb');
    this.reportForm.addControl('reportName', new FormControl(''));
  }
}
