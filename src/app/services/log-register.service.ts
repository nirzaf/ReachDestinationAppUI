import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LogRegisterService {
  entryDate: Date = new Date();
  message: string = "";
  extraInfo: any[] = [];
  logWithDate: boolean = true;

  buildLogString(): string {
    let ret: string = "";
    if (this.logWithDate) {
      ret = new Date() + " - ";
    }
    ret += " - Message: " + this.message;
    if (this.extraInfo.length) {
      ret += " - Extra Info: " +  LogRegisterService.formatParams(this.extraInfo);
    }
    return ret;
  }

  private static formatParams(params: any[]): any {
    if(params != undefined) {
      let ret: string = params.join(",");
      if (params.some(p => typeof p == "object")) {
        ret = "";
        for (let item of params) {
          ret += JSON.stringify(item) + ",";
        }
      }
      return ret;
    }
  }

  print(msg: string, ...optionalParams: any[]) {
    if(!environment.production) this.writeToLog(msg, optionalParams);
  }

  private writeToLog(msg: string, params: any[]) {
    let entry: LogRegisterService = new LogRegisterService();
    if(params != undefined) {
      entry.message = msg;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;
      console.log(entry.buildLogString());
    }else
    {
      console.log(msg + "undefined");
    }
  }
}
