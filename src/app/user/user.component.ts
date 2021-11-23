import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  //To check the submission state
  isSubmitted: boolean;

  //Selected option by the player
  selected : any;

  //Name of the Player
  username:any;

  //To track the route data from backend after each steps
  routeData: any;
  routeNumber:any;
  targetDestination:any;
  isReached:boolean=false;

  //To track the each step of the journey
  level1:string='Akurana';
  level2:any;
  level3:any;
  level4:any;

  levelCounter:number = 1;


  constructor(private formBuilder:FormBuilder,
              private route:Router,
              private data:DataService) {
    this.getRandomDestination();
    this.loadRoute();
    this.isSubmitted = false;
    localStorage.clear();
  }

  ngOnInit(): void {}

  submitUsername() {
    if(this.userFormGroup.valid) {
      this.username = this.getUsername();
      localStorage.setItem('username', this.getUsername());
      this.isSubmitted = true;
      }
    }

  Reset() {
    localStorage.clear();
    this.isSubmitted = false;
    this.isReached=false;
    this.levelCounter = 1;
    this.loadRoute();
  }

  getUsername(){
    return this.userFormGroup.get('username')?.value;
  }

  userFormGroup = this.formBuilder.group({
    username:[null, {validators: [Validators.required, Validators.maxLength(25), Validators.minLength(5)], updateOn: 'change'}]
  });

  quizFormGroup = this.formBuilder.group({
    isSelectedTrue: [null, {validators: [Validators.required], updateOn: 'change'}]
  });

//To generate the random destination
  getRandomDestination(){
    const cities = ["Colombo", "Galle", "Nuwareliya", "Hatton","Jaffna", "Trinco", "Puttalam", "Vavuniya"];
    this.targetDestination = cities[Math.floor(Math.random() * cities.length)];
  }

  goToNextCity(){
     if(this.quizFormGroup.valid) {
       if (this.quizFormGroup.controls['isSelectedTrue'].value == 1) this.selected = true;
       if (this.quizFormGroup.controls['isSelectedTrue'].value == 0) this.selected = false;
       console.log(this.selected);
       if (this.selected == true || this.selected == false) {
         this.levelCounter++;
         this.data.getBusRoute(this.routeData.routeNumber, this.selected).then(async data => {
           if (data.data.question == "") {
             if (data.currentCity == this.targetDestination) {
               data.question = "Congratulations! You have successfully reached the destination"
             } else {
               data.question = "Oops! you end up in the wrong destination. Please Try again!"
             }
             this.isReached = true;
           }
           this.routeData = data.data;
           if (this.levelCounter == 2) this.level2 = this.routeData.currentCity;
           if (this.levelCounter == 3) this.level3 = this.routeData.currentCity;
           if (this.levelCounter == 4) this.level4 = this.routeData.currentCity;
         });
       }
     }else{
       this.quizFormGroup.markAllAsTouched();
     }
  }

  //Loading Initial Route Data
  loadRoute() {
    this.data.getRoute('593').then(data => {
      this.routeData = data.data;
    })
  }
}
