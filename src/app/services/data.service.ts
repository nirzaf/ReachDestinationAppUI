import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { LogRegisterService } from './log-register.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private logger: LogRegisterService) {
  }

  getBusRoute(routeNo:any, selected: boolean, reached:any): Promise<any> {
    let postData = { id: routeNo, selectedValue: selected, reached: reached };
    return new Promise((resolve, reject) => {
      this.http.post(environment.baseUrl + 'BusRoutes/', postData)
        .subscribe(data=>{
          if(data != null)
            resolve(data);
          else
            reject(data);
        })
    })
  }

  getRoute(routeNo: any):Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseUrl + 'BusRoutes/'+ routeNo)
        .subscribe(data=>{
          if(data != null)
            resolve(data);
          else
            reject(data);
        })
    })
  }
}
