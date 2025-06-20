import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-list-loader',
  templateUrl: './list-loader.component.html',
  styleUrls: ['./list-loader.component.scss']
})
export class ListLoaderComponent implements OnChanges {

  constructor() { }
  /**
   * counter for star
   */
  public counter = Array;
  ngOnChanges(): void {
  }

}
