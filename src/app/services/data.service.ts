import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {
  }

  getBusRoute(routeNo:any, selected: boolean): Promise<any> {
    let postData = { busRouteNo: routeNo, selectedValue: selected };
    return new Promise((resolve, reject) => {
      this.http.post(environment.baseUrl, postData)
        .subscribe(data=>{
          if(data != null)
            resolve(data);
          else
            reject(data);
        })
    })
  }
}
