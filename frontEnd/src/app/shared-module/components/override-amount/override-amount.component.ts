import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AppService } from '../../../core-module/services/app.service';
import { config } from './../../../core-module/config/app';
declare var $ : any;
declare var toastr: any;
/**
 * Author : Naveen.s
 * Desc : override city
 */
@Component({
  selector: 'app-override-amount',
  templateUrl: './override-amount.component.html',
  styleUrls: ['./override-amount.component.scss']
})
export class OverrideAmountComponent implements OnInit {
  /**
   * Desc: on closing alert add class close design 
   */
  public toClose: boolean = false;
  /**
   * get value
   */
  @Input() public userInput :any = {};
  /**
   * Desc: submitted
   */
  public submitted : boolean = false;
    /**
   * output data
   */
  @Output() public choosedVal: EventEmitter<any> = new EventEmitter();
  /**
   * currenct variable
   */
  public currency: any = [];
  /**
   * desc : config currency
   */
  public userCurrency: string = '';
  /**
   * user criteria
   */
  public userCriteria : any = [];
   /**
   * Desc: dropdownvalue
   */
  @Input() public dropdownArray : any =[]; 
   /**
   * choosedCriteria
   */
  public choosedCriteria : any =[];
  /**
   * formgroup
   */
  public overrideForm : FormGroup = new FormGroup({});
  /**
   * constructure
   */
  constructor(private appService: AppService,private fb : FormBuilder) { }
  /**
   * oninit
   */
  ngOnInit() {
    $('body').css("overflow", "hidden");
    //console.log(this.userInput);
    this.userCurrency = config.USER_CURRENCY;
    setTimeout(()=>{
      $('#cityGroup').select2({
        placeholder: "Select"
      })
    },10)
    this.appService.httpPost('CityGroup', {}, 'getCityGroupDetails','false').subscribe((data) => {
			this.dropdownArray = data.content;
			//console.log(this.dropdownArray);
    });
    if(this.userInput.editVal[this.userInput.category]){
      this.userInput.editVal[this.userInput.category].map((data:any)=>{
        let trimedVal : string = data.cityGroupName.replace(/\s+/g, '');
        // $('#cityGroup').select2('data').map(()=>{
        //   this.choosedCriteria.push(trimedVal);
        // })
        this.choosedCriteria.push({name:trimedVal,id:data.groupId});
        //console.log(this.choosedCriteria);
        let tempArr = []
        this.choosedCriteria.map((value:any)=>{
          (this.overrideForm as FormGroup).addControl(
            [ value.name] as any,
            this.fb.group([])
          );
          tempArr.push(value.id);
          ((this.overrideForm as FormGroup).controls[value.name] as FormGroup).addControl('amount',new FormControl(data.cityAmount,[ Validators.required, Validators.pattern(/^[1-9][0-9]*$/) ]));
          ((this.overrideForm as FormGroup).controls[value.name] as FormGroup).addControl('currency',new FormControl(data.cityCurrency, [ Validators.required ]));
          //console.log(value);
          // setTimeout(()=>{
          //   $('#cityGroup').select2({
          //     placeholder: "Select",
          //     multiple : true
          //   });
          //   $('#cityGroup').val(value.id).select2();
          // },1);
        });
        //console.log(tempArr);
        setTimeout(()=>{
          $('#cityGroup').select2({
            placeholder: "Select",
            multiple : true
          });
          $('#cityGroup').val(tempArr).select2();
        },1);
      });
    }
  }
    /**
   * onchanges
   */
  public ngOnChanges() : void {
    // let choosed : any =[] ;
    $('.cls-select').on('select2:unselect', (dataVal : any)=>{
      let dataTrimmed : string = dataVal.params.data.text.replace(/\s+/g, '');
      //console.log(this.choosedCriteria,dataTrimmed);
      (this.overrideForm as FormGroup).removeControl(dataTrimmed);
      //console.log(this.overrideForm)
      this.choosedCriteria.map((value:any,i:number)=>{
        //console.log(value.name,dataTrimmed);
        var index = dataTrimmed;
        if (index === value.name) {
          this.choosedCriteria.splice(i, 1);
        }
      });
      //console.log(this.choosedCriteria);
    })
    $('.cls-select').on('select2:select', (dataVal : any)=>{
      //console.log(dataVal,"ads");
      if(dataVal.target.id === 'cityGroup'){
        let trimedVal : string = dataVal.params.data.text.replace(/\s+/g, '');
        this.choosedCriteria.push({name:trimedVal, id:dataVal.params.data.id});
        // this.choosedCriteria = choosed;
        this.choosedCriteria = this.choosedCriteria.filter( function( item, index, inputArray ) {
          return inputArray.indexOf(item) == index;
        });
        (this.overrideForm as FormGroup).addControl(
          [ trimedVal] as any,
          this.fb.group([])
        );
        ((this.overrideForm as FormGroup).controls[trimedVal] as FormGroup).addControl('amount',new FormControl('',[ Validators.required, Validators.pattern(/^[1-9][0-9]*$/) ]));
        ((this.overrideForm as FormGroup).controls[trimedVal] as FormGroup).addControl('currency',new FormControl(this.userCurrency, [ Validators.required ]));
        //console.log(this.overrideForm);
        // //console.log(choosed);
        return this.choosedCriteria;
      }
    });
  }
  /**
   * Close modal
   */
  public closeModal(val:boolean) : void {
    this.submitted = true;
    let proceed : boolean = true;
    let cityGroup = [];
    if(val === true){
      let userCriteriaVal = ['cityGroup'];
      userCriteriaVal.map((val: any)=>{
        this.userCriteria =[];
        $('#'+val).select2('data').map((index: any)=>{
          //console.log(index);
          this.userCriteria.push({name:index.text, id:index.id});
        })
      });
      //console.log(this.userCriteria);
      if(this.userCriteria.length >0){
        if(this.overrideForm.valid){
          this.userCriteria.map((data:any)=>{
            let keydata : string = data.name.replace(/\s+/g, '');
            const tempval = {
              cityGroupName : data.name,
              groupId:data.id,
              cityAmount : this.overrideForm.controls[keydata]['controls'].amount.value,
              cityCurrency : this.overrideForm.controls[keydata]['controls'].currency.value,
              cityCurrencyAmount : this.overrideForm.controls[keydata]['controls'].amount.value
            }
            cityGroup.push(tempval);
          });
          //console.log(cityGroup);
        }
        else{
          proceed = false;
        }
      }
      else{
        proceed = false;
      }
      if(proceed === true){
        this.toClose = true;
        $('#fn-background').removeClass('cls-background');
        $('body').css("overflow", "auto");
        setTimeout(() => {
          this.choosedVal.emit(cityGroup);
        }, 400);
      }
      else{
        toastr.error("Enter all mandatory fields");
        this.submitted = true;
      }
    }
    else{
      this.toClose = true;
      $('#fn-background').removeClass('cls-background');
      $('body').css("overflow", "auto");
      setTimeout(() => {
        this.choosedVal.emit(false);
      }, 400);
    }
  }
  /**
   * validation
   */
  get validation(){
    return this.overrideForm.controls;
  }
}
