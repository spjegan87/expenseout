import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
// import { AppService } from 'src/app/core-module/services/app.service';

@Component({
  selector: 'app-mileage-report-webview',
  templateUrl: './mileage-report-webview.component.html',
  styleUrls: ['./mileage-report-webview.component.scss']
})
export class MileageReportWebviewComponent implements OnChanges {
  public mileageDetails: any;
  public widgetData: any;
  @Input() public mileageWebData: any;
  @Output() public flagChet: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**
   * To find Total no.of kms
   */
  public result: number = 0;
  /**
   * Store change format date value
   */
  public resultdate: any;
  /**
   * Round off Total amount
   */
  public totalAmount: number = 0;
  /**
   * Des:preview image url
   */
  public imageUrl:string;
  /**
   * Des:show and hide the preview image model
   */
   public showModal:boolean=false;
  // constructor(private appService: AppService) { }
  constructor() { }

  ngOnChanges(): void {
    console.log(this.mileageWebData)
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log(this.mileageWebData, this.mileageWebData.reportId, this.mileageWebData.categoryList, this.mileageWebData.reportCode, "change")
    this.mileageDetails = this.mileageWebData.Mileage[0].customData.itineraryData;
    this.widgetData = this.mileageWebData.Mileage[0].customData.location;
    let date = this.mileageDetails.expanseDate;
    date = new Date(date);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.resultdate = date.getDate() + '-' + months[date.getMonth()] + '-' + date.getFullYear();
    this.result = Math.abs(this.mileageDetails.odometerEnd - this.mileageDetails.odometerStart);
    this.totalAmount = Math.round(this.mileageDetails.totalAmount);
  }

  public formClose() {
    this.flagChet.emit(true);
  }
  public previewOdometerImage(type:string):void{
    this.imageUrl = this.mileageDetails[type]
      this.showModal = true;
   }
    public closePreview(data: any) {
      this.showModal = data;
    }
}
