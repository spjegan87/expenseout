import { Component } from '@angular/core';
/**
 * Author : Padma Priya CK
 * Desc :  network error
 */
@Component({
  selector: 'app-network-error',
  templateUrl: './network-error.component.html',
  styleUrls: ['./network-error.component.scss']
})
export class NetworkErrorComponent  {
 /**
  * Desc : Reload page
  */
  public reload() {
    window.location.reload();
  }
}
