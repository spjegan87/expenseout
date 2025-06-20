import { Component } from '@angular/core';
import { ValidationService } from '../../../core-module/services/validation.service';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { AppService } from '../../../core-module/services/app.service';
import { config } from '../../../core-module/config/app';
declare var toastr: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent{

  constructor(private validation: ValidationService,private appService: AppService) {}
  /**
   * DEsc : form group
   */
  public resetForm: FormGroup = new FormGroup({
    newPassword: new FormControl("", [Validators.required]),
    oldPassword: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required])
  });
  /**
   * error
   */
  public error : boolean = false;
  /**
   * Desc: variable to store the text value exist
   */
  public className: string = '';
  /**
   * Desc: submitted
   */
  public submitted: boolean = false;
  /**
   * Author:Padma Priya C.K.
   * Desc: Password strength function
   */
  public passwordStrength(): boolean {
    this.className = this.validation.passwordStrength(this.resetForm.controls.newPassword.value);
    return true;
  }
  /**
   * confirmPass
   */
  public confirmPass() : void{
    if(this.resetForm.controls['confirmPassword'].value !== this.resetForm.controls['newPassword'].value){
      this.error = true;
    } else{
      this.error= false;
    }
  }
  /**
   * updatePassword
   */
  public updatePassword(type:string) : void {
    if(type === 'update'){
      if(this.resetForm.valid){
        const formData : any = this.resetForm.value;
        formData['userId'] = config.CORPORATE_ID;
        if(!this.error && this.className === 'success'){
          this.appService.httpPost('changePassword', formData , 'changePassword').subscribe((_data) => {
          });
        }
        else{
          toastr.error('Please give strong password');
        }
      }
      else{
        toastr.error('Enter mandatory fields');
        this.submitted = true;
      }
    }
    else{
      this.resetForm.reset();
      this.resetForm.controls['newPassword'].setValue('');
    }
  }
  /**
   * valdation
   */
   get formValidation() {
    return this.resetForm.controls;
  }
}
