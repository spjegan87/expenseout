import { Component, OnInit, Output, EventEmitter, Input,ElementRef,Renderer2} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { config } from '../../../core-module/config/app';
import { DatepickerService } from '../../../core-module/services/datepicker.service';
import { AppService } from '../../../core-module/services/app.service';
import { DatePipe } from '@angular/common';
import { CompressionService } from '../../../core-module/services/compression.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import {  take } from "rxjs/operators";
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;
declare var toastr: any;
declare function hideLoader(): any
@Component({
  selector: 'app-mileage-report-mobile',
  templateUrl: './mileage-report-mobile.component.html',
  styleUrls: ['./mileage-report-mobile.component.scss']
})
export class MileageReportMobileComponent implements OnInit {
  public testVar:any;
  /**
   * DEsc : Popup data
   */
  public popupData: any;

  /**
 * Vechile variable
 */
  public travelPurpose: any = [
    {
      'value': 'Repayment',
      'id': 'repayment'
    },
    {
      'value': 'Sourcing',
      'id': 'sourcing'
    },
    {
      'value': 'Village Survey',
      'id': 'village survey'
    },
    {
      'value': 'Loan Application',
      'id': 'loan application'
    },
    {
      'value': 'CGT',
      'id': 'CGT'
    },
    {
      'value': 'GRT',
      'id': 'GRT'
    },
    {
      'value': 'Final review',
      'id': 'final review'
    },
    {
      'value': 'Branch Audit',
      'id': 'Branch Audit'
    },
    {
      'value': 'Branch Visit',
      'id': 'Branch Visit'
    },
    {
      'value': 'Training',
      'id': 'Training'
    },
    {
      'value': 'PL',
      'id': 'pl'
    },
    {
      'value': 'Recruitment',
      'id': 'recruitment '
    },
    {
      'value': 'Meeting',
      'id': 'meeting'
    },
    {
      'value': 'Others',
      'id': 'others'
    }
  ];
  /**
   * Des:Expanse min date
   */
  minDate: any = ''
  visible: boolean;
  showPopup: boolean;
  /*
 * Des: Policy data 
 */
  public mileageDetails: any;
  /**
   * Des:show and hide the second half data
   */
  public showSecHalf: boolean = false;
  /**
   * Des:current location details
   */
  public currentLocationDetails: any;
  /**
   * Des:Finish First Half variable
   */
  public finishFirstHalf: boolean = true;
  /**
   * Des:Finish First Half variable
   */
  public finishTrip: boolean = false;
  /**
 * Des:Finish First Half variable
 */
  public editAction: boolean = false;
  /**
   * Des:Get Response Data 
  */
  @Output() public gridlistJson: EventEmitter<object> = new EventEmitter<object>();
  /**
   * Des:mileage itineary data
   */
  public itinearyData: any = [];
  /**
   * Des:saved Data
   */
  public savedData: any;
  /**
   * Des: Form Data
   */
  @Input() public formValue: FormGroup;
  @Input() public dynamicData: any;
  /**
   * Desc:Save / Edit Button show / hide based on approver 
   */
  @Input() public saveFlag: any;
  /**
   * editInfo
   */
  @Input() public editInfo: any;
  /**
   * report details
   */
  @Input() public mileageReportData : any
  public expenseOldData: any;
  /**
  *Des :Frequent datat
  */
  public frequentItinearyData: any;
  /**
   * Change DateFormat
   */
  public resultdate: any;
  /**
   * localUrl
   */
	public localUrl: any;

  /**
   * Des:Custom Filed Data
  */
 /**
  * Des:uploaded images for odometer
  */
  odometerImages:any;
  /**
   * localCompressedURl
   */
	public localCompressedURl: any;
  /**
   * imageFile
   */
	public imageFile: any;
  	/**
   * file
   */
	public file: any;
  public imagePath:any="test";
  /**
   * Des:odometer  image details
   */
  odometerImageDetails:any={}
  /**
   * des:preview image url
   */
   public imageUrl:any;
   /**
    * Des:show and hide the preview model
    */
   public showModal:boolean=false;
  /**
   * Des:odometer image bool value
   */
  odometerStartImageView:boolean=false;
  /**
   * des:image delete bool value
   */
  public imageFlag:boolean=false
  /**
   * des:alert content
   */
  public imageContent:any;
  /**
   * Des:end trip flag
   */
  endTripFlag:boolean=false;
  // in bytes, compress images larger than 1MB
public fileSizeMax = 1 * 1024 * 1024
// in pixels, compress images have the width or height larger than 1024px
public widthHeightMax = 1024
public defaultWidthHeightRatio = 1
public defaultQualityRatio = 0.7
  //  public reportFields:any;
  constructor(
    private _DatepickerService: DatepickerService,
    private fb: FormBuilder,
    private appService: AppService,
    public datepipe: DatePipe,
    private fieldFocus: ElementRef,
    private compressImage: CompressionService,
    private imageCompress: NgxImageCompressService,
    public sanitizer: DomSanitizer,
    public renderer: Renderer2
  ) {
   
   }

  /**
  *Des :Sumbit boolean variable
  */
  public submitted: boolean = false;

  /*
  * Des: Form Group for Mileage Details
  */
  public mileageGroup: any;
  // public mileageGroup: any = this.fb.group({
  //   reimbursable: ['Y'],
  //   expenseDate: ['', [Validators.required]],
  //   vechileType: ['', [Validators.required]],
  //   odometerstart: ['', [Validators.required]],
  //   vechileTypeCode: ['0', [Validators.required]],
  //   odometerEndValue: ['', Validators.required],
  //   purpose: ['', [Validators.required]],
  //   others: ['', [Validators.required]],
  //   secondHalfOthers: [''],
  //   purposeCode: ['', [Validators.required]],
  //   secPurpose: ['', [Validators.required]],
  //   secPurposeCode: [''],
  //   second_trip_purpose: [''],
  //   firstTripLocations: this.fb.array([]),
  //   secondTripLocations: this.fb.array([]),
  // });


  // public addSecondLocation() {
  //   (this.mileageGroup.controls.secondTripLocations as FormArray).push(
  //     this.tripLocation()
  //   );   
  // }

  //Des: Get first Location Data
  get FirstTripControl() {
    return (this.mileageGroup.get("firstTripLocations") as FormArray).controls;
  }

  // Des: Get second location Data
  get secondTripControl() {
    return (this.mileageGroup.get("secondTripLocations") as FormArray).controls;
  }
  /**
   * Des:defining the form group
   * Author:Abarna
   */
  public formGroupDefining() {
    this.mileageGroup = this.fb.group({
      reimbursable: ['Y'],
      expenseDate: ['', [Validators.required]],
      vechileType: ['', [Validators.required]],
      odometerstart: ['', [Validators.required]],
      vechileTypeCode: ['0', [Validators.required]],
      odometerEndValue: ['', Validators.required],
      uploadEnd:['', Validators.required],
      purpose: ['', [Validators.required]],
      // others: ['', [Validators.required]],
      // secondHalfOthers: [''],
      purposeCode: ['', [Validators.required]],
      secPurpose: ['', [Validators.required]],
      secPurposeCode: [''],
      second_trip_purpose: [''],
      firstTripLocations: this.fb.array([]),
      secondTripLocations: this.fb.array([]),
      odometerStartImage:['', [Validators.required]],
      odometerEndImage:['', [Validators.required]]
    });

  }
  ngOnInit(): void {
    this.formGroupDefining()
    this.popupData =
    {
      "title": "Location",
      "content": "Are you sure, you want to pin this current location",
      "sub_content": '',
      "icon": true,
      "class": "fa-map-marker",
      "purpose": '',
      "action": [
        {
          "name": "No, Dont",
          "moduleName": "",
          "actionName": "no",
          "class": "cls-no cls-btn-secondary",
          "key": "no"
        },
        {
          "name": "Yes, Pin It",
          "moduleName": "",
          "actionName": "yes",
          "class": "cls-btn-primary cls-yes",
          "key": "yes"
        }
      ]
    }
  }
  public ngOnChanges() {
    this.formGroupDefining();
    if (this.mileageGroup) {
      this.editDataClone();
      if(this.mileageReportData){
        // console.log(this.mileageReportData);
      }
    }

  }
  public editDataClone() {
    if (this.editInfo) {
      // console.log(this.editInfo);
      this.mileageGroup.patchValue({
        reimbursable: this.editInfo.Mileage[0].reimbursable,
        expenseDate: this.editInfo.Mileage[0].expensedate,
        vechileType: this.editInfo.Mileage[0].customData.vehicleType,
        odometerstart: this.editInfo.Mileage[0].customData.odometerStartValue,
        vechileTypeCode: this.editInfo.Mileage[0].customData.vehicleTypeCode,
        purpose: this.editInfo.Mileage[0].customData.morningPurpose,
        purposeCode: this.editInfo.Mileage[0].customData.morningPurposeCode,
        secPurpose: this.editInfo.Mileage[0].customData.eveningPurpose,
        secPurposeCode: this.editInfo.Mileage[0].customData.eveningPurposeCode,
        odometerEndValue: this.editInfo.Mileage[0].customData.odometerEndValue ? this.editInfo.Mileage[0].customData.odometerEndValue : '',
      });
      // console.log(this.mileageGroup);
      if (this.editInfo.Mileage[0].customData.location && this.editInfo.Mileage[0].customData.location.morningShift) {
        this.editInfo.Mileage[0].customData.location.morningShift.map((data: any) => {
          this.currentLocationDetails = {
            'place': data.locations,
            'geoCodes': data.geoCodes,
            'placeId': data.placeId,
          }
          this.addLocation('firstTripLocations');
        })
      }
      if (this.editInfo.Mileage[0].customData.location && this.editInfo.Mileage[0].customData.location.eveningShift) {
        this.editInfo.Mileage[0].customData.location.eveningShift.map((data: any) => {
          this.currentLocationDetails = {
            'place': data.locations,
            'geoCodes': data.geoCodes,
            'placeId': data.placeId,
          }
          this.addLocation('secondTripLocations');
        })
      }
      if(this.editInfo.Mileage[0].customData.morningPurposeCode == 'others'){
        this.mileageGroup.addControl('others',this.fb.control('', [Validators.required]));
      }
      if(this.editInfo.Mileage[0].customData.eveningPurposeCode == 'others'){
        this.mileageGroup.addControl('secondHalfOthers',this.fb.control('', [Validators.required]));
      }
      this.editInfo.Mileage[0].customData.morningPurposeCode == 'others' ? this.mileageGroup.controls.others.setValue(this.editInfo.Mileage[0].customData.others) : '';
      this.editInfo.Mileage[0].customData.eveningPurposeCode == 'others' ? this.mileageGroup.controls.secondHalfOthers.setValue(this.editInfo.Mileage[0].customData.secondHalfOthers) : '';
      this.showSecHalf = (this.editInfo.Mileage[0].customData.showSecHalf == 'Y') ? true : false;
      this.finishFirstHalf = (this.editInfo.Mileage[0].customData.finishFirstHalf == 'Y') ? true : false;
      this.finishTrip = (this.editInfo.Mileage[0].customData.finishTrip == 'Y') ? true : false;
      this.editAction = (this.editInfo.Mileage[0].customData.editAction == 'Y') ? true : false;
      this.itinearyData = this.editInfo.Mileage[0].customData.itineraryData;
      console.log(this.itinearyData);
      if (!this.finishFirstHalf && !this.showSecHalf && this.finishTrip && !this.editAction) {
        this.editAction = false;
      }
      this.vechileData();
    }
  }
  //Form validation
  get formValidation() {
    return this.mileageGroup.controls;
  }

  /**
   * Number Validation
   * @param event 
   */
  public numbersOnly(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  /**
  * Focus Select
   */
  public searchDropdown(id: any) {
    setTimeout(() => {
      $("#" + id).focus();
    }, 100);
  }
  /**
  * Filter for input
  */
  public filterFunction(aa: any, bb: any) {
    this.appService.commonSearchFilter(aa,bb);
  }
  public chooseDate(id: string) {
    let miniDate = new Date();
    miniDate.setDate(miniDate.getDate() - 60);
    this.minDate = miniDate;
    this._DatepickerService.setCalendar(
      id,
      this.mileageGroup as FormGroup,
      id,
      null,
      this.minDate, ''
    );
  }
  /**
   * DES: date Pick
   * Des: Policy Infomation
   * Author:Venkat
   * Date:17/05/2021
   */
  public vechileData() {
    // let result = this.changeDateFormat(this.mileageGroup.controls.expenseDate.value);
    let serviceDate = this.dateRequest(this.mileageGroup.controls.expenseDate.value);
    // console.log(serviceDate);
    if (this.mileageGroup.controls.expenseDate.value) {
      const formData = {
        Mileage: [
          {
            mileageDetailsJsonRequired: 'Yes',
            expenseDate:serviceDate,  //result
            // expense_date: serviceDate
          }
        ],
        userId: config.USER_ID
      };
      this.appService
        .httpPost('policyViolation', formData, 'checkPolicyViolation', 'false')
        .subscribe((data) => {
          this.mileageDetails = data.content.mileageDetails;
          let mileUnique: any = [];
          var vehicle = this.mileageDetails?.map(function (obj) {
            return obj.vehicleType;
          });
          vehicle = vehicle?.filter(function (v, i) {
            if (vehicle.indexOf(v) == i) {
              mileUnique.push(i);
            }
            return vehicle.indexOf(v) == i;
          });
          let mileValue: any = [];
          mileUnique?.map((dataVal: any) => {
            mileValue.push(this.mileageDetails[dataVal]);
          });
          this.mileageDetails = mileValue;
          this.mileageGroup.controls.vechileType.setValue(this.mileageDetails[0]?.vehicleType)
        });
    }
  }
  /**
   * Desc : Date Format changed to YYYY-m-DD
   * @param date 
   * @returns 
   */
  public dateRequest(date: any) {
    let myDate = new Date(date);
    let d = myDate.getDate();
    let m = myDate.getMonth() + 1;
    let y = myDate.getFullYear();
    let newdate = (y + "-" + (m <= 9 ? '0' + m : m) + "-" + (d <= 9 ? '0' + d : d));
    return newdate;
  }
  /**
   * DEs: Purpose Of travel (Others Check)
   * Des:Dynamic Filed Change
   * Author:Venkat
   * Date:17/05/2021
   */
  public travelPurposeData(formControlname: any, type: string) {
    setTimeout(() => {
      if (this.mileageGroup.controls[formControlname].value == "others" && type == 'firsthalf') {
        this.mileageGroup.addControl('others', new FormControl('', Validators.required));
      } else if (this.mileageGroup.controls[formControlname].value == "others" && type == 'sechalf') {
        this.mileageGroup.addControl('secondHalfOthers', new FormControl('', Validators.required));
      }
      else {
        type == 'firsthalf' ? (this.mileageGroup.controls.others ? this.mileageGroup.removeControl('others') : false) : (this.mileageGroup.controls.secondHalfOthers ? this.mileageGroup.removeControl('secondHalfOthers') : false);
      }
    }, 200);
  }

  public clickOutside() {
    this.visible = false;
  }
  /**
   *Des: Location Array
   */
  public tripLocation(): FormGroup {
    return this.fb.group({
      locations: [this.currentLocationDetails.place],
      geoCodes: [this.currentLocationDetails.geoCodes],
      placeId: [this.currentLocationDetails.placeId],
    });
  }
  /*
  * Des: Add Locations
  */
  public addLocation(formArrayName: string) {
    (this.mileageGroup.get(formArrayName) as FormArray).push(
      this.tripLocation()
    );
  }
  // remove prescription row
  public removeLocation(formarrayname: string, i: number, value: string) {
    this.popupData =
    {
      "title": "Remove Location",
      "content": "Are you sure, to remove location",
      "sub_content": value,
      "icon": true,
      "index": i,
      "arrayName": formarrayname,
      "class": "fa-map-marker",
      "purpose": 'removeindex',
      "action": [
        {
          "name": "No, Dont",
          "moduleName": "",
          "actionName": "no",
          "class": "cls-no cls-btn-secondary",
          "key": "no"
        },
        {
          "name": "Yes, Remove",
          "moduleName": "",
          "actionName": "yes",
          "class": "cls-btn-primary cls-yes",
          "key": "yes"
        }
      ]
    };
    this.visible = true;
  }
  /**
  * Des:Google Location get
  * Author:Venkat
  * Date:17/05/2021
  */
  public appendLocation(location: any, info: string) {
    const formData = {
      latlng: location.coords.latitude + ',' + location.coords.longitude
    };
    this.appService
      .httpPost('PlacesAutoComplete', formData, 'getReverseGeoCoding', 'false')
      .subscribe((data) => {
        this.currentLocationDetails = data.content.result;
        this.popupData =
        {
          "title": "Location",
          "content": "Are you sure, you want to pin this current location",
          "sub_content": this.currentLocationDetails.place,
          "icon": true,
          "class": "fa-map-marker",
          "purpose": info,
          "action": [
            {
              "name": "No, Dont",
              "moduleName": "",
              "actionName": "no",
              "class": "cls-no cls-btn-secondary",
              "key": "no"
            },
            {
              "name": "Yes, Pin It",
              "moduleName": "",
              "actionName": "yes",
              "class": "cls-btn-primary cls-yes",
              "key": "yes"
            }
          ]
        }
        // if (this.submitted)
        this.visible = !this.visible;
      });
  }
  /**
   * show location
   */
  public showLocation(data: string) {
    switch(data){
      case 'pinLocation':
        console.log(this.mileageGroup)
        let othersVal = this.mileageGroup.value.purpose === 'Others' ? this.mileageGroup.value.others : 'yes';
        if (this.mileageGroup.value.expenseDate && this.mileageGroup.value.odometerstart  && this.mileageGroup.value.purpose && othersVal){
          this.submitted = false;
          this.showLocationPop(data);
        }
        else {
          this.submitted = true;
          this.fielsFocusValidation();
        }
      break;
      case 'secondpinLocation':
        let secondOthersVal = this.mileageGroup.value.secPurpose === 'Others' ? this.mileageGroup.value.secondHalfOthers : 'yes';
        if(this.mileageGroup.value.secPurpose && secondOthersVal){
          this.submitted = false;
          this.showLocationPop(data);
        }
        else {
          this.submitted = true;
          this.fielsFocusValidation();
        }
      break;
    }
  }
  /**
   * show location continue
   */
  public showLocationPop(data:string){
    var options = {
      enableHighAccuracy: true,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location: any) => {
        this.appendLocation(location, data);
      },
        this.showError,
        options
      );
    } else {
      toastr.error("Geolocation is not supported by this browser.");
    }
  }
  /**
   * show error
   */
  public showError(error: any) {
    let elementName =
      error.code == "notification_disabled" ? "not-access" : "loc-access";
    $(`#${elementName}`).text("");
    let errors = [
      {
        code: error.PERMISSION_DENIED,
        msg: "User denied the request for Geolocation.",
      },
      {
        code: error.POSITION_UNAVAILABLE,
        msg: "User denied the request for Geolocation.",
      },
      {
        code: error.TIMEOUT,
        msg: "User denied the request for Geolocation.",
      },
      {
        code: error.UNKNOWN_ERROR,
        msg: "User denied the request for Geolocation.",
      },
      {
        code: "notification_disabled",
        msg: "Please enable notification.",
      },
    ];
    errors.map((data) => {
      if (data.code == error.code)
        toastr.error(data.msg);
    });
    ;
  }
  /**
   * select box value set
   */
  public setFilterValue(formCtrlName: string, optionVal: string, optionId: any) {
    // console.log(formCtrlName,optionVal,optionId);
    if((formCtrlName === 'purpose' && optionVal ==='Others')){
      this.mileageGroup.addControl('others',this.fb.control('', [Validators.required]));
    }
    if((formCtrlName === 'secPurpose' && optionVal ==='Others')){
      this.mileageGroup.addControl('secondHalfOthers',this.fb.control('', [Validators.required]));
    }
    this.mileageGroup.controls[formCtrlName].setValue(optionVal);
    this.mileageGroup.controls[formCtrlName + 'Code'].setValue(optionId);
  }
  /**
   * Des:popup action
   * Author:Abarna
   * Date:15/05/2021
   */
  public popupAction(actionVal: string, purpose: string) {
    switch (purpose) {
      case 'pinLocation':
        if (actionVal == 'yes') {
          this.addLocation("firstTripLocations");
          this.insertlocationData('pinLocation');
        }
        this.visible = false;
        break;
      case 'secondpinLocation':
        if (actionVal == 'yes') {
          this.addLocation("secondTripLocations");
          this.insertlocationData('pinLocation');
        }
        this.visible = false;
        break;
      case 'finishHalfTrip':
        if (actionVal == 'yes') {
          this.saveLocationData();
          this.finishFirstHalf = false;
          this.showSecHalf = true;
        }
        else {
          this.visible = false;
          this.endTrip();
        }
        break;
      case 'calculate':
        if (actionVal == 'yes') {
          this.calculate()
          // this.saveLocationData();
        } else {
          this.visible = false;
        }
        break;
      case 'removeindex':
        if (actionVal == 'yes') {
          (this.mileageGroup.get(this.popupData?.arrayName) as FormArray).removeAt(this.popupData?.index);
        }
        this.visible = false;
        break;
      default:
        break;
    }
  }
  /**
   * Des:Calculate 
   * Author:abarna
   * Date:15/05/2021
   */
  public calculate() {
    // trip close
    // console.log(this.mileageGroup.controls.odometerstart.value,this.mileageGroup.controls.odometerEndValue.value);
    if(parseInt(this.mileageGroup.controls.odometerEndValue.value) > parseInt(this.mileageGroup.controls.odometerstart.value)){
      var totalGioLocations: any = '';
      this.mileageGroup.value.firstTripLocations.map((firstData: any) => {
        totalGioLocations += firstData.geoCodes
        totalGioLocations += '|';
      });
      this.mileageGroup.value.secondTripLocations.map((secData: any) => {
        totalGioLocations += secData.geoCodes
        totalGioLocations += '|';
      });

      var reqData = {
        "geoCodes": totalGioLocations,
        "odometerStart": this.mileageGroup.controls.odometerstart.value,
        "odometerEnd": this.mileageGroup.controls.odometerEndValue.value,
      }
      let resultDate = this.changeDateFormat(this.mileageGroup.controls.expenseDate.value);
      // console.log(this.mileageGroup.controls.odometerEndValue.value);
      this.appService
        .httpPost('MileageDistanceMatrix', reqData, 'getDistance', 'false')
        .subscribe((data) => {
          console.log(data)
          // console.log(data, this.mileageGroup.controls.odometerEndValue.value);
          // setTimeout(() => {
            if(data.content.status === 'success'){
              this.itinearyData = {
                "calculateData": data.content,
                "expanseDate": resultDate,
                "VehicleType": this.mileageGroup.controls.vechileType.value,
                "odometerStart": this.mileageGroup.controls.odometerstart.value,
                "odometerEnd": this.mileageGroup.controls.odometerEndValue.value,
                "firstHalfPurpose": this.mileageGroup.controls.purpose.value,
                "firstHalfOthers": this.mileageGroup?.controls?.others?.value,
                "secHalfPurpose": this.mileageGroup.controls.secPurpose.value,
                "secHalfOthers": this.mileageGroup?.controls?.secondHalfOthers?.value,
                "mileageRate": this.mileageDetails?.[this.mileageGroup.controls.vechileTypeCode.value]?.mileageCost,
                "currency": this.mileageDetails?.[this.mileageGroup?.controls?.vechileTypeCode?.value]?.currency,
                "firstTripLocation": [],
                "secondTripLocations": [],
                "odometerStartImage":this.odometerImageDetails.start.path+"."+this.odometerImageDetails.start.type,
                "odometerEndImage":(this.odometerImageDetails.end !=undefined) ? this.odometerImageDetails.end.path+"."+this.odometerImageDetails.end.type : "",
                "distance": (data.content.distance != undefined) ? data.content.distance.geoDistance + ' ' + data.content.distance.type : data.content.message.distance + '' + data.content.message.type,
                "totalAmount": (data.content.distance != undefined) ? Math.abs(data.content.distance.distance * this.mileageDetails[this.mileageGroup.controls.vechileTypeCode.value].mileageCost) : Math.abs(data.content.message.distance * this.mileageDetails[this.mileageGroup.controls.vechileTypeCode.value].mileageCost)
              }
              this.mileageGroup.controls.firstTripLocations.value.map((floc: any) => {
                this.itinearyData.firstTripLocation.push(floc.locations)
              })
              this.mileageGroup.controls.secondTripLocations.value.map((sloc: any) => {
                this.itinearyData.secondTripLocations.push(sloc.locations)
              })
            }
          // }, 1);
          console.log(this.itinearyData);
          console.log(this.odometerImageDetails)
          this.insertlocationData('pinLocation');
  
        });
      if (this.mileageGroup.controls.odometerEndValue.value) {
        this.finishFirstHalf = false;
        // this.showSecHalf = false;
        this.finishTrip = true
        this.visible = false;
        this.editAction = false;
        this.mileageGroup.controls.secPurpose.disable();
        this.mileageGroup.controls.expenseDate.disable();
        this.mileageGroup.controls.vechileType.disable();
        this.mileageGroup.controls.odometerstart.disable();
        this.mileageGroup.controls.purpose.disable();
        if (this.mileageGroup.controls.secondHalfOthers) {
          this.mileageGroup.controls.secondHalfOthers.disable();
        }
      }
      // else{
      //   this.fielsFocusValidation();
      //   this.submitted = true;
      // }
    }
    else{
      this.submitted = true;
      toastr.error("Odometer end should't less than or equal to Odometer start");
      this.fielsFocusValidation();
    }
  }
  /**
   * fiels focus validation
   */
  public fielsFocusValidation(){
    // toastr.error("Enter mandatory fields"); 
    const invalidControl = this.fieldFocus.nativeElement.querySelector('.form-control.ng-invalid');
      if (invalidControl) {
        invalidControl.focus();
      }
  }
  /**
   * Des:finish the first halt trip
   */
  public finishHalfTrip(tripType: string) {
    var tripTypeVal = (tripType == 'firshHalf') ? 'Finish First Half' : 'Finish second Half';
    this.popupData =
    {
      "title": tripTypeVal,
      "content": "Are you sure, you want to end your first half and continue your second half",
      "purpose": 'finishHalfTrip',

      "action": [
        {
          "name": "No, Dont",
          "moduleName": "",
          "actionName": "no",
          "class": "cls-no cls-btn-secondary",
          "key": "no"
        },
        {
          "name": "Yes, Proceed",
          "moduleName": "",
          "actionName": "yes",
          "class": "cls-btn-primary cls-yes",
          "key": "yes"
        }
      ]
    }
    this.visible = !this.visible;
  }
  /**
   * Des:save the location details
   * Author:abarna
   * Date:15/05/2021
   */
  public saveLocationData() {
    this.mileageGroup.controls.expenseDate.disable();
    this.mileageGroup.controls.vechileType.disable();
    this.mileageGroup.controls.odometerstart.disable();
    this.mileageGroup.controls.purpose.disable();
    if (this.mileageGroup.controls.others) {
      this.mileageGroup.controls.others.disable();
    }
    this.insertlocationData('pinLocation');
    this.visible = false;
  }
  /**
   * save expense
   */
  public insertlocationData(type: string) {
    // console.log(type,this.mileageGroup.controls.firstTripLocations.value,this.mileageGroup.controls.odometerEndValue.value);
    // console.log(this.mileageGroup.controls.expenseDate.value , this.mileageGroup.controls.odometerstart.value  , this.mileageGroup.controls.purpose.value);
      // For Initial Data 
      if(this.mileageGroup.controls.expenseDate.value && this.mileageGroup.controls.odometerstart.value  && this.mileageGroup.controls.purpose.value && this.mileageGroup.controls.firstTripLocations.value.length > 0){
        let resultDate = this.changeDateFormat(this.mileageGroup.controls.expenseDate.value);
        setTimeout(() => {
        this.frequentItinearyData = {
          "calculateData": [],
          "expanseDate": resultDate,
          "VehicleType": this.mileageGroup.controls.vechileType.value,
          "odometerStart": this.mileageGroup.controls.odometerstart.value,
          "odometerEnd": this.mileageGroup.controls.odometerEndValue.value,
          "firstHalfPurpose": this.mileageGroup.controls.purpose.value,
          "firstHalfOthers": this.mileageGroup?.controls?.others?.value,
          "secHalfPurpose": this.mileageGroup.controls.secPurpose.value,
          "secHalfOthers": this.mileageGroup?.controls?.secondHalfOthers?.value,
          "mileageRate": this.mileageDetails?.[this.mileageGroup?.controls?.vechileTypeCode?.value]?.mileageCost,
          "currency": this.mileageDetails?.[this.mileageGroup?.controls?.vechileTypeCode?.value]?.currency,
          "firstTripLocation": [],
          "secondTripLocations": [],
          "distance": 0,
          "totalAmount": 0
        }
        this.mileageGroup.controls.firstTripLocations.value.map((floc: any) => {
          this.frequentItinearyData.firstTripLocation.push(floc.locations)
        })
        this.mileageGroup.controls.secondTripLocations.value.map((sloc: any) => {
          this.frequentItinearyData.secondTripLocations.push(sloc.locations)
        })
      },1);
        let result = this.changeDateFormat(this.mileageGroup.controls.expenseDate.value);
        let savereqData: any = {
          "Mileage": [
            {
              "reimbursable": this.mileageGroup.controls.reimbursable.value,
              "expensedate": result,
              "merchantname": "",
              "currency": 'INR',
              "amount": (this.itinearyData != undefined) ? Math.round(this.itinearyData.totalAmount) : 0,
              "currencyAmount": (this.itinearyData != undefined) ? Math.round(this.itinearyData.totalAmount) : 0,
              "exchangeRate": "1",
              "expenseId": (this.expenseOldData && this.expenseOldData.Mileage) ? this.expenseOldData.Mileage[0].expenseId : (this.editInfo && this.editInfo.Mileage[0].expenseId ? this.editInfo.Mileage[0].expenseId : ''),
              "customData": {
                "view": "mobile",
                "mileageDistance": "0",
                "mileageDistanceUnit": "KM",
                "action": type,
                "odometerStartValue": this.mileageGroup.controls.odometerstart.value,
                "odometerEndValue": this.mileageGroup.controls.odometerEndValue.value,
                "vehicleType": this.mileageGroup.controls.vechileType.value,
                "vehicleTypeCode": this.mileageGroup.controls.vechileTypeCode.value,
                "morningPurpose": this.mileageGroup.controls.purpose.value,
                "morningPurposeCode": this.mileageGroup.controls.purposeCode.value,
                "others": (this.mileageGroup?.controls?.others) ? this.mileageGroup.controls.others.value : '',
                "eveningPurpose": this.mileageGroup.controls.secPurpose.value,
                "secondHalfOthers": (this.mileageGroup?.controls?.secondHalfOthers) ? this.mileageGroup.controls.secondHalfOthers.value : '',
                "eveningPurposeCode": this.mileageGroup.controls.secPurposeCode.value,
                "showSecHalf": this.showSecHalf ? 'Y' : 'N',
                "finishFirstHalf": this.finishFirstHalf ? 'Y' : 'N',
                "finishTrip": this.finishTrip ? 'Y' : 'N',
                "editAction": this.editAction ? 'Y' : 'N',
                "itineraryData": this.itinearyData ? this.itinearyData : this.frequentItinearyData,
                "location": {
                  "morningShift": this.mileageGroup.controls.firstTripLocations.value,
                  "eveningShift": this.mileageGroup.controls.secondTripLocations.value,
                }
              }
            }
          ],
          "reportname": this.formValue.controls.reportname.value,
          "purpose": this.formValue.controls.purpose.value,
          "reportCode": (this.expenseOldData) ? this.expenseOldData.reportCode : (this.editInfo && this.editInfo.reportCode ? this.editInfo.reportCode : ''),
          "reportId": (this.expenseOldData) ? this.expenseOldData.reportId : (this.editInfo && this.editInfo.reportId ? this.editInfo.reportId : ''),
          "reportCustomData": {
            "tripStartDate": '',
            "tripEndDate": ""
          }
        }
        if (Object.keys(this.mileageReportData).length > 0) {
          savereqData.reportCode = this.mileageReportData.reportCode;
          savereqData.reportId = this.mileageReportData.reportId;
        }
        if(this.editInfo){
          savereqData.Mileage[0].expenseId = this.editInfo.Mileage[0].expenseId;
        }
        savereqData['reportCustomData'] = {};
        this.dynamicData?.map((dynamicDataval: any) => {
          if (this.formValue.value[dynamicDataval.id]) {
            savereqData['reportCustomData'][dynamicDataval.id] = this.formValue.value[dynamicDataval.id];
          }
        });
        // console.log(savereqData);
        // this.gridlistJson.emit(savereqData);
        this.appService
          .httpPost('expenseActions', savereqData, 'initial', 'false', true)
          .subscribe((data) => {
            this.savedData = data;
            this.currentLocationDetails.afterPin = data.content;
            this.expenseOldData = data.content;
            if (type == 'save') {
              this.gridlistJson.emit(data.content);
            }
          });
      // }
      }
      else if(this.mileageGroup.controls.firstTripLocations.value.length === 0){
        toastr.error("Pin atleast one location")
      }
      else{
        this.submitted = true;
        this.fielsFocusValidation();
      }
  }
  /**
 * Des:end trip details
 * Author:abarna
 * Date:15/05/2021
 */
  public endTrip() {
    this.endTripFlag=true
    if(this.mileageGroup.value.odometerEndImage!='' && this.endTripFlag==true) {
      
      this.popupData = {
        "title": "End Trip",
        "content": "If you want to end your trip, kindly enter your odometer end value to calculate your total distance travelled ",
        "purpose": 'calculate',
        "filter": [
          {
            "id": "odometerEndValue",
            "label": "Odometer End",
            "required": true,
            "placeholder": "Enter Value",
            "class": "",
            "type": "text",
            "format": "number"
          },
          // {
          //   "class": "cls-file-input",
          //   "type": "text",
          //   "id":"uploadEnd",
          //   "required": false,
          //   "label": "Image Upload",
          //   "event":{
          //     "click":"testFun"
          //   }
          // }
        ],
        
        "action": [
          {
            "name": "Close",
            "moduleName": "",
            "actionName": "no",
            "class": "cls-no cls-btn-secondary",
            "key": "no"
          },
          {
            "name": "Calculate",
            "moduleName": "",
            "actionName": "yes",
            "class": "cls-btn-primary cls-yes",
            "key": "yes"
          }
        ]
      }
      this.visible = true;
    }
    
  }

  /**
 * Des:Form Close Events
 * Author:Venkat
 * Date:18/05/2021
 */
  public formClose() {
    var removeOption = $("#cls-chooseExp option[value='Mileage']");
    removeOption.prop('selected', false);
    $('#cls-chooseExp').trigger('change.select2');
    $('.cls-field').removeClass('ani-in').addClass('ani-out');
    setTimeout(() => {
      $('.cls-nofield,.cls-nocatchoosed,.cls-Mileage,.cls-mobileMileage').removeClass('d-none');
      $('.cls-field,.cls-field .cls-Mileage').addClass('d-none');
      $('.cls-mobileMileage').addClass('d-none');
    }, 200);
    $('#select2-cls-chooseExp-container').text('Select Expense Category');
  }
  /**
   * Des:Edit Events
   * Author:Venkat
   * Date:18/05/2021
   */
  public edit(edit: boolean = false) {
    this.editAction = edit;
    if (this.editAction) {
      this.finishTrip = false;
      // this.showSecHalf = true
    }
  }
  /**
   * Desc:DateFormat Change 20-05-2021 to 20-May-2021
   * @param dateValue 
   * @returns 
   */
  public changeDateFormat(dateValue: any) {
    let date = new Date(dateValue);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.resultdate = date.getDate() + '-' + months[date.getMonth()] + '-' + date.getFullYear();
    return this.resultdate;
  }
  /**
   * file upload
   */
   public onSelectFile(event, type) {
		let image: File = event.target.files[0];
			this.compressImage.compress(image)
			.pipe(take(1))
			.subscribe(compressedImage => {
				var reader = new FileReader();
      	    reader.onload = (event: any) => {
					 this.localUrl = event.target.result;
					 this.compressFile(this.localUrl, compressedImage.name, compressedImage,type);
					// this.service(compressedImage, categoryVal, id);
				 }
				 reader.readAsDataURL(compressedImage);
			})
		
	}
	/**
//    * image compression function
//    */
	public compressFile(image, fileName, val,type): void {
		var orientation = -1;
		this.imageCompress.compressFile(image, orientation, 50, 50).then((result) => {
			this.localCompressedURl = result;
			const imageName = fileName;
			this.imageFile = new File([result], imageName, { type: 'image/jpeg' });
			this.imageFile = new File([result], fileName, { type: 'image/jpeg' });
			const imageVal: any = {
				name: val.name,
				type: val.type
			};
		
			if (val.size <= 2097152) {
				imageVal['image'] = image;
				imageVal['size'] = val.size;
			} else {
				if (this.imageFile.size <= 2097152) {
					imageVal['image'] = this.localCompressedURl;
					imageVal['size'] = this.imageFile.size;
				} else {
					toastr.error('File too large even after compression');
				}
			}
			this.appService.httpPost('receiptHandler', imageVal, 'insertReceipt').subscribe((data) => {
				hideLoader();
        console.log(data)
       
				let objVal = {
					receiptId: data.content.receiptId,
					path: data.content.url,
					name: data.content.name,
					type: data.content.type,
					encodeImage:data.content.encodeImage
				};
        this.odometerImageDetails[type]=objVal;
        // odometerStartImage
       (type=='start')? this.mileageGroup.controls.odometerStartImage.setValue(objVal.encodeImage) :this.mileageGroup.controls.odometerEndImage.setValue(objVal.encodeImage);
       console.log(this.mileageGroup)
        document.getElementById("cls-filename-"+type).innerHTML=this.odometerImageDetails[type].name+'.'+this.odometerImageDetails[type].type;
        console.log(objVal)
        $(".cls-odometer-img-"+type).addClass('d-none');
        $(".cls-preview-image-"+type).removeClass('d-none')
        $("#cls-filename-"+type).removeClass('d-none');
        $('.cls-remove-'+type).removeClass('d-none');
       
			});
		});
	}
  /**
	  * Des: pdf Sanitzer 
	  */
	public sanitizePdfUrl(src:any) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(src);
	}
  /**
   * Des:function for preview the uploaded odometer image
   * @param type :odometer image type (start,end)
   * */
 public previewOdometerImage(type:string):void{
  console.log(this.odometerImageDetails[type])
  this.imageUrl = this.odometerImageDetails[type].path + '.' + this.odometerImageDetails[type].type;
		this.showModal = true;
 }
  public closePreview(data: any) {
    this.showModal = data;
  }
  /**
   * Des:delete the  uploaded odometer image
   */
   public deleteIamge(type:string){
    this.imageFlag=true;
  this.imageContent = {
    title: 'Are you sure want to delete ?',
    deleteImageId:this.odometerImageDetails[type].receiptId,
    type:type,
    button: [
      {
        label: 'No',
        status: false
      },
      {
        label: 'Yes',
        status: true
      }
    ]
  };
  
   }
   /**
    * Des:image delete 
    */
   public imageDelete(event:any){
     this.imageFlag=false;
    console.log(event)
    if(event.flag==true){
        this.appService.httpPost('receiptHandler', { receiptId:this.imageContent.deleteImageId}, 'deleteReceipt', 'false').subscribe((data:any) => { 
          console.log(data)
          if(data.content.status=="success"){
            $(".cls-odometer-img-"+this.imageContent.type).removeClass('d-none');
            $(".cls-preview-image-"+this.imageContent.type).addClass('d-none')
            $("#cls-filename-"+this.imageContent.type ).addClass('d-none');
            $('.cls-remove-'+this.imageContent.type).addClass('d-none');
          }
        });
    }
   }
   /**
    * Des:open the file picker
    */
   public openFile(type:string){
     $("#upload"+type).trigger("click")
   }
   public testFun(){
     console.log('test fun')
   }
   myFunction(event){
     console.log(event)
   }
}


