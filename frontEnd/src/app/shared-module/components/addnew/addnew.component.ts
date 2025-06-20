import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../../core-module/services/app.service';
import { config } from '../../../core-module/config/app';
declare var toastr: any;
declare var $: any;
declare var feather: any;
/**
 * Author: Padma Priya CK.
 * Module : add new master data
 * Powered by : Infiniti software solutions
 */
@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.scss']
})
export class AddnewComponent implements OnInit, AfterViewInit {
  /**
  * typeCreate
  */
  @Input() public typeCreate: object = {};
  /**
   * output data
   */
  @Output() public choosedVal: EventEmitter<boolean> = new EventEmitter();
  /**
  * Desc: on closing alert add class close design 
  */
  public toClose: boolean = false;
  /**
   * validation
   */
  public submitted = false;
  /**
   * check name
   */
  public existMasterName: any = [];
  /**
  * Desc : form group
  */
  public createForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required)
  });
  /**
   * Edit label name
   */
  public editLabel: string = '';
    /**
   * To send list create / update response status to settings component
   */
     @Output() public emitListStatus = new EventEmitter();

  constructor(private appService: AppService) { }
  public ngAfterViewInit(): void {
    feather.replace();
  }
  ngOnInit() {
    console.log(this.typeCreate, "addnew")
    $('body').css("overflow", "hidden");
    // setTimeout(() => {
    // feather.replace();
    // }, 200);
    if (this.typeCreate['actionType'] === 'edit') {
      this.createForm.controls['name'].setValue(this.typeCreate['Name']);
      this.createForm.controls['code'].setValue(this.typeCreate['Code']);
      this.editLabel = this.capitalizeTitle(this.typeCreate['type']);
    }

    let formData: any = {
      'id': '',
      'groupName': '',
      'action': this.typeCreate['type']
    };
    if (this.typeCreate['actionType'] === 'edit') {
      formData['id'] = this.typeCreate['data_id'],
        formData['groupName'] = this.typeCreate['Name'],
        formData['action'] = this.typeCreate['type']
    }
    console.log(formData)
    this.appService.httpPost('profileMasterData', formData, 'getExistsMasterDataName', 'false').subscribe(data => {
      this.existMasterName = data.content.existsName;
    });
  }
  public capitalizeTitle(str: string) {
    console.log(str)
    let i: number, action = str.split('_');
    for (i = 0; i < action.length; i++) {
      action[i] = action[i].charAt(0).toUpperCase() + action[i].slice(1);
    }
    console.log(action, action.join(' '));
    return action.join(' ');
  }
  /**
   * special characters
   */
  public validatespecialChar(e: any): boolean {
    let k;
    document.all ? k = e.keyCode : k = e.which;
    this.codeValSet();
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
  /**
   * Code val
   */
  public codeValSet(): void {
    let code = this.createForm.controls['name'].value.replace(/\s/g, '');
    // setTimeout(()=>{
    this.createForm.controls['code'].setValue(code.toLocaleUpperCase());
    // },10)
  }
  /**
   * close modal
   */
  public closeModal(val: boolean): void {
    this.submitted = true;
    // const dataVal : any = {
    //   flag : val
    // }
    if (val === true) {
      if (this.createForm.status === 'VALID') {
        if (this.existMasterName.includes(this.createForm.controls['name'].value)) {
          toastr.error("Name is already mapped");
        }
        else {
          let formData: any = {
            "corporateId": config.CORPORATE_ID,
            "userId": config.USER_ID
          }
          formData[this.typeCreate['type'] + "Name"] = this.createForm.value['name'];
          formData[this.typeCreate['type'] + "Code"] = this.createForm.value['code'];
          if (this.typeCreate['actionType'] === 'edit') {
            formData['data_id'] = this.typeCreate['data_id'];
            formData['status'] = this.typeCreate['status'];
          } else {
            formData['status'] = "Y";
          }
          console.log(this.typeCreate['moduleName'], formData, this.typeCreate['actionName']);
          console.log( this.typeCreate);
          this.appService.httpPost(this.typeCreate['moduleName'], formData, (this.typeCreate['actionName']).replace(' ',''), '', this.typeCreate['csrf']).subscribe((data) => {
            // this.toClose = true;
            this.emitListStatus.emit(data.content);
           
            if (data.content.status === 'success') {
              this.toClose = true;
              $('#fn-background').removeClass('cls-background');
              $('body').css("overflow", "auto");
            //   // setTimeout(() => {
              this.choosedVal.emit(false);
            //   // }, 400);
            }
          });
        }
      }
    } else {
      this.toClose = true;
      $('#fn-background').removeClass('cls-background');
      $('body').css("overflow", "auto");
      // setTimeout(() => {
      this.choosedVal.emit(false);
      // }, 400);
    }
  }
  /**
   * removeError
   */
  public removeError(): void {
    if ($('#reason').val().length > 0) {
      $('#reason').removeClass('cls-error');
    }
  }
  /**
   * validation
   */
  get validation() {
    return this.createForm.controls;
  }
}
