import { Injectable } from '@angular/core';
import { AppService } from 'src/app/core-module/services/app.service';
import { FormGroup } from '@angular/forms'
import { of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged
} from "rxjs/operators";
// tslint:disable-next-line: no-any
declare var $: any;
/**
 * Author: Padma Priya CK
 * Desc: location autocomplete service
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

export class LocationService {
  /**
    * Desc: Form group to hold form values
    */
  public form: FormGroup = new FormGroup({});
  constructor(private _appService: AppService) { }
  /**
   * Desc: auto-complete method
   */
  public autoComplete(field: string, formGroup: FormGroup, formId: string, formDataVal: any, actionName: string): void {
    // console.log(field,arrayIndex)
    this.form = formGroup;
    // return;
    $('#' + formId).autocomplete({
      appendTo: $('#' + formId).parents('.cls-auto-complete'),
      select: (event: Event, ui: any) => {
        if (ui.item.description !== 'No results') {
          // console.log(ui.item.description,"getValue")
          this.form.controls[field].setValue(ui.item.description);
          setTimeout(() => {
            $('#' + formId).val(ui.item.description);
          }, 0);
        }
        return event;
      },
      // tslint:disable-next-line: no-any
      source: (request: any, response: any) => {
        let results: any;
        response(results);
        if ((request.term as string).length > 2) {
          setTimeout(() => {
            $('#' + formId).addClass('cls-loading');
          }, 0);
          // For Debounce implementation
          of(formDataVal)
            .pipe(
              debounceTime(1500),
              distinctUntilChanged()
            ).subscribe((searchVal: string) => {
              this._appService.httpPost('PlacesAutoComplete', { "inputData": searchVal }, actionName, 'true').subscribe(data => {
                setTimeout(() => {
                  $('#' + formId).removeClass('cls-loading');
                }, 0);
                results = data.content.response.predictions;

                response(results);
                if (results.length === 0) {
                  results = [{ description: 'No results' }];
                }
                // console.log(results)
                response(results);
              });
            });
        }
      }
    })
      // tslint:disable-next-line: no-any
      .data('ui-autocomplete')._renderItem = (ul: any, item: any) => {
        if (item.description) {
          return $('<li class=\'li\'>')
            .data('item.ui-autocomplete', item)
            .append(item.description)
            .appendTo(ul);
        }
        return $('<li class=\'li\'>')
          .data('item.ui-autocomplete', item)
          .append('<span class="data-secondary">' + item.description + '</span>')
          .appendTo(ul);
      };
  }
}
