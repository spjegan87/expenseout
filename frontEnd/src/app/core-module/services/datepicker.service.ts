import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
// tslint:disable-next-line: no-any
declare var $: any;
/**
 * Author: Padma Priya CK
 * Desc: datepicker service
 * Powered by : Infiniti software solutions
 */
@Injectable({
	providedIn: 'root'
})
export class DatepickerService {
	/**
   * Desc : FormGroup
   */
	public form: FormGroup = new FormGroup({});
	/**
   * Desc : set calendar function
   */
	// tslint:disable-next-line: no-any
	public setCalendar(
		field: string,
		formGroup: FormGroup,
		formId: string,
		arrayIndex: number = 0,
		mindate: string = 'null',
		maxdate: string = 'null',
		// tripStartDate: string = "null",
		// tripEndDate: string = "null",
		header: boolean = false,
		numberOfMonths: number = 1
	): boolean {
		this.form = formGroup;
		const minD: Date | null = mindate !== 'null' ? new Date(mindate) : null;
		const maxD: Date | null = maxdate !== 'null' ? new Date(maxdate) : null;
		// const fromDate: Date | null =
		//   mindate !== "null" ? new Date(tripStartDate) : null;
		// const toDate: Date | null =
		//   maxdate !== "null" ? new Date(tripEndDate) : null;
		// tslint:disable-next-line: no-any
		const comp: any = this;
		$(document).ready(() => {
			$('#' + field).datepicker({
				beforeShow: () => {
					$('.ui-datepicker').addClass('cls-infi-datepicker');
					$('.ui-datepicker-next,ui-datepicker-next').addClass('waves-effect waves-circle waves-red');
					setTimeout(() => {
						$('a.ui-state-default').attr('href', 'javascript:;')
					  }, 0); 
			
					if (header) {
						comp.setHeader(formId, arrayIndex);
					}
					return [ true, '' ];
				},
				// dayNamesMin: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ],
				dateFormat: 'yy-mm-dd',
				startDate: '-3d',
				showOtherMonths: true,
				selectOtherMonths: true,
				changeMonth: true,
				changeYear: true,
				numberOfMonths: numberOfMonths || 1,
				minDate: minD,
				maxDate: maxD,
				autoClose: false,
				// tripStartDate: fromDate,
				// tripEndDate: toDate,
				yearRange: '-20:+20',
				onSelect(date: Date): any {
					console.log(date);
					if (formGroup.controls[formId]) {
						setTimeout(() => {
						  $('#' + field).val($.datepicker.formatDate('dd, M yy', new Date(date)));
						}, 0);
					  }
					comp.form.controls[formId].setValue(date);

					switch (formId) {
						case 'airOnwardDate':
							date > formGroup.value?.airReturnDate && formGroup.controls.airReturnDate.reset();
							if (comp.form.controls['airReturnDate'] === '') {
								comp.form.controls['airReturnDate'].setValue(date);
							}
							break;
						case 'trainOnwardDate':
							date > formGroup.value?.trainReturnDate && formGroup.controls.trainReturnDate.reset();
							if (comp.form.controls['trainReturnDate'] === '') {
								comp.form.controls['trainReturnDate'].setValue(date);
							}
							break;
						case 'busOnwardDate':
							date > formGroup.value?.busReturnDate && formGroup.controls.busReturnDate.reset();
							if (comp.form.controls['busReturnDate'] === '') {
								comp.form.controls['busReturnDate'].setValue(date);
							}
							break;
						case 'hotelCheckIn':
							date > formGroup.value?.hotelCheckOut && formGroup.controls.hotelCheckOut.reset();
							if (comp.form.controls['hotelCheckOut'] === '') {
								comp.form.controls['hotelCheckOut'].setValue(date);
							}
							break;
					}
					$("#" + field).val(
						$.datepicker.formatDate("d, M yy", new Date(date))
					  );
					  document.getElementById("ui-datepicker-div").style.pointerEvents =
						"none";
					  setTimeout(() => {
						document.getElementById("ui-datepicker-div").style.pointerEvents =
						  "auto";
					  }, 1000);
				},

				onChangeMonthYear(): void {
					setTimeout(() => {
						$('a.ui-state-default').attr('href', 'javascript:;')
					  }, 0); 
					if (header) {
						comp.setHeader(formId, arrayIndex);
					}
				},
				onClose(): void {
					$('#' + field).datepicker('destroy');
				}
			});
			// setTimeout(() => {
			// if ($('#' + field).offset().top < 250) {
			// 	$('.ui-datepicker').css('top', '100px');
			// }
			// }, 100);
			var nav = $('#' + field);
			if (nav.length) {
				if (nav.offset().top < 250) {
					$('.ui-datepicker').css('top', '100px');
				}
			}
			if (formId != 'setOtherDates') {
				$('#' + field).datepicker('show');
			}
		});
		return true;
	}
	/**
   * Desc: Set headers for calendar
   */
	public setHeader(field: string, index: number): void {
		const value: string = (this.form.get('requestInfo') as FormArray).value[index][field];
		let template: string = '<div class="datepicker-header">';
		template += value
			? '<span class="date">' + $.datepicker.formatDate('d M, yy', new Date(value)) + '</span>'
			: '';
		template +=
			'<span>Book round trip for great savings</span><button type="button" class="reset-link">Reset</button></div>';
		// setTimeout(() => {
		$('#' + field + index).parents('.form-group').append($('#ui-datepicker-div'));
		if (field === 'departure' || field === 'arrival') {
			$('#ui-datepicker-div div:first').before(template);
		}
		// }, 0);
		//
	}
}
