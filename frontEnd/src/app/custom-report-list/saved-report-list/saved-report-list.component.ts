import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { urlConfig } from '../../core-module/config/url';
// *************************************************

//  * Component Name------- saved Report list
//  * HTML & CSS -------------- Naveen.s
//  * Created date -------------- 04-Feb-2021
//  * Powered by --------------- Infiniti software solutions

// *************************************************
@Component({
  selector: 'app-saved-report-list',
  templateUrl: './saved-report-list.component.html',
  styleUrls: ['./saved-report-list.component.scss']
})
export class SavedReportListComponent implements OnInit {
  /**
   * side menu
   */
  public sideMenu: any = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.sideMenu =[
      {key: "groupRequest", name: "Group Request"},
      {key: "standardReport", name: "Standard Report"},
      {key: "registeredAgents", name: "Registered Agents"},
      {key: "fareOverrideReport", name: "Fare Override Report"},
    ];
  }
  /**
   * create report
   */
  public createReport(){
    this.router.navigate( [
      './' +
      urlConfig.ROUTES.home +
      '/' +
      urlConfig.ROUTES.customReport
    ]);
  }
    /**
   * list data
   */
  public listReportData(val:any){
    console.log(val);
  }
}
