import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LogRegisterService } from './log-register.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private logger: LogRegisterService) {
  }

  getBusRoute(routeNo:any, selected: boolean): Promise<any> {
    let postData = { busRouteNo: routeNo, selectedValue: selected };
    return new Promise((resolve, reject) => {
      console.log(postData);
      this.http.post(environment.baseUrl, postData)
        .subscribe(data=>{
          console.log(data);
          if(data != null)
            resolve(data);
          else
            reject(data);
        })
    })
  }

  getRoute(routeNo: any):Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseUrl + routeNo)
        .subscribe(data=>{
          console.log(data);
          if(data != null)
            resolve(data);
          else
            reject(data);
        })
    })
  }
}
