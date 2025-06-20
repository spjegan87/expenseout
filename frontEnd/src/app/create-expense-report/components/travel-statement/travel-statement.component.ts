import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-travel-statement',
  templateUrl: './travel-statement.component.html',
  styleUrls: ['./travel-statement.component.scss']
})
export class TravelStatementComponent implements OnInit {
  /**
   * getOverallReportDetails
   */
  @Input() public getOverallReportDetails: any = [];
  /**
   * file name
   */
  public TravelExpenseStatement: any;
  constructor() { }

  public ngOnInit(): void {
  }
  /**
   * ngonchanges
   */
  public ngOnChanges() {
    let val = this.getOverallReportDetails.fileName;
    this.TravelExpenseStatement = val.reportCode + '_' + val.fileName + '_' + val.randomNumber;
  }

  public categoryAmountSum(innerVal) {
    let subTotalAmount = innerVal.reduce(function (acc, obj) { return parseInt(acc) + parseInt(obj.amount); }, 0)
    return innerVal[0].currency + ' ' + subTotalAmount;
  }
  /**
   * find array or not in html
   */
  public isArray(obj: any) {
    return Array.isArray(obj)
  }
}
