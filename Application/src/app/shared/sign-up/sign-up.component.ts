import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@isetr.tn$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      Departement: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.registerForm.setValidators(this.matchingPasswords);

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
      console.log(this.registerForm.value);
      
    } else {
      // Mark all fields as touched to display error messages
      this.registerForm.markAllAsTouched();
    }
  }


  matchingPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  
}
