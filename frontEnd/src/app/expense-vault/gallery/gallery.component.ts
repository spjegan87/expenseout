import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from './../../core-module/services/app.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { config } from './../../core-module/config/app';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Router } from '@angular/router';
import { urlConfig } from '../../core-module/config/url';
import { DomSanitizer } from '@angular/platform-browser';
import {  take } from "rxjs/operators";
import { CompressionService } from "../../core-module/services/compression.service";
declare var $: any;
declare var feather: any;
declare var toastr: any;
// declare function showLoader(): any
// declare function hideLoader(): any
/**
 * Author: Padma Priya CK.,Naveen
 * Module : Expense Form
 * Powered by : Infiniti software solutions
 */
@Component({
	selector: 'app-gallery',
	templateUrl: './gallery.component.html',
	styleUrls: [ './gallery.component.scss' ]
})
export class GalleryComponent implements OnInit,AfterViewInit {
	/**
 * Desc breadcrumb
 */
	// public breadcrumb: any = [];
	/**
 * UserID
 */
	public userID: string;
	/**
 * show image uplaod box
 */
	public showImageContainer: boolean = false;
	/**
 * close upload contaier
 */
	public imageUploadContainer: boolean = true;
	/**
 * close work flow box
 */
	public closeWorkFlow: boolean = false;
	/**
 * show form container
 */
	public scanContainer: boolean = false;
	/**
 * Desc : data
 */
	public responseData: any = {};
	/**
 * Image url
 */
	public imageUrl: string;
	public scanUrl: any = {};
	/**
 * show image preview flag
 */
	public showModal: boolean = false;
	/**
 * loader flag
 */
	public loader: boolean = false;
	/**
 * Desc : store image val
 */
	public imageCatDelete: any = {};
	/**
 * alert flag
 */
	public alertModal: boolean = false;
	/**
 * Receipt Val
 */
	public receiptVal: any = [];
	/**
 * alertContent
 */
	public alertContent: any = {};
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
 * Desc : config settings
 */
	public configSetting: any = {};
	/**
 * open create report flag
 */
	public createReport: boolean = false;
	/**
 * ExistingReport
 */
	public ExistingReport: boolean;
	/**
 * Desc : existing report array
 */
	public reportExist: any = [];
	/**
 * report title
 */
	public reportTitle: string;
	/**
 * Desc: submitted
 */
	public submitted: boolean = false;
	/**
 * to show create and existing report container flag
 */
	public multipleselect: boolean = false;
	/**
 * create or add to existing report request array
 */

	public multiReceipt: any = [];
	/**
 * create or add to existing report expense details array
 */
	public expenseDetails: any = [];
	/**
 * show or hide create or add to existing button
 */
	public tempArr: any = [];
	/**
 * Desc: choosedexisting Report val
 */
	public choosedReport: any = {};
	/**
 * Report fields
 */
	public reportFields: any = [];
	/**
	 * report name array
	 */
	public reportName: any = [];
	/**
	 * bulk upload
	 */
	public bulkUpload: any ;
	/**
	 * Show pdf 
	 */
	public pdfPath :any;
	/**
	 * constructor
	 */
	constructor(
		private appService: AppService,
		private imageCompress: NgxImageCompressService,
		private router: Router,
		private fb: FormBuilder,
		public sanitizer: DomSanitizer,
		private compressImage: CompressionService,
	) {}
	/**
 * reportForm
 */
	public reportForm: FormGroup = this.fb.group({});
	public ngAfterViewInit() : void {
		feather.replace();
	  }
	/**
 * alertContent
 */
	public async ngOnInit() {
		this.configSetting = config.CONFIGSETTINGS['EXPENSE_VAULT'];
		this.bulkUpload = config.CONFIGSETTINGS['EXPENSE_VAULT'].bulk_add_expense;
		this.userID = config.USER_ID;
		 this.appService.httpPost('customFieldData', { type: 'report' }, 'fetchCustomField','false').subscribe((data) => {
		 	this.reportFields = data.content.customData;
		 	this.reportFields.map((data: any) => {
		 		if (data.required === true) {
		 			this.reportForm.addControl(data.id, new FormControl('', [ Validators.required ]));
		 		} else {
		 			this.reportForm.addControl(data.id, new FormControl(''));
		 		}
		 	});
		 });
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
		this.reportFields?.map((data: any) => {
			if (data.required === true) {
				this.reportForm.addControl(data.id, new FormControl('', [Validators.required]));
			} else {
				this.reportForm.addControl(data.id, new FormControl(''));
			}
		});
		config.EXPENSE_VAULT_CHANGES = true;
		// this.receiptList();
		// setTimeout(() => {
			// feather.replace();
		// }, 300);
		this.appService.httpPost('expenseValut', {}, 'getReportDetails', 'false').subscribe((data) => {
			// console.log(data, 'report');
			this.reportExist = data;
		});
		this.appService.httpPost('expenseActions', {}, 'checkReportExsitsName', 'false').subscribe((data) => {
			this.reportName = data.content;
		});
	}
	public ngDoCheck(){
		if(config.EXPENSE_VAULT_CHANGES){
			config.EXPENSE_VAULT_CHANGES = false;
			this.receiptList();
		}
	}
	/**
   * previewPdf
   */
	public previewPdf(src: string): void {
		$("#fn-pdf").modal("show");
		this.pdfPath = this.sanitizePdfUrl(src);
	}
	/**
   * service hit for receipt list
   */
	public receiptList() {
		this.appService.httpPost('receiptHandler', { user_id: this.userID }, 'getAllUserReceipts', 'false').subscribe((data) => {
			if (data.content.receiptDetails.length > 0) {
				this.closeWorkFlow = true;
				this.showImageContainer = true;
				data.content.receiptDetails.map((data: any) => {
					this.receiptVal.push({
						receiptid: data.receipt_id,
						tempUrl: data.receipt_path,
						details: data.details,
						name: data.receipt_name,
						type: data.receipt_type
					});
				});
			}
		});
	}
	// show form container
	public showForm(url: any, j: number, id: number, type: string) {
		this.loader = true;
		$('.cls-img' + j + ' .cls-loader-container').removeClass('d-none');
		$('.cls-img' + j + ' .cls-image').addClass('fn-preview-image');
		setTimeout(() => {
			this.appService.httpPost('scanOcr', { filePath: url, type: type }, 'scan', 'false').subscribe((data) => {
				this.responseData = data.content;
				this.scanContainer = true;
				this.imageUploadContainer = false;
				this.scanUrl = {
					path: url,
					receiptId: id,
					type: type
				};
			});
		}, 1000);
	}
	/**
	 * triggerAction
	 */
	 public triggerAction(name: string): void {
		this.appService.triggerAction(name);
	}
	/**
   * file upload
   */
	public onSelectFile(event) {
		var size = event.target.files[0].size;
		let image: File = event.target.files[0];
		if (event.target.files[0].type === 'application/pdf') {
			const fileData: any = new FormData();
			fileData.append('module', 'receiptHandler');
			fileData.append('action', 'fetchReceipt');
			fileData.append('file', event.target.files[0]);
			this.appService.httpPost('receiptHandler', fileData, 'fetchReceipt').subscribe((data) => {
				if (data.content.error !== true) {
					let objVal = {
						receiptid: data.content.receiptId,
						tempUrl: data.content.url,
						name: data.content.name,
						type: data.content.type
					};
					this.receiptVal.unshift(objVal);
					this.closeWorkFlow = true;
					this.showImageContainer = true;
				}
				else{
					toastr.error('File Size is More than 2MB');
				}
			});
		} else {
			// this.service(event.target.files[0]);
			if (size < 2097152) {
				var reader = new FileReader();
				  reader.onload = (event: any) => {
						  this.compressFile(event.target.result, image.name, image);
				  }
				  reader.readAsDataURL((<HTMLInputElement>event.target).files[0]);
			 } else {
				this.compressImage.compress(image)
				.pipe(take(1))
				.subscribe(compressedImage => {
				  // now you can do upload the compressed image
					 var reader = new FileReader();
					 reader.onload = (event: any) => {
						  this.compressFile(event.target.result, compressedImage.name, compressedImage);
					 }
					 reader.readAsDataURL(compressedImage);
				});
			 }
		}
	}
	//   /**
	//    * image compression function
	//    */
	public compressFile(image, fileName, val): void {
		var orientation = -1;
		this.imageCompress.compressFile(image, orientation, 50, 50).then((result) => {
			this.localCompressedURl = result;
			// create file from byte
			const imageName = fileName;
			this.imageFile = new File([ result ], imageName, { type: 'image/jpeg' });
			this.imageFile = new File([ result ], fileName, { type: 'image/jpeg' });
			let imageVal: any = {
				name: val.name,
				type: val.type,
				image: image
			};
			if (val.size <= 2000000) {
				imageVal['image'] = image;
				imageVal['size'] = val.size;
			} else {
				if (this.imageFile.size <= 2000000) {
					imageVal['image'] = this.localCompressedURl;
					imageVal['size'] = this.imageFile.size;
				} else {
					toastr.error('File too large even after compression');
				}
			}
			const formData: any = {
				name: val.name,
				size: val.size,
				type: val.type,
				image: image
			};
			this.appService
				.httpPost('receiptHandler', formData, 'scanForDuplicateReceipt')
				.subscribe((datadup) => {
					// showLoader();
					if (datadup.content.status === 'success') {
						this.appService
							.httpPost('receiptHandler', imageVal, 'insertReceipt')
							.subscribe((data) => {
								// hideLoader();
								if (data.content.error !== true) {
									let objVal = {
										receiptid: data.content.receiptId,
										tempUrl: data.content.url,
										name: data.content.name,
										type: data.content.type
									};
									this.receiptVal.unshift(objVal);
									this.closeWorkFlow = true;
									this.showImageContainer = true;
								}
							});
					}
					// else {
					// 	hideLoader();
					// }
				});
		});
	}
	/**
   * service for list receipt
   */
	public service(val: any) {
		var fileName: any;
		this.file = (<HTMLInputElement>event.target).files[0];
		fileName = this.file['name'];
		var reader = new FileReader();
		reader.onload = (event: any) => {
			this.localUrl = event.target.result;
			this.compressFile(this.localUrl, fileName, val);
		};
		reader.readAsDataURL((<HTMLInputElement>event.target).files[0]);
	}
	/**
   * function for delete receipt alert call
   */
	public deleteImage(index: number, receiptid: number) {
		this.alertModal = true;
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
		this.imageCatDelete = {
			imgIndex: index,
			receipt: receiptid
		};
	}
	/**
   * function for alert action image Delete
   */
	public imageDelete(val: any): void {
		this.alertModal = false;
		if (val.flag === true) {
			this.appService
				.httpPost('receiptHandler', { receiptId: this.imageCatDelete.receipt }, 'deleteReceipt')
				.subscribe((data) => {
					if (data.content.status === 'success') {
						this.receiptVal = [];
						this.receiptList();
					}
				});
		}
	}
	/**
   * editVault function
   */
	public editVault(expenseid: number, url: string, id: number, type: string): void {
		if (expenseid === undefined) {
			this.loader = true;
			this.scanContainer = true;
			this.imageUploadContainer = false;
			this.scanUrl = {
				path: url,
				receiptId: id,
				type: type
			};
			this.responseData = [];
		} else {
			this.appService.httpPost('expenseValut', { expenseId: expenseid }, 'editSavedExpense', 'false').subscribe((data) => {
				this.loader = true;
				this.responseData = data.content;
				this.scanContainer = true;
				this.imageUploadContainer = false;
				this.scanUrl = {
					path: url,
					receiptId: id,
					type: type
				};
			});
		}
	}
	// image preview
	public imagePreview(url: string, type: string) {
		this.imageUrl = url + '.' + type;
		this.showModal = true;
	}
	//close image preview
	public closePreview(data: any) {
		this.alertModal = false;
		this.showModal = data;
	}
	//output value
	public getFormValue(_data: any) {
		this.scanContainer = false;
		this.imageUploadContainer = true;
		this.loader = false;
		this.responseData = {};
	}
	//get image responce
	public getimageResponse(_data: any) {
		this.scanContainer = false;
		this.imageUploadContainer = true;
		this.receiptVal = [];
		this.receiptList();
	}
	/**
   * mobile view to redirect home page
   */
	public redirectHome() {
		this.router.navigate([ './' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.dashboard ]);
	}
	//open create report
	public openReport(val: string) {
		this.createReport = true;
		$('.cls-opacity').addClass('fn-opacity');
		if (val === 'Existing') {
			this.reportTitle = 'Select Existing Report';
			this.ExistingReport = true;
		} else {
			this.reportTitle = 'Create New Report';
			this.ExistingReport = false;
		}
	}
	//close create report
	public closeReport(val: string = '') {
		this.reportForm.reset();
		if (val == 'mobile') {
			$('.cls-create-report-container').addClass('cls-close-ani');
			$('.cls-opacity').removeClass('fn-opacity');
			setTimeout(() => {
				this.createReport = false;
				$('.cls-create-report-container').removeClass('cls-close-ani');
			}, 400);
		} else {
			this.createReport = false;
			$('.cls-opacity').removeClass('fn-opacity');
		}
	}
	/**
 * Desc : getReportValue
 */
	public getReportValue(index: number): void {
		this.choosedReport = this.reportExist.content[index];
		$('.cls-reports-strip').removeClass('active');
		$('.cls-reportactive' + index).addClass('active');
	}
	/**
 * string validation
 */
	public stringValidation(event: any) {
		const strOnly = /^[A-Za-z ]+$/;
		let inputChar = String.fromCharCode(event.charCode);
		if (!strOnly.test(inputChar)) {
			event.preventDefault();
		}
	}
	/**
   * save and add to existing report function
   */
	public saveExpense(type: any) {
		if (type === 'new') {
			if (this.reportForm.valid) {
				if (this.reportName.includes(this.reportForm.controls.reportname.value)) {
					toastr.error("Report name already exist");
				}
				else{
					this.receiptVal.map((data: any) => {
						if (data.details != undefined) {
							if (data.details.checked === 'Y') {
								let dataVal = {
									expenseId: data.details.expenseId,
									receiptId: data.receiptid,
									currencyAmount: data.details.currencyAmount,
									currency: data.details.currency
								};
								this.expenseDetails.push(dataVal);
							}
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
								reportObj[staticData] = this.reportForm.value[staticData];
							});
							dynamicField.map((dynamicData: any) => {
								//console.log.log(dynamicData);
								//console.log.log(this.reportForm.value[dynamicData]);
								reportObj['reportCustomData'] = {};
								if (this.reportForm.value[dynamicData]) {
									reportObj['reportCustomData'][dynamicData] = this.reportForm.value[dynamicData];
								}
							});
							this.multiReceipt = {
								reportDetails: reportObj,
								expenseDetails: this.expenseDetails
							};
						}
					});
					this.appService
					.httpPost('expenseValut', this.multiReceipt, 'saveMultipleExpenseReceipts','',true)
					.subscribe((data) => {
						//console.log.log(data, 'res');
						const val = { reportname: data.content.reportname, reportCode: data.content.reportCode };
						this.router.navigate([ './' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.createExpense ], {
							state: {
								reportid: val,
								path: 'user'
							}
						});
					});
				}
			}
			else{
				this.submitted = true;
			}
		} else if (type === 'existing') {
			this.receiptVal.map((data: any) => {
				if (data.details != undefined) {
					if (data.details.checked === 'Y') {
						//console.log.log(data);
						let dataVal = {
							expenseId: data.details.expenseId,
							receiptId: data.receiptid,
							currencyAmount: data.details.currencyAmount,
							currency: data.details.currency
						};
						this.expenseDetails.push(dataVal);
					}
					this.multiReceipt = {
						reportDetails: {
							reportName: this.choosedReport.reportname,
							description: this.choosedReport.description,
							reportCode: this.choosedReport.reportCode,
							reportId: this.choosedReport.reportId
						},
						expenseDetails: this.expenseDetails
					};
				}
			});
			// console.log(this.multiReceipt, 'formdata');
			this.appService
				.httpPost('expenseValut', this.multiReceipt, 'saveMultipleExpenseReceipts','',true)
				.subscribe((data) => {
					// console.log(data,data.content.reportname, data.content.reportCode, 'res');
					if(data.content){
						const val = { "reportname": data.content.reportname, "reportCode": data.content.reportCode };
						this.router.navigate([ './' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.createExpense ], {
							state: {
								reportid: val,
								path: 'user'
							}
						});
					}
				});
		}
	}
	/**
   * select receipt
   */
	public selectReceipt(index: number) {
		//console.log.log(index);
		if (this.receiptVal[index].details.checked === 'N') {
			this.receiptVal[index].details.checked = 'Y';
			this.tempArr.push(this.receiptVal[index].details.checked);
			//console.log.log(this.tempArr);
			if (this.tempArr.length > 0) {
				this.multipleselect = true;
			}
		} else {
			this.receiptVal[index].details.checked = 'N';
			this.tempArr.splice(0, 1);
			//console.log.log(this.tempArr);
			if (this.tempArr.length == 0) {
				this.multipleselect = false;
			}
		}
	}
	/**
   * validation
   */
	get validation() {
		return this.reportForm.controls;
	}
	/**
	 * downoad image
	 */
	 public downloadImage(path: any,name:any,extension:any) {
		// console.log(this.receiptVal);
		// console.log(path,name,extension)
		let imagePath;
		if(extension === 'application/pdf'){
			imagePath = path;
		}
		else{
			imagePath = path + '.' + extension;
		}
		this.appService.httpPost('receiptHandler', { path: imagePath ,name : name}, 'downloadReceipt', '').subscribe((data) => {
			// console.log(data);
			if(data?.content){
				let imageFile;
				const encodeImage = data.content.encodeImage;
				const imageName = data.content.name;
				if(extension === 'application/pdf'){
					imageFile = 'data:application/pdf;base64,' + encodeImage;
				}
				else{
					imageFile = 'data:image/' + extension +';base64,' + encodeImage;
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
	  * Des: pdf Sanitzer 
	  */
	public sanitizePdfUrl(src:any) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(src);
	}
}
