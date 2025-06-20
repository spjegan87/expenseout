import { Component, OnInit, ViewEncapsulation, OnChanges, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { urlConfig } from '../../../core-module/config/url';
import { Router } from '@angular/router';
import { AppService } from '../../../core-module/services/app.service';
import { DatepickerService } from '../../../core-module/services/datepicker.service';
import { DatePipe } from '@angular/common';
import { config } from '../../../core-module/config/app';
import { NgxImageCompressService } from 'ngx-image-compress';
import { LocationService } from '../../../core-module/services/location.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { take } from "rxjs/operators";
import { CompressionService } from "../../../core-module/services/compression.service";
// import { get } from 'scriptjs';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;
declare var feather: any;
declare function hideLoader(): any
declare var toastr: any;
/**
 * Author: Padma Priya CK.
 * Created Date: 08-07-2020
 * Module : dynamic form category to create report
 */
@Component({
	selector: 'app-report-index',
	templateUrl: './report-index.component.html',
	styleUrls: ['./report-index.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ReportIndexComponent implements OnInit, OnChanges, AfterViewInit {
	imgResultBeforeCompress: string;
	imgResultAfterCompress: string;
	imageSizeInfo: any = {
		beforeCompress: '',
		afterCompress: ''
	}
	diffdays: number = 0
	/**
	 * Find 60th date from trip start date
	 */
	public resultDate: any;
	/**
	 * Store Trip start date value
	 */
	public tripStart: any;
	public allowanceDesc: any;
	/**
	 * Store Trip end date value
	 */
	public tripEnd: any;
	/**
	*To store 60th date value  only date value
	 */
	public result_date: any;
	/**
	 * Get Index from Allowance rate dropdown value 
	 */
	public allowanceIndex: number = 0;
	mileageKmLength: boolean;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private _DatepickerService: DatepickerService,
		private appService: AppService,
		private autocompleteCity: LocationService,
		private imageCompress: NgxImageCompressService,
		private deviceService: DeviceDetectorService,
		public datepipe: DatePipe,
		// private elRef: ElementRef,
		public sanitizer: DomSanitizer,
		private compressImage: CompressionService,
	) {
		toastr.options = {
			timeOut: 5000,
			progressBar: true,
			showMethod: 'slideDown',
			hideMethod: 'slideUp',
			showDuration: 500,
			hideDuration: 150,
			positionClass: 'toast-top-center'
		};
	}
	/**
   * Desc breadcrumb
   */
	public breadcrumb: any = [];
	/**
   * mileageTrueJson
   */
	public mileageTrueJson: any = [];
	/**
   * checkAllowance
   */
	public checkAllowance: boolean = false;
	/**
   * Image url
   */
	public imageUrl: string;
	/**
   * file
   */
	public file: any;
	/**
   * localUrl
   */
	public localUrl: any;
	/**
   * localCompressedURl
   */
	public localCompressedURl: any;
	/**
   * imageFile
   */
	public imageFile: any;
	/**
   * Desc widget
   */
	public widget: any = [];
	/**
   * Store category
   */
	public categoryArray: any = [];
	/**
   * Desc : expense
   */
	public expense: any = [];
	/**
   * Desc : Select
   */
	public Select: any;
	/**
   * Desc : loader
   */
	public loader: boolean = false;
	/**
   * Desc : selected
   */
	public selectedVal: boolean = false;
	/**
   * Desc : selected category array
   */
	public categorySelected: any = [];
	/**
   * settleAmount
   */
	public settleAmount: any = {};
	/**
   * Desc :settleform
   */
	public settleform: boolean = false;
	/**
   * DayscountVar
   */
	public daysCountVar: any = [0];
	/**
   * DayscountVar
   */
	public amountAllowance: any = [0];
	/**
   * alertShow
   */
	public alertShow: boolean = false;
	/**
   * show button
   */
	public showButton: boolean = true;
	/**
   * image
   */
	public imageFlag: boolean = false;
	/**
   * Desc : store image val
   */
	public imageCatDelete: any = {};
	/**
   * desc : config currency
   */
	public userCurrency: string = '';
	/**
   * sample json data
   */
	public gridlistJson: any = {};
	/**
   * mileage
   */
	public mileageDetails: any = [];
	/**
   * Desc : editResponse
   */
	public editResponse: any = {};
	/**
   * Receipt Val
   */
	public receiptVal: any = [];
	/**
   * alertContent
   */
	public alertContent: any = {};
	/**
   * reset alert content
   */
	public resetContent: any = {};
	/**
   * reset flag
   */
	public resetShow: boolean = false;
	public resetVal: any;
	/**
	 * Des:reset val index
	 */
	public resetValIndex: any;
	/**
   * imageContent
   */
	public imageContent: any = {};
	/**
   * tabName history
   */
	public tabHistory: number = 1;
	/**
   * confirmationContent
   */
	public confirmationContent: any = {};
	/**
   * grid view flag
   */
	public gridview: string;
	/**
   * Selected category
   */
	public selectedCategory: string;
	/**
   * show image preview flag
   */
	public showModal: boolean = false;
	/**
   * confirmation
   */
	public confirmation: boolean = false;
	/**
   * Desc: current action
   */
	public currentAction: string = '';
	/**
   * Desc : checkArray editval
   */
	public checkArray: any = [];
	/**
   * Desc : customValStore
   */
	public tempVariable: any = {};
	/**
   * Desc : viewList
   */
	public viewListJson: any = {};
	/**
   * Desc : deleteIdReq
   */
	public deleteIdReq: any = {};
	/**
   * Desc : exchangeAmount currency
   */
	public exchangeAmount: number;
	/**
   * exchangeRate
   */
	public exchangeRateVal: any = {};
	/**
   * Desc: Pendingapproval
   */
	public approvalFlag: string = '';
	/**
   * currency variable
   */
	public currency: any = [];
	/**
   * histort flag
   */
	public historyFlag: boolean = false;
	/**
   * advance adjustment show and hide flag
   */
	public advanceAdjustmentFlag: boolean = false;
	/**
   * to show advance adjustment button
   */
	public advanceAdjustmentBtn: boolean = false;
	/**
   * advance adjustment service response variable
   */
	public advanceAdjustment: any = [];
	/**
   * send report id to advance adjustment component variable
   */
	public advanceReportData: any = [];
	/**
   * advance adjustment count variable
   */
	public advanceAdjustmentCount: number;
	/**
   * report receipt opan flag
   */
	public reportRecipt: boolean = false;
	/**
   * report recipt list variable
   */
	public reportReciptList: any = [];
	/**
   * input variable for report recipt
   */
	public reportReciptListInput: any = [];
	/**
   * selected value array from recipt list
   */
	public selectedCheck: any = [];
	/**
   * unselected value array from recipt list
   */
	public unSelectedVal: any = [];
	/**
   * manual reimbursement component show hide flag
   */
	public manualReimbursedFlag: boolean = false;
	public historyInput: any = [];
	public manualInput: any;
	/**
   * expand icon flag
   */
	public expandOpen: boolean = false;
	/**
   * approval alert variable
   */
	public approvalAlert: boolean = false;
	/**
   * approval alert input data
   */
	public approvalAlertInput: any = [];
	/**
   * policy date
   */
	public policyDate: any;
	public policyAmount: any;
	/**
   * policy flag
   */
	public policyLoader: boolean = false;
	/**
   * policy data variable
   */
	public policyData: any = [];
	/**
   * policy data Array
   */
	public policyArray: any = [];
	/**
   * Report fields
   */
	public reportFields: any = [];
	/**
   * savedReceipt variable
   */
	public savedReceipt: any = [];
	/**
   * report name array
   */
	public reportName: any = [];
	/**
   * allowancerateDrop
   */
	public allowancerateDrop: any = {
		0: []
	};
	/**
   * sheet download status in config
   */
	public sheetDownload: string;
	/**
   * DEsc : form group
   */
	public category: FormGroup = this.fb.group({});
	/**
   * depth view data
   */
	public depthViewData: any = {};
	/**
   * min date
   */
	public minDate: any = '';
	/**
   * max date
   */
	public maxDate: any = '';
	/**
   * trip StartDate
   */
	public tripStartDate: any = '';
	/**
   * trip End Date
   */
	public tripEndDate: any = '';
	/**
   * expense report
   */
	public expenseReport: any;
	/**
   * bulk upload
   */
	public bulkUpload: any;
	/**
   * claim type
   */
	public allowanceClaimType: any;
	/**
   * download name
   */
	public downloadName: string;
	/**
	 *Receipt Mandatory Check 
	 */
	// public receiptMandatoryCheck: any = [];
	/**
   * allowance form subscribe
   */
	private allowanceSubscr: Subscription[] = [];
	/**
	 * allowance date
	 */
	public allowanceDateSub: Subscription[] = [];
	/**
	 * expense Date Unsubscribes
	 */
	public expenseDateUnsub: Subscription[] = [];
	/**
	 * hotelDateSubscr
	 */
	public hotelDateSubscr: Subscription[] = [];
	/**
	 * mileage config
	 */
	// public mileageGeo: string;
	/**
	 * reportCustomFieldsArray 
	 */
	public reportCustomFieldsArray: any = [];
	/**
	 * pdf
	 */
	public pdfPath: any;
	/**
	* depth view
	*/
	public depthView: string;
	/**
	* Des: Device Managing
	*/
	/**
	* Des: Device Managing
	*/
	public deviceInfo: any = "";
	/**
	* Des: Device Managing
	*/
	public deviceFlag: boolean = false;
	/**
	* Des: Device Managing
	*/
	public mileagrInterface: boolean = false;
	/**
	* Des: Edit Info Data
	*/
	public mileageEditData: any;
	/*
	* Des: Edit Info Data
	*/
	public editViewWeb: boolean = false;
	/**
	 * disable traveltype
	 */
	public isDisableTraveltype: boolean = false;
	/**
	 * frequently Used Array
	 */
	public frequentlyUsedArr: any = [];
	/**
	 * parent Category Name
	 */
	public parentCategoryName: string;
	/**
	 * Sixty date Allwowance check condition for MRF user login
	 */
	public sixtyDate: boolean;
	public AllowanceIndex: number;
	/**
	 * Des:currentTravelMode
	 */
	public currentTravelMode: string = '';
	/**
	 * Des:currentTravelMode index
	 */
	public currentTravelModeIndex: number = 0;
	/**
	 * Mileage toalkm
	 */
	public totalKm: any;
	/**
	 * Odometer start value
	 */
	public odometerStart: number = 0;
	/**
	 * Odometer End value
	 */
	public odometerEnd: any;
	/**
	 * Personal Distance value
	 */
	public personalDistance: number = 0;
	/**
	 * mile km
	 */
	public mileKm: any;
	/**
	 * actual km
	 */
	public actualTotalKm: any;
	/**
	 * get over report details 
	 */
	public getOverallReportDetails: any;
	/**
	 * travelStatement
	 */
	public travelStatement: boolean = false;
	/**
	 * defaultReportSheet
	 */
	public defaultReportSheet: any;
	/**
	 * download default name
	 */
	public defaultDownloadName: any;
	/**
	 * locationCity value changes
	 */
	public locationCity: Subscription[] = [];
	/**
	 * travel type field
	 */
	public allowanceField: string;
	/**
	 * approval alert heading
	 */
	public approvalAlertHead: string;
	/**
	 * approval expiry popup
	 */
	public approvalPopup: any = [];
	/**
	 * 
	 */
	public approvalPopupFlag: boolean = false;
	/* 
	* Desc: alert flag
	*/
	public showAlert: boolean = false;
	/* 
	* Desc: alert box content.
	*/
	public dataForAlert: any = [];

	public ngAfterViewInit(): void {
		feather.replace();
	} 
	/**
   * Desc : oninit
   **/
	public async ngOnInit() {
		this.deviceInformation();
		// showLoader();
		if (window.localStorage.getItem("report") == undefined || window.localStorage.getItem("report") == null) {
			let data = await this.appService.httpPost('customFieldData', { type: 'report' }, 'fetchCustomField', 'false').toPromise();
			this.reportFields = data.content.customData;
			let encryptData = this.appService.dataEncryption(JSON.stringify(this.reportFields));
			window.localStorage.setItem("report", encryptData);
		}
		else {
			let decrypt = window.localStorage.getItem("report");
			this.reportFields = this.appService.dataDecrypt(decrypt);
			this.reportFields = JSON.parse(this.reportFields);
		}
		this.reportFields.map((data: any) => {
			if (data.required === true) {
				this.category.addControl(data.id, new FormControl('', [Validators.required]));
			} else {
				this.category.addControl(data.id, new FormControl(''));
			}
			if (data.default_field === 'false') {
				this.reportCustomFieldsArray.push(data.id);
			}
		});
		if (history.state.fetchData) {
			this.category.controls.reportname.setValue(history.state.fetchData.reportname);
			// this.category.controls.purpose.setValue(history.state.fetchData.purpose);
		}
		this.sixtyDate = true;
		this.categoryCall();
		// this.mileageGeo = config.CONFIGSETTINGS['geoTaggingStatus'].geoTagging;
		this.userCurrency = config.USER_CURRENCY;
		this.bulkUpload = config.CONFIGSETTINGS['EXPENSE_VAULT'].bulk_add_expense;
		this.allowanceClaimType = config.CONFIGSETTINGS['allowance_interface'] && config.CONFIGSETTINGS['allowance_interface'].hourlyBasis;
		this.mileagrInterface = (config.CONFIGSETTINGS['mileage_interface'] && config.CONFIGSETTINGS['mileage_interface'].gpsMileage == 'Y') ? true : false;
		if (config.CONFIGSETTINGS?.['reportExpenseSheetDownload']?.['sheetDownload']) {
			this.sheetDownload = config.CONFIGSETTINGS['reportExpenseSheetDownload']['sheetDownload'];
			this.downloadName = config.CONFIGSETTINGS['reportExpenseSheetDownload'].name;
		}
		if (config.CONFIGSETTINGS?.['reportExpenseSheetDownload']?.['defaultReportSheet']) {
			this.defaultReportSheet = config.CONFIGSETTINGS['reportExpenseSheetDownload']['defaultReportSheet'];
			this.defaultDownloadName = config.CONFIGSETTINGS['reportExpenseSheetDownload'].defaultName;
		}
		this.mileKm = 'KM'
		this.select2();
		let thisvar = this;
		$('.cls-select').on('select2:select', function (event) {
			// setTimeout(() => {	
			$('.cls-nofield,.cls-nocatchoosed').addClass('d-none');
			if (thisvar.deviceFlag && event.params.data.id == 'Mileage' && thisvar.mileagrInterface) {
				$('#mobileMileage').removeClass('d-none');
				$('.cls-mobileMileage').removeClass('ani-out').addClass('ani-in');
			} else {
				$('.cls-field,.cls-field #' + event.params.data.id + '0').removeClass('d-none');
			}
			thisvar.isDisableTraveltype = (event.params.data.id == 'Allowance' && thisvar.reportCustomFieldsArray.length > 0) ? true : null;
			$('#select2-cls-chooseExp-container').text('Select Expense Category');
			// }, 10);
		});
		// }, 200);
		if (config.CONFIGSETTINGS['frequentlyUsedCategory']) {
			this.frequentlyUsedArr = config.CONFIGSETTINGS['frequentlyUsedCategory'];
		}
		this.breadcrumb = [
			{
				name: 'Expense Report',
				home: urlConfig.ROUTES.home,
				routerLink: urlConfig.ROUTES.expenseReport,
				active: 'N'
			},
			{
				name: 'Create Expense Report',
				routerLink: '',
				active: 'Y'
			}
		];
		this.widget = [
			{
				no: 1,
				name: 'Create',
				status: 'N',
				initial_no: 1,
				users: {
					id: config.USER_ID
				}
			},
			{
				no: 2,
				name: 'Sent for Approval',
				status: 'N',
				initial_no: 2
			},
			{
				no: 3,
				name: 'Approved',
				status: 'N',
				initial_no: 3
			},
			{
				no: 4,
				name: 'Settled',
				status: 'N',
				initial_no: 4
			}
		];

		if (window.localStorage.getItem("currency") == undefined || window.localStorage.getItem("currency") == null) {
			let data = await this.appService.httpPost('currencyList', {}, 'getList', 'false').toPromise();
			this.currency = data.content.currencyList;
			let encryptData = this.appService.dataEncryption(JSON.stringify(this.currency));
			window.localStorage.setItem("currency", encryptData);
		}
		else {
			let decrypt = window.localStorage.getItem("currency");
			// this.currency = JSON.parse(this.appService.dataDecrypt(decrypt));
			this.currency = this.appService.dataDecrypt(decrypt);
			this.currency = JSON.parse(this.currency);
		}
		let reportdata = await this.appService.httpPost('expenseActions', {}, 'checkReportExsitsName', 'false').toPromise();
		this.reportName = reportdata.content;
		// });
		this.reportReciptService();
		this.setDatesFromTrip();
		// this.receiptMandatoryCheck = config.RECEIPT_MANDATORY;
	}
	/**
	 * Des: check device type
	 */
	public deviceInformation() {
		this.deviceInfo = this.deviceService.getDeviceInfo();
		const isMobile = this.deviceService.isMobile();
		const isTablet = this.deviceService.isTablet();
		this.deviceInfo["platform"] =
			isMobile == true ? "mobile" : isTablet == true ? "tab" : "desktop";
		(this.deviceInfo["platform"] == 'mobile' || this.deviceInfo["platform"] == 'tab') ? this.deviceFlag = true : this.deviceFlag = false;
	}
	/**
	 * set tripstartdate and tripenddate
	 */
	public setDatesFromTrip() {
		if (this.reportCustomFieldsArray?.length > 0) {
			if (
				(this.category as FormGroup).controls['tripStartDate']?.value !== '' &&
				(this.category as FormGroup).controls['tripEndDate']?.value !== ''
			) {
				this.chooseDate('setOtherDates', 'setOtherDates', null);
			}
		}
	}
	/**
	* checkReportName
	*/
	public checkReportName(id: any): void {
		if (id === 'reportname') {
			// console.log(this.reportName,this.category.controls[id].value,'reportfield');
			var rdata = this.reportName.map((rname: any) => {
				return rname.toUpperCase();
			})
			// console.log(rdata)
			if (rdata.includes(this.category.controls[id].value.toUpperCase())) {
				toastr.error('Report name already exist');
			}
		}
	}
	/**
   * validate report field and other field
   */
	public ngDoCheck(): void {
		let count = 0;
		let requiredValidationCount = 0;
		if (this.reportFields?.length > 0) {
			this.reportFields?.map((value: any) => {
				if (value.required === true) {
					requiredValidationCount = requiredValidationCount + 1;
					if (this.category.controls[value.id]?.valid) {
						count = count + 1;
					}
				}
			});
		}
		if (requiredValidationCount === count) {
			$('.cls-nofield').addClass('cls-enable-select');
		} else {
			$('.cls-nofield').removeClass('cls-enable-select');
		}
	}
	public onBlurEvent(category: string, groupid: number, catName: string, formcontrolName: string): void {
		this.getVal(category, groupid, catName, formcontrolName);
	}
	/**
   * destinationPolicy
   */
	public destinationPolicy(dataVal: string, i: number, catName: string, formControl: string): any {
		// let locationdestination: any = [
		//   "airDestination",
		//   "trainDestination",
		//   "hotelDestination",
		//   "busDestination",
		//   "taxiDestination",
		//   "mealDestination",
		//   "allowanceDestination",
		//   "cabDestination",
		//   "allowanceActionType"
		// ];
		// if (locationdestination.includes(formControl)) {
		if (formControl === 'allowanceDestination' || formControl === 'allowanceActionType') {
			let claimType: string = ((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls[
				'claimType'
			].value;
			let city: string;
			let allowanceType: string;
			// this.form = this.fb.group({
			// 	allowanceDestination: ((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls[
			// 		'allowanceDestination'
			// 	],
			// 	allowanceActionType: ((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls[
			// 		'allowanceActionType'
			// 	]
			// });
			if(formControl === 'allowanceDestination'){
				this.form = this.fb.group({
					allowanceDestination: ((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls[
						'allowanceDestination'
					]
				});
			}
			if(formControl === 'allowanceActionType'){
				this.form = this.fb.group({
					allowanceActionType: ((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls[
								'allowanceActionType'
							]
				});
			}
			// if(((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).valid){
			//   this.subscr.unsubscribe();
			// }
			this.allowanceSubscr.push(this.form.valueChanges.subscribe(() => {
				if (formControl === 'allowanceDestination' || formControl === 'allowanceActionType') {
					// allowanceType = ((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls[
					// 	'allowanceActionType'
					// ].value;
					city = ((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls[
						'allowanceDestination'
					].value;
					let formData: object;
					if (config.CONFIGSETTINGS['allowance_interface'].actionBasedAllowanceMRF === 'Y') {
						formData = {
							claimType: claimType,
							city: city,
							allowanceActionType: ((this.category.get(dataVal) as FormArray).controls[i] as FormGroup)
								.controls['allowanceActionType'].value,
							daysCount: ((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls[
								'daysCountVar'
							].value,
							typeOfTravel: this.category.controls.travelType.value
						};
					} else {
						formData = { claimType: claimType, city: city };
					}
					if (city.length > 3 && allowanceType) {
						((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls[
							'allowanceRate'
						].reset();
						((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls[
							'amount'
						].setValue(0);
						this.appService
							.httpPost('allowanceInterface', formData, 'getAllowanceGroupDetails', 'false')
							.subscribe((data) => {
								this.allowancerateDrop[i] = data.content;
								if (data.content.length > 0) {
									if (data.content.status === 'danger') {
										((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls["allowanceRate"].reset();
										((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls["allowanceActionType"].reset();
									}
									// if(((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls["allowanceRate"].value != ''){
									//   ((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls["allowanceRate"].reset();
									// }
								} else {
									this.checkAllowance = true;
									// toastr.error('Allowance not available for particular criteria');
								}
							});
					}
				}
			})
			);
		} else {
			this.locationCity.forEach(s => s.unsubscribe());
			this.locationCity.push((((this.category as FormGroup).controls[catName] as FormArray).controls[i] as FormGroup).controls[
				formControl].valueChanges.subscribe(() => {
					let val = (((this.category as FormGroup).controls[catName] as FormArray).controls[i] as FormGroup).controls[formControl].value;
					if (val?.length > 8) {
						this.getVal(dataVal, i, catName, formControl);
					}
				}));
		}
		// }
	}
	public getVal(formArray: any, formgrp: any, catName: string, _formcontrolName: string): void {
		if (this.parentCategoryName === 'Hotel') {
			this.expenseDateUnsub.forEach(s => s.unsubscribe());
			this.hotelDateSubscr.forEach(s => s.unsubscribe());
		}
		this.policyDate = ((this.category.controls[formArray] as FormArray).controls[formgrp] as FormGroup).controls.expensedate.value
		let policyFieldAmount : any = ((this.category.controls[formArray] as FormArray).controls[
			formgrp
		] as FormGroup).controls.amount.value
		this.policyAmount = ((this.category.controls[formArray] as FormArray).controls[
			formgrp
		] as FormGroup).controls.currencyAmount.value;
		// || this.policyAmount === 0
		if (
			(this.policyDate != null && this.policyAmount != null && this.policyAmount != '')
		) {
			let formData = {
				[catName]: [
					{
						expenseDate: this.policyDate,
						amount: this.policyAmount,
						currency: ((this.category.controls[formArray] as FormArray).controls[formgrp] as FormGroup)
							.controls.currency.value
					}
				]
			};
			let indexName: string = '';
			let indexCat = formArray.toLowerCase();
			indexName = indexCat + 'Destination';
			if (this.category.get(formArray)['controls'][formgrp].controls[indexName]) {
				formData[catName][0]['city'] = this.category.get(formArray)['controls'][formgrp].controls[
					indexName
				].value;
			}
			let hotelFormControlName: string = '';
			if (catName === 'Hotel' || catName === 'Meal') {
				for (const [key, _value] of Object.entries(this.category.get(formArray)['controls'][formgrp].controls)) {
					if (key === 'hotelTypeOfTravel' || key === 'mealTypeOfTravel' || key === 'accommodationType') {
						hotelFormControlName = key;
					}
				}
			}
			if ((this.reportCustomFieldsArray?.length > 0) || (this.reportCustomFieldsArray?.length === 0) && (hotelFormControlName === 'mealTypeOfTravel' || hotelFormControlName === 'hotelTypeOfTravel')) {
				// if(!hotelFormControlName){
				// 	let accTypeVal = this.category.get(formArray)['controls'][formgrp].controls['accommodationType'].value;
				// 	formData[catName][0]['accommodationType'] = accTypeVal
				// }
				if (hotelFormControlName === 'hotelTypeOfTravel' || hotelFormControlName === 'mealTypeOfTravel' || hotelFormControlName === 'accommodationType') {
					let accTypeVal = this.category.get(formArray)['controls'][formgrp].controls[hotelFormControlName].value;
					formData[catName][0][hotelFormControlName] = accTypeVal
				}
			}
			if (catName === 'Hotel' || this.parentCategoryName === 'Hotel') {
				let checkIn = ((this.category.controls[formArray] as FormArray).controls[formgrp] as FormGroup).controls.hotelCheckIn.value
				let checkOut = ((this.category.controls[formArray] as FormArray).controls[formgrp] as FormGroup).controls.hotelCheckOut.value
				if (checkIn && checkOut) {
					formData[catName][0]['hotelCheckIn'] = checkIn
					formData[catName][0]['hotelCheckOut'] = checkOut
				}
			}
			if(policyFieldAmount > 0){
				this.policyLoader = true;
				console.log(formData);
				
				this.appService.httpPost('policyViolation', formData, 'checkPolicyViolation', 'false').subscribe((data) => {
					console.log(data, this.policyData)
					this.policyData[formArray][formgrp] = data.content;
					console.log(this.policyData, this.receiptVal[formArray][formgrp])
					if (data.content.receiptMandatory === 'Y' && this.receiptVal[formArray][formgrp].length === 0) {
						((this.category.controls[formArray] as FormArray).controls[formgrp] as FormGroup).controls.upload.setValidators([Validators.required]);
					}
					else {
						((this.category.controls[formArray] as FormArray).controls[formgrp] as FormGroup).controls.upload.clearValidators();
					}
					if (data.content.policyDetect === 'Y') {
						(((this.category as FormGroup).controls[formArray] as FormArray).controls[
							formgrp
						] as FormGroup).addControl('reason', this.fb.control('', [Validators.required]));
					} else {
						(((this.category as FormGroup).controls[formArray] as FormArray).controls[
							formgrp
						] as FormGroup).removeControl('reason');
					}
					setTimeout(() => {
						this.policyLoader = false;
					}, 600);
				});	
			}
		}
		// }, 10)
	}
	// Search Dropdown Function
	public searchDropdown(id: any) {
		setTimeout(() => {
			$('#' + id).focus();
		}, 100);
	}
	// search filter function
	public filterFunction(aa: any, bb: any) {
		this.appService.commonSearchFilter(aa, bb);
	}
	/**
	 * changeMileCalculateBy
	 */
	public changeMileCalculateBy(CatName: string, arrayIndex: number, formcontrolName: string, index: number) {
		console.log(CatName, arrayIndex, formcontrolName, index);
		if (formcontrolName === 'calculatedThrough' && index === 0) {
			(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[arrayIndex] as FormGroup).controls['calculatedThrough']?.setValue('Y');
		}
		else {
			(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[arrayIndex] as FormGroup).controls['calculatedThrough']?.setValue('N');
		}
		let calculatedThrough = (((this.category as FormGroup).controls['Mileage'] as FormArray).controls[arrayIndex] as FormGroup).controls['calculatedThrough'].value;
		// console.log(calculatedThrough);
		(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[
			arrayIndex
		] as FormGroup).controls['amount'].reset();
		(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[
			arrayIndex
		] as FormGroup).controls['mileageDistance'].reset();
		if (calculatedThrough !== 'Y') {
			(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[arrayIndex] as FormGroup).addControl('odometerStart', this.fb.control('', [Validators.required]));
			(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[arrayIndex] as FormGroup).addControl('odometerEnd', this.fb.control('', [Validators.required]));
			(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[arrayIndex] as FormGroup).addControl('personalDistance', this.fb.control(''));
		}
		else {
			(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[arrayIndex] as FormGroup).removeControl('odometerStart');
			(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[arrayIndex] as FormGroup).removeControl('odometerEnd');
			(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[arrayIndex] as FormGroup).removeControl('personalDistance');
		}
		// console.log((((this.category as FormGroup).controls['Mileage'] as FormArray).controls[arrayIndex] as FormGroup));

	}
	/**
	 * click select to reset search with select value
	 */
	public setFilterSelectValue(formArrayName: any, arrayIndex: number, formcontrolName: string) {
		//  console.log(formArrayName,arrayIndex,formcontrolName);
		((this.category.controls[formArrayName] as FormArray).controls[arrayIndex] as FormGroup).controls[
			formcontrolName
		].reset();
	}
	// search filter set value function
	public form: FormGroup = new FormGroup({});
	public setFilterValue(
		formname: FormGroup,
		formArrayName: any,
		formcontrolName: string,
		arrayIndex: number,
		value: string,
		catName: string,
		allowanceIndex: number = null,
		allowanceName: string) {
		this.form = formname;
		// this.allowanceIndex = allowanceIndex;
		((this.form.controls[formArrayName] as FormArray).controls[arrayIndex] as FormGroup).controls[
			formcontrolName
		].setValue(value);
		if ((this.reportCustomFieldsArray?.length > 0 && formcontrolName === 'accommodationType') || (this.reportCustomFieldsArray?.length === 0 && (formcontrolName === 'mealTypeOfTravel' || formcontrolName === 'hotelTypeOfTravel'))) {
			this.onBlurEvent(formArrayName, arrayIndex, catName, formcontrolName);
		}
		if (formcontrolName === 'currency') {
			this.currencyChoosed(formArrayName, arrayIndex, catName);
		}
		if (formcontrolName === 'allowanceRate') {
			let amountVal: number;
			this.amountAllowance[arrayIndex] = this.allowancerateDrop[arrayIndex][allowanceIndex]['currencyAmount'];
			let date1 = new Date((((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				arrayIndex
			] as FormGroup).controls['allowanceFrom'].value);
			// let date1: any = new Date((this.category as FormGroup).controls['tripStartDate'].value);
			this.resultDate = this.addDays(date1, 59);
			this.tripStart = new Date((((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				arrayIndex
			] as FormGroup).controls['allowanceFrom'].value);

			this.allowanceDesc = new Date((((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				arrayIndex
			] as FormGroup).controls['allowanceDesc'].value);
			
			this.tripEnd = new Date((((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				arrayIndex
			] as FormGroup).controls['allowanceTo'].value);
			let noOfDdays = (((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				arrayIndex
			] as FormGroup).controls['daysCountVar'].value;
			let fromDate = Math.abs(this.tripStart - this.resultDate);
			let toDate = Math.abs(this.tripEnd - this.resultDate);
			const fromDatediffDays = Math.ceil(fromDate / (1000 * 60 * 60 * 24)) + 1;
			const toDatediffDays = Math.ceil(toDate / (1000 * 60 * 60 * 24));
			if (
				(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[arrayIndex] as FormGroup)
					.controls['claimType'].value === 'days' && allowanceName == "Flat rate allowance"
				&& this.tripStart <= this.resultDate && this.tripEnd > this.resultDate
			) {
				amountVal = this.amountAllowance[arrayIndex] * fromDatediffDays + (0.5 * this.amountAllowance[arrayIndex]) * toDatediffDays;
			}
			else if (
				(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[arrayIndex] as FormGroup)
					.controls['claimType'].value === 'days' && allowanceName == "Flat rate allowance" && (this.tripStart > this.resultDate)
			) {
				amountVal = (0.5 * this.amountAllowance[arrayIndex]) * noOfDdays;
			}
			else if (
				(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[arrayIndex] as FormGroup)
					.controls['claimType'].value === 'days' && allowanceName == "Flat rate allowance" && this.tripStart <= this.resultDate && this.tripEnd <= this.resultDate
			) {
				amountVal = this.amountAllowance[arrayIndex] * noOfDdays;
			}
			else if (
				(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[arrayIndex] as FormGroup)
					.controls['claimType'].value === 'days' && allowanceName != "Flat rate allowance"
			) {
				amountVal = this.amountAllowance[arrayIndex] * noOfDdays;
			}
			else {
				this.amountAllowance[arrayIndex] = this.allowancerateDrop[arrayIndex][allowanceIndex]['currencyAmount'];
				amountVal =
					this.amountAllowance[arrayIndex] *
					(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
						arrayIndex
					] as FormGroup).controls['noOfHours'].value;
			}
			let date = this.resultDate.toString();
			this.result_date = date.split('00', 2).shift();
			(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				arrayIndex
			] as FormGroup).controls['amount'].setValue(amountVal);
			(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				arrayIndex
			] as FormGroup).controls['currencyAmount'].setValue(amountVal);
		}
		if (formArrayName === 'Mileage') {
			if (formcontrolName === 'vehicleType') {
				// console.log((((this.category as FormGroup).controls['Mileage'] as FormArray).controls[arrayIndex] as FormGroup).controls);
				let vehicleType = (((this.category as FormGroup).controls['Mileage'] as FormArray).controls[
					arrayIndex
				] as FormGroup).controls['vehicleType']?.value;
				this.mileageTrueJson.map((data: any, index: number) => {
					// console.log(data);
					if (data.vehicleType === vehicleType) {
						(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[
							arrayIndex
						] as FormGroup).controls['mileagePerUnit']?.setValue(this.mileageTrueJson[index].mileageCost);
						this.mileKm = data.mileage;
					}
				})
			}
			if (
				((this.form.controls[formArrayName] as FormArray).controls[arrayIndex] as FormGroup).controls['amount']
					.value !== ''
			) {
				this.onBlurEvent(formArrayName, arrayIndex, catName, formcontrolName);
			}
			this.distanceChoosed(formArrayName, arrayIndex, catName);
		}
	}
	public addDays(theDate, days) {
		return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
	}

	/**
   * ONchanges
   */
	public ngOnChanges(): void {

		this.select2();
		let thisvar = this;
		setTimeout(() => {
			$('.cls-select').on('select2:select', function (event) {
				$('.cls-nofield,.cls-nocatchoosed').addClass('d-none');
				$('.cls-frequent #' + event.params.data.id).remove();
				if (thisvar.deviceFlag && event.params.data.id == 'Mileage' && thisvar.mileagrInterface) {
					$('#mobileMileage').removeClass('d-none');
					$('.cls-mobileMileage').removeClass('ani-out').addClass('ani-in');
				} else {
					$('.cls-field,.cls-field #' + event.params.data.id + '0').removeClass('d-none');
				}
				thisvar.isDisableTraveltype = (event.params.data.id == 'Allowance' && thisvar.reportCustomFieldsArray.length > 0) ? false : null;
				// $('.cls-field,.cls-field #' + event.params.data.id + '0').removeClass('d-none');
				$("#cls-chooseExp option[value='" + event.params.data.id + "']").remove();
				setTimeout(() => {
					$('.select2-results__option[aria-label="' + parent + '"]').remove();
				}, 10);
				$('#select2-cls-chooseExp-container').text('Select Expense Category');
			});
		}, 10);
	}
	/**
   * string validation
   */
	public stringValidation(event: any) {
		const strOnly = /^[A-Za-z0-9 ]+$/;
		let inputChar = String.fromCharCode(event.charCode);
		if (!strOnly.test(inputChar)) {
			event.preventDefault();
		}
	}
	/**
   * emptyCategory
   */
	public emptyCategory(flag: any): void {
		this.deleteIdReq.mode = flag.mode;
		this.deleteIdReq.id = flag.id;
		this.expense[0].components.map((data: any) => {
			if (data.id === flag.id) {
				this.deleteIdReq['icon'] = data['icon'];
				this.deleteIdReq['color'] = data['color'];
			}
		});
		this.alertAction({ flag: true }, 'category');
	}
	/**
   * Desc : select2 initialize
   */
	public select2(): void {
		$('.cls-select').select2({
			placeholder: 'Select',
			templateResult: formatState
		});
		function formatState(state) {
			if (!state.id) {
				return state.text;
			}
			var $state = $('<span >' + state.element.innerHTML + '</span>');
			return $state;
		}
	}
	/**
   * Desc : service call categoy json
   */
	reponseData = [];

	public categoryCall(): void {

		this.appService.httpPost('formCategoryJson', {}, 'fetchRecords', 'false').subscribe((data) => {
			this.expense = data.content.fieldsJson;
			this.reponseData = data.content.fieldsJson[0].components;
			console.log(this.reponseData, 'test')
			for (let i = 0; i < this.expense[0].components.length; i++) {
				this.receiptVal[this.expense[0].components[i].id] = [[]];
				(this.category as FormGroup).addControl([this.expense[0].components[i].id] as any, this.fb.array([]));
				if (this.expense[0].components[i].id !== 'Allowance') {
					// if ((this.expense[0].components[i].id !== 'Allowance' && this.expense[0].components[i].id !== 'Mileage') || (this.expense[0].components[i].id === 'Mileage' && this.mileageGeo != 'Y')) {
					((this.category as FormGroup).get(
						this.expense[0].components[i].id
					) as FormArray).push(this.setCategory() as any);
				}
				if (this.expense[0].components[i].id === 'Allowance') {
					((this.category as FormGroup).get('Allowance') as FormArray).push(this.setAllowance() as any);
					this.appService
						.httpPost('allowanceInterface', { claimType: 'days' }, 'getAllowanceGroupDetails', 'false')
						.subscribe((data) => {
							this.allowancerateDrop[0] = data.content;
						});
				}
				for (let j = 0; j < this.expense[0].components[i].components.length; j++) {
					if (this.expense[0].components[i].components[j]['required'] === 'true') {
						(((this.category as FormGroup).controls[this.expense[0].components[i].id] as FormArray)
							.controls[0] as FormGroup).addControl(
								this.expense[0].components[i].components[j].id,
								new FormControl('', [Validators.required])
							);
					} else {
						(((this.category as FormGroup).controls[this.expense[0].components[i].id] as FormArray)
							.controls[0] as FormGroup).addControl(
								this.expense[0].components[i].components[j].id,
								new FormControl('')
							);
					}
				}
				let val = this.expense[0].components[i].id;
				this.policyData[val] = [];
				if (this.expense[0].components[i].id === 'Mileage') {
					(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[0] as FormGroup).controls['calculatedThrough'].setValue('Y');
					let calculatedThrough = (((this.category as FormGroup).controls['Mileage'] as FormArray).controls[0] as FormGroup).controls['calculatedThrough'].value;
					if (calculatedThrough === 'Y') {
						(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[0] as FormGroup).removeControl('odometerStart');
						(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[0] as FormGroup).removeControl('odometerEnd');
						(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[0] as FormGroup).removeControl('personalDistance');
					}
					// if(new Date(this.form.controls['date_end'].value)<new Date(this.form.controls['date_start'].value)){
					// 	this.error={isError:true,errorMessage:'End Date can't before start date'};
					//  }	
				}
			}
			setTimeout(() => {
				this.select2();
				$('.cls-select').on('select2:select', (event: any) => {
					if (event.params.data.id === 'Allowance') {
						if (this.reportCustomFieldsArray.length > 0) {
							this.isDisableTraveltype = true;
						}
						this.appService
							.httpPost('allowanceInterface', { claimType: 'days' }, 'getAllowanceGroupDetails', 'false')
							.subscribe((data) => {
								this.allowancerateDrop[0] = data.content;
								if (data.message.status === 'error') {
									toastr.error(data.message.message);
								} else {
									// setTimeout(() => {
									$('.cls-nofield,.cls-nocatchoosed').addClass('d-none');
									$('.cls-frequent #' + event.params.data.id).remove();
									$('.cls-field,.cls-field #' + event.params.data.id + '0').removeClass('d-none');
									$('.cls-field').removeClass('ani-out').addClass('ani-in');
									// }, 10);
								}
							});
					}
					if (event.params.data.id !== 'Allowance') {
						// setTimeout(() => {
						$('.cls-nofield,.cls-nocatchoosed').addClass('d-none');
						$('.cls-frequent #' + event.params.data.id).remove();
						let thisvar = this;
						if (thisvar.deviceFlag && event.params.data.id == 'Mileage' && thisvar.mileagrInterface) {
							$('#mobileMileage').removeClass('d-none');
							$('.cls-mobileMileage').removeClass('ani-out').addClass('ani-in');
						}
						else {
							$('.cls-field,.cls-field #' + event.params.data.id + '0').removeClass('d-none');
						}
						// $('.cls-field,.cls-field #' + event.params.data.id + '0').removeClass('d-none');
						$('.cls-field').removeClass('ani-out').addClass('ani-in');
						// }, 10);
					}
				});
			}, 10);
		});
		if (history.state.reportid) {
			this.gridValue();
		} else {
			hideLoader();
		}
	}
	/**
   * Desc: grid value form history
   */
	public gridValue(name: string = ''): void {
		this.tabHistory = history.state.tabName;
		if (history.state.path) {
			this.approvalFlag = history.state.path;
		}
		let formData: any = {};
		if (name === 'advance') {
			formData = {
				reportname: this.gridlistJson.reportname,
				reportCode: this.gridlistJson.reportCode
			};
		} else if (history.state.notificationId) {
			formData = {
				reportname: history.state.reportid.reportname,
				reportCode: history.state.reportid.reportCode,
				notificationId: history.state.notificationId
			};
		} else {
			formData = {
				reportname: history.state.reportid.reportname,
				reportCode: history.state.reportid.reportCode,
				reportId: history.state.reportid.reportId
			};
		}
		if (config.USER_TYPE === 'Corporate Admin' && config.ADMIN_TYPE === 'admin') {
			formData.userType = 'admin';
		}
		this.appService.httpPost('expenseActions', formData, 'viewReportDetails', 'false').subscribe((data) => {
			this.gridlistJson = data.content;
			if (data?.content?.oldReport) {
				this.allowanceField = data?.content?.oldReport;
				if (this.allowanceField === 'Yes') {
					this.category.controls['travelType'].clearValidators();
				}
			}
			const index = this.reportName.indexOf(this.gridlistJson['reportname']);
			if (index > -1) {
				this.reportName.splice(index, 1);
			}
			let staticField: any = [];
			let dynamicField: any = [];
			this.reportFields.map((datadefault: any) => {
				if (datadefault.default_field === 'true') {
					staticField.push(datadefault.id);
				} else {
					dynamicField.push(datadefault.id);
				}
			});
			staticField.map((dataStatic: any) => {
				if ((this.category as FormGroup).controls[dataStatic]) {
					(this.category as FormGroup).controls[dataStatic].setValue(this.gridlistJson[dataStatic]);
				}
			});
			dynamicField.map((dataDynamic: any) => {
				if (this.gridlistJson['reportCustomData'] !== null) {
					if ((this.category as FormGroup).controls[dataDynamic]) {
						(this.category as FormGroup).controls[dataDynamic].setValue(
							this.gridlistJson['reportCustomData'][dataDynamic]
						);
					}
				}
			});
			if (data.content.categoryList) {
				// const index = this.reportName.indexOf(this.gridlistJson['reportname']);
				// if (index > -1) {
				// 	this.reportName.splice(index, 1);
				// }
				/**
		   * to call advance adjustment service hit function
		   */
				if (this.gridlistJson.totalValue) {
					this.settleAmount = this.gridlistJson.totalValue;
				}
				if (data.content.approverWidget) {
					this.widget = data.content.approverWidget;
				}
				this.settledAdvanceAdjustment();
				if (this.gridlistJson.categoryList) {
					this.gridlistJson.categoryList.map((data: any) => {
						if (data.modetype == 'Allowance' && this.reportCustomFieldsArray.length > 0) {
							this.isDisableTraveltype = true;
						}
						this.frequentlyUsedArr.map((data: any, index: number) => {
							if (data.modetype === data.id) {
								this.frequentlyUsedArr.splice(index, 1)
							}
						});
						if (this.expense[0].components) {
							this.expense[0].components.map((dataCategory: any, index: number) => {
								if (data.modetype === dataCategory.category) {
									const indexVal = index;
									if (data.modeCount > 1) {
										for (let i = 2; i <= data.modeCount; i++) {
											this.categoryPushVal(data.id, i - 1, indexVal);
										}
									}
								}
							});
						}
						setTimeout(() => {
							$('.cls-field,.cls-main.cls-' + data.id).addClass('d-none');
							$('.cls-list-expense.cls-' + data.id).removeClass('d-none');
							$('.cls-frequent #' + data.id).remove();
							$("#cls-chooseExp option[value='" + data.id + "']").remove();
							this.parentCategoryRemove();
						}, 10);
					});
					$('.cls-inner-container').removeClass('d-none');
					this.gridview = 'grid';
					this.selectedVal = true;
					if (this.approvalFlag === 'user' || this.approvalFlag === '') {
						this.gridview = 'grid';
					} else {
						this.gridview = 'list';
					}
				}
				if (this.gridlistJson.edited === false) {
					$('.cls-nofield').remove();
					$('.cls-report').addClass('cls-noneditable');
				}
				// let staticField: any = [];
				// let dynamicField: any = [];
				// this.reportFields.map((datadefault: any) => {
				// 	if (datadefault.default_field === 'true') {
				// 		staticField.push(datadefault.id);
				// 	} else {
				// 		dynamicField.push(datadefault.id);
				// 	}
				// })
				// staticField.map((dataStatic: any) => {
				// 	if ((this.category as FormGroup).controls[dataStatic]) {
				// 		(this.category as FormGroup).controls[dataStatic].setValue(this.gridlistJson[dataStatic]);
				// 	}
				// })
				// dynamicField.map((dataDynamic: any) => {
				// 	if (this.gridlistJson['reportCustomData'] !== null) {
				// 		if ((this.category as FormGroup).controls[dataDynamic]) {
				// 			(this.category as FormGroup).controls[dataDynamic].setValue(this.gridlistJson['reportCustomData'][dataDynamic]);
				// 		}
				// 	}
				// })
			}
		});
	}
	/**
   * allowanceFields
   */
	public allowanceFields(id: string, groupIndex: number): void {
		this.appService
			.httpPost('allowanceInterface', { claimType: id }, 'getAllowanceGroupDetails', 'false')
			.subscribe((data) => {
				this.allowancerateDrop[groupIndex] = data.content;
			});
		(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[groupIndex] as FormGroup).controls[
			'allowanceRate'
		].setValue('');
		(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[groupIndex] as FormGroup).controls[
			'amount'
		].setValue(0);
		(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[groupIndex] as FormGroup).controls[
			'currencyAmount'
		].setValue(0);
		if (id !== 'days') {
			const control: any = (((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				groupIndex
			] as FormGroup).controls['noOfHours'];
			const controldate: any = (((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				groupIndex
			] as FormGroup).controls['expensedate'];
			if (!control) {
				(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
					groupIndex
				] as FormGroup).addControl('noOfHours', new FormControl('', [Validators.required]));
			}
			if (!controldate) {
				(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
					groupIndex
				] as FormGroup).addControl('expensedate', new FormControl('', [Validators.required]));
			}
			(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				groupIndex
			] as FormGroup).removeControl('allowanceFrom');

			(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				groupIndex
			] as FormGroup).removeControl('allowanceDesc');

			(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				groupIndex
			] as FormGroup).removeControl('allowanceTo');
			(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				groupIndex
			] as FormGroup).removeControl('daysCountVar');
		} else {
			const control1: any = (((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				groupIndex
			] as FormGroup).controls['allowanceFrom'];

			const control2: any = (((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				groupIndex
			] as FormGroup).controls['allowanceTo'];
			const control3: any = (((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				groupIndex
			] as FormGroup).controls['daysCountVar'];

			const control4: any = (((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				groupIndex
			] as FormGroup).controls['allowanceDesc'];
			if (!control1) {
				(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
					groupIndex
				] as FormGroup).addControl('allowanceFrom', new FormControl('', [Validators.required]));
			}
			if (!control2) {
				(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
					groupIndex
				] as FormGroup).addControl('allowanceTo', new FormControl('', [Validators.required]));
			}
			if (!control3) {
				(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
					groupIndex
				] as FormGroup).addControl('daysCountVar', new FormControl('0', [Validators.required]));
			}

			if (!control4) {
				(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
					groupIndex
				] as FormGroup).addControl('allowanceDesc', new FormControl(''));
			}
			(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				groupIndex
			] as FormGroup).removeControl('noOfHours');
			(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				groupIndex
			] as FormGroup).removeControl('expensedate');
		}
	}
	/**
   * distanceChoosed
   */
	public distanceChoosed(formArray: string, fromGroup: number, catName: string): void {
		// let totalKm:any;
		// let mileageDistanceUnit = (((this.category as FormGroup).controls[formArray] as FormArray).controls[
		// 	fromGroup
		// ] as FormGroup).controls['mileageDistanceUnit']?.value;
		let mileageDistance = (((this.category as FormGroup).controls[formArray] as FormArray).controls[
			fromGroup
		] as FormGroup).controls['mileageDistance']?.value;
		this.odometerStart = (((this.category as FormGroup).controls[formArray] as FormArray).controls[
			fromGroup
		] as FormGroup).controls['odometerStart']?.value;
		this.odometerEnd = (((this.category as FormGroup).controls[formArray] as FormArray).controls[
			fromGroup
		] as FormGroup).controls['odometerEnd']?.value;
		this.personalDistance = (((this.category as FormGroup).controls[formArray] as FormArray).controls[
			fromGroup
		] as FormGroup).controls['personalDistance']?.value;
		let calculatedThrough = (((this.category as FormGroup).controls[formArray] as FormArray).controls[
			fromGroup
		] as FormGroup).controls['calculatedThrough']?.value;
		// if (mileageDistanceUnit && mileageDistance) {
		// console.log((this.odometerEnd < this.odometerStart) && this.odometerEnd.toString().length >= 2 && this.odometerEnd != "",this.odometerEnd.toString().length,"len");

		this.mileageTrueJson.map((data: any, index: number) => {
			if (data.mileage) {
				if (
					data.vehicleType ===
					(((this.category as FormGroup).controls[formArray] as FormArray).controls[
						fromGroup
					] as FormGroup).controls['vehicleType'].value
				) {
					// console.log(mileageDistance,calculatedThrough);
					if (mileageDistance && calculatedThrough === 'Y') {
						if (mileageDistance <= data.maxMileage || data.maxMileage == 0 || data.maxMileage == "") {
							let amount = mileageDistance * this.mileageTrueJson[index].mileageCost;
							(((this.category as FormGroup).controls[formArray] as FormArray).controls[
								fromGroup
							] as FormGroup).controls['amount'].setValue(Math.round(amount * 100) / 100);
							// mileageDistance * this.mileageTrueJson[index].mileageCost
							this.amountCalculate(
								(((this.category as FormGroup).controls[formArray] as FormArray).controls[
									fromGroup
								] as FormGroup).controls['amount'].value,
								'Mileage',
								fromGroup,
								catName
							);
							// setTimeout(() => {
							// 	this.getVal(formArray, fromGroup, catName);
							// }, 20)
						} else {
							// toastr.options = {
							// 	timeOut: 1000,
							// 	progressBar: true,
							// 	showMethod: 'slideDown',
							// 	hideMethod: 'slideUp',
							// 	showDuration: 100,
							// 	hideDuration: 150,
							// 	positionClass: 'toast-top-center'
							// };
							// toastr.error('As per policy maximum mileage is ' + data.maxMileage);
							// toastr.error('Your maximum mileage eligiblity is ' + data.maxMileage + this.mileKm);
						}
					}
					else if (this.odometerStart && this.odometerEnd) {
						this.actualTotalKm = Math.abs(this.odometerStart - this.odometerEnd);
						this.totalKm = this.personalDistance ? (Math.abs(this.odometerStart - this.odometerEnd)) - (this.personalDistance) : (Math.abs(this.odometerStart - this.odometerEnd))
						// let totalKm = (Math.abs(odometerStart - odometerEnd))- (personalDistance);
						if (this.odometerEnd > this.odometerStart) {
							let odoAmount = this.totalKm * this.mileageTrueJson[index].mileageCost;
							// console.log(this.totalKm,odoAmount,this.mileageTrueJson[index].mileageCost,data.maxMileage);
							(((this.category as FormGroup).controls[formArray] as FormArray).controls[
								fromGroup
							] as FormGroup).controls['amount'].setValue(Math.round(odoAmount * 100) / 100);
							(((this.category as FormGroup).controls[formArray] as FormArray).controls[
								fromGroup
							] as FormGroup).controls['mileageDistance'].setValue(this.totalKm);
							this.amountCalculate(
								(((this.category as FormGroup).controls[formArray] as FormArray).controls[
									fromGroup
								] as FormGroup).controls['amount'].value,
								'Mileage',
								fromGroup,
								catName
							);
						}
						else {
							(((this.category as FormGroup).controls[formArray] as FormArray).controls[
								fromGroup
							] as FormGroup).controls['mileageDistance'].setValue(0);
						}
						// console.log(this.totalKm,typeof(this.totalKm),(this.totalKm < this.personalDistance) && this.totalKm.toString().length >= 2 && this.totalKm != "","mildis")
						this.mileageKmLength = this.totalKm.toString().length >= 2;

					}
					if (
						(((this.category as FormGroup).controls[formArray] as FormArray).controls[
							fromGroup
						] as FormGroup).controls['amount'].value === 0
					) {
						(((this.category as FormGroup).controls[formArray] as FormArray).controls[
							fromGroup
						] as FormGroup).controls['currencyAmount'].setValue(0);
					}
				}
			}

		});
		// }
	}
	/**
	 * checkMileage distance
	 */
	public checkMileage(formControl: any, index: number): void {
		// let start : boolean = true;
		// let end : boolean = true;
		if (formControl === 'odometerStart' || formControl === 'odometerEnd') {
			if (this.odometerStart && this.odometerEnd) {
				this.totalKm = this.personalDistance ? (Math.abs(this.odometerStart - this.odometerEnd)) - (this.personalDistance) : (Math.abs(this.odometerStart - this.odometerEnd));
				if ((this.odometerEnd <= this.odometerStart) && this.odometerEnd.toString().length >= 2 && this.odometerEnd != "") {
					toastr.error("Odometer end should't less than or equal to Odometer start");
					(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[index] as FormGroup).controls['odometerEnd'].setErrors({ 'incorrect': true });
					// start = ((this.odometerEnd <= this.odometerStart) && this.odometerEnd.toString().length >= 2 && this.odometerEnd != "") ? false : true;
				}
				if ((this.actualTotalKm <= this.personalDistance) && this.totalKm.toString().length >= 2 && this.totalKm != "") {
					// end = ((this.actualTotalKm <= this.personalDistance) && this.totalKm.toString().length >= 2 && this.totalKm != "") ? false : true;
					toastr.error("Distance should't less than or equal to Personal distance");
					(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[index] as FormGroup).controls['personalDistance'].setErrors({ 'incorrect': true });
				}
				// if(start === true && end === true){
				// 	this.mileageTrueJson.map((data: any) => {
				// 		if(this.totalKm > data.maxMileage){
				// 			toastr.error('Your maximum mileage eligiblity is ' + data.maxMileage + this.mileKm);
				// 		}
				// 	});
				// }
			}
		}
	}
	/**
   * Desc : editService
   */
	public editService(value: any): void {
		if (this.reportCustomFieldsArray?.length > 0) {
			if ((this.category as FormGroup).controls['tripStartDate']?.value !== '' &&
				(this.category as FormGroup).controls['tripEndDate']?.value !== '') {
				this.chooseDate('setOtherDates', 'setOtherDates', null);
			}
		}
		this.expandOpen = true;
		this.showButton = false;
		$('.cls-nofield,.cls-arraybg').addClass('d-none');
		$('.cls-grid,.cls-list-expense').removeClass('d-none');
		$('.cls-field').removeClass('ani-out').addClass('ani-in');
		const editVal = {
			reportname: this.gridlistJson.reportname,
			categoryName: value.mode,
			reportId: this.gridlistJson.reportId,
			reportCode: this.gridlistJson.reportCode
		};
		this.appService.httpPost('expenseActions', editVal, 'editExpense').subscribe((data) => {
			this.editResponse = data.content;
			if (this.deviceFlag && value.mode == 'Mileage' && this.mileagrInterface) {
				this.mileageEditData = this.editResponse;
				$('#mobileMileage').removeClass('d-none');
				$('.cls-mobileMileage').removeClass('ani-out').addClass('ani-in');
				$('.cls-card-container .cls-' + value.mode).addClass('d-none');
				$('.cls-list-view .cls-' + value.mode).addClass('d-none');
			}
			// Web View Corrporate based 
			else if (!this.deviceFlag && value.mode == 'Mileage' && this.mileagrInterface && this.editResponse.Mileage[0] && this.editResponse.Mileage[0].customData.view && this.editResponse.Mileage[0].customData.view == 'mobile') {
				$('.cls-card-container .cls-' + value.mode).addClass('d-none');
				$('.cls-list-view .cls-' + value.mode).addClass('d-none');
				this.editViewWeb = true;
			}
			else {
				if (value.id === 'Mileage') {
					this.editResponse[value.id].map((_data: any, index: number) => {
						for (var key in this.editResponse[value.id][index]) {
							if (this.editResponse[value.id][index].hasOwnProperty(key)) {
								if (key == 'customData') {
									for (var key2 in this.editResponse[value.id][index]['customData']) {
										if (key2 === 'calculatedThrough') {
											(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[index] as FormGroup).controls['calculatedThrough'].setValue(this.editResponse[value.id][index]['customData'][key2]);
											let calculatedThrough = (((this.category as FormGroup).controls['Mileage'] as FormArray).controls[index] as FormGroup).controls['calculatedThrough'].value;
											if (calculatedThrough !== 'Y') {
												(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[index] as FormGroup).addControl('odometerStart', this.fb.control('', [Validators.required]));
												(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[index] as FormGroup).addControl('odometerEnd', this.fb.control('', [Validators.required]));
												(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[index] as FormGroup).addControl('personalDistance', this.fb.control(''));
											}
											else {
												(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[index] as FormGroup).removeControl('odometerStart');
												(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[index] as FormGroup).removeControl('odometerEnd');
												(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[index] as FormGroup).removeControl('personalDistance');
											}
										}
									}
								}
							}
						}
					});
				}

				this.editResponse[value.id].map((_data: any, index: number) => {
					for (var key in this.editResponse[value.id][index]) {
						if (this.editResponse[value.id][index].hasOwnProperty(key)) {

							if (key !== 'customData') {
								if (
									(((this.category as FormGroup).controls[value.id] as FormArray).controls[
										index
									] as FormGroup).controls[key]
								) {
									(((this.category as FormGroup).controls[value.id] as FormArray).controls[
										index
									] as FormGroup).controls[key].setValue(this.editResponse[value.id][index][key]);
									if (key === 'expensedate') {
										const dateValue = this.datepipe.transform(
											this.editResponse[value.id][index][key],
											'y-MM-dd'
										);
										(((this.category as FormGroup).controls[value.id] as FormArray).controls[
											index
										] as FormGroup).controls['expensedate'].setValue(dateValue);
										// }
										// console.log(this.editResponse,this.editResponse[value.id],value.mode );

										if (value.mode === 'Mileage') {
											const formData = {
												Mileage: [
													{
														mileageDetailsJsonRequired: 'Yes',
														expenseDate: (((this.category as FormGroup).controls['Mileage'] as FormArray)
																.controls[index] as FormGroup).controls['expensedate'].value
													}
												],
												userId: config.USER_ID
											};
											this.appService
												.httpPost('policyViolation', formData, 'checkPolicyViolation', 'false')
												.subscribe((data) => {
													console.log(data);

													this.mileageTrueJson = JSON.parse(
														JSON.stringify(data.content.mileageDetails)
													);
													this.mileageDetails = data.content.mileageDetails;
													let mileUnique: any = [];
													var vehicle = this.mileageDetails.map(function (obj) {
														return obj.vehicleType;
													});
													vehicle = vehicle.filter(function (v, i) {
														if (vehicle.indexOf(v) == i) {
															mileUnique.push(i);
														}
														return vehicle.indexOf(v) == i;
													});
													let mileValue: any = [];
													mileUnique.map((dataVal: any) => {
														mileValue.push(this.mileageDetails[dataVal]);
													});
													this.mileageDetails = mileValue;
												});
										}
									}
								} else {
									if (value.mode === 'Allowance') {
										if (key === 'expensedate') {
											(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
												index
											] as FormGroup).addControl(
												'expensedate',
												new FormControl('', Validators.required)
											);
											const dateValue = this.datepipe.transform(
												this.editResponse[value.id][index][key],
												'y-MM-dd'
											);
											(((this.category as FormGroup).controls[value.id] as FormArray).controls[
												index
											] as FormGroup).controls['expensedate'].setValue(dateValue);
										}
										if (key === 'description') {
											(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
												index
											] as FormGroup).addControl(
												'description',
												new FormControl('', Validators.required)
											);
											(((this.category as FormGroup).controls[value.id] as FormArray).controls[
												index
											] as FormGroup).controls['expensedate'].setValue(this.editResponse[value.id][index][key]);
										}
									}
								}
							} else {
								for (var key2 in this.editResponse[value.id][index]['customData']) {

									if (key2 === 'vehicleType') {
										(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[
											index
										] as FormGroup).addControl(
											'vehicleType',
											this.fb.control('', [Validators.required])
										);
									}
									if (value.mode === 'Allowance') {
										if (
											key2 === 'allowanceTo' ||
											key2 === 'allowanceFrom' ||
											key2 === 'noOfHours' ||
											key2 === 'daysCountVar' ||
											key2 === 'allowanceRate' ||
											key2 === 'claimType' ||
											key2 === 'allowanceDesc' ||
											key2 === 'allowanceDestination' ||
											key2 === 'allowanceActionType'
										) {
											if (
												(((this.category as FormGroup).controls[value.id] as FormArray).controls[
													index
												] as FormGroup).controls[key2]
											) {
												(((this.category as FormGroup).controls[value.id] as FormArray).controls[
													index
												] as FormGroup).controls[key2].setValue(
													this.editResponse[value.id][index]['customData'][key2]
												);
											} else {
												(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
													index
												] as FormGroup).addControl(key2, new FormControl('', Validators.required));
												(((this.category as FormGroup).controls[value.id] as FormArray).controls[
													index
												] as FormGroup).controls[key2].setValue(
													this.editResponse[value.id][index]['customData'][key2]
												);
											}
										}
										if (key2 === 'claimType') {
											this.appService
												.httpPost(
													'allowanceInterface',
													{
														claimType: this.editResponse[value.id][index]['customData'][key2]
													},
													'getAllowanceGroupDetails',
													'false'
												)
												.subscribe((data) => {
													this.allowancerateDrop[index] = data.content;
												});
										}
									}
									if (value.mode !== 'Allowance') {
										// console.log(key2,this.editResponse[value.id][index]['customData'][key2])
										if (
											(((this.category as FormGroup).controls[
												value.id.replace(/\s/g, '')
											] as FormArray).controls[index] as FormGroup).controls[key2]
										) {
											(((this.category as FormGroup).controls[
												value.id.replace(/\s/g, '')
											] as FormArray).controls[index] as FormGroup).controls[key2].setValue(
												this.editResponse[value.id][index]['customData'][key2]
											);
										}
									}
								}
							}
							if (value.mode === 'Allowance') {
								if (this.editResponse[value.id][index]['customData']['noOfHours']) {
									this.amountAllowance[index] =
										this.editResponse[value.id][index]['amount'] /
										this.editResponse[value.id][index]['customData']['noOfHours'];
								} else if (this.editResponse[value.id][index]['customData']['daysCountVar']) {
									this.amountAllowance[index] =
										this.editResponse[value.id][index]['amount'] /
										this.editResponse[value.id][index]['customData']['daysCountVar'];
								}
							}
						}
					}
					const currencyamount = (((this.category as FormGroup).controls[value.id] as FormArray).controls[
						index
					] as FormGroup).controls['currencyAmount'].value;
					const amount = (((this.category as FormGroup).controls[value.id] as FormArray).controls[
						index
					] as FormGroup).controls['amount'].value;
					const exchangeRateVal = currencyamount / amount;
					this.editResponse[value.id][index]['exchangeRate'] = exchangeRateVal;
					(((this.category as FormGroup).controls[value.id] as FormArray).controls[index] as FormGroup).controls[
						'exchangeRate'
					].setValue(exchangeRateVal || 0);
				});
				this.receiptVal[value.id] = this.editResponse['imageid'];
				$('.cls-field,.cls-' + value.id).removeClass('d-none');
				$('.cls-card-container .cls-' + value.id).addClass('d-none');
				$('.cls-list-view .cls-' + value.id).addClass('d-none');
				for (let keyVal of Object.keys(this.editResponse)) {
					for (let policyKey of Object.keys(this.policyData)) {
						if (keyVal === policyKey) {
							this.policyData[policyKey] = this.editResponse['policy'];
							this.policyData[policyKey].map((data: any, i: number) => {
								if (data.policyDetect === 'Y') {
									(((this.category as FormGroup).controls[value.id] as FormArray).controls[
										i
									] as FormGroup).addControl('reason', this.fb.control('', [Validators.required]));
									(((this.category as FormGroup).controls[value.id] as FormArray).controls[
										i
									] as FormGroup).controls['reason'].setValue(data['reason']);
								} else {
									(((this.category as FormGroup).controls[value.id] as FormArray).controls[
										i
									] as FormGroup).removeControl('reason');
								}
							});
						}
					}
				}
				if (value.type === 'add') {
					let countVal = value.count - 1;
					$('#addExpense' + value.id + countVal).trigger('click');
					setTimeout(() => {
						let div_height = $('.cls-field').height();
						let div_offset = $('.cls-field').offset().top;
						let window_height = $(window).height();
						$('html,body').animate(
							{
								scrollTop: div_offset - window_height + div_height + 100
							},
							2000
						);
					}, 1500);
				}
			}
		});
	}
	/**
   * Desc : chooseDate
   */
	public chooseDate(id: string, arrayname: string, group: number): void {
		this.currentTravelMode = arrayname;
		this.currentTravelModeIndex = group;
		if (id === 'tripStartDate' || id === 'tripEndDate' || id === 'setOtherDates') {
			switch (id) {
				case 'tripEndDate':
					this.minDate = (this.category as FormGroup).controls['tripStartDate']?.value;
					this.tripStartDate = this.minDate;
					break;
				case 'tripStartDate':
					this.maxDate = (this.category as FormGroup).controls['tripEndDate']?.value;
					this.tripEndDate = this.maxDate;
					break;
				case 'setOtherDates':
					this.minDate = (this.category as FormGroup).controls['tripStartDate']?.value;
					this.tripStartDate = this.minDate;
					this.maxDate = (this.category as FormGroup).controls['tripEndDate']?.value;
					this.tripEndDate = this.maxDate;
					break;
				default:
					this.tripStartDate = (this.category as FormGroup).controls['tripStartDate']?.value;
					this.tripEndDate = (this.category as FormGroup).controls['tripEndDate']?.value;
					break;
			}
		}
		if (this.reportCustomFieldsArray?.length > 0) {
			if (this.tripStartDate == "" || this.tripEndDate == "") {
				this.tripStartDate = (this.category as FormGroup).controls['tripStartDate']?.value;
				this.tripEndDate = (this.category as FormGroup).controls['tripEndDate']?.value;
			}
			this.maxDate = this.tripEndDate;
			this.minDate = this.tripStartDate;
			this.minDate = (this.category as FormGroup).controls['tripStartDate']?.value;
			switch (id) {

				case 'expensedate':
					// this.minDate = '';
					// this.maxDate = '';
					this.findMinMaxValue()
					break;
				case 'allowanceTo':
					let allowanceTo = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[
						group
					] as FormGroup).controls['allowanceFrom'].value;
					this.tripStartDate = allowanceTo;
					this.minDate = this.tripStartDate;
					this.allow(arrayname, group);
					break;
				case 'airReturnDate':
					let airOnwardDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[
						group
					] as FormGroup).controls['airOnwardDate'].value;
					this.tripStartDate = airOnwardDate;
					this.minDate = this.tripStartDate;
					break;
				case 'planEndDate':
					let startDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[
						group
					] as FormGroup).controls['planStartDate'].value;
					this.tripStartDate = startDate;
					this.minDate = this.tripStartDate;
					break;
				case 'trainReturnDate':
					let trainReturnDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[
						group
					] as FormGroup).controls['trainOnwardDate'].value;
					this.tripStartDate = trainReturnDate;
					this.minDate = this.tripStartDate;
					break;
				case 'busReturnDate':
					let busReturnDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[
						group
					] as FormGroup).controls['busOnwardDate'].value;
					this.tripStartDate = busReturnDate;
					this.minDate = this.tripStartDate;
					break;
				case 'hotelCheckOut':
					let hotelCheckOut = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[
						group
					] as FormGroup).controls['hotelCheckIn'].value;
					if (hotelCheckOut != '') {
						var day = new Date(hotelCheckOut);
						var nextDay = new Date(day);
						var nextDateval = nextDay.setDate(day.getDate() + 1);
						this.tripStartDate = this.datepipe.transform(nextDateval, 'dd-MMM-yyyy');
						this.minDate = this.tripStartDate;
						this.formValueChanges();
					} else {
						$('#hotelCheckIn' + arrayname + group).trigger("focus")
						return
					}

					break;
				case 'allowanceFrom':
					this.maxDate = this.tripEndDate;
					this.allow(arrayname, group);
					break;
				case 'airOnwardDate':
					this.maxDate = this.tripEndDate;
					this.findMinMaxValue()
					break;
				case 'planStartDate':
					this.maxDate = this.tripEndDate;
					this.findMinMaxValue()
					break;
				case 'trainOnwardDate':
					this.maxDate = this.tripEndDate;
					this.findMinMaxValue()
					break;
				case 'busOnwardDate':
					this.maxDate = this.tripEndDate;
					this.findMinMaxValue()
					break;
				case 'hotelCheckIn':
					this.maxDate = this.tripEndDate;
					this.findMinMaxValue()
					break;
			}
			if (this.minDate === '' && id !== 'expensedate') {
				this.minDate = (this.category as FormGroup).controls['tripStartDate']?.value;
			}
		}
		else {
			// Original
			switch (id) {
				case 'expensedate':
					this.minDate = '';
					this.maxDate = '';
					break;
				case "allowanceTo":
					this.minDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup).controls["allowanceFrom"].value;
					this.maxDate = '';
					break;
				case "airReturnDate":
					this.minDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup).controls["airOnwardDate"].value;
					this.maxDate = '';
					break;
				case "planEndDate":
					this.minDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup).controls["planStartDate"].value;
					this.maxDate = '';
					break;
				case "trainReturnDate":
					this.minDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup).controls["trainOnwardDate"].value;
					this.maxDate = '';
					break;
				case "busReturnDate":
					this.minDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup).controls["busOnwardDate"].value;
					this.maxDate = '';
					break;
				case "hotelCheckOut":
					this.minDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup).controls["hotelCheckIn"].value;
					this.maxDate = '';
					break;
				case "allowanceFrom":
					this.minDate = '';
					this.maxDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup).controls["allowanceTo"].value;
					this.findMinMaxValue()
					break;
				case "airOnwardDate":
					this.minDate = '';
					this.maxDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup).controls["airReturnDate"].value;
					this.findMinMaxValue()
					break;
				case "planStartDate":
					this.minDate = '';
					this.maxDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup).controls["planEndDate"].value;
					this.findMinMaxValue()
					break;
				case "trainOnwardDate":
					this.minDate = '';
					this.maxDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup).controls["trainReturnDate"].value;
					this.findMinMaxValue()
					break;
				case "busOnwardDate":
					this.minDate = '';
					this.maxDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup).controls["busReturnDate"].value;
					this.findMinMaxValue()
					break;

				case "hotelCheckIn":
					this.minDate = '';
					this.maxDate = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup).controls["hotelCheckOut"].value;
					this.findMinMaxValue()
					break;

			}
		}
		// if (this.minDate != '' && this.maxDate != '' && this.reportCustomFieldsArray?.length > 0) {
		// 	let miniDate = new Date(this.minDate);
		// 	miniDate.setDate(miniDate.getDate() - 1);
		// 	this.minDate = miniDate;
		// 	let maxiDate = new Date(this.maxDate);
		// 	maxiDate.setDate(maxiDate.getDate() + 1);
		// 	this.maxDate = maxiDate;
		// }
		if (group !== null) {
			this._DatepickerService.setCalendar(
				id + arrayname + group,
				((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup,
				id,
				group,
				this.minDate ? this.minDate : '',
				this.maxDate ? this.maxDate : ''
			);
		} else {
			//  else if (id === "tripStartDate" || id === "tripEndDate") {
			//   this._DatepickerService.setCalendar(
			//     id,
			//     this.category as FormGroup,
			//     id,
			//     null,
			//     minDate,
			//     maxDate
			//     tripStartDate,
			//     tripEndDate
			//   );
			// }
			if (id === 'setOtherDates') {
				this._DatepickerService.setCalendar(
					id,
					this.category as FormGroup,
					id,
					null,
					this.minDate,
					this.maxDate
				);
			} else {
				this._DatepickerService.setCalendar(
					id,
					this.category as FormGroup,
					id,
					null,
					this.minDate,
					this.maxDate
				);
			}
		}
	}
	/**
	 *Des:find the min date and max date 
	 */
	findMinMaxValue() {
		if (this.minDate != '' && this.maxDate != '' && this.reportCustomFieldsArray?.length > 0) {
			let miniDate = new Date(this.minDate);
			miniDate.setDate(miniDate.getDate() - 1);
			this.minDate = miniDate;
			let maxiDate = new Date(this.maxDate);
			maxiDate.setDate(maxiDate.getDate() + 1);
			this.maxDate = maxiDate;
		}
	}
	/**
	 * Des:form value changes
	 */
	formValueChanges() {
		this.category.valueChanges.subscribe((_values: any) => {
			if ((((this.category as FormGroup).controls[this.currentTravelMode] as FormArray).controls[this.currentTravelModeIndex] as FormGroup).controls["hotelCheckIn"]) {
				// Validation Starts
				let checkIn = (((this.category as FormGroup).controls[this.currentTravelMode] as FormArray).controls[this.currentTravelModeIndex] as FormGroup).controls["hotelCheckIn"].value;
				let checkOut = (((this.category as FormGroup).controls[this.currentTravelMode] as FormArray).controls[this.currentTravelModeIndex] as FormGroup).controls["hotelCheckOut"].value;

				if (this.currentTravelMode == 'Hotel' && checkIn != '' && checkOut != '') {
					$('.hotel-diffdays').remove();
					if (checkIn == checkOut) {
						(((this.category as FormGroup).controls[this.currentTravelMode] as FormArray).controls[this.currentTravelModeIndex] as FormGroup).controls["hotelCheckOut"].setValue('');
						toastr.error('Invalid check out date (Checkin & Checkout should be diffrent)');
					} else {
						var diffDays;
						const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
						var firstDate: any = new Date((((this.category as FormGroup).controls[this.currentTravelMode] as FormArray).controls[this.currentTravelModeIndex] as FormGroup).controls["hotelCheckIn"].value);
						var secondDate: any = new Date((((this.category as FormGroup).controls[this.currentTravelMode] as FormArray).controls[this.currentTravelModeIndex] as FormGroup).controls["hotelCheckOut"].value);
						diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
						if(checkOut != null){
							$("#hotelCheckOutHotel" + this.currentTravelModeIndex).parent().append("<span class='hotel-diffdays'>" + diffDays + "</span>");
						}
					}
				}
			}
		})
	}
	/**
	 * allowance 
	 */
	public allow(dataVal: string, i: number) {
		this.form = this.fb.group({
			allowanceFrom: ((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls[
				'allowanceFrom'
			],
			allowanceTo: ((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls[
				'allowanceTo'
			],
			allowanceDesc: ((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls[
				'allowanceDesc'
			]
		});
		this.allowanceDateSub.push(this.form.valueChanges.subscribe(() => {
			this.allowancerateDrop[i] = [];
			this.amountAllowance[i] = [];
			((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls['allowanceActionType'].reset();
			((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls['allowanceRate'].reset();
			((this.category.get(dataVal) as FormArray).controls[i] as FormGroup).controls['amount'].setValue(0);
		})
		);
	}
	/**
   *	calculateAllowance
   */
	public calculateAllowance(i: number): void {
		if (
			(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[i] as FormGroup).controls[
				'allowanceRate'
			].value !== ''
		) {
			let hours: number = (((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				i
			] as FormGroup).controls['noOfHours'].value;
			this.amountAllowance[i] = this.amountAllowance[i];
			let amountVal: number;
			amountVal = this.amountAllowance[i] * hours;
			(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[i] as FormGroup).controls[
				'amount'
			].setValue(amountVal);
			(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[i] as FormGroup).controls[
				'currencyAmount'
			].setValue(amountVal);
		}
	}
	/**
   * daysCount
   */
	public daysCount(groupIndex: number): void {
		setTimeout(() => {
			const val1 = (((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				groupIndex
			] as FormGroup).controls['allowanceFrom'].value;
			const val2 = (((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
				groupIndex
			] as FormGroup).controls['allowanceTo'].value;
			if (val1 !== '' && val2 !== '') {
				const date1: any = new Date(val1);
				const date2: any = new Date(val2);
				const diffTime: any = Math.abs(date2 - date1);
				const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
				this.daysCountVar[groupIndex] = diffDays;
				(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
					groupIndex
				] as FormGroup).controls['daysCountVar'].setValue(diffDays);
				let amountVal: number;
				if (
					(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
						groupIndex
					] as FormGroup).controls['claimType'].value === 'days'
				) {
					amountVal = this.amountAllowance[groupIndex] * this.daysCountVar[groupIndex];
				} else {
					amountVal =
						this.amountAllowance[groupIndex] *
						(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
							groupIndex
						] as FormGroup).controls['noOfHours'].value;
				}
				(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
					groupIndex
				] as FormGroup).controls['amount'].setValue(amountVal);
				(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
					groupIndex
				] as FormGroup).controls['currencyAmount'].setValue(amountVal);
			}
		}, 500);
	}
	/**
   * Desc : createExpense
   */
	submitted: boolean = false;
	public createExpense(category: string, id: string): void {
		this.expenseReport = (this.category as FormGroup).controls[id].value;
		this.expenseDateUnsub.forEach(s => s.unsubscribe());
		this.locationCity.forEach(s => s.unsubscribe());
		if (category === 'Allowance') {
			// this.allowanceSubscr.unsubscribe();
			// this.allowanceDateSub.unsubscribe();
			this.allowanceSubscr.forEach(s => s.unsubscribe());
			this.allowanceDateSub.forEach(s => s.unsubscribe());
		}
		if (this.parentCategoryName === 'Hotel') {
			this.hotelDateSubscr.forEach(s => s.unsubscribe());
		}
		let valueArr = this.expenseReport.map((item) => {
			let checkAmount = item.amount;
			let checkExpenseDate = item.expensedate;
			let checkCurreny = item.currency;
			let checkAirDestination = item.airDestination;
			let checkAIrOnwardDate = item.airOnwardDate;
			let checkPlanStartDate = item.planStartDate;
			let checkPlanEndDate = item.planEndDate;
			let checkTrainDestination = item.trainDestination;
			let checkTrainOnwardDate = item.trainOnwardDate;
			let checkBusDestination = item.busDestination;
			let checkBusOnwardDate = item.busOnwardDate;
			let checkTaxiDestination = item.taxiDestination;
			let checkHotelCheckIn = item.hotelCheckIn;
			let checkHotelDestination = item.hotelDestination;
			let checkAllowanceDestination = item.allowanceDestination;
			let checkAllowanceRate = item.allowanceRate;
			let checkAllowanceActionType =
				typeof item.allowanceActionType !== typeof undefined ? item.allowanceActionType : '';
			let checkAllowanceFrom = item.allowanceFrom;
			let checkAllowanceDesc = item.allowanceDesc;
			let checkAllowanceTo = item.allowanceTo;
			let checkMealDestination = item.mealDestination;
			let checkMealType = item.mealType;
			let checkAutoDestination = item.autoDestination;
			let checkDescription = item.description;
			if (category === 'Meal') {
				return `${checkCurreny}, ${checkExpenseDate}, ${checkAmount}, ${checkMealDestination}, ${checkMealType}`;
			} else if (category === 'Air') {
				return `${checkCurreny}, ${checkExpenseDate}, ${checkAirDestination}, ${checkAIrOnwardDate}, ${checkAmount}`;
			} else if (category === 'Phone') {
				return `${checkCurreny}, ${checkExpenseDate}, ${checkPlanStartDate}, ${checkPlanEndDate}, ${checkAmount}`;
			} else if (category === 'Train') {
				return `${checkCurreny}, ${checkExpenseDate}, ${checkAmount}, ${checkTrainDestination}, ${checkTrainOnwardDate}`;
			} else if (category === 'Bus') {
				return `${checkCurreny}, ${checkExpenseDate}, ${checkAmount}, ${checkBusDestination}, ${checkBusOnwardDate}`;
			} else if (category === 'Taxi') {
				return `${checkCurreny}, ${checkExpenseDate}, ${checkAmount}, ${checkTaxiDestination}`;
			} else if (category == 'Hotel') {
				return `${checkCurreny}, ${checkExpenseDate}, ${checkAmount}, ${checkHotelCheckIn}, ${checkHotelDestination}`;
			} else if (category == 'Allowance') {
				return `${checkAllowanceDestination}, ${checkAllowanceFrom},${checkAllowanceDesc}, ${checkAllowanceTo}, ${checkAllowanceRate}, ${checkAllowanceActionType}`;
			} else if (category == 'Auto') {
				return `${checkCurreny}, ${checkExpenseDate}, ${checkAmount}, ${checkAutoDestination}`;
			}
			else if (category == 'Miscellaneous') {
				return `${checkCurreny}, ${checkExpenseDate}, ${checkAmount} ,${checkDescription}`;
			}
			else {
				return `${checkCurreny}, ${checkExpenseDate}, ${checkAmount}`;
			}
		});

		let seen = new Set();
		let isDuplicate = valueArr.some(function (currentObject) {
			return seen.size === seen.add(currentObject).size;
		});

		if (!isDuplicate) {
			if (this.appService.checkScript((this.category as FormGroup).controls[id].value[0]) === true) {
				this.expandOpen = false;
				this.showButton = true;
				this.checkArray = [];
				let imageArray = [];
				imageArray = this.receiptVal[id];
				this.submitted = true;
				let reportValid: boolean = false;
				let count = 0;
				let requiredValidationCount = 0;
				this.reportFields.map((value: any) => {
					if (value.required === true) {
						requiredValidationCount = requiredValidationCount + 1;
						if (this.category.controls[value.id].valid) {
							count = count + 1;
						}
					}
				});
				if (requiredValidationCount === count) {
					reportValid = true;
				}
				else {
					reportValid = false;
					toastr.error('Enter Report Details');
				}
				if (category !== 'Allowance') {
					this.policyData[id].map((data: any) => {
						// if (data.policyDetect === 'N') {
						// 	this.policyData[id][i] = {};
						// } else 
						if (data.policyDetect === 'Y') {
							var result = this.policyData[id].map(function (el: any, index: number) {
								var o = Object.assign({}, el);
								o.reason = $('#reason' + category + index).val();
								return o;
							});
							this.policyData[id] = result;
						}
					});
				}
				// if (category !== 'Allowance') {
				// 	console.log('yrcyrcyr');

				// 	let permittedValues = {};
				// 	this.receiptMandatoryCheck.map((receipt: any, ind: number) => {
				// 		let receiptKeys = JSON.parse(JSON.stringify(Object.keys(receipt)));
				// 		for (let i = 0; i < this.receiptMandatoryCheck.length; i++) {
				// 			permittedValues[i] = this.receiptMandatoryCheck[i][category];
				// 		}
				// 		if (permittedValues[0] == 'Y') {
				// 			receiptKeys.some((result) => {
				// 				if (result == category) {
				// 					if (imageArray[ind].length === 0) {
				// 						reportValid = false;
				// 						toastr.error('Receipt Mandatory');
				// 					}
				// 				}
				// 			});
				// 		}
				// 	});
				// }

				let staticField: any = [];
				let dynamicField: any = [];
				this.reportFields.map((datadefault: any) => {
					if (datadefault.default_field === 'true') {
						staticField.push(datadefault.id);
					} else {
						dynamicField.push(datadefault.id);
					}
				});
				if (category === 'Mileage') {
					let count = 0;
					let mile: any;
					this.category.value[id].map((data: any, index: any) => {
						this.mileageTrueJson.map((val: any) => {
							if(val.vehicleType == data.vehicleType){
								if(!(val.maxMileage == "" || val.maxMileage == 0)){
								if (data.mileageDistance > val.maxMileage) {
									mile = val.maxMileage
									reportValid = false;
									(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[index] as FormGroup).controls['mileageDistance'].setErrors({ 'incorrect': true });
									count++;
								}
							}
							}
						});
					});
					if (count > 0) {
						toastr.error('Your maximum mileage eligiblity is ' + mile + ' '+this.mileKm);
					}
				}
				if (category === 'Allowance') {
					this.category.value[id].map((data: any, index: number) => {
						if (data.claimType !== 'days') {
							(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
								index
							] as FormGroup).removeControl('allowanceFrom');
							(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
								index
							] as FormGroup).removeControl('allowanceDesc');
							(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
								index
							] as FormGroup).removeControl('allowanceTo');
							(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
								index
							] as FormGroup).removeControl('daysCountVar');
						} else {
							(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
								index
							] as FormGroup).removeControl('noOfHours');
							(((this.category as FormGroup).controls['Allowance'] as FormArray).controls[
								index
							] as FormGroup).removeControl('expensedate');
						}
					});
				}
				const index = this.reportName.indexOf(this.editResponse['reportname']);
				if (index > -1) {
					this.reportName.splice(index, 1);
				}
				if (this.reportName.includes(this.category.controls['reportname'].value)) {
					toastr.error('Report name already exist');
					reportValid = false;
				}
				if (this.category.controls[id].status === 'VALID' && reportValid === true) {
					this.submitted = false;
					$('.cls-field').removeClass('ani-in').addClass('ani-out');
					let finalValue = this.category.getRawValue();
					const val: any = {
						reportCode: '',
						[category]: finalValue[id],
						imageid: imageArray
					};
					if (category !== 'Allowance') {
						val['policy'] = this.policyData[id];
					}
					staticField.map((field: any) => {
						val[field] = this.category.value[field];
					});
					// if (dynamicField.length >= 1) {
					// 	val['reportCustomData'] = {};
					// }
					val['reportCustomData'] = {};
					dynamicField.map((field: any) => {
						val['reportCustomData'][field] = this.category.value[field];
					});
					let TempKeyValues = [];
					if (category !== 'Allowance') {
						this.reponseData.map((data: any) => {
							if (data.category == category) {
								data.components.map((idData: any) => {
									TempKeyValues.push(idData.id);
								});
							}
						});
					}
					if (category === 'Allowance') {
						TempKeyValues = [
							'allowanceFrom',
							'allowanceDesc',
							'allowanceTo',
							'allowanceRate',
							'claimType',
							'noOfHours',
							'daysCountVar',
							'allowanceDestination',
							'allowanceActionType'
						];
					}
					if (category === 'Mileage') {
						TempKeyValues.push('vehicleType');
					}
					val[category].map((data: any, index: number) => {
						let customData = {};
						if (category === 'Allowance') {
							val[category][index]['currency'] = this.userCurrency;
							val[category][index]['merchantname'] = '';
						}
						for (const [key, value] of Object.entries(data)) {
							if (TempKeyValues.includes(`${key}`)) {
								let keyValue = `${key}`;
								let dataVal = `${value}`;
								let tempVal = { [keyValue]: dataVal };
								customData = Object.assign(customData, tempVal);
								delete data[keyValue];
							}
						}
						val[category][index].customData = JSON.parse(JSON.stringify(customData));
						if (category === 'Mileage') {
							val[category][index].customData['mileageDistanceUnit'] = this.mileKm;
						}
					});
					this.tempVariable = JSON.parse(JSON.stringify(val[category]));
					if (this.categorySelected.indexOf(category) == -1) {
						this.categorySelected.push(category);
					}
					if (this.selectedVal === true || this.gridlistJson?.reportCode) {
						val['reportCode'] = this.gridlistJson.reportCode;
						val['reportId'] = this.gridlistJson.reportId;
					}
					if (this.selectedVal === true && Object.keys(this.editResponse).indexOf(id) !== -1) {
						if (this.editResponse[id]) {
							this.editResponse[id].map((_data: any, index: number) => {
								val[category][index]['expenseId'] = this.editResponse[id][index]['expenseId'];
								const checkVal =
									JSON.stringify(this.editResponse[id][index]) ===
									JSON.stringify(val[category][index]);
								if (checkVal === true) {
									if (this.checkArray.indexOf(index) === -1) {
										this.checkArray.push(index);
									}
								}
							});
						}
						this.checkArray.sort();
						for (let i = this.checkArray.length - 1; i >= 0; i--) {
							val[category].splice(this.checkArray[i], 1);
							imageArray.splice(this.checkArray[i], 1);
						}
					}	
					 this.reportFields.map((data : any) =>{
						if(data.id != 'purpose' && data.id != 'reportname'){
							val.reportCustomData[data.id] = this.category.controls[data.id].value;
						}
					})
					console.log(val)
					
					this.appService.httpPost('expenseActions', val, 'initial', '', true).subscribe((data) => {
						this.gridlistJson = data.content;
						if (this.gridlistJson.status !== 'danger') {
							this.settledAdvanceAdjustment();
							if (data.content.approverWidget) {
								this.widget = data.content.approverWidget;
							}
							this.selectedVal = true;
							$('.cls-nofield').removeClass('d-none');
							$('.cls-field,.cls-main.cls-' + id).addClass('d-none');
							$('.cls-list-expense.cls-' + id).removeClass('d-none');
							$('.cls-inner-container').removeClass('d-none');
							this.frequentlyUsedArr.map((data: any, index: number) => {
								if (id === data.id) {
									this.frequentlyUsedArr.splice(index, 1)
								}
							});
							this.gridview = 'grid';
							$('.cls-select').select2('destroy');
							this.gridlistJson?.categoryList?.map((data: any) => {
								$("#cls-chooseExp option[value='" + data.id + "']").remove();
							});
							this.parentCategoryRemove();
							this.select2();
						}
					});
					this.expandOpen = true;
				}
			}
		}
		else {
			toastr.error('Expense already exists!');
			this.expenseReport = '';
		}

		// The Best way to restrict duplicate start

		// var original = expenseReport.reduce(function(prev, curr) {
		//   var tracker = Object.keys(curr).concat(Object.keys(curr).map(key => curr[key])).sort().join('|');
		//   if(!prev.tracker[tracker]) {
		//     prev.array.push(curr);
		//     prev.tracker[tracker] = true;
		//   }
		//   return prev;
		//  }, {array: [], tracker: {}});

		// let withoutDuplicate = {};
		// let result: boolean = false;
		// for (let i = 0; i < this.expenseElements.length; i++) {

		//   if (withoutDuplicate[this.expenseElements[i]]) {

		//     result = true;
		//     break;
		//   }
		//   withoutDuplicate[this.expenseElements[i]] = true;
		// }
		// if (result) {
		// 	this.submitted = false;
		// 	toastr.error('Repor already exit');

		// } else {
	}
	/**
   * parentCategoryRemove on  Select2
   */
	public parentCategoryRemove(): void {
		$('#cls-chooseExp optgroup').each(function (_index: number, event: any) {
			const comp = event.label.split(' ').join('');
			var options = $('optgroup[id="' + comp + '"]').children('option').length;
			if (options === 0) {
				$('optgroup[id=' + comp + ']').remove();
			}
		});
	}
	/**
   * catSelectNot
   */
	public catSelectNot(): void {
		this.selected($('#cls-chooseExp').text());
	}
	// TO Display No Field Available
	public selected(val: any): void {
		let selectVal;
		if (typeof val === 'string') {
			selectVal = val;
		} else if (typeof val === 'object') {
			selectVal = val.target.id;
		}
		$('.cls-nofield,.cls-nocatchoosed').addClass('d-none');
		// $('.cls-frequent #' + selectVal).remove();
		let thisvar = this;
		if (thisvar.deviceFlag && selectVal == 'Mileage' && thisvar.mileagrInterface) {
			$('#mobileMileage').removeClass('d-none');
			$('.cls-mobileMileage').removeClass('ani-out').addClass('ani-in');
		} else {
			$('.cls-field,.cls-field #' + selectVal + '0').removeClass('d-none');
		}
		$("#cls-chooseExp option[value='" + selectVal + "']").remove();
		$('.cls-field').removeClass('ani-out').addClass('ani-in');

		if (this.reportCustomFieldsArray?.length > 0) {
			if (selectVal == 'Allowance') {
				this.isDisableTraveltype = true;
			}
			if ((this.category as FormGroup).controls['tripStartDate']?.value !== '' &&
				(this.category as FormGroup).controls['tripEndDate']?.value !== '') {
				this.chooseDate('setOtherDates', 'setOtherDates', null);
			}
		}
		this.policyData[selectVal] = [];
	}
	/**
   * confirmAction
   */
	public confirmAction(val: any): void {
		this.confirmation = false;
		this.confirmationContent = {};
		let actionName: string = '';
		let moduleName: string = 'buttonActions';
		let csrf: boolean = false;
		let requestVal: any = {
			reportId: this.gridlistJson.reportId,
			reportCode: this.gridlistJson.reportCode,
			reportname: this.gridlistJson.reportname
		};
		if (val.flag === true) {
			switch (this.currentAction) {
				case 'settlereject':
					requestVal['view'] = 'settle';
					requestVal['comment'] = val.data['comment'];
					actionName = 'rejectButtonAction';
					csrf = true
					break;
				case 'reject':
					actionName = 'rejectButtonAction';
					requestVal['comment'] = val.data['comment'];
					csrf = true
					break;
				case 'approval':
					moduleName = 'sendForApproval';
					actionName = 'sendFilesForApproval';
					csrf = true
					break;
				case 'settlesendback':
					requestVal['comment'] = val.data['comment'];
					requestVal['view'] = 'settle';
					actionName = 'sentBackButtonAction';
					csrf = true
					break;
				case 'sendback':
					requestVal['comment'] = val.data['comment'];
					actionName = 'sentBackButtonAction';
					csrf = true
					break;
				case 'settle':
					requestVal['claimAmount'] = 0;
					actionName = 'settleButtonAction';
					csrf = true
					break;
				case 'callback':
					requestVal['comment'] = val.data['comment'];
					actionName = 'callBackButtonAction';
					csrf = true
					break;
				case 'approvedReport':
					actionName = 'approveButtonAction';
					csrf = true
					break;
				default:
					this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.expenseReport]);
					break;
			}
			this.appService.httpPost(moduleName, requestVal, actionName, '', csrf).subscribe((_data) => {
				if (this.currentAction === 'approvedReport') {
					this.alertData();
				} else if (this.currentAction === 'approval') {
					if (_data.content.status === "success") {
						this.approvalAlert = true;
						this.approvalAlertInput = _data.content.approverwidget[2];
						this.approvalAlertHead = _data.content.message;
					}
					else if (_data.content.popUp.status === "danger") {
						this.approvalPopupFlag = true;
						this.approvalPopup = _data.content.popUp;
					}
					else {
						this.approvalAlert = false;
					}
				} else {
					switch (this.approvalFlag) {
						case 'approver':
							this.router.navigate([
								'./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.pendingApprovals
							]);
							break;
						case 'finance':
							this.router.navigate([
								'./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.pendingSettlement
							]);
							break;
						case 'user':
							this.router.navigate(
								['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.expenseReport],
								{
									state: {
										reportid: this.gridlistJson.reportCode
									}
								}
							);
							break;
						default:
							this.router.navigate([
								'./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.expenseReport
							]);
							break;
					}
				}
			});
		}
	}
	/**
   * alert data
   */
	public alertData(): void {
		this.widget.map((data: any, index: number) => {
			if (data.users && data.status === 'N') {
				if (data.users.details) {
					data?.users?.details?.map(() => {
						if (data.warning === 'Y') {
							this.approvalAlertInput = this.widget[index + 1];
							if (this.approvalAlertInput.users.details) {
								if (this.approvalAlertInput.users.details.length > 0) {
									this.approvalAlert = true;
								} else {
									this.approvalAlert = false;
									this.router.navigate([
										'./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.pendingApprovals
									]);
								}
							} else {
								this.approvalAlert = false;
								this.router.navigate([
									'./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.pendingApprovals
								]);
							}
						}
					});
				}
			}
		});
	}
	public approvalAlertAction(data: any) {
		this.approvalAlert = data;
		// setTimeout(() => {
		switch (this.approvalFlag) {
			case 'approver':
				this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.pendingApprovals]);
				break;
			case 'finance':
				this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.pendingSettlement]);
				break;
			case 'user':
				this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.expenseReport], {
					state: {
						reportid: this.gridlistJson.reportCode
					}
				});
				break;
			default:
				this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.expenseReport]);
				break;
		}
		// }, 50)
	}
	/**
   * settleReport
   */
	public settleReport(data: any): void {
		this.settleform = false;
		/**
	 * to close manual reimbursement popup box
	 */
		this.manualReimbursedFlag = false;
		if (data.flagVal === true) {
			data.form['reportCode'] = this.gridlistJson.reportCode;
			this.appService.httpPost('buttonActions', data.form, 'settleButtonAction', '', true).subscribe((result) => {
				if (result.content.status == 'alert') {
					this.dataForAlert = {
						title: result.content.message,
						button: [
							{
								label: 'Ok',
								status: true
							}
						]
					};
					this.showAlert = true;
				} else {
					this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.pendingSettlement]);
				}
			});
		}
	}
	/* 
	*to close alert box
	 */
	public closeAlert() {
		this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.pendingSettlement]);
	}
	/* 
	*to close expense expiry popup box
	 */
	public defaultPopup(event: boolean) {
		this.approvalPopupFlag = event;
	}
	/**
   * Desc : sendApproval
   */
	public redirectList(page: string): void {
		console.log(page)
		this.currentAction = page;
		this.confirmationContent = {
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
		//Validation
		let validate = this.reportFields.filter((data: any) => this.category.controls[data.id].invalid);
		let result = (validate.length == 0) ? true : false;
		this.submitted = true;
		let condition = [
			{
				"page": "backapprover",
				"condition": true,
				"redirect": "expenseAdminReport",
				"alternate": "pendingApprovals"
			},
			{
				"page": "backfinance",
				"condition": false,
				"redirect": "pendingSettlement"
			},
			{
				"page": "report",
				"condition": true,
				"redirect": "expenseAdminReport",
				"alternate": "expenseReport"
			}
		]
		let backaction: any = true;
		condition.map(data => {
			if (page == data.page) {
				this.submitted = false;
				console.log(data.alternate, data.redirect, "1");
				window.localStorage.setItem('back', backaction);
				if (data.condition) {
					(config.USER_TYPE === 'Corporate Admin' && config.ADMIN_TYPE === 'admin') ? (this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES[data.redirect]]))
						: (this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES[data.alternate]]))
				}
				else {
					this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES[data.redirect]]);
				}
			}
		})
		if (result) {
			this.submitted = false;
			switch (page) {
				case 'save':
					let val  : any= {
						reportCode: this.gridlistJson.reportCode,
						reportId: this.gridlistJson.reportId
					};
					let staticField: any = [];
					let dynamicField: any = [];
					this.reportFields.map((datadefault: any) => {
						if (datadefault.default_field === 'true') {
							staticField.push(datadefault.id);
						} else {
							dynamicField.push(datadefault.id);
						}
					});
					staticField.map((staticData: any) => {
						val[staticData] = this.category.value[staticData];
					});
					val['reportCustomData'] = {};
					dynamicField.map((dynamicData: any) => {
						if (this.category.value[dynamicData]) {
							val['reportCustomData'][dynamicData] = this.category.value[dynamicData];
						}
					});
					this.reportFields.map((data : any) =>{
						if(data.id != 'purpose' && data.id != 'reportname'){
							val.reportCustomData[data.id] = this.category.controls[data.id].value;
							console.log(val.reportCustomData[data.id])
						}
					})
					console.log(val)
					this.appService.httpPost('expenseActions', val, 'saveReport').subscribe(() => {
						if (config.USER_TYPE === 'Corporate Admin' && config.ADMIN_TYPE === 'admin') {
							(this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.expenseAdminReport]))
						} else {
							this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.expenseReport], {
								state: {
									reportid: this.gridlistJson.reportCode
								}
							});
						}


					});
					break;
				// case 'backfinance':
				// 	this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.pendingSettlement]);
				// 	break;
				// case 'backapprover':
				// 	(config.USER_TYPE === 'Corporate Admin' && config.ADMIN_TYPE === 'admin' )
				// 	? (this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.expenseAdminReport]))
				// 	: (this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.pendingApprovals]));
				// 	break;
				case 'approval':
					this.confirmationContent['title'] = 'Are you sure want to send for approval?';
					this.confirmation = true;
					break;
				case 'settlesendback':
					this.confirmationContent['title'] = 'Are you sure want to sendback?';
					this.confirmationContent['type'] = 'warning';
					this.confirmationContent['reason'] = true;
					this.confirmation = true;
					break;
				case 'sendback':
					this.confirmationContent['title'] = 'Are you sure want to sendback?';
					this.confirmationContent['type'] = 'warning';
					this.confirmationContent['reason'] = true;
					this.confirmation = true;
					break;
				case 'settle':
					if (this.settleAmount.reimbursableAmount === 0) {
						this.confirmation = true;
						this.confirmationContent = {
							title: 'Are you sure want to settle?',
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
					} else if (this.settleAmount.reimbursableAmount < 0) {
						this.manualReimbursedFlag = true;
						this.manualInput = this.settleAmount.reimbursableAmount;
					} else {
						this.settleform = true;
					}
					break;
				case 'callback':
					this.confirmationContent['title'] = 'Are you sure want to callback?';
					this.confirmationContent['type'] = 'warning';
					this.confirmationContent['reason'] = true;
					this.confirmation = true;
					break;
				case 'approvedReport':
					this.confirmationContent['title'] = 'Are you sure want to Approve?';
					this.confirmation = true;
					break;
				case 'reject':
					this.confirmationContent['title'] = 'Are you sure want to reject?';
					this.confirmationContent['type'] = 'warning';
					this.confirmationContent['reason'] = true;
					this.confirmation = true;
					break;
				case 'settlereject':
					this.confirmationContent['title'] = 'Are you sure want to reject?';
					this.confirmationContent['type'] = 'warning';
					this.confirmationContent['reason'] = true;
					this.confirmation = true;
					break;
				default:
					// (config.USER_TYPE === 'Corporate Admin' && config.ADMIN_TYPE === 'admin' )
					// ? (this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.expenseAdminReport]))
					// : (this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.expenseReport]));
					break;
			}
		}
	}
	// List View
	public viewType(type: string) {
		this.gridview = type;
		if (type === 'depth') {
			this.appService
				.httpPost('expenseActions', { reportId: this.gridlistJson.reportId }, 'getReportListView', 'false')
				.subscribe((data) => {
					this.depthViewData = data.content;
				});
		}
	}
	/**
   * close form container
   */
	public formClose(index: string, _colour: string, type: string, _icon: string): void {
		this.submitted = false;
		this.showButton = true;
		var removeOption = $('#cls-chooseExp option[value="' + index + '"]');
		removeOption.prop('selected', false);
		$('#cls-chooseExp').trigger('change.select2');
		$('.cls-field').removeClass('ani-in').addClass('ani-out');
		// setTimeout(() => {
		$('.cls-nofield,.cls-nocatchoosed,.cls-' + index).removeClass('d-none');
		$('.cls-field,.cls-field .cls-' + index).addClass('d-none');
		// }, 660);
		$('#select2-cls-chooseExp-container').text('Select Expense Category');
		if (index === 'Allowance' && this.reportCustomFieldsArray.length > 0) {
			if (this.gridlistJson?.categoryList) {
				this.gridlistJson?.categoryList?.map((data) => {
					this.isDisableTraveltype = (data.id === index) ? true : false;
				});
			}
			else {
				this.isDisableTraveltype = false;
			}
		}
		if (type === 'save') {
			(this.category.controls[index] as FormArray).controls[0].reset();
			((this.category.controls[index] as FormArray).controls[0] as FormGroup).controls['reimbursable'].setValue('Y');
			((this.category.controls[index] as FormArray).controls[0] as FormGroup).controls['currency'].setValue(this.userCurrency);
			if (index === 'Allowance') {
				((this.category.controls[index] as FormArray).controls[0] as FormGroup).controls['reimbursable'].setValue('Y');
				((this.category.get(index) as FormArray).controls[0] as FormGroup).controls['claimType'].setValue('days');
			}
			else if (index === 'Mileage') {
				(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[0] as FormGroup).controls['calculatedThrough']?.setValue('Y');
			}
			// if ($('.cls-frequent .cls-drag-box').length < 5) {
			// 	$('.cls-frequent').append(
			// 		'<span class="cls-drag-box" id=' +
			// 		index +
			// 		'><span class="cls-bg" style="background:' +
			// 		colour +
			// 		'"></span><em class="' +
			// 		icon +
			// 		' cls-iconalign mr-1" style="color:' +
			// 		colour +
			// 		'"></em>' +
			// 		index +
			// 		'</span>'
			// 	);
			// 	this.elRef.nativeElement
			// 		.querySelector('.cls-drag-box#' + index)
			// 		.addEventListener('click', this.selected.bind(index));
			// }
		}
		this.expandOpen = false;
	}
	/**
   * Expand
   */
	public expandClass(mode: string) {
		$('.cls-field').removeClass('ani-in').addClass('ani-out');
		$('.cls-nofield').removeClass('d-none');
		// setTimeout(() => {
		$('.cls-field,.cls-' + mode).addClass('d-none');
		$('.cls-card-container .cls-' + mode).removeClass('d-none');
		$('.cls-list-view .cls-' + mode).removeClass('d-none');
		// }, 670);
		this.expandOpen = false;
	}
	/**
   * resetCategory
   */
	public resetCategory(categoryVal: string): void {
		this.resetShow = true;
		this.resetContent = {
			title: 'Are you sure want to reset all items?',
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
		this.resetVal = categoryVal;
		this.resetValIndex = '';
	}
	/**
	 * Des:reset the particular category item
	 * Author:Abarna
	 * Date:21/06/2021
	 */
	public resetCategoryItem(categoryName: string, categoryItemIndex: number) {
		// console.log(this.resetValIndex)
		this.resetShow = true;
		this.resetContent = {
			title: 'Are you sure want to reset?',
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
		this.resetVal = categoryName;
		this.resetValIndex = categoryItemIndex;
	}
	/**
   * reset category action
   */
	public resetAction(val: any) {
		// console.log(val,this.resetValIndex);
		this.resetShow = false;
		if (val.flag === true) {
			let indexType = typeof (this.resetValIndex);
			// console.log(indexType);
			if (indexType != 'string') {
				(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[this.resetValIndex] as FormGroup).reset();
				(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[this.resetValIndex] as FormGroup).controls[
					'currency'
				].setValue(this.userCurrency);
				(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[this.resetValIndex] as FormGroup).removeControl('reason');
				this.policyData[this.resetVal][this.resetValIndex] = {};
				// console.log(this.policyData[this.resetVal]);
				// if (this.resetVal !== 'Allowance') {
				(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[this.resetValIndex] as FormGroup).controls[
					'reimbursable'
				].setValue('Y');
				// } 
				if (this.resetVal === 'Mileage') {
					(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[this.resetValIndex] as FormGroup).controls['calculatedThrough']?.setValue('Y');
				}
				if (this.resetVal === 'Allowance') {
					if ((((this.category as FormGroup).get(this.resetVal) as FormArray).controls[this.resetValIndex] as FormGroup)
						.controls['daysCountVar']) {
						(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[this.resetValIndex
						] as FormGroup).controls['claimType'].setValue('days');
						(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[
							this.resetValIndex
						] as FormGroup).controls['daysCountVar'].setValue(0);
					}
					else if ((((this.category as FormGroup).get(this.resetVal) as FormArray).controls[this.resetValIndex] as FormGroup)
						.controls['noOfHours']) {
						(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[
							this.resetValIndex
						] as FormGroup).controls['claimType'].setValue('hours');
					}
					(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[this.resetValIndex] as FormGroup).controls[
						'amount'
					].setValue(0);
					(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[this.resetValIndex] as FormGroup).controls[
						'currencyAmount'
					].setValue(0);
				}
				this.receiptVal[this.resetVal][this.resetValIndex] = [];
			}
			else { //for reset all
				this.category.get(this.resetVal).reset();
				this.policyData[this.resetVal] = [];
				for (let i = 0; i < this.category.get(this.resetVal)['controls'].length; i++) {
					// if (this.resetVal !== 'Allowance') {
					(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[i] as FormGroup).controls[
						'reimbursable'
					].setValue('Y');
					// } 
					if (this.resetVal === 'Allowance') {
						if (
							(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[i] as FormGroup)
								.controls['daysCountVar']
						) {
							(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[
								i
							] as FormGroup).controls['claimType'].setValue('days');
							(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[
								i
							] as FormGroup).controls['daysCountVar'].setValue(0);
						} else if (
							(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[i] as FormGroup)
								.controls['noOfHours']
						) {
							(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[
								i
							] as FormGroup).controls['claimType'].setValue('hours');
						}
						(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[i] as FormGroup).controls[
							'amount'
						].setValue(0);
						(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[i] as FormGroup).controls[
							'currencyAmount'
						].setValue(0);
					}
					(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[i] as FormGroup).controls[
						'currency'
					].setValue(this.userCurrency);
					(((this.category as FormGroup).get(this.resetVal) as FormArray).controls[i] as FormGroup).removeControl('reason');
				}
				this.receiptVal[this.resetVal] = [[]];
			}
		}
	}
	/**
   * setAllowance
   */
	public setAllowance(): FormGroup {
		return this.fb.group({
			reimbursable: new FormControl('Y', Validators.required),
			allowanceFrom: new FormControl('', Validators.required),
			allowanceDesc: new FormControl(''),
			allowanceTo: new FormControl('', Validators.required),
			daysCountVar: new FormControl('0'),
			allowanceRate: new FormControl('', Validators.required),
			claimType: new FormControl('days'),
			amount: new FormControl('0', [Validators.required, Validators.pattern(/^[0-9]+\.?[0-9]*$/)]),
			currencyAmount: new FormControl(),
			currency: new FormControl(this.userCurrency),
			exchangeRate: new FormControl(),
			upload: new FormControl('')
		});
	}
	/**
   * setCategory
   */
	public setCategory(): FormGroup {
		return this.fb.group({
			reimbursable: new FormControl('Y', Validators.required),
			expensedate: new FormControl('', Validators.required),
			merchantname: new FormControl('', Validators.pattern(/^([a-zA-Z]+\s?)*$/)),
			currency: new FormControl(this.userCurrency, Validators.required),
			amount: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+\.?[0-9]*$/)]),
			currencyAmount: new FormControl(),
			exchangeRate: new FormControl(),
			upload: new FormControl('')
		});
	}
	/**
   * Desc : category push
   * @param val : category
   * @param id : index
   */
	public categoryPushVal(val: string, id: number, addindex: number): void {
		console.log(this.category)
		console.log(this.policyData)
		// if (val !== 'Allowance') {
		if (val !== 'Allowance') {
			(this.category.get(val) as FormArray).push(this.setCategory());
			this.policyData[val][id] = [];
			this.receiptVal[val].push([]);
		}
		else {
			(this.category.get(val) as FormArray).push(this.setAllowance());
			this.appService
				.httpPost('allowanceInterface', { claimType: 'days' }, 'getAllowanceGroupDetails', 'false')
				.subscribe((data) => {
					this.allowancerateDrop[id] = data.content;
				});
			this.policyData[val][id] = [];
			this.receiptVal[val].push([]);
		}
		for (let j = 0; j < this.expense[0].components[addindex].components.length; j++) {
			if (this.expense[0].components[addindex].components[j]['required'] === 'true') {
				(((this.category as FormGroup).controls[this.expense[0].components[addindex].id] as FormArray).controls[
					id
				] as FormGroup).addControl(
					this.expense[0].components[addindex].components[j].id,
					new FormControl('', [Validators.required])
				);
			} else {
				(((this.category as FormGroup).controls[this.expense[0].components[addindex].id] as FormArray).controls[
					id
				] as FormGroup).addControl(this.expense[0].components[addindex].components[j].id, new FormControl(''));
			}
		}
		if (val === 'Mileage') {
			(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[id] as FormGroup).controls['calculatedThrough'].setValue('Y');
			(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[id] as FormGroup).removeControl('odometerStart');
			(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[id] as FormGroup).removeControl('odometerEnd');
			(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[id] as FormGroup).removeControl('personalDistance');
		}
		setTimeout(() => {
			$('#' + val + id).removeClass('d-none');
		}, 1);
	}
	// alertAction
	public alertAction(val: any, type: string = ''): void {
		const deleteValJson = {
			reportId: this.gridlistJson.reportId,
			reportname: this.gridlistJson.reportname,
			purpose: this.gridlistJson.purpose,
			reportCode: this.gridlistJson.reportCode
		};
		if (type === '') {
			deleteValJson['expenseId'] = [this.deleteIdReq.expenseId];
		} else {
			deleteValJson['category'] = [this.deleteIdReq.mode];
		}
		if (val.flag === true) {
			this.appService.httpPost('expenseActions', deleteValJson, 'deleteExpense').subscribe((data) => {
				this.gridlistJson = data.content;
				this.editResponse = this.gridlistJson;
				if (this.deleteIdReq.mode === 'Allowance') {
					if (this.gridlistJson.message) {
						this.isDisableTraveltype = false;
					}
					else {
						let count = 0;
						this.gridlistJson?.categoryList?.map((data: any) => {
							if (data.modetype === 'Allowance' && this.reportCustomFieldsArray.length > 0) {
								count++;
							}
						});
						this.isDisableTraveltype = (count > 0) ? true : false;
					}
				}
				$('.cls-field,.cls-' + this.deleteIdReq.id).addClass('d-none');
				if (this.gridlistJson.message) {
					this.selectedVal = false;
				}
				if (this.gridlistJson.edited === true) {
					$('.cls-nofield').removeClass('d-none');
				}
				// console.log(type);
				if (type === '') {
					if ((this.category.controls[this.deleteIdReq.id] as FormArray).length > 1) {
						(this.category.controls[this.deleteIdReq.id] as FormArray).removeAt(this.deleteIdReq.idIndex);
					} else {
						// $('.cls-frequent').append(
						// 	'<span class="cls-drag-box" draggable="true" id=' +
						// 	this.deleteIdReq.id +
						// 	'><span class="cls-bg" style="background:' +
						// 	this.deleteIdReq.color +
						// 	'"></span><em class="' +
						// 	this.deleteIdReq.icon +
						// 	' cls-iconalign mr-1" style="color:' +
						// 	this.deleteIdReq.color +
						// 	'"></em>' +
						// 	this.deleteIdReq.mode +
						// 	'</span>'
						// );
						// this.elRef.nativeElement
						// 	.querySelector('.cls-drag-box#' + this.deleteIdReq.id)
						// 	.addEventListener('click', this.selected.bind(this.deleteIdReq.id));
						let objVal = {};
						objVal = {
							id: this.deleteIdReq.id,
							mode: this.deleteIdReq.mode,
							color: this.deleteIdReq.color,
							icon: this.deleteIdReq.icon
						};
						this.frequentlyUsedArr.push(objVal)
						$('.cls-select').select2('destroy');
						this.parentCategoryRemove();
						this.select2();
						(this.category.controls[this.deleteIdReq.id] as FormArray).controls[
							this.deleteIdReq.idIndex
						].reset();
						((this.category.controls[this.deleteIdReq.id] as FormArray).controls[
							this.deleteIdReq.idIndex
						] as FormGroup).controls['currency'].setValue(this.userCurrency);
						if (this.deleteIdReq.id !== 'Allowance') {
							((this.category.controls[this.deleteIdReq.id] as FormArray).controls[
								this.deleteIdReq.idIndex
							] as FormGroup).controls['reimbursable'].setValue('Y');
						} else {
							((this.category.controls[this.deleteIdReq.id] as FormArray).controls[this.deleteIdReq.idIndex] as FormGroup).controls['reimbursable'].setValue('Y');
							((this.category.controls[this.deleteIdReq.id] as FormArray).controls[this.deleteIdReq.idIndex] as FormGroup).controls['claimType'].setValue('days');
						}
					}
				} else {
					// this.editResponse[this.deleteIdReq.id].
					(this.category.controls[
						this.deleteIdReq.id
					] as FormArray).controls.map((_data: any, index: number) => {
						if (index === 0) {
							this.receiptVal[this.deleteIdReq.id] = [[]];
							(this.category.controls[this.deleteIdReq.id] as FormArray).reset();
							((this.category.controls[this.deleteIdReq.id] as FormArray)
								.controls[0] as FormGroup).controls['currency'].setValue(this.userCurrency);
							if (this.deleteIdReq.id !== 'Allowance') {
								((this.category.controls[this.deleteIdReq.id] as FormArray)
									.controls[0] as FormGroup).controls['reimbursable'].setValue('Y');
							} else {
								((this.category.controls[this.deleteIdReq.id] as FormArray).controls[0] as FormGroup).controls['claimType'].setValue('days');
								((this.category.controls[this.deleteIdReq.id] as FormArray).controls[index] as FormGroup).controls['reimbursable'].setValue('Y');
							}
						} else {
							this.receiptVal[this.deleteIdReq.id][index] = [];
							(this.category.controls[this.deleteIdReq.id] as FormArray).removeAt(index);
						}
						// console.log(this.deleteIdReq.id,index,this.userCurrency);
						// ((this.category.controls[this.deleteIdReq.id] as FormArray).controls[
						// 	index
						// ] as FormGroup).controls['currency'].setValue(this.userCurrency);
						if (this.deleteIdReq.id !== 'Allowance') {
							((this.category.controls[this.deleteIdReq.id] as FormArray).controls[
								index
							] as FormGroup).controls['reimbursable'].setValue('Y');
						} else {
							((this.category.controls[this.deleteIdReq.id] as FormArray).controls[index] as FormGroup).controls['claimType'].setValue('days');
							((this.category.controls[this.deleteIdReq.id] as FormArray).controls[index] as FormGroup).controls['reimbursable'].setValue('Y');
						}
						// $('.cls-frequent').append(
						// 	'<span class="cls-drag-box" draggable="true" id=' +
						// 	this.deleteIdReq.id +
						// 	'><span class="cls-bg" style="background:' +
						// 	this.deleteIdReq.color +
						// 	'"></span><em class="' +
						// 	this.deleteIdReq.icon +
						// 	' cls-iconalign mr-1" style="color:' +
						// 	this.deleteIdReq.color +
						// 	'"></em>' +
						// 	this.deleteIdReq.mode +
						// 	'</span>'
						// );
						// this.elRef.nativeElement
						// 	.querySelector('.cls-drag-box#' + this.deleteIdReq.id)
						// 	.addEventListener('click', this.selected.bind(this.deleteIdReq.id));
						$('.cls-select').select2('destroy');
						this.parentCategoryRemove();
						this.select2();
					});
					let objVal = {};
					objVal = {
						id: this.deleteIdReq.id,
						mode: this.deleteIdReq.mode,
						color: this.deleteIdReq.color,
						icon: this.deleteIdReq.icon
					};
					this.frequentlyUsedArr.push(objVal)
				}
				if ((this.category.controls[this.deleteIdReq.id] as FormArray).length === 0) {
					// $('.cls-frequent').append(
					// 	'<span class="cls-drag-box" draggable="true" id=' +
					// 	this.deleteIdReq.id +
					// 	'><span class="cls-bg" style="background:' +
					// 	this.deleteIdReq.color +
					// 	'"></span><em class="' +
					// 	this.deleteIdReq.icon +
					// 	' cls-iconalign mr-1" style="color:' +
					// 	this.deleteIdReq.color +
					// 	'"></em>' +
					// 	this.deleteIdReq.mode +
					// 	'</span>'
					// );
					// this.elRef.nativeElement
					// 	.querySelector('.cls-drag-box#' + this.deleteIdReq.id)
					// 	.addEventListener('click', this.selected.bind(this.deleteIdReq.id));
					let objVal = {};
					objVal = {
						id: this.deleteIdReq.id,
						mode: this.deleteIdReq.mode,
						color: this.deleteIdReq.color,
						icon: this.deleteIdReq.icon
					};
					this.frequentlyUsedArr.push(objVal)
				}
			});
		}
		this.alertShow = false;
	}
	/**
   * amountCalculate
   */
	public amountCalculate(val: number, category: string, groupid: number, catName: string): void {
		// setTimeout(() => {
		const amount = parseFloat(
			(val *
				(((this.category as FormGroup).controls[category] as FormArray).controls[groupid] as FormGroup)
					.controls['exchangeRate'].value).toFixed(2)
		);
		(((this.category as FormGroup).controls[category] as FormArray).controls[groupid] as FormGroup).controls[
			'currencyAmount'
		].setValue(amount);
		// }, 10);
		// setTimeout(() => {
		this.currencyChoosed(category, groupid, catName)
		// }, 10);
	}
	/**
   * currencyChoosed
   */
	public currencyChoosed(categoryVal: string, groupid: number, catName: string): void {
		this.currencyService(categoryVal, groupid, catName);
	}
	/**
   * dateChangeCurrency
   */
	public dateChangeCurrency(category: string, groupid: number, catName: string, formControl: string): void {
		if (category === 'Hotel') {
			this.parentCategoryName = 'Hotel';
		}
		if (this.parentCategoryName === 'Hotel') {
			this.hotelDateSubscr.forEach(s => s.unsubscribe());
		}
		this.expenseDateUnsub.forEach(s => s.unsubscribe());
		let mileageDate: any;
		this.expenseDateUnsub.push((((this.category as FormGroup).controls[category] as FormArray).controls[groupid] as FormGroup).controls[
			'expensedate'
		].valueChanges.subscribe(() => {
			if (category === 'Mileage') {
				// console.log((((this.category as FormGroup).controls['Mileage'] as FormArray).controls[groupid] as FormGroup).controls['expensedate'].value);
				mileageDate = (((this.category as FormGroup).controls['Mileage'] as FormArray).controls[groupid] as FormGroup)
						.controls['expensedate'].value
				if (mileageDate) {
					const formData = {
						Mileage: [
							{
								mileageDetailsJsonRequired: 'Yes',
								expenseDate: (((this.category as FormGroup).controls['Mileage'] as FormArray).controls[
										groupid
									] as FormGroup).controls['expensedate'].value
							}
						],
						userId: config.USER_ID
					};
					this.appService.httpPost('policyViolation', formData, 'checkPolicyViolation', 'false').subscribe((data) => {
						console.log(data);
						this.mileageTrueJson = JSON.parse(JSON.stringify(data.content.mileageDetails));
						this.mileageDetails = data.content.mileageDetails;
						let mileUnique: any = [];
						var vehicle = this.mileageDetails.map(function (obj) {
							return obj.vehicleType;
						});
						vehicle = vehicle.filter(function (v, i) {
							if (vehicle.indexOf(v) == i) {
								mileUnique.push(i);
							}
							return vehicle.indexOf(v) == i;
						});
						let mileValue: any = [];
						mileUnique.map((dataVal: any) => {
							mileValue.push(this.mileageDetails[dataVal]);
						});
						this.mileageDetails = mileValue;
					});
					(((this.category as FormGroup).controls['Mileage'] as FormArray).controls[groupid] as FormGroup).addControl(
						'vehicleType',
						this.fb.control('', [Validators.required])
					);
				}
			}
			this.currencyService(category, groupid, catName);
		}));
		if (this.parentCategoryName === 'Hotel' && formControl !== 'expensedate') {
			this.hotelDateSubscr.push(((this.category.controls[category] as FormArray).controls[groupid] as FormGroup).valueChanges.subscribe(() => {
				this.onBlurEvent(category, groupid, catName, formControl);
			}));
		}
		// setTimeout(() => {
		// }, 200);
	}
	/**
   * Desc: currencyCall
   */
	public currencyService(category: string, groupid: number, catName: string): void {
		this.onBlurEvent(category, groupid, catName, '');
		let val;
		if (
			(((this.category as FormGroup).controls[category] as FormArray).controls[groupid] as FormGroup).controls[
				'expensedate'
			].value === '' ||
			(((this.category as FormGroup).controls[category] as FormArray).controls[groupid] as FormGroup).controls[
				'expensedate'
			].value === null
		) {
			val = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
		} else {
			val = (((this.category as FormGroup).controls[category] as FormArray).controls[groupid] as FormGroup)
					.controls['expensedate'].value
		}
		const dataReq: any = {
			userCurrency: this.userCurrency,
			convertCurrency: (((this.category as FormGroup).controls[category] as FormArray).controls[
				groupid
			] as FormGroup).controls['currency'].value,
			date: val
		};
		this.appService.httpPost('currencyConversion', dataReq, 'convert', 'false').subscribe((data) => {
			this.exchangeRateVal = JSON.parse(JSON.stringify(data.content));
			(((this.category as FormGroup).controls[category] as FormArray).controls[groupid] as FormGroup).controls[
				'exchangeRate'
			].setValue(this.exchangeRateVal.exchangeRate);
			const amount = (((this.category as FormGroup).controls[category] as FormArray).controls[
				groupid
			] as FormGroup).controls['amount'].value;
			const currencyAmount = (amount * this.exchangeRateVal.exchangeRate).toFixed(2);
			if (amount !== '') {
				(((this.category as FormGroup).controls[category] as FormArray).controls[
					groupid
				] as FormGroup).controls['currencyAmount'].setValue(currencyAmount);
			} else {
				(((this.category as FormGroup).controls[category] as FormArray).controls[
					groupid
				] as FormGroup).controls['currencyAmount'].setValue(this.exchangeRateVal.exchangeRate);
			}
		});
	}
	/**
   * Desc : category pop index
   * @param val : category
   * @param id : index
   */
	public removeCategory(val: string, id: number, color: string, icon: string): void {
		if (Object.keys(this.editResponse).length > 0 && ((this.category as FormGroup).controls[val] as FormArray).controls[id].valid) {
			if (this.selectedVal === true && this.editResponse[val][id] && Object.keys(this.editResponse).indexOf(val) !== -1) {
				this.alertShow = true;
				this.alertContent = {
					title: 'Are you sure want to delete ?',
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
				this.deleteIdReq = {
					expenseId: id,
					mode: val,
					id: val,
					idIndex: id,
					color: color,
					icon: icon
				};
				if (this.editResponse[val][id]) {
					this.deleteIdReq.expenseId = this.editResponse[val][id].expenseId;
				}
			}
		}
		else {
			if (((this.category as FormGroup).controls[val] as FormArray).controls.length === 1) {
				(this.category.controls[val] as FormArray).reset();
				this.policyData[val][id] = [];
				if (val !== 'Allowance') {
					((this.category.controls[val] as FormArray).controls[id] as FormGroup).controls[
						'reimbursable'
					].setValue('Y');
				} else {
					((this.category.controls[val] as FormArray).controls[id] as FormGroup).controls[
						'claimType'
					].setValue('days');
				}
				((this.category.controls[val] as FormArray).controls[id] as FormGroup).controls['currency'].setValue(
					this.userCurrency
				);
				this.receiptVal[val][id] = [];
				this.formClose(val, color, 'save', icon);
			} else {
				(this.category.controls[val] as FormArray).removeAt(id);
			}
		}
	}
	/**
   * citySearch
   */
	// public citySearch(id: string, arrayname: string, group: number, name: string): void {
	// 	this.checkAllowance = false;
	// 	const searchLength = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[
	// 		group
	// 	] as FormGroup).controls[id].value;

	// 	this.autocompleteCity.autoComplete(
	// 		id,
	// 		((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup,
	// 		name + arrayname + group,
	// 		searchLength,
	// 		'placesApi'
	// 	);
	// }
	public citySearch(id: string, arrayname: string, group: number, name: string, index: any): void {
		this.checkAllowance = false;
		let searchLength: any;
		if (id === 'waypoints') {
			searchLength = (((((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup).controls['geoTaggingArray'] as FormArray).controls[index] as FormGroup).controls[id].value;
			this.autocompleteCity.autoComplete(
				id,
				((((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup).controls['geoTaggingArray'] as FormArray).controls[index] as FormGroup,
				name + arrayname + group + index,
				searchLength,
				'placesApi'
			);
		}
		else {
			searchLength = (((this.category as FormGroup).controls[arrayname] as FormArray).controls[
				group
			] as FormGroup).controls[id].value;
			this.autocompleteCity.autoComplete(
				id,
				((this.category as FormGroup).controls[arrayname] as FormArray).controls[group] as FormGroup,
				name + arrayname + group,
				searchLength,
				'placesApi'
			);
		}
	}
	/**
   * Reset form
   */
	public resetForm(): void {
		this.category.reset();
	}
	/**
		 * previewPdf
		 */
	public previewPdf(src: string): void {
		// window.open(src);
		$("#fn-pdf").modal("show");
		this.pdfPath = this.sanitizePdfUrl(src);

	}
	/**
	 * close previewPdf
	 */
	public closepdf(): void {
		$("#fn-pdf").modal("hide");
	}
	/**
	 * Des: pdf Sanitzer 
	 */
	public sanitizePdfUrl(src: any) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(src);
	}
	urls = [];
	image = [];
	/**
   * file upload
   */
	public onSelectFile(event, categoryVal: string, id: number) {
		let image: File = event.target.files[0];
		if (event.target.files[0].type === 'application/pdf') {
			const fileData: any = new FormData();
			fileData.append('module', 'receiptHandler');
			fileData.append('action', 'fetchReceipt');
			fileData.append('file', event.target.files[0]);
			if (this.selectedVal === true && this.editResponse[categoryVal]) {
				if (this.editResponse[categoryVal][id]) {
					fileData.append('expenseId', this.editResponse[categoryVal][id]['expenseId']);
				}
			}
			this.appService.httpPost('receiptHandler', fileData, 'fetchReceipt', 'false').subscribe((data) => {
				let objVal = {
					receiptId: data.content.receiptId,
					path: data.content.url,
					name: data.content.name,
					type: data.content.type,
					encodeImage: data.content.encodeImage
				};
				this.receiptVal[categoryVal][id].push(objVal);
			});
		} else {
			this.compressImage.compress(image)
				.pipe(take(1))
				.subscribe(compressedImage => {
					var reader = new FileReader();
					reader.onload = (event: any) => {
						this.localUrl = event.target.result;
						this.compressFile(this.localUrl, compressedImage.name, compressedImage, categoryVal, id);
						// this.service(compressedImage, categoryVal, id);
					}
					reader.readAsDataURL(compressedImage);
				})
		}
	}
	/**
//    * image compression function
//    */
	public compressFile(image, fileName, val, categoryVal, id): void {
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
			if (this.selectedVal === true && this.editResponse[categoryVal]) {
				if (this.editResponse[categoryVal][id]) {
					imageVal['expenseId'] = this.editResponse[categoryVal][id]['expenseId'];
				}
			}
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
				let objVal = {
					receiptId: data.content.receiptId,
					path: data.content.url,
					name: data.content.name,
					type: data.content.type,
					encodeImage: data.content.encodeImage
				};
				this.receiptVal[categoryVal][id].push(objVal);
			});
		});
	}
	/**
   * service for list receipt
   */
	public service(val: any, categoryVal: string, id: number) {
		var fileName: any;
		this.file = (<HTMLInputElement>event.target).files[0];
		fileName = this.file['name'];
		var reader = new FileReader();
		reader.onload = (event: any) => {
			this.localUrl = event.target.result;
			this.compressFile(this.localUrl, fileName, val, categoryVal, id);
		};
		reader.readAsDataURL((<HTMLInputElement>event.target).files[0]);
	}
	//close image
	public onItemDeleted(category: string, arrIndex: number, imgIndex: number, receipt: number) {
		this.imageFlag = true;
		this.imageCatDelete = {
			category: category,
			arrIndex: arrIndex,
			imgIndex: imgIndex,
			receipt: receipt
		};
		this.imageContent = {
			title: 'Are you sure want to delete ?',
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
   * delete image
   */
	public imageDelete(val: any): void {
		this.imageFlag = false;
		this.imageContent = {};
		if (val.flag === true) {
			this.deleteImage(this.imageCatDelete.receipt);
			this.receiptVal[this.imageCatDelete.category][this.imageCatDelete.arrIndex].splice(
				this.imageCatDelete.imgIndex,
				1
			);
			this.appService
				.httpPost('receiptHandler', { receiptId: this.imageCatDelete.receipt }, 'deleteReceipt', 'false')
				.subscribe(() => { });
		}
	}
	//input for image preview
	public imagePreview(url: string, type: string) {
		this.imageUrl = url + '.' + type;
		this.showModal = true;
	}
	//close image preview
	public closePreview(data: any) {
		this.showModal = data;
	}
	public getFormValidation(control: any) {
		let tempStatus = this.category.controls[control].status;
		let status: boolean = false;
		tempStatus == 'VALID' ? (status = false) : (status = true);
		return status;
	}
	public getValidation(control: any, category: string, i: number) {
		let Tempdata = ((this.category.controls[category] as FormArray).controls[i] as FormArray).controls[control]?.status;
		let status: boolean = false;
		Tempdata == 'VALID' ? (status = false) : (status = true);
		return status;
	}
	/**
   * open history modal
   */
	public history(): void {
		this.appService
			.httpPost(
				'reportHistory',
				{ reportCode: this.gridlistJson.reportCode, type: 'Report' },
				'fetchReportHistory', 'false'
			)
			.subscribe((data) => {
				this.historyInput = {
					data: data.content,
					type: 'report'
				};
				this.historyFlag = true;
			});
	}
	/**
   * close history modal
   */
	public historyClose(val: boolean): void {
		this.historyFlag = val;
	}
	/**
   * show advance adjustment
   */
	public showAdvanceAdjustment(val: boolean): void {

		if (val === true) {
			this.advanceAdjustmentFlag = val;
			this.settledAdvanceAdjustment();
		} else {
			this.advanceAdjustmentFlag = val;
			this.gridValue('advance');
		}
	}
	/**
   * close advance adjustment
   */
	public settledAdvanceAdjustment(): void {
		this.widget = this.gridlistJson.approverWidget;
		let userId: any;
		this.widget.map((data: any, index: number) => {
			if (index === 0) {
				userId = data.users.id;
			}
		});
		const formData = {
			reportId: this.gridlistJson.reportId,
			userId: userId
		};
		this.appService.httpPost('advanceReport', formData, 'settledAdvanceReportView', 'false').subscribe((data) => {
			if (data.content.status != '') {
				/**
		   * to show advance adjustment button while advance is shown
		   */
				this.advanceAdjustmentBtn = true;
				this.advanceAdjustment = data;
				this.advanceAdjustment.content.data.map((val) => {
					this.advanceAdjustmentCount = val[5].count;
				});
				this.advanceReportData = {
					report_Id: this.gridlistJson.reportId,
					edit: this.gridlistJson.edited
				};
			}
		});
	}
	/**
	 * triggerAction
	 */
	public triggerAction(name: string): void {
		this.appService.triggerAction(name);
	}
	/**
   * to delete report recipt list function
   */
	public deleteImage(receipt: number) {
		this.reportReciptList['unExpensedReceipts'].map((data) => {
			if (receipt === data.receipt_id) {
				this.reportReciptList['unExpensedReceipts'] = this.reportReciptList['unExpensedReceipts'].filter(
					(item) => item.receipt_id !== receipt
				);
			}
		});
	}
	/**
   * open receipt function
   */
	public openReportRecipt(catVal: any, id: number, type: string) {
		this.reportRecipt = true;
		this.reportReciptListInput = {
			data: this.reportReciptList,
			catVal: catVal,
			id: id,
			type: type
		};
	}
	/**
   * service to list recipt
   */
	public reportReciptService() {
		this.appService.httpPost('receiptHandler', {}, 'getUnExpensedReceipts', 'false').subscribe((data) => {
			this.reportReciptList = data.content;
			this.reportReciptList.unExpensedReceipts.map((imgData: any) => {
				imgData.mappedCategoryItemId = '';
				imgData.mappedCategory = ''
			})
		});


	}
	/**
   * close receipt
   */
	public closeReportRecipt(data: any) {
		if (data === false) {
			this.reportRecipt = false;
		}
		if (data.type === 'unsaved') {
			this.receiptVal[data.catVal][data.id] = this.mergeArray(data);
			this.reportRecipt = false;
		} else if (data.type === 'saved' && data.form.length > 0) {
			this.savedReceipt = data;
			let categoryVal = data.form[0]['details']['category'].split(' ').join('');
			if (data.form[0]['details']['category'] !== 'Allowance') {
				(this.category.get(categoryVal) as FormArray).push(this.setCategory());
			} else {
				(this.category.get(categoryVal) as FormArray).push(this.setAllowance());
			}
			let categoryName: string = data.form[0]['details']['category'];
			let controlId: number = (this.category.get(categoryVal) as FormArray).controls.length - 1;
			this.expense[0].components.map((catInd: any, index: number) => {
				if (catInd.category === categoryName) {
					for (let j = 0; j < this.expense[0].components[index].components.length; j++) {
						if (this.expense[0].components[index].components[j]['required'] === 'true') {
							(((this.category as FormGroup).controls[this.expense[0].components[index].id] as FormArray)
								.controls[controlId] as FormGroup).addControl(
									this.expense[0].components[index].components[j].id,
									new FormControl('', [Validators.required])
								);
						} else {
							(((this.category as FormGroup).controls[
								this.expense[0].components[index].category
							] as FormArray).controls[controlId] as FormGroup).addControl(
								this.expense[0].components[index].components[j].id,
								new FormControl('')
							);
						}
					}
				}
			});
			let reportObj: any = {};
			let staticField: any = [];
			let dynamicField: any = [];
			this.reportFields.map((datadefault: any) => {
				if (datadefault.default_field === 'true') {
					staticField.push(datadefault.id);
				} else {
					dynamicField.push(datadefault.id);
				}
			});
			staticField.map((staticData: any) => {
				reportObj[staticData] = this.category.value[staticData];
			});
			dynamicField.map((dynamicData: any) => {
				reportObj['reportCustomData'] = {};
				if (this.category.value[dynamicData]) {
					reportObj['reportCustomData'][dynamicData] = this.category.value[dynamicData];
				}
			});
			if (this.gridlistJson.reportId) {
				reportObj['reportId'] = this.gridlistJson.reportId;
				reportObj['reportCode'] = this.gridlistJson.reportCode;
			}
			let detailsArray = [];
			this.savedReceipt.form.map((data: any) => {
				detailsArray.push(data.details);
			});
			let categoryValue = [];
			detailsArray.map((val) => {
				categoryValue.push(val.category);
			});
			const formData: any = {
				reportDetails: reportObj,
				expenseDetails: detailsArray
			};
			this.appService.httpPost('expenseValut', formData, 'saveMultipleExpenseReceipts', '', true).subscribe((data) => {
				this.gridlistJson = data.content;
				this.settledAdvanceAdjustment();
				if (data.content.approverWidget) {
					this.widget = data.content.approverWidget;
				}
				this.selectedVal = true;
				categoryValue.map((catval) => {
					// setTimeout(() => {
					$('.cls-nofield').removeClass('d-none');
					$('.cls-field,.cls-main.cls-' + catval).addClass('d-none');
					$('.cls-list-expense.cls-' + catval).removeClass('d-none');
					$('.cls-inner-container').removeClass('d-none');
					// }, 660);
				});
				this.gridview = 'grid';
				$('.cls-select').select2('destroy');
				this.gridlistJson.categoryList.map((data: any) => {
					$("#cls-chooseExp option[value='" + data.id + "']").remove();
				});
				this.parentCategoryRemove();
				this.select2();
				this.reportReciptService();
			});
			// setTimeout(() => {
			this.expandOpen = true;
			// }, 100);
			this.reportRecipt = false;
		}
	}
	/**
   * to remove duplicate data in unsaved report recipt
   */
	public mergeArray(data: any) {
		this.selectedCheck = [];
		this.unSelectedVal = [];
		let receiptIds = new Set(this.receiptVal[data.catVal][data.id].map((d) => d.receiptId));
		let merged = [
			...this.receiptVal[data.catVal][data.id],
			...data.form.filter((d) => !receiptIds.has(d.receiptId))
		];
		merged.map((val: any) => {
			this.selectedCheck.push(val);
		});
		data.unselectArr.map((data: any) => {
			this.unSelectedVal.push(data);
		});
		this.selectedCheck.map((_data: any, i: number) => {
			this.unSelectedVal.map((_unselect: any, j: number) => {
				if (this.selectedCheck[i].receiptId === this.unSelectedVal[j].receiptId) {
					merged.splice(i, 1);
				}
			});
		});
		return merged;
	}
	/**
	 * download report
	 */
	public downloadReport() {
		this.appService
			.httpPost('downloadReportExpense', { reportId: history.state.reportid.reportId }, 'getTopSheetDetails', 'false')
			.subscribe((data) => {
				const encodePdf = data.content.encodeFile;
				const pdfName = data.content.fileName;
				let filepdf = 'data:application/pdf;base64,' + encodePdf;
				let val = document.createElement('a');
				val.href = filepdf;
				val.download = pdfName;
				val.click();
			});
	}
	/**
	 * downloadOverallReport
	 */
	public downloadOverallReport() {
		$('#fn-loaging-btn').addClass('spinner-border spinner-border-sm');
		$('#fn-download-icon').addClass('d-none')
		this.getOverallReport();
		// setTimeout(()=>{
		// 	$('#fn-print-section').trigger('click');
		// },10);
	}
	/**
	 * getOverallReport
	 */
	public getOverallReport() {
		this.appService.httpPost('ExpenseReportSheet', { reportId: this.gridlistJson.reportId }, 'getOverallReportExpenseDetails', '').subscribe((data) => {
			this.getOverallReportDetails = data.content;
			if (this.getOverallReportDetails) {
				setTimeout(() => {
					$('#fn-loaging-btn').removeClass('spinner-border spinner-border-sm');
					$('#fn-download-icon').removeClass('d-none')
					$('#fn-print-section').trigger('click');
				}, 500);
			}
			if (!this.getOverallReportDetails.status) {
				this.travelStatement = true;
			}
		});
	}
	/**
	 * downoad image
	 */
	public downloadImage(path: any, name: any, extension: any) {
		// console.log(this.receiptVal);
		// console.log(path,name,extension)
		let imagePath;
		if (extension === 'application/pdf') {
			imagePath = path;
		}
		else {
			imagePath = path + '.' + extension;
		}
		this.appService.httpPost('receiptHandler', { path: imagePath, name: name }, 'downloadReceipt', '').subscribe((data) => {
			// console.log(data);
			if (data?.content) {
				let imageFile;
				const encodeImage = data.content.encodeImage;
				const imageName = data.content.name;
				if (extension === 'application/pdf') {
					imageFile = 'data:application/pdf;base64,' + encodeImage;
				}
				else {
					imageFile = 'data:image/' + extension + ';base64,' + encodeImage;
				}
				// console.log('data:image/' + extension + ';base64,')
				let val = document.createElement('a');
				val.href = imageFile;
				val.download = imageName;
				val.click();
			}
		});
	}
	/**
	 * scroll left and right in expense type report
	 */
	public scrollExpenceType(val: any) {
		// var sLeft = document.getElementById('fn-expense-type-container').scrollLeft;
		if (val == 'left') {
			$('#fn-expense-type-container').animate({ scrollLeft: '-=70' }, 700);
			// if(sLeft <= 0){
			// 	$('.cls-left-scroll').addClass('cls-scroll-hide');
			// 	$('.cls-right-scroll').removeClass('cls-scroll-hide');
			// }
		} else {
			$('#fn-expense-type-container').animate({ scrollLeft: '+=70' }, 700);
			// if(sLeft != 0){
			// 	$('.cls-left-scroll').removeClass('cls-scroall-hide');
			// 	// $('.cls-right-scroll').addClass('cls-scroll-hide');
			// }
		}
	}
	/**
	 * Des: Mileage data emiting when complete 
	 * Au: Venkat
	*/
	public mileageData(data: any) {

		this.gridlistJson = data;
		if (this.gridlistJson.status !== 'danger') {
			this.settledAdvanceAdjustment();
			if (this.gridlistJson.approverWidget) {
				this.widget = this.gridlistJson.approverWidget;
			}
			this.selectedVal = true;
			setTimeout(() => {
				$('.cls-nofield').removeClass('d-none');
				$('.cls-field,.cls-main.cls-Mileage').addClass('d-none');
				$('.cls-list-expense.cls-Mileage').removeClass('d-none');
				$('.cls-mobileMileage').addClass('d-none');
				$('#Mileage').addClass('d-none');
				$('#mobileMileage').addClass('d-none');
				$('.cls-inner-container').removeClass('d-none');
			}, 200);
			this.gridview = 'grid';
			$('.cls-select').select2('destroy');
			this.gridlistJson?.categoryList?.map((data: any) => {
				$("#cls-chooseExp option[value='" + data.id + "']").remove();
			});
			this.parentCategoryRemove();
			this.select2();
		}
	}
	/**
	 * Des: Web view itinerary close status
	 * Au: Venkat
	*/
	public itineraryClose(flag: boolean) {
		if (flag) {
			this.editViewWeb = false;
			this.mileageData(this.gridlistJson);
		}
	}
}
