import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers:[MessageService]
})
export class LoginPageComponent {
  constructor(private FormBuilder:FormBuilder,private ValidatorService:ValidatorService,private AuthService:AuthService,private router:Router,private MessageService:MessageService){}
  public loginForm:FormGroup=this.FormBuilder.group({
    email:["eder.godinez26@gmail.com",[Validators.required,Validators.pattern(this.ValidatorService.emailPattern)]],
    pass:["123456789",[Validators.required]]
  })
  async signIn(){
    if (!this.loginForm.valid) return
    this.AuthService.login(this.loginForm.value).subscribe((token)=>{
    localStorage.setItem('token', token.access_token);
    this.loginForm.reset()
  this.MessageService.add({severity:'success',life:5000,summary:'Bienvenido'})
      setTimeout(() => {
        this.router.navigateByUrl('TrenMaya/Home')
        setTimeout(() => {
          location.reload()
        }, 1000);
      }, 5000);
    },
    (error)=>{
      this.MessageService.add({severity:'error',life:5000,summary:error.error.message})
      this.loginForm.controls['pass'].setValue('')
    })

  }
}
