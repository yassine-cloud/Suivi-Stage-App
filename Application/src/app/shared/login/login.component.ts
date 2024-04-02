import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private formBuild : FormBuilder,private login : LoginService) { }

  loginForm = this.formBuild.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required]]
  })

  ngOnInit(): void {
    // this.login.controle();
  }

  onSubmit(){
    this.login.login(this.loginForm.value.email! , this.loginForm.value.password!).subscribe( (res : any) => {
      // console.log(res);
      
    })
  }

}
