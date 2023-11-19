
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {


  constructor() { }

  public  firstNameAndLastnamePattern: string = '([a-zA-Z]+)(?: ([a-zA-Z]+))?';
  public  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public AreFieldsEquals(pass:string,confirm:string){
    return(Form:AbstractControl): ValidationErrors| null=>{
      const field1value=Form.get(pass)?.value
      const field2value=Form.get(confirm)?.value
      if (field1value!==field2value) {
        Form.get(confirm)?.setErrors({FieldsDiferents:true})
        return {
          FieldsDiferents:true
        }
      }
      Form.get(confirm)?.setErrors(null)
      return null
    }
  }
  public FieldsDiferents(field1:string,field2:string){
    return(Form:AbstractControl): ValidationErrors| null=>{
      const field1value=Form.get(field1)?.value
      const field2value=Form.get(field2)?.value
      if (field1value===field2value) {
        Form.get(field2)?.setErrors({FieldsEquals:true})
        return {
          FieldsEquals:true
        }
      }
      Form.get(field2)?.setErrors(null)
      return null
    }
  }
  public passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('NewPassword')?.value;
    const confirmNewPassword = control.get('ConfirmNewPassword')?.value;
    if (newPassword !== confirmNewPassword) {
      return { passwordsNotMatch: true };
    }
    return null;
  }
}
