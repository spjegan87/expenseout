import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../../core-module/services/app.service';
import { Router } from '@angular/router';
import { urlConfig } from '../../../core-module/config/url';
declare var toastr : any;
declare var $: any;
@Component({
	selector: 'app-formdata',
	templateUrl: './formdata.component.html',
	styleUrls: [ './formdata.component.scss' ]
})
export class FormdataComponent {
	constructor(private appService: AppService,private router: Router) {}
	/**
   * profile form
   */
	@Output() public profileFormVal: EventEmitter<any> = new EventEmitter();
	/**
   * empDetResponse
   */
	@Input() public empDetResponse: any = {};
  /**
   * Desc : profile group
   */
  public profileGroupList: any ;
	/**
   * formType
   */
  @Input() public formType: string = '';
  /**
   * emp details
   */
  @Output() public empDetails: EventEmitter<any> = new EventEmitter();
	/**
   * validation
   */
	public submitted = false;
	/**
   * DEsc : form group
   **/
	public profileForm: FormGroup = new FormGroup({
		employeeCode: new FormControl('', Validators.required),
		groupId: new FormControl('', Validators.required),
		profileGroupId : new FormControl(''),
		profileGroupName :  new FormControl(''),
		designationCode: new FormControl('', Validators.required),
		departmentCode: new FormControl(''),
		branchCode: new FormControl(''),
		gradeCode: new FormControl(''),
		profitCenterCode: new FormControl(''),
		costCenterCode: new FormControl(''),
		title: new FormControl('Mr.'),
		firstName: new FormControl('', [ Validators.required, Validators.pattern(/^([a-zA-Z]+\s?)*$/) ]),
		// middleName: new FormControl(""),
		lastName: new FormControl('', Validators.required),
		mobile: new FormControl('', [ Validators.required, Validators.min(1111111111), Validators.max(999999999999999), Validators.pattern(/^[1-9][0-9]*$/) ]),
		mobileCode: new FormControl('+91'),
		country: new FormControl('India',Validators.required),
		email: new FormControl('', [
			Validators.required,
			Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)
		])
	});
	/**
   * Desc: dropdownvalue
   */
	@Input() public dropdownArray: any = [];
	/**
   * history type
   */
	 public profileType: any = {};
	/**
   * OnInit
   */
	public ngOnInit(): void {
		this.profileType = JSON.parse(localStorage.getItem('userDetails'));
		this.appService.httpPost('profileGroupMaster', {}, 'getProfileGroups','false').subscribe((data) => {
			this.profileGroupList = data.content;
			//console.log(this.profileGroupList);
		});
		//console.log(this.empDetResponse);
		if (Object.keys(this.empDetResponse).length >= 1) {
			const data: any = this.empDetResponse;
			// console.log(Object.keys(data).length)
			for (let key of Object.keys(data)) {
				// console.log(key,this.profileForm.controls,this.empDetResponse);
				if (this.profileForm.controls[key]) {
					let arrayObj = [
						'groupId',
						'designationCode',
						'departmentCode',
						'branchCode',
						'profitCenterCode',
						'costCenterCode',
						'gradeCode'
					];
					// console.log(arrayObj.includes(key))
					if (arrayObj.includes(key)) {
						// arrayObj.map((dataVal: any) =>{
						//console.log(this.empDetResponse[key], 'ssas');
						if (this.empDetResponse[key] !== '') {
							this.dropdownArray[key].map((data: any) => {
								//console.log(data, index, 'np', this.empDetResponse[key]);
								if (this.empDetResponse[key] === data.value) {
									this.profileForm.controls[key].setValue(data.name);
									//console.log(this.profileForm, 'huhhu');
								}
							});
						}
						// });
					} else {
						this.profileForm.controls[key].setValue(this.empDetResponse[key]);
						//console.log(this.profileForm.value);
					}
				}
			}
		}
	}
	/**
	 * removeClass
	 */
	public removeClass() : void {
		// setTimeout(()=>{
			$('.cls-email').removeClass('cls-border-error');
		// },1)
	}
	/**
   * string validation
   */
	public stringValidation(event: any) {
		//console.log(event);
		const strOnly = /^[A-Za-z ]+$/;
		let inputChar = String.fromCharCode(event.charCode);
		if (!strOnly.test(inputChar)) {
			event.preventDefault();
		}
	}
	/**
	 * mobile number validation
	 */
	public inputValidate(event: any, value: string) {
		this.appService.inputValidator(event, value)
	  }
	/**
	 * backtoList
	 */
	public backtoList() : void {
		this.router.navigate( [
			'./' +
			urlConfig.ROUTES.home +
			'/' +
			urlConfig.ROUTES.manageprofile
		  ])	
	}
	/**
   * addApprover
   */
	requestData: any = {};
	public addApprover(type: string): void {
		//console.log(this.profileForm,"dsds");
		this.submitted = true;
		this.requestData = this.profileForm.value;
		let arrayObj = [
			'groupId',
			'designationCode',
			'departmentCode',
			'branchCode',
			'profitCenterCode',
			'costCenterCode',
			'gradeCode'
		];
		arrayObj.map((dataVal: any) => {
			//console.log(dataVal, 'ds');
			//console.log(this.requestData[dataVal]);
			//console.log(this.dropdownArray);
			if (this.profileForm.value[dataVal] !== '') {
				this.dropdownArray[dataVal].map((data: any, index: number) => {
					//console.log(this.profileForm.value[dataVal], index, data.name);
					if (this.profileForm.value[dataVal] === data.name) {
						//console.log(index);
						this.requestData[dataVal] = this.dropdownArray[dataVal][index]['value'];
					}
				});
			}
			//console.log(this.requestData);
		});
		this.profileGroupList.map((data: any)=>{
			//console.log(data);
			if(data.name === this.profileForm.controls['profileGroupId'].value){
				this.requestData['profileGroupId'] = data.id;
			}
		})
		// console.log(this.profileForm,this.profileForm.value['mobile'].length,this.requestData.mobile.length);
		if (this.profileForm.status === 'VALID' ) {
			switch (type) {
				case 'next':
					//console.log(this.requestData, 'loogss');
					this.profileFormVal.emit(this.requestData);
					break;
				case 'update':
					let formData: any = this.requestData;
					formData['userId'] = this.empDetResponse['userId'];
					formData['employeeId'] = this.empDetResponse['employeeId'];
					//console.log(formData, 'sdsds');
					this.appService.httpPost('userSettings', formData, 'updateUserSetting','',true).subscribe((data) => {
            //console.log(data, 'jkjkjcurency');
            this.empDetails.emit(data.content);
					});
					break;
				default:
					break;
			}
		}
		else{
			toastr.error('Enter mandatory fields');
		}
	}
	/**
   * validation
   */
	get validation() {
		return this.profileForm.controls;
	}
	/**
	 * special characters
	 */
	public validatespecialChar(e : any) : boolean {
		var k;
		document.all ? k = e.keyCode : k = e.which;
		return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
	}
	// Search Dropdown Function
	public searchDropdown(id: any) : void {
		//console.log(id);
		setTimeout(() => {
			$('#' + id).focus();
		}, 100);
	}
	// search filter function
	public filterFunction(aa: any, bb: any) {
		this.appService.commonSearchFilter(aa,bb);
	}
	// search filter set value function
	public setFilterValue(formcontrolName: string, value: string,id: number = null) {
		this.profileForm.controls[formcontrolName].setValue(value);
		if(value === 'select'){
			// console.log(value);
			this.profileForm.controls[formcontrolName].reset();
		}
		if(formcontrolName === 'profileGroupName'){
			this.profileForm.controls['profileGroupId'].setValue(id);
		}
		//console.log(this.profileForm);
	}
	/**
	 * to open master data and settings
	 */
	public openMasterdata(type:string){
		if(type === 'profile'){
			this.router.navigate( [
				'./' +
				urlConfig.ROUTES.home +
				'/' +
				urlConfig.ROUTES.policySettings
			]);
		}
		else if(type === 'designation'){
			this.router.navigate( [
				'./' +
				urlConfig.ROUTES.home +
				'/' +
				urlConfig.ROUTES.masterData
			]);
		}
	}
}
