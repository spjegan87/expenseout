import { Component,Input } from '@angular/core';
/**
 * Author : Padma Priya CK,Naveen
 * Desc :  widget
 */
@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent {
  /**
   * Input widget
   */
  @Input() public widgetStatus: any = [];
  /**
   * popupVal
   */
  public popupVal : any = {
    'flag' : false,
    'module' :'',
    'value' :{}
    };
  	/**
	 * popUpInfo
	 */
	public popUpInfo(_val: any) : void{
		// console.log(val);
		this.popupVal = {
		'flag' : false,
		'module' : '',
		'value' :{}
		}
	}
	/**
	 * showUserInfo
	 */
	public showUserInfo(email: string) : void {
		this.popupVal = {
			'flag' : true,
			'module' : 'userSettings',
			'value' : {
				'value' :{
					'emailId' : email
				},
				"module": "userSettings",
				"action": "getUserDescription"
			}
		  }
	}

}
