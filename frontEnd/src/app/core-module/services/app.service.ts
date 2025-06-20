import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, retry } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { config } from './../../core-module/config/app';

declare let CryptoJS: any
declare let CryptoJSAesJson: any;

// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';

// tslint:disable-next-line: no-any
declare var $: any;
declare var toastr: any;
declare function showLoader(): any;
declare function hideLoader(): any;
// const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

/**
 * Author: Shailesh R
 * Modified By : Padma Priya CK
 * Desc: Service for the application to get data from server
 * Powered by : Infiniti software solutions
 */

@Injectable({
  providedIn: 'root'
})

export class AppService {

  reportExtension: string = '';
  alertInfo: any;
  constructor(private http: HttpClient) { }

  public requestInProgress: boolean = true;
  /**
   * Notification variable
   */
  public notification: any = 0;
  /**
   * SSO 
   */
  public SSODetails: string = '';
  /**
   * loader
   */
  public loader: string = 'false';
  /**
   * loader text
   */
  public loaderText: string = '';
  /**
  * urlData
  */
  public resetPasswordUrl: string = '';
  /**
   * lastLoginData
   */
  public lastLoginData: string = '';
  /**
   * resetPasswordType
   */
  public resetPasswordType: any;
  /**
   * Call Web service
   * param url : string
   */
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //toastr.error(errorMessage);
    return throwError(errorMessage);
  }
  // tslint:disable-next-line: no-any
  public httpPost(moduleName: string, inputData: any, actionName: string, loader: any = '', _csrfCheck: boolean = false): Observable<any> {
    const postData: object = {
      module: moduleName,
      formData: inputData,
      action: actionName
    };
    postData['csrfToken'] = _csrfCheck ? config.CSRF : '';
    if (postData['csrfToken'] == '')
      delete postData['csrfToken'];
    this.requestInProgress = true;
    setTimeout(() => {
      if (this.requestInProgress && loader === '') {
        this.loader = '';
        this.loaderText = 'Loading';
        showLoader();
      }
      else if (this.requestInProgress && loader.val === '') {
        this.loader = loader.val;
        this.loaderText = loader.text;
        showLoader();
      }
    }, 1);
    return this.http.post(environment.BACKEND_URL, postData).pipe(
      map((data: any) => {
        this.requestInProgress = false;
        if (data.content.message !== undefined) {
          if (data.content.status == 'success') {
            toastr.success(data.content.message);
          }
          else if (data.content.status == 'failure' || data.content.status == 'danger' || data.content.status == 'error') {
            toastr.error(data.content.message);
          }
          else if (data.content.status == 'info') {
            toastr.info(data.content.message);
          }
        }
        if (loader.val === '' || loader === '') {
          setTimeout(() => {
            hideLoader();
          }, 200);
        }
        // setTimeout(()=>{
        //     $('.cls-disableaction').removeClass('cls-disableaction');
        // },1000)  
        return data;
      }), retry(3), catchError(this.handleError)
    );
  }
  /**************************************************************************************
  Description: Common datepicker for all components
  Author: Shailesh.R
  Created Date: 24-September-2019
  @Input : form : Formgroup used in the component
          id : element id
          target : target element id for setting mindate and maxdate
          min,max: boolean values to enable mindate and maxdate for the datepicker.
  ***************************************************************************************/

  public customDatepicker(form: FormGroup, id: string, target: string, min: boolean, max: boolean): void {
    // tslint:disable-next-line: no-any
    const mindate: any = (min !== false && target !== '') ? new Date(form.controls[target].value) : null;
    // tslint:disable-next-line: no-any
    let maxdate: any = (max !== false && target !== '') ? new Date(form.controls[target].value) : null;
    $('#' + id).datepicker({
      beforeShow: () => {
        $('#ui-datepicker-div').addClass('default-calendar');
      },
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dateFormat: 'yy-mm-dd',
      controlType: 'select',
      minDate: mindate,
      maxDate: maxdate,
      onSelect: (value: number) => {
        form.controls[id].setValue(value);
        maxdate = null;
        maxdate = null;
      },
      onClose: () => {
        $('#' + id).datepicker('destroy');
      }
    });
    $('#' + id).datepicker('show');
  }
  /**
   * validation
   */
  public inputValidator(event: any, type: string) {
    const numbersonly = /[0-9\-\ ]/;
    const strOnly = /^[A-Za-z ]+$/;
    const inputs = /^[a-zA-Z0-9,. ]*$/
    const StrNum = /^[a-zA-Z0-9 ]*$/;
    // const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    /**String Validation */
    switch (type) {
      case 'character':
        let inputChar1 = String.fromCharCode(event.charCode);
        if (!strOnly.test(inputChar1)) {
          event.preventDefault();
        }
        break;
      case 'numbersonly':
        let inputChar2 = String.fromCharCode(event.charCode);
        if (!numbersonly.test(inputChar2)) {
          event.preventDefault();
        } else {
          if (inputChar2 == '-' || inputChar2 == ' ') {
            event.preventDefault();
          } else {
            return;
          }
        }
        break;
      case 'inputs':
        let inputChar3 = String.fromCharCode(event.charCode);
        if (!inputs.test(inputChar3)) {
          event.preventDefault();
        }
        break;
      case 'numbercharacter':
        let inputChar4 = String.fromCharCode(event.charCode);
        if (!StrNum.test(inputChar4)) {
          event.preventDefault();
        }
        break;
    }
  }
  /**
   * check script
   */
  public checkScript(form: any): boolean {
    if (Object.values(form).indexOf('<script>') > -1) {
      return false;
    } else {
      return true;
    }
  }
  /**
   * delete cookie
   */
  public deleteAllCookies(): void {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
  public dataEncryption(data: string): any {
    return window.btoa(CryptoJS.AES.encrypt(JSON.stringify(data), environment.ENCRYPTION_KEY,
      { format: CryptoJSAesJson }).toString()
    );
  }

  public dataDecrypt(data: string): any {
    return JSON.parse(CryptoJS.AES.decrypt(window.atob(data), environment.DECRYPTION_KEY,
      { format: CryptoJSAesJson }).toString(CryptoJS.enc.Utf8));
  }

  //Common list service for pagination 
  public listService(list: any, pagination: boolean = true) {
    list['currentPage'] = list['currentPage'] == undefined ? 1 : list['currentPage'];

    list['list_body'] = list['list_body'] != null ? list['list_body'] : [];

    list['totalItems'] = list['list_body'].length;

    list['default_Parms']['page'] = list['default_Parms']['page'] == 0 ? 1 : list['default_Parms']['page'];

    // list['noofPages'] = Math.ceil(list['list_body'].length / list['default_Parms']['itemsPerPage']);
    list['totalListItems'] = list['default_Parms']['count'];
    
    list['itemsPerPage'] = list['default_Parms']['itemsPerPage'];

    list['noofPages'] = Math.ceil(list['totalListItems'] / list['default_Parms']['itemsPerPage']);

    list['currentPage'] = list['currentPage'] > list['noofPages'] ? list['noofPages'] : list['currentPage'];

    list['default_Parms']['page'] = list['default_Parms']['page'] > list['noofPages'] ? list['noofPages'] : list['default_Parms']['page'];
    if (pagination == true && list['list_body'].length > list['default_Parms']['itemsPerPage'])
      list['default_data'] = list['list_body'].slice(((list['default_Parms']['page'] - 1) * list['default_Parms']['itemsPerPage']), ((list['default_Parms']['page']) * list['default_Parms']['itemsPerPage']));

    else
      list['default_data'] = list['list_body'];

    list['default_list'] = list['default_data'].length;
    return list;
  }

  // search filter function
  public commonSearchFilter(aa, bb) {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById(aa);
    filter = input.value.toUpperCase();
    ul = document.getElementById(bb);
    li = ul.getElementsByTagName('li');
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName('a')[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  }
  /**
   * triggerAction
   */
  public triggerAction(name: string): void {
    // setTimeout(() => {
    $('.cls-mob-' + name).trigger('click');
    // }, 10);
    if (name === 'theme') {
      // $('.cls-theme-box, .cls-background').addClass('d-block');
      $(".cls-background").removeClass("d-none");
      $(".cls-theme-box").addClass("open-ani");
      $("body").addClass("cls-body-hidden");
    }
  }
}
