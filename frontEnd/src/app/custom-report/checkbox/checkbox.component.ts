import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
// *************************************************

//  * Component Name------- checkbox
//  * HTML & CSS -------------- Naveen.s
//  * Created date -------------- 26-Feb-2020
//  * Powered by --------------- Infiniti software solutions

// *************************************************

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  /**
 * input data for checkbox
 */
@Input() public groupData: any = [];
/**
 * output data for checkbox
 */
  @Output() finalArray = new EventEmitter();
  constructor() { }
/**
 * ngOnInit
 */
  ngOnInit(): void {
    // console.log(this.groupData);
    this.selectDeselect();
  }
  /**
   * select deselect function
   */
  public selectDeselect(){
    var result = 0;
    let i = 0;
    // console.log(this.groupData);
    this.groupData.checkbox.map((data:any)=>{
      if(data.status === 'Y'){
        i++;
        // console.log(result,i)
      }
      result++;
    });
    if(result === i){
      // console.log(result,i,'kkk')
      this.groupData.status = 'Y';
    }
    else{
      this.groupData.status = 'N';
    }
  }
/**
 * select individual checkbox
 */
  public selectCheckbox(status: string, index: number | string){
    this.groupData['checkbox'][index]['status'] = (status === 'N') ? 'Y' : 'N';
    const tempArray = this.groupData['checkbox'].filter((data: any) => data.status === 'Y');
    // console.log(tempArray);
    tempArray.map((data: any) => Object.assign(data, {index: this.groupData.head}));
    // console.log(this.groupData);
    this.selectDeselect();
    this.finalArray.emit(this.groupData);
  }
/**
 * select all checkbox
 */
  public selectAll(status: string) {
    // console.log(this.groupData,this.groupData['status']);
    this.groupData['status'] = (status === 'N') ? 'Y' : 'N';
    const tempArray = (this.groupData['status'] === 'N' ? false : true) ? this.groupData['checkbox'].filter((data:any)=> data.status = 'Y') : this.groupData['checkbox'].map((data:any)=> (data.default) ? data.status = 'Y' : data.status = 'N');
    tempArray.map((data: any) => Object.assign(data, {index: this.groupData.head}));
    // console.log(this.groupData,tempArray);
    this.finalArray.emit(this.groupData);
  }
}
