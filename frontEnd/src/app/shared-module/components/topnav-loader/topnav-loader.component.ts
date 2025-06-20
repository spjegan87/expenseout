import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-topnav-loader',
  templateUrl: './topnav-loader.component.html',
  styleUrls: ['./topnav-loader.component.scss']
})
export class TopnavLoaderComponent implements OnChanges {

  constructor() { }
  /**
   * counter for star
   */
  public counter = Array;

  ngOnChanges(): void {
  }

}