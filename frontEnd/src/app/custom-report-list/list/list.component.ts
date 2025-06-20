import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { urlConfig } from '../../core-module/config/url';
// *************************************************

//  * Component Name------- list
//  * HTML & CSS -------------- Naveen.s
//  * Created date -------------- 26-Feb-2021
//  * Powered by --------------- Infiniti software solutions

// *************************************************
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  /**
   * list data variable
   */
  public listData:any = {};
  /**
   * header data
   */
  public headerList : Array<any> = [];
  /**
   * day list
   */
  public daysList : Array<any> = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.daysList = [
      {
        name:'Mon',
        id:'0',
        status:'N'
      },
      {
        name:'Tue',
        id:'1',
        status:'N'
      },
      {
        name:'Wed',
        id:'2',
        status:'N'
      },{
        name:'Thu',
        id:'3',
        status:'N'
      }
      ,{
        name:'Fri',
        id:'4',
        status:'N'
      }
      ,{
        name:'Sat',
        id:'5',
        status:'N'
      },
      {
        name:'Sun',
        id:'6',
        status:'N'
      }
    ];
    this.headerList = [
        {
          "headerName": "Report Name"
        },
        {
          "headerName": "Status"
        },
        {
          "headerName": "Scheduled Frequency"
        },
        {
          "headerName": "Scheduled Date Range"
        }
    ]
    this.listData = {
        "value": [
          {
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
          }
        ],
        "val": "group-request",
        "ReportBasedOn": "groupRequest"
      }
  }
  ngOnChanges(): void {
    console.log(this.listData);
  }
  /**
   * open schedule
   */
  public openSchedule(){
    this.router.navigate( [
      './' +
      urlConfig.ROUTES.home +
      '/' +
      urlConfig.ROUTES.schedule
    ]);
  }
}
