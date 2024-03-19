import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;
  
  constructor(private fb: FormBuilder){}

  ngOnInit (): void  {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@isetr.tn$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      Departement: ['', Validators.required],
      pwd: ['', [Validators.required, Validators.minLength(4)]],
      rpwd: ['', Validators.required]
    });

  }
  // registerForm = new FormGroup({
  //   firstname: new FormControl(""),
  //   lastname: new FormControl(""),
  //   email: new FormControl(""),
  //   mobile: new FormControl(""),
  //   pwd: new FormControl(""),
  //   rpwd: new FormControl("")

  // });

  registerSubmited(){
    if (this.registerForm.valid) {
      // Submit the form if it's valid
      console.log('Form submitted successfully');
    } else {
      // Mark all fields as touched to display error messages
      this.registerForm.markAllAsTouched();
    }
  }
  
}
