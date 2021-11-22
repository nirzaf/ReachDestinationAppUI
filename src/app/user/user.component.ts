import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  isSubmitted: boolean;

  getUsername(){
    return this.userFormGroup.get('username')?.value;
  }

  userFormGroup = this.formBuilder.group({
    username:[null, {validators: [Validators.required]}]
});

  constructor(private formBuilder:FormBuilder,
              private router:Router) {
    this.isSubmitted = false;
    localStorage.clear();
    // let user = localStorage.getItem('usernameSubmitted');
    // this.isSubmitted = user == 'true';
  }

  ngOnInit(): void {

  }

  submitUsername() {
    if(this.userFormGroup.valid) {
      localStorage.setItem('username', this.getUsername());
      console.log(this.getUsername())
      this.router.navigate(['/bus-routes'])
        .then(() => {
          this.isSubmitted = true;
          localStorage.setItem('usernameSubmitted', 'true');
        })
      }
    }

  Reset() {
    localStorage.clear();
    localStorage.setItem('usernameSubmitted', 'false');
    this.isSubmitted = false;
    this.router.navigate(['home'])
  }
}
