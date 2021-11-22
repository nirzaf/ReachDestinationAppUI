import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { LogRegisterService } from '../services/log-register.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export interface BusRoutes {
  routeNumber: number;
  trueValue: number | null;
  falseValue: number | null;
  question: string | null;
  currentCity: string | null;
}


@Component({
  selector: 'app-level-one',
  templateUrl: './level-one.component.html',
  styleUrls: ['./level-one.component.scss']
})


export class LevelOneComponent implements OnInit {
  username:any;
  routeData: any;
  routeNumber:any;
  targetDestination:any;
  count = 0;
  isSubmitted:any;

  constructor(private data:DataService,
              private formBuilder: FormBuilder,
              private logger:LogRegisterService) {
    this.loadRoute();
    this.getRandomDestination();
    this.username = localStorage.getItem('username');
    this.isSubmitted = localStorage.getItem('isSubmitted');
  }

  ngOnInit(): void {}

  createQuizForm:FormGroup = this.formBuilder.group({
    isSelectedTrue: ['', {validators: [], updateOn: 'change'}],
    question: ['', {validators: [Validators.required], updateOn: 'change'}],
    currentCity: ['', {validators: [Validators.required], updateOn: 'change'}],
    routeNumber: ['', {validators: [Validators.required], updateOn: 'change'}]
  });

  // loadBusRoute(routeNo:any){
  //    this.data.getBusRoute(routeNo)
  //      .subscribe(async res => {
  //        this.routeData = res;
  //        console.log(this.routeData);
  //      })
  // }

  getRandomDestination(){
    const cities = ["Colombo", "Galle", "Nuwareliya", "Hatton","Jaffna", "Trinco", "Puttalam", "Vavuniya"];
    this.targetDestination = cities[Math.floor(Math.random() * cities.length)];
  }

  selected : any;
  goToNextCity(){
    this.count++;
    console.log(this.count);
    if(this.count == 3)
    {
      if(this.targetDestination == this.createQuizForm.controls['currentCity'].value) {
        this.data.getBusRoute(this.routeData.routeNumber, this.selected, true).then(async data => {
          this.routeData = data;
        });
      }
      else{
        this.data.getBusRoute(this.routeData.routeNumber, this.selected, false).then(async data => {
          this.routeData = data;
        });
      }
    }else
    {
      this.selected = this.createQuizForm.controls['isSelectedTrue'].value == '1';
      this.data.getBusRoute(this.routeData.routeNumber, this.selected, null).then(async data => {
        this.routeData = data;
      });
    }
  }

  loadRoute() {
        this.data.getRoute('593').then(data => {
          this.routeData = data;
        })
      }
}
