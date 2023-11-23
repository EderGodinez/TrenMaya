import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../services/reserve.service';
import { AuthService } from '../../services/auth.service';
interface Reserve{
  FechaReserva:Date
  FechaSalida:Date
  Origen:string
  Destino:string
  Pasajeros:number
  Total:number
  status:'pendiente'|'pagado'
}
@Component({
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.scss']
})
export class ViewReservationsComponent {
  constructor(private route: ActivatedRoute,private ReservationService:ReservationService,private AuthService:AuthService){
    //const userEmailfather = this.route.snapshot.paramMap.get('email');
    //let useremail;
    const token=localStorage.getItem('token')
    this.userid=token?localStorage.getItem('Userid'):'1'
    if (token) {
      this.AuthService.setUserEmail(localStorage.getItem('Useremail')!);
    }
    else{

    }

  }
  ngOnInit() {
    // En el ngOnInit de la ruta hija, obtén el valor del servicio
    this.AuthService.userEmail$.subscribe((email) => {
      const correo=this.userEmail;
      this.userEmail = email;
        this.Reservations=[]
        this.PendientReservations=[]
     this.showReserves(this.userEmail!,this.userid!);
    });
  }
  showReserves(useremail:string,userid:string){
    this.ReservationService.getReserves(useremail,userid).subscribe((reservation)=>{
      reservation.forEach((reserve)=>{
        const reservacion:Reserve={
          FechaReserva:new Date(reserve.Fecha_Reserva),
          FechaSalida:new Date(reserve.Fecha_Salida),
          Destino:reserve.Destino.nombre,
          Origen:reserve.Origen.nombre,
          Pasajeros:reserve.Numero_pasajeros,
          status:'pagado',
          Total:reserve.Total,
        }
        this.Reservations.push(reservacion)
      })
    })
    this.ReservationService.getPendientReserves(useremail,userid).subscribe((pendients)=>{
      pendients.forEach((pendient)=>{
        const reservation:Reserve={
          FechaReserva:new Date(pendient.Fecha_Reserva),
          FechaSalida:new Date(pendient.Fecha_Salida),
          Destino:pendient.Destino.nombre,
          Origen:pendient.Origen.nombre,
          Pasajeros:pendient.Numero_pasajeros,
          status:'pendiente',
          Total:pendient.Total,
        }
        this.PendientReservations.push(reservation)
      })
    })
  }
  userEmail:string=''
  userid:string|null
Reservations:Reserve[]=[]
PendientReservations:Reserve[]=[]
}
