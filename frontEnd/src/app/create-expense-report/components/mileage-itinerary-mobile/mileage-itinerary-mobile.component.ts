import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-mileage-itinerary-mobile',
  templateUrl: './mileage-itinerary-mobile.component.html',
  styleUrls: ['./mileage-itinerary-mobile.component.scss']
})
export class MileageItineraryMobileComponent implements OnInit {
  testData:any;
  /**
   * Vechile variable
  */
  public mileageItinerary: any={
    tripdetails:[],
    locationDetails:{
      FirstHalf:[],
      secondHalf:[]
    }
  };
  @Input() editact: boolean = false;
  /**
   * Des:itineary inut data
   */
  @Input() itinearyInfo: any;
  /**
   * Edit Data Emiting
  */
  @Output() editstatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**
   * Desc:Save / Edit Button show / hide based on approver 
   */
  @Input() public saveFlag: any;
  /**
   * Total amount
   */
  public totalAmount: number = 0;
  /**
   * total km
   */
  public totalKm :any;
  /**
   * totalDistance
   */
  public totalDistance :number = 0;
  constructor() { }
  ngOnInit(): void {
  }
  ngOnChanges(): void {
   console.log(this.mileageItinerary)
    if (this.itinearyInfo != undefined) {
      console.log(this.itinearyInfo)
      console.log(this.itinearyInfo.length)
      this.mileageItinerary = {
        odometerStartImage:this.itinearyInfo.odometerStartImage,
        odometerEndImage:this.itinearyInfo.odometerEndImage,
        tripdetails: [
          {
            'label': 'Expense Date',
            'value': this.itinearyInfo.expanseDate,
            'subvalue': ''
          },
          {
            'label': 'Vehicle Type',
            'value': this.itinearyInfo.VehicleType,
            'subvalue': ''
          },
          {
            'label': 'Mileage Rate',
            'value': this.itinearyInfo.mileageRate,
            'subvalue': this.itinearyInfo.currency
          },
          {
            'label': 'Odometer Start & End',
            'value': Math.abs(this.itinearyInfo.odometerEnd - this.itinearyInfo.odometerStart),
            'subvalue': this.itinearyInfo.odometerStart + ' - ' + this.itinearyInfo.odometerEnd + '='
          },
          {
            'label': 'First Half Purpose',
            'value': this.itinearyInfo.firstHalfPurpose,
            'subvalue': '',
            'others':  this.itinearyInfo.firstHalfOthers
          },
          {
            'label': 'Second Half Purpose',
            'value': this.itinearyInfo.secHalfPurpose,
            'subvalue': '',
            'others':  this.itinearyInfo.secHalfOthers
          }
        ],
        locationDetails:{
          FirstHalf:(this.itinearyInfo !=undefined) ? this.itinearyInfo.firstTripLocation:[],
          secondHalf:(this.itinearyInfo !=undefined) ? this.itinearyInfo.secondTripLocations:[]
        }
      }
      console.log(this.mileageItinerary)
    }
    if(this.itinearyInfo?.distance > 0){
      const splitArr = this.itinearyInfo?.distance?.split(" ");
      this.totalDistance = Math.round(splitArr[0]);
      this.totalKm = splitArr[1];
    }
    this.totalAmount = Math.round(this.itinearyInfo.totalAmount);
  }
  /**
  * Edit Data Emiting
 */
  public edit() {
    this.editact = true;
    this.editstatus.emit(this.editact);
  }
}
