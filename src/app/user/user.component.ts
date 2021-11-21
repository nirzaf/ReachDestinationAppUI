import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  getUsername(){
    return this.userFormGroup.get('username')?.value;
  }

  userFormGroup = this.formBuilder.group({
    username:[null, {validators: [Validators.required]}]
});

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }

  submitUsername() {
    if(this.userFormGroup.valid) {
      localStorage.setItem('username', this.getUsername());
      console.log(this.getUsername())
    }
  }
}
