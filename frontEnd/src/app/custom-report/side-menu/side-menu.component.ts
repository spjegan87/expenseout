import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
// *************************************************

//  * Component Name------- side menu
//  * HTML & CSS -------------- Naveen.s
//  * Created date -------------- 26-Feb-2020
//  * Powered by --------------- Infiniti software solutions

// *************************************************
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input() menu:any[] = [];
  @Output() currentMenu = new EventEmitter();
  @Output() listReport = new EventEmitter();
  public clickedIndex:number = 0;
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    console.log(this.menu) 
  }
  public selectMenu(i:number,key:string,name:string){
    console.log(i,key)
    this.clickedIndex = i;
    this.currentMenu.emit(key);
    let objVal: any ={
      value:name,
      key:key
    }
    this.listReport.emit(objVal);
  }

}
