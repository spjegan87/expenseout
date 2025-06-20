import { Component,Input} from '@angular/core';
/**
 * Author : Padma Priya
 * Desc :  breadcrumb
 */
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  /**
   * Desc:for breadcrumb input
   */
  @Input() public activeBreadcrumb: any = [];
}
