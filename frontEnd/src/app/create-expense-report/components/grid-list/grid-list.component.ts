import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { AppService } from '../../../core-module/services/app.service';
declare var $ : any;
/**
 * Author: Padma Priya CK
 * Powered by : Infiniti software solutions
 * Desc: grid ,list view report saved data 
 */
@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit {
  constructor(private appService: AppService){}
/**
 * gridview 
 */
@Input() public gridview : string = "";
/**
 * depth view
 */
 @Input() public depthViewData : any ;
/**
 * Desc: Output event emitter
 */
@Output() public editFlag : EventEmitter<any> = new EventEmitter();
/**
 * selectedval
 */
@Output() public selectedval : EventEmitter<string> = new EventEmitter();
/**
 * alertShow
 */
public alertShow: boolean = false;
/**
 * Desc : History Input
 */
public historyInput : any =[];
/**
 * history
 */
public historyFlag: boolean = false;
/**
 * alertContent
 */
public alertContent : any ={};
/**
 * Desc : delete val
 */
public deleteVal : any = {};
/**
 * sample json data 
 */
@Input() public gridlistData : any = {};
/**
 * open receipt popup flag
 */
public receiptContainer: boolean = false;
  /**
 * Desc: on closing alert add class close design 
 */
  public toClose: boolean = false;
  /**
   * image array
   */
  public imageArray: any = [];
/**
 * expand allflag
 */
public activeExpand: boolean = false;
public ngOnInit() : void {
  // console.log(this.gridlistData,"sadsad")
}
ngOnChanges(){
  // console.log(this.depthViewData)
  $(function () {
    $('[data-toggle="popover-hover"]').popover({
      trigger: 'hover',
    })
  })
}
/**
 * Toggle Bar
 */
public toggleBar(mode : string,id:string, type: string,count:number,event:Event) : void{
  event.stopPropagation();
  // console.log(mode,id,type,count)
  // $('.cls-field').addClass('mt-5');
  this.editFlag.emit({'mode':mode,'id':id,'type':type,'count':count});
}
/**
 * Desc : delete
 */
public delete(mode: string,id:string,event:Event) : void {
  event.stopPropagation()
  // console.log(mode,id);
  this.deleteVal = {
    mode:mode,
    id:id
  };
  this.alertShow = true;
  this.alertContent = {
    title : "Are you sure want to delete ?",
   button: [
    {
      label : 'No',
      status: false
    }, {
      label : 'Yes',
      status: true
    }
  ]
  };
}
// alertAction
public alertAction(val: any) : void {
  // console.log(val);
  if(val.flag === true){
    this.selectedval.emit(this.deleteVal);
  }
  this.alertShow = false;
}
/**
 * showModal
 */
public history(val: string,event:Event) : void {
  event.stopPropagation()
  //console.log(val);
  this.appService.httpPost('expenseHistory', {"reportId":this.gridlistData.reportId,"categoryId" : val}, 'fetchExpenseHistory','false').subscribe((data) => {
    //console.log(data.content,val);
    this.historyInput = {
      data : data.content,
      type : 'expense'
    };
  });
  this.historyFlag = true;
}
/**
 * close modal
 */
public historyClose(val : boolean) : void {
  this.historyFlag = val;
}
/**
 *openCategory
 */
public openCategory(index:number) : void {
  // console.log(index)
  $('.cls-close'+index).removeClass('d-none');
  $('.cls-more'+index).addClass('d-none');
}
/**
 * cls-remaining
 */
public removeCategory(index:number) : void {
  $('.cls-close'+index).addClass('d-none');
  $('.cls-more'+index).removeClass('d-none');
}
/**
 * open receipt
 */
public openReceipt(index:number){
  this.receiptContainer = true;
  this.imageArray = [];
  $('body').addClass('cls-body-hidden');
  // console.log(index,this.depthViewData.reportContentList.data[index].listIndex);
  this.depthViewData.reportContentList.data[index].listIndex.map((data:any)=>{
    // console.log(data);
    if(data.type === 'attach' && data.value != ""){
        data.value.map((val:any)=>{
          if(val.type === 'pdf'){
            val.type = 'application/pdf'
          }
        })
      this.imageArray = data.value
    }
  });
  setTimeout (() => {
    $('.cls-zoom').zoom({ on:'grab' });
  },100);
  // console.log(this.imageArray);
}
/**
 * cose receipt popup
 * 
 */
public closeModal(){
  this.toClose = true;
  $('body').removeClass('cls-body-hidden');
  setTimeout(()=>{
    this.receiptContainer = false;
    this.toClose = false;
  },600);
}
/**
 * open toggle
 */
public openToggle(index:number){
  $('#fn-inner-list-head'+index).toggleClass('cls-toggle-bar');
  $('#fn-boxshadow'+index).toggleClass('cls-box-shadow');
}
/**
 * open all collapse
 */
public openAllToggle(){
  // $('.cls-inner-list-head').toggleClass('cls-toggle-bar');
  // $('.collapse').toggleClass('show');
  // $('.cls-boxshadow').toggleClass('cls-box-shadow');
  this.activeExpand = !this.activeExpand
  $('.collapse').collapse('toggle');
}
/**
 * Des:click to view 
 */
 viewItem(mode : string,id:string, type: string,count:number,event:Event){
      this.toggleBar(mode,id, type,count,event) 
 }
}
