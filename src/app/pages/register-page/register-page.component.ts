import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {RegisterPageService} from '../register-page/register-page.service'
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
interface states{
  id:number
  abr:string
  nombre:string
}

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  providers: [MessageService]
})
export class RegisterPageComponent {
  constructor(private router:Router,private RegisterPageService: RegisterPageService,private FormBuilder:FormBuilder,private ValidatorService:ValidatorService,private messageService: MessageService){}
  public RegisterForm:FormGroup=this.FormBuilder.group({
    email:["eder.godinez26@gmail.com",[Validators.required,Validators.pattern(this.ValidatorService.emailPattern)]],
    username:["Eder Yair",[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]],
    lastname:["Godinez Salazar",[Validators.required,Validators.pattern(this.ValidatorService.firstNameAndLastnamePattern)]],
    state:[0,[Validators.required]],
    INE:[""],
    CURP:[""],
    birtdate:[new Date("11/01/2000"),[Validators.required]],
    password:["123456789",[Validators.required,Validators.minLength(10),Validators.pattern(this.ValidatorService.passPattern)]],
    Confirmpassword:["123456789"]
  })
  uploadedFile:any;

  States:states[] = [
  { id: 1, abr: 'CHP', nombre: 'Chiapas' },
  { id: 2, abr: 'TAB', nombre: 'Tabasco' },
  { id: 3, abr: 'CAM', nombre: 'Campeche' },
  { id: 4, abr: 'YUC', nombre: 'Yucatan' },
  { id: 5, abr: 'ROO', nombre: 'Quintana Roo' },
  { id: 6, abr: 'AGU', nombre: 'Aguascalientes' },
  { id: 7, abr: 'BCN', nombre: 'Baja California' },
  { id: 8, abr: 'BCS', nombre: 'Baja California Sur' },
  { id: 9, abr: 'CHH', nombre: 'Chihuahua' },
  { id: 10, abr: 'COA', nombre: 'Coahuila' },
  { id: 11, abr: 'COL', nombre: 'Colima' },
  { id: 12, abr: 'CMX', nombre: 'Ciudad de Mexico' },
  { id: 13, abr: 'DUR', nombre: 'Durango' },
  { id: 14, abr: 'GUA', nombre: 'Guanajuato' },
  { id: 15, abr: 'GRO', nombre: 'Guerrero' },
  { id: 16, abr: 'HID', nombre: 'Hidalgo' },
  { id: 17, abr: 'JAL', nombre: 'Jalisco' },
  { id: 18, abr: 'MEX', nombre: 'Estado de Mexico' },
  { id: 19, abr: 'MIC', nombre: 'Michoacan' },
  { id: 20, abr: 'MOR', nombre: 'Morelos' },
  { id: 21, abr: 'NAY', nombre: 'Nayarit' },
  { id: 22, abr: 'NLE', nombre: 'Nuevo Leon' },
  { id: 23, abr: 'OAX', nombre: 'Oaxaca' },
  { id: 24, abr: 'PUE', nombre: 'Puebla' },
  { id: 25, abr: 'QUE', nombre: 'Queretaro' },
  { id: 26, abr: 'SLP', nombre: 'San Luis Potosi' },
  { id: 27, abr: 'SIN', nombre: 'Sinaloa' },
  { id: 28, abr: 'SON', nombre: 'Sonora' },
  { id: 29, abr: 'TAM', nombre: 'Tamaulipas' },
  { id: 30, abr: 'TLA', nombre: 'Tlaxcala' },
  { id: 31, abr: 'VER', nombre: 'Veracruz' },
  { id: 32, abr: 'ZAC', nombre: 'Zacatecas' },
];
  VerifyAccount(){
    if (this.RegisterForm.valid) {
      console.log(this.RegisterForm.value)
      //se envian los datos a el backend
    }
    return
  }
  HasUpper(campo:string) {
   return this.ValidatorService.HasUpper(campo);
  }
  HasNumber(campo:string) {
    return this.ValidatorService.HasNumber(campo);
  }
  HasLower(campo:string) {
    return this.ValidatorService.HasLower(campo);
  }
  esMayorDeEdad(fechaNacimiento:Date):boolean {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    // Verificar si el día y el mes de nacimiento ya han ocurrido este año
    if (
      hoy.getMonth() < fechaNacimiento.getMonth() ||
      (hoy.getMonth() === fechaNacimiento.getMonth() &&
        hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--;
    }
    return edad >= 18;
}
onUpload(event: UploadEvent) {

this.RegisterForm.controls['INE'].setValue(event.originalEvent)
console.log(this.RegisterForm.value)
  this.messageService.add({ severity: 'success', summary: 'Archivo subido', detail: 'Archivo guardado con exito' });
}
}
