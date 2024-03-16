import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  
  constructor(){}

  ngonInit(): void {
  }
  registerForm = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    email: new FormControl(""),
    mobile: new FormControl(""),
    gender: new FormControl(""),
    pwd: new FormControl(""),
    rpwd: new FormControl("")

  });

  registerSubmited(){
    console.log(this.registerForm);
  }


}
