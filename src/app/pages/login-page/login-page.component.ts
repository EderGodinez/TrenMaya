import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private FormBuilder:FormBuilder,private ValidatorService:ValidatorService){}
  public loginForm:FormGroup=this.FormBuilder.group({
    email:["eder.godinez26@gmail.com",[Validators.required,Validators.pattern(this.ValidatorService.emailPattern)]],
    password:["123456789",[Validators.required]]
  })
  signIn(){
    if (!this.loginForm.valid) return
    //iniciar sesion con peticion
  }
}
