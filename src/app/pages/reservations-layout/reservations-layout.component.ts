import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './reservations-layout.component.html',
  styleUrls: ['./reservations-layout.component.scss']
})
export class ReservationsLayoutComponent {
  constructor(private MessageService:MessageService,private router: Router,private AuthService:AuthService){
    const token=localStorage.getItem('token')??''
    if(token!='')
    this.Islog=true
  }
  Islog:boolean=false;
  userEmail:string='';
  searchReservations(){
    if (this.userEmail!=='') {
      this.AuthService.setUserEmail(this.userEmail);
      this.router.navigate(['TrenMaya/Reservations/View'])
      return
    }
    this.MessageService.add({severity:'error',life:3000,summary:'Vacio',detail:'Campo de consulta de reservacion vacio'})
    return
  }
}
