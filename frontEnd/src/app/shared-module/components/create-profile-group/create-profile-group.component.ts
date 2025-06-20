import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../../../core-module/services/app.service';
declare var $: any;
declare var toastr: any;
declare function showLoader(): any;
// declare function hideLoader(): any;
/**
 * Author : PadmaPriya CK 
 * Desc :  profile group
 */
@Component({
  selector: 'app-create-profile-group',
  templateUrl: './create-profile-group.component.html',
  styleUrls: ['./create-profile-group.component.scss']
})
export class CreateProfileGroupComponent implements OnChanges {

  constructor(private fb: FormBuilder, private appService: AppService) { }
  /**
   * close profilegroup
   */
  @Output() public closeProfileGroup: EventEmitter<boolean> = new EventEmitter();
  /**
   * input editresponse
   */
  @Input() public editResponse: object = {};
  /**
   * close profilegroup
   */
  @Output() public createdGroup: EventEmitter<any> = new EventEmitter();
   /**
   * To send list create / update response status to settings component
   */
  @Output() public emitListStatus = new EventEmitter();
  /**
 * Dropdown data
 */
  public dropdownArray: any = {};
  /**
   * user criteria
   */
  public userCriteria: any = {};
  /**
   * DEsc : form group
   */
  public policyForm: FormGroup = this.fb.group({
    profileName: new FormControl('', Validators.required),
    // designationCode:new FormControl('')
  });
  /**
   * ngOninit
   */
  public ngOnChanges(): void {
    console.log(this.editResponse,this.editResponse != undefined,this.editResponse == undefined)
    this.appService.httpPost('userSettings', {}, 'getDropDownList', 'false').subscribe((data) => {
      this.dropdownArray = data.content;
      console.log(this.dropdownArray)
      let userCriteriaVal: any = ['costCenterCode', 'departmentCode', 'designationCode', 'profitCenterCode', 'gradeCode','siteCode'];
      userCriteriaVal.map((data: any) => {
        this.userCriteria[data] = [];
        setTimeout(() => {
          $('#' + data).select2({
            placeholder: "Select"
          })
        }, 10)
      });
      // if (this.editResponse['type'] === 'edit') {
        this.policyForm.controls['profileName'].setValue(this.editResponse['profileName']);
        for (let key of Object.keys(this.editResponse)) {
          if (key === 'profileGroupJson') {
            for (let criteria of Object.keys(this.editResponse[key])) {
              if (this.editResponse[key][criteria].length >= 1) {
                this.editResponse[key][criteria].map((criteriaVal: any) => {
                  this.userCriteria[criteria].push(criteriaVal);
                })
                setTimeout(() => {
                  $('#' + criteria).select2({
                    multiple: true,
                    placeholder: "All"
                  });
                  $('#' + criteria).val(this.userCriteria[criteria]).select2();
                }, 1);
              }
            }
          }
        }
      // }
    });
  }
  /**
   * selectAll
   */
  public selectAll(id: string): void {
    this.userCriteria[id] = [];
    if ($('#ip-' + id).prop('checked')) {
      this.dropdownArray[id].map((data: any) => {
        this.userCriteria[id].push(data.id);
      })
      $('#' + id).val(this.userCriteria[id]).select2();
    } 
    else {
      $('#' + id).val(this.userCriteria[id]).select2();
      $('#' + id).select2({
        placeholder: "Select"
      })
    }
    // public onSelectAll() {
    //   const selected = this.dropdownArray[id].map(item => item.id);
    //   this.policyForm.get(id).patchValue(selected);
    // }
  }
  /**
   * profile group
   */
  public profileGroupCreate(type: string): void {
    // showLoader();
    console.log(type);
    setTimeout(() => {
      this.createCall(type);
    }, 200);
  }
  /**
   * to call profil group create
   */
  public createCall(type: string) {
    let userCriteriaVal: any = ['costCenterCode', 'departmentCode', 'designationCode', 'profitCenterCode', 'gradeCode','siteCode'];
    console.log(userCriteriaVal,this.userCriteria,"1");
    userCriteriaVal.map((indexName: any) => {
      console.log(userCriteriaVal[indexName],this.userCriteria[indexName],"2");
      this.userCriteria[indexName] = [];
      console.log(userCriteriaVal[indexName],this.userCriteria[indexName],"3");
      $('#' + indexName).select2('data').map((index: any) => {
        this.userCriteria[indexName].push(index.text);
      })
      this.userCriteria[indexName].map((data: any, i: number) => {
        this.dropdownArray[indexName].map((dropdown: any) => {
          if (data === dropdown.text) {  // if (data === dropdown.name) {
            this.userCriteria[indexName][i] = dropdown.id;     //dropdown.value
          }
        });
      })
    })
    // this.userCriteria['designationCode'].length === 0
    if (this.policyForm.controls['profileName'].value === '') {
      toastr.error('Enter mandatory fields');
    } else {
      // let formData : any ={
      //   'userCriteria' : this.userCriteria,
      //   'policyId' :0,
      //   'profileName' : this.policyForm.controls['profileName'].value
      // }
      let groupData: any = {
        'profileName': this.policyForm.controls['profileName'].value,
        'profileGroup': this.userCriteria,
        'status': '1'
      }
      let actionName = '';
      let moduleName = 'profileGroupMaster';
      if (type === 'create') {
        actionName = 'insertProfileGroupMapping';
      } else if (type === 'update') {
        actionName = 'updateProfileGroupMapping';
        groupData['profileGroupId'] = this.editResponse['profileGroupId'];
      }
      this.appService.httpPost(moduleName, groupData, actionName, 'false', true).subscribe((data) => {
        this.emitListStatus.emit(data.content);
        // if (data.content.status === 'success') {
        //   this.createdGroup.emit({ 'tableId': 'profileGroupTable', 'tabDataIndex': 1 });
        // }
        // this.createdGroup.emit({'tableId' :'profileGroup','tabDataIndex' : 1});
      });
    }
  }
  /**
   * redirectList
   */
  public redirectList(): void {
    // this.createdGroup.emit({ 'tableId': 'profileGroupTable', 'tabDataIndex': 1 });
    this.createdGroup.emit(false);
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
}
