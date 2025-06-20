import { Component, OnInit,Output,EventEmitter } from '@angular/core';
declare var $ : any;
@Component({
  selector: 'app-profileimage',
  templateUrl: './profileimage.component.html',
  styleUrls: ['./profileimage.component.scss']
})
export class ProfileimageComponent implements OnInit {
  /**
   * close animation flag
   */
  public toClose : boolean = false;
  /**
   * static image
   */
  public staticImage : any = [];
  /**
   * output data
   */
  @Output() public choosedVal: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    $('body').css("overflow", "hidden");
    // this.staticImage = [
    //   {
    //     img : '../../../../assets/images/staticProfileImage/profile_one.svg'
    //   },
    //   {
    //     img : '../../../../assets/images/staticProfileImage/profile_two.svg'
    //   },
    //   {
    //     img : '../../../../assets/images/staticProfileImage/profile_three.svg'
    //   },
    //   {
    //     img : '../../../../assets/images/staticProfileImage/profile_four.svg'
    //   },
    //   {
    //     img : '../../../../assets/images/staticProfileImage/profile_five.svg'
    //   },
    //   {
    //     img : '../../../../assets/images/staticProfileImage/profile_six.svg'
    //   },
    //   {
    //     img : '../../../../assets/images/staticProfileImage/profile_seven.svg'
    //   },
    //   {
    //     img : '../../../../assets/images/staticProfileImage/profile_eight.svg'
    //   },
    //   {
    //     img : '../../../../assets/images/staticProfileImage/profile_nine.svg'
    //   },
    //   {
    //     img : '../../../../assets/images/staticProfileImage/profile_ten.svg'
    //   },
    //   {
    //     img : '../../../../assets/images/staticProfileImage/profile_eleven.svg'
    //   },
    //   {
    //     img : '../../../../assets/images/staticProfileImage/profile_twelve.svg'
    //   }
    // ];
  }
  //close modal
  public closeModal(val: boolean) : void {
    this.toClose = true;
    $('body').css("overflow", "auto");
    setTimeout(() => {
      this.choosedVal.emit(val);
    }, 400);
  }
}
