import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';
;
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class JsonfilesaverService {

  constructor(  private spinner:NgxSpinnerService) { }
  fileType = 'application/json;charset=UTF-8';
  fileExtension = '.json';


  public exportjson(jsonData: any[], fileName: string): void {
    var a = JSON.stringify(jsonData)
    this.savejsonfile(a,fileName)


  }

  private savejsonfile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
    this.spinner.hide();
  }
}
