import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from '../../../core-module/services/app.service';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
declare var toastr: any;
/**
 * Desc: city group
 * Author: Padma Priya CK
 */
@Component({
  selector: 'app-citygroup',
  templateUrl: './citygroup.component.html',
  styleUrls: ['./citygroup.component.scss']
})
export class CitygroupComponent implements OnChanges {
  constructor(private fb: FormBuilder, private appService: AppService) { }
  /**
   * formgroup
   */
  public cityForm: FormGroup = this.fb.group({
    cityGroup: this.fb.array([])
  });
  /**
   * close profilegroup
   */
  @Output() public cityGroup: EventEmitter<any> = new EventEmitter();
  /**
   * input editresponse
   */
  @Input() public editResponse: object | any;
  /**
   * existgoupname
   */
  public existGroupName: any = [];
  /**
   * aray val
   */
  public dropDownLocation: any = {
    0: ['No Results']
  };
  /**
   * City group selected
   */
  public cityGroupSelected: any = {
    0: []
  };
      /**
   * To send list create / update response status to settings component
   */
       @Output() public emitListStatus = new EventEmitter();
  /**
   * oninit
   */
  public ngOnChanges(): void {
    console.log(this.editResponse,typeof(this.editResponse), this.editResponse != undefined,this.editResponse['cityDetails'], "edit");
    ((this.cityForm as FormGroup).get('cityGroup') as FormArray).push(this.actionControl('add') as any);
    let formData: any = {
      'id': '',
      'groupName': '',
      // 'corporateId' : config.CORPORATE_ID
    };
    if (this.editResponse && this.editResponse['cityDetails'] != undefined) {
      formData['groupName'] = this.editResponse['cityDetails'].groupName;
      formData['id'] = this.editResponse['cityDetails'].cityGroupId;
    }
    this.appService.httpPost('CityGroup', formData, 'getExistsCityGroupName', 'false').subscribe(data => {
      this.existGroupName = data.content.existsName;
    });
    if (this.editResponse && this.editResponse != undefined && this.editResponse['cityDetails'] != undefined) {
      this.editResponse['cityDetails'].map((data: any, index: number) => {
        if (index !== 0) {
          ((this.cityForm as FormGroup).get('cityGroup') as FormArray).push(this.actionControl('add') as any);
        }
        this.cityGroupSelected[index] = data.city;
        console.log(this.cityGroupSelected,"cs");
        (((this.cityForm as FormGroup).controls['cityGroup'] as FormArray).controls[index] as FormGroup).addControl('cityGroupId', new FormControl('', [Validators.required]));
        (((this.cityForm as FormGroup).controls['cityGroup'] as FormArray).controls[index] as FormGroup).controls['cityGroupId'].setValue(data.cityGroupId);
        (((this.cityForm as FormGroup).controls['cityGroup'] as FormArray).controls[index] as FormGroup).controls['groupName'].setValue(data.groupName);
      })

    }
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
   * add control
   */
  public addControl(i: number): void {
    ((this.cityForm as FormGroup).get('cityGroup') as FormArray).push(this.actionControl('add') as any);
    this.cityGroupSelected[i + 1] = [];
    this.dropDownLocation[i + 1] = [];
  }
  /**
   * checkExist
   */
  public checkExist(): void {
    this.cityForm.controls['cityGroup'].value.map((data: any) => {
      if (this.existGroupName.includes(data.groupName)) {
        toastr.error('GroupName already exist');
      }
    });
  }
  /**
   * cityGroupCreate
   */
  public cityGroupCreate(actionName: string): void {
    let proceed: boolean = true;
    this.cityForm.controls['cityGroup'].value.map((data: any, index: number) => {
      data['cityGroupDetails'] = this.cityGroupSelected[index];
      if (data.cityGroupDetails.length === 0 || data.groupName === '') {
        proceed = false;
        toastr.error('Enter mandatory fields');
      }
      if (this.existGroupName.includes(data.groupName)) {
        proceed = false;
        toastr.error('GroupName already exist');
      }
    })
    if (proceed === true) {
      this.appService.httpPost('CityGroup', { "cityGroupDetails": this.cityForm.controls['cityGroup'].value }, actionName, 'false', true).subscribe(data => {
        // if (data.content.status === 'success') {
        //   this.cityGroup.emit({ 'tableId': 'cityTable', 'tabDataIndex': 4 });
        // }
        this.emitListStatus.emit(data.content);
      });
    }
  }
  /**
   * redirectList
   */
  public redirectList(): void {
    // this.cityGroup.emit({ 'tableId': 'cityTable', 'tabDataIndex': 4 });
    this.cityGroup.emit(false);
  }
  /**
   * selectCity
   */
  public selectCity(val: string, formGroupNo: number): void {
    $('.cls-drop' + formGroupNo).addClass('d-none');
    this.dropDownLocation[formGroupNo] = ['No Results'];
    this.cityGroupSelected[formGroupNo].push(val);
    (((this.cityForm as FormGroup).controls['cityGroup'] as FormArray).controls[formGroupNo] as FormGroup).controls['cityGroupDetails'].reset();
  }
  /**
   * removeSelected
   */
  public removeSelected(val: string, i: number): void {
    var index = this.cityGroupSelected[i].indexOf(val);
    if (index !== -1) {
      this.cityGroupSelected[i].splice(index, 1);
    }
  }
  /**
   * citySearch
   */
  public citySearch(controlName: string, index: number): void {
    const searchLength = (((this.cityForm as FormGroup).controls['cityGroup'] as FormArray).controls[index] as FormGroup).controls[controlName].value;
    if (searchLength.length >= 3) {
      $('.cls-drop' + index).removeClass('d-none');
      this.appService.httpPost('PlacesAutoComplete', { "inputData": searchLength }, 'placesApi', 'false').subscribe(data => {
        this.dropDownLocation[index] = data.content.response.predictions;
      });
    }
  }
  /**
   * actionControl
   */
  public actionControl(type: string, i: number = null): any {
    if (type === 'add') {
      return this.fb.group({
        groupName: new FormControl('', Validators.required),
        cityGroupDetails: new FormControl('', Validators.required)
      });
    } else {
      (this.cityForm.controls['cityGroup'] as FormArray).removeAt(i);
    }
  }
}
