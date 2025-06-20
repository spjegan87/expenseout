import { Component,Input,Output,EventEmitter, AfterViewInit} from '@angular/core';
import { AppService } from '../../../core-module/services/app.service';
// declare var toastr: any;
declare var feather: any;
/**
 * Author : Padma Priya CK
 * Desc :  bulk upload
 */
@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements AfterViewInit {

  constructor(	private appService: AppService ) { }
  @Input() public upload : any ={};
  /**
   * output to close
   */
  @Output() public uploadFlag : EventEmitter<boolean> = new EventEmitter();
  /**
   * responseUpload
   */
  public responseUpload : any ={};
  /**
   * Desc :progress-success
   */
  public progressSuccess: boolean = false;
  /**
   * Desc :range
   */
  public range: string = '';
  /**
   * Desc : file uploaded
   */
  public fileName: string = '';
  /**
   * Desc : progress on file load
   */
  public progress: boolean = false;
  
  public ngOnInit(){
    // console.log(this.upload)
  }
   
  public ngAfterViewInit() : void {
    feather.replace();
  }
  /**
   * Desc : file upload
   */
  public handleFileInput(event: any): void {
    // tslint:disable-next-line: no-any
    const fileData: any = new FormData();
    // const imageFile = files[0];
    //console.log(event.target.files,event.target.files[0],"target");
    fileData.append('file', event.target.files[0]);
    fileData.append('module', this.upload['moduleName']);
    fileData.append('action', this.upload['actionName']);
    // console.log(this.upload,fileData,"fileData");
    this.appService.httpPost(this.upload['moduleName'], fileData, this.upload['actionName'],'false',this.upload?.csrf).subscribe((data) => {
      this.responseUpload = data.content;
      //console.log(this.responseUpload.status);
        if (this.responseUpload.status === 'success') {
          this.progressSuccess = false;
        }
		});
    const fname =  event.target.files[0].name;
    const fsize =  event.target.files[0].size / 1024;
    const exactSize = Math.round(fsize * 100);
    this.viewProgress(fname, exactSize);
  }
  /**
   * downloadSampleFile
   */
  public downloadSampleFile(): void {
    let formData : any ={};
    if(this.upload){
      formData[this.upload['inputName']] =  this.upload['tabName'];
    }
    this.appService.httpPost(this.upload['download']['module'], formData, this.upload['download']['action'],'false').subscribe((data) => {
      // console.log(data);
      window.open(data.content);
      this.uploadFlag.emit(false);
    });
  }
  /**
   * closeUpload
   */
  public closeUpload(flag : boolean) : void{
    //console.log("sadsadad");
    this.uploadFlag.emit(flag);
  }
  /**
   * Desc : reUpload
   */
  public reUpload(): void {
    this.progressSuccess = false;
    this.progress = false;
  }
  /**
   * Desc : viewProgress
   */
  public viewProgress(fname: any, exactSize: any): void {
    this.progressSuccess = false;
    this.progress = true;
    this.fileName = fname;
    if (exactSize < 1000000) {
      const size = exactSize + 'KB';
      this.range = size;
    } else {
      const size = exactSize + 'MB';
      this.range = size;
    }
    const loadTime = (Math.round(exactSize / 1024), 2);
    document.getElementById('progressbar').style.animationDuration =
      loadTime + 's';
    const that = this;
    setTimeout(function () {
      that.progress = false;
      that.progressSuccess = true;
    }, loadTime * 1000);
    setTimeout(()=>{
      if (this.responseUpload.status === 'success') {
        this.closeUpload(true);
      }
    }, loadTime * 1500);
  }
}
