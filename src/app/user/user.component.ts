import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  //To check the submission state
  isSubmitted: boolean = false;

  //Selected option by the player
  selected: any;

  //Name of the Player
  username: any;

  disableSubmitButton: any;
  //To track the route data from backend after each steps
  routeData: any = {
    currentCity: "Akurana",
    falseValue: 291,
    question: "Would you like to get into the bus No 593?",
    routeNumber: 593,
    trueValue: 101
  };
  targetDestination: any;
  isReached: boolean = false;

  //To track the each step of the journey
  level1: string = 'Akurana';
  level2: any;
  level3: any;
  level4: any;

  levelCounter: number = 1;

  constructor(private formBuilder: FormBuilder,
              private route: Router,
              private data: DataService) {}

  ngOnInit(): void {
    localStorage.clear();
    this.getRandomDestination();
    this.isSubmitted = false;
    this.disableSubmitButton = false;
    this.isReached = false;
    this.levelCounter = 1;
    this.routeData = {
      currentCity: "Akurana",
      falseValue: 291,
      question: "Would you like to get into the bus No 593?",
      routeNumber: 593,
      trueValue: 101
    };
    this.quizFormGroup.reset();
  }

  submitUsername() {
    if (this.userFormGroup.valid) {
      this.username = this.getUsername();
      localStorage.setItem('username', this.getUsername());
      this.isSubmitted = true;
    }
  }

  //reset all values on replay
  Reset() {
    this.ngOnInit();
  }

  getUsername() {
    return this.userFormGroup.get('username')?.value;
  }

  userFormGroup = this.formBuilder.group({
    username: [null, {
      validators: [Validators.required, Validators.maxLength(25), Validators.minLength(5)],
      updateOn: 'change'
    }]
  });

  quizFormGroup = this.formBuilder.group({
    isSelectedTrue: [null, {validators: [Validators.required], updateOn: 'change'}]
  });

 //To generate the random destination
  getRandomDestination() {
    const cities = ["Colombo", "Galle", "Nuwareliya", "Hatton", "Jaffna", "Trinco", "Puttalam", "Vavuniya"];
    this.targetDestination = cities[Math.floor(Math.random() * cities.length)];
  }

  //To load the route data
  goToNextCity() {
    if (this.quizFormGroup.valid) {
      this.disableSubmitButton = true;
        if (this.quizFormGroup.controls['isSelectedTrue'].value == 1) this.selected = true;
        if (this.quizFormGroup.controls['isSelectedTrue'].value == 0) this.selected = false;
        if (this.selected == true || this.selected == false) {
          this.levelCounter++;
          this.data.getBusRoute(this.routeData.routeNumber, this.selected).then(async data => {
            if (data.data.question == "") {
              if (data.data.currentCity == this.targetDestination) {
                data.data.question = "Congratulations! You have successfully reached the destination"
              } else {
                data.data.question = "Oops! you end up in the wrong destination. Please Try again!"
              }
              this.isReached = true;
            }
            this.routeData = data.data;
            if (this.levelCounter == 2) this.level2 = this.routeData.currentCity;
            if (this.levelCounter == 3) this.level3 = this.routeData.currentCity;
            if (this.levelCounter == 4) this.level4 = this.routeData.currentCity;
            this.disableSubmitButton = false;
          });
        }
    } else {
      this.quizFormGroup.markAllAsTouched();
    }
  }
}

