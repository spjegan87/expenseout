import { Injectable } from '@angular/core';
import { AppService } from 'src/app/core-module/services/app.service';
import { FormGroup } from '@angular/forms'
// tslint:disable-next-line: no-any
declare var $: any;
/**
 * Author: Padma Priya CK
 * Desc: autocomplete service
 * Powered by : Infiniti software solutions
 */
export interface itemData {
  city?: string,
  name?: string,
}

export interface uiData {
  item?: itemData
}

@Injectable({
  providedIn: 'root'
})

export class AutocompleteService {
  /**
    * Desc: Form group to hold form values
    */
  public form: FormGroup = new FormGroup({});
  constructor(private _appService: AppService) { }
  /**
   * Desc: auto-complete method
   */
  public autoComplete(field: string, formGroup: FormGroup, formArray: boolean, formArrayValue: any, formId: string, arrayIndex: number, actionName: string): void {
    this.form = formGroup;
    return;
    $('#' + formId).autocomplete({
      appendTo: $('#' + formId).parents('.cls-auto-complete'),
      delay: 200,
      minLength: 1,
      select: (event: Event, ui: any) => {
        // if(nestedArray){
        //   console.log("hai")
        //   formArrayValue.controls[arrayIndex].controls[field].setValue(ui.item.city);
        // }
        if (formArray) {
          formArrayValue[arrayIndex].controls[field].setValue(ui.item.city);
          setTimeout(() => {
            $('#' + formId).val(ui.item.city);
          }, 0);
        } else {
          //this.form.controls[field+'ID'].setValue(ui.item.id);
          this.form.controls[field].setValue(ui.item.city);
          setTimeout(() => {
            $('#' + formId).val(ui.item.city);
          }, 0);
        }
        return event;
      },
      // tslint:disable-next-line: no-any
      source: (request: any, response: any) => {
        let results: any;
        response(results);
        if ((request.term as string).length > 0) {
          this._appService.httpPost('curlService', request.term, actionName).subscribe(data => {
            results = data.response;
            response(results);
            if (!results.length) {
              results = [{ label: 'No results' }];
            }
            response(results);
          });

        }
      }
    })
      // tslint:disable-next-line: no-any
      .data('ui-autocomplete')._renderItem = (ul: any, item: itemData) => {
        if (item.city) {
          return $('<li class=\'li\'>')
            .data('item.ui-autocomplete', item)
            .append(item.city)
            .appendTo(ul);
        }
        return $('<li class=\'li\'>')
          .data('item.ui-autocomplete', item)
          .append('<span class="data-secondary">' + item.city + '</span>')
          .appendTo(ul);
      };
  }
}
