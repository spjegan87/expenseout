import { Component, OnChanges,Input,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { AppService } from '../../../core-module/services/app.service';
declare var toastr : any;
declare var $ : any;
// declare var feather: any;
/**
 * Author : PadmaPriya CK 
 * Desc :  category
 */
@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.component.html',
  styleUrls: ['./createcategory.component.scss']
})
export class CreatecategoryComponent implements OnChanges {
  /**
   * formgroup
   */
  public category : FormGroup = new FormGroup({
    categoryName : new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z0-9]+\s?)*$/) ]),
    parentCategoryId : new FormControl(''),
    // status: new FormControl(false),
    color :new FormControl('#999')
  });
  /**
   * get image path
   */
  @Input() public userInput :any = {};
  /**
   * editcategoryVal
   */
  @Input() public editcategoryVal : any ={};
  /**
   * submit form 
   */
  public submit : boolean = true;
  /**
   * output data
   */
  @Output() public choosedVal: EventEmitter<boolean> = new EventEmitter();
  /**
   * Desc: on closing alert add class close design 
   */
  public toClose: boolean = false;
  /**
   * desc : parent category
   */
  public parentCategory : any = {};
  /**
   * check exist
   */
  public existCategoryName : any = [];
  /**
   * To send list create / update response status to settings component
   */
  @Output() public emitListStatus = new EventEmitter();
  /**
   * Desc : constructor
   * @param appService : service http cal
   */
  constructor(private appService: AppService) {}
  /**
   * Ngoninit
   */
  public ngOnChanges() : void { 
    console.log(this.editcategoryVal,"edit");
    $('body').css("overflow", "hidden");
    this.appService.httpPost('formCategoryJson', {}, 'fetchRecords','false').subscribe((data) => {
      console.log(data.content,"Sasas");
      this.parentCategory = data.content.fieldsJson[0].parentcategory;
    });
    if(Object.keys(this.editcategoryVal).length >= 1){
      const data : any =this.editcategoryVal;
      //console.log(Object.keys(data).length)
      for (let key of Object.keys(data)) {
        //console.log(key,this.category);
        if(this.category.controls[key]){
          this.category.controls[key].setValue(this.editcategoryVal[key]);
        }
      }
      //console.log(this.category.controls['parentCategoryId'].value);
      if(this.category.controls['parentCategoryId'].value === 0 || this.category.controls['parentCategoryId'].value === null){
        //console.log(this.category.controls['parentCategoryId'].value);
        this.category.controls['parentCategoryId'].setValue(this.category.controls['categoryName'].value);
      }
    }
    //console.log(this.category,"testing")
    let formData : any = {
      'id' :'',
      'groupName' :'',
    };
    this.appService.httpPost('categorySetting', formData, 'getExistsCategorySetting','false').subscribe(data => {
      //console.log(data);
      this.existCategoryName = data.content.existsName;
    });
  }
  /**
   * triggerColor
   */
  public triggerColor() : void{
    $('#colorPicker').trigger('click');
  }
  /**
   * string validation
   */
  public stringValidation(event: any) {
    //console.log(event);
    const strandNum = /^[A-Za-z0-9 ]+$/;
    let inputChar = event.key;
    if (!strandNum.test(inputChar)) {
      event.preventDefault();
    }
  }
  /**
   * Close modal
   */
  public closeModal(val: boolean,type:string = '') : void {
    //console.log(this.editcategoryVal,"sasasas")
    this.submit = true;
      // const dataVal : any = {
      //   flag : val
      // }
      let formData = this.category.value;
      formData['userId'] =0;
      formData['groupId'] =0;
      formData['icon'] ='icon-42-new';
      //console.log(this.category.status,"asasa");
      if(val === true){
        //console.log("if");
        if(this.category.status === 'VALID'){
          if(type === 'new'){
            if(this.existCategoryName.includes(this.category.controls.categoryName.value)){
              toastr.error('Category Name is already exist');
              this.submit = false;
            }
            else{
              this.appService.httpPost('categorySetting', formData, 'insertCategory','',true).subscribe((data:any) => {
                console.log(data);
                this.emitListStatus.emit(data.content);
              });
            }
          } 
          else if(type ==='update'){
            formData['categoryId'] = this.editcategoryVal['categoryId'];
            this.appService.httpPost('categorySetting', formData, 'updateCategory','',true).subscribe((data:any) => {
              console.log(data);
              this.emitListStatus.emit(data.content);
            });
          }
        } else{
          this.submit = false;
          toastr.error('Enter mandatory fields');
        }
      }
      //console.log(this.submit);
      if(this.submit === true){
        //console.log("test")
        this.toClose = true;
        // $('.cls-popup').addClass('close-ani');
        $('#fn-background').removeClass('cls-background');
        $('body').css("overflow", "auto");
        setTimeout(() => {
          this.choosedVal.emit(val);
        }, 400);
      }
  }
  /**
   * removeError
   */
  public removeError() : void {
    if($('#reason').val().length > 0 ) {
      $('#reason').removeClass('cls-error');
    }
  }
}
