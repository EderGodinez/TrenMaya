import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/env/env';
import { ConfirmationService, MessageService ,ConfirmEventType } from 'primeng/api';
import {  ReservationResponse } from '../../interfaces/Reservation.interface';
import { ReservationService } from '../../services/reserve.service';
interface Estaciones{
  id:number
  nombre:string
}
interface Horario{
  id:number
  hora:string
}
@Component({
  templateUrl: './new-reservation-page.component.html',
  styleUrls: ['./new-reservation-page.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class NewReservationPageComponent implements OnInit {
  constructor(private FormBuilder:FormBuilder,private ValidatorService:ValidatorService,private Http:HttpClient,
    private Message:MessageService,private confirmationService: ConfirmationService,private ReservationService:ReservationService){
      this.Today = new Date();
      if (localStorage.getItem('Useremail')) {
        this.reservationForm.controls['email'].setValue(localStorage.getItem('Useremail'))
        this.reservationForm.get('email')?.disable();
      }
      const token=localStorage.getItem('token')
      const Userstate:string|null=localStorage.getItem('UserState')
      const localStates:number[]=[1,2,3,4,5]
      if (token&&Userstate!==null){
        this.HasDiscount=true
        const userStateNumber = parseInt(Userstate, 10);
        if(localStates.includes(userStateNumber)){
          this.descuento=.75//desceunto del 75
        }
        else
        this.descuento=0.3//decuento del 30
      }
      else
      this.descuento=1
    }
  ngOnInit(): void {
    this.estacionesDestinoFiltradas=this.Estaciones
    this.estacionesOrigenFiltradas=this.Estaciones
  }
  descuento:number;
  Total:number=0
  HasDiscount:boolean=false;
  Subtotal:number=0
  reservationForm:FormGroup=this.FormBuilder.group({
    email:["",[Validators.required,Validators.pattern(this.ValidatorService.emailPattern)]],
    ID_Usuario:[localStorage.getItem('Userid'),Validators.required],
    ID_Tren:[0,Validators.required],
    Origen:[,Validators.required],
    Destino:[,Validators.required],
    Numero_Pasajeros:[,[Validators.required,Validators.max(100)]],
    fecha_salida:["",Validators.required],
    Total:[0]
  })
  Estaciones:Estaciones[]=[
    {id:1, nombre:'Palenque'},
    {id:2, nombre:'Boca del Cerro'},
    {id:3, nombre:'Tenosique'},
    {id:4, nombre:'El Triunfo'},
    {id:5, nombre:'Candelaria'},
    {id:6, nombre:'Escarcega'},
    {id:7, nombre:'Carrillo Puerto',},
    {id:8, nombre:'Edzna'},
    {id:9, nombre:'San Francisco de Campeche',},
    {id:10,nombre: 'Tenabo'},
    {id:11,nombre: 'Hecelchakan'},
    {id:12,nombre: 'Calkini'},
    {id:13,nombre: 'Maxcanu'},
    {id:14,nombre: 'Merida Aeropuerto'},
    {id:15,nombre: 'Teya'},
    {id:16,nombre: 'Tixkokob'},
    {id:17,nombre: 'Izamal'},
    {id:18,nombre: 'Chichen Itza'},
    {id:19,nombre: 'Valladolid'},
    {id:20,nombre: 'Xibalba'},
    {id:21,nombre: 'Nuevo Xcan'},
    {id:22,nombre: 'Leona Vicario'},
    {id:23,nombre: 'Cancun Aeropuerto'},
    {id:24,nombre: 'Puerto Morelos'},
    {id:25,nombre: 'Playa del Carmen'},
    {id:26,nombre: 'Xcaret'},
    {id:27,nombre: 'Puerto Aventuras'},
    {id:28,nombre: 'Akumal'},
    {id:29,nombre: 'Tulum'},
    {id:30,nombre: 'Quintana Roo Tulum Aeropuerto'},
    {id:31,nombre: 'Felipe Carrillo Puerto'},
    {id:32,nombre: 'Limones(Othon P. Blanco)'},
    {id:33,nombre: 'Bacalar'},
    {id:34,nombre: 'Chetumal'},
    {id:35,nombre: 'Xpujil'},
    {id:36,nombre: 'Conhuas' },
    {id:37,nombre: 'Centenario'}

  ]
  estacionesOrigenFiltradas:Estaciones[]=[]
  estacionesDestinoFiltradas:Estaciones[]=[]
Horarios:Horario[]=[
  {id:1,hora:'6:00 AM'},
  {id:2,hora:'10:00 AM'},
  {id:3,hora:'2:00 PM'},
]
Today:Date;
ReservarBoletos(){
  if(!this.reservationForm.valid)
    return
  const fechaDesdeOriginal: string = this.reservationForm.controls['fecha_salida'].value;
const fechaDesde: Date = new Date(fechaDesdeOriginal);
const FechaFormateada: string = `${fechaDesde.getFullYear()}-${(fechaDesde.getMonth() + 1).toString().padStart(2, '0')}-${fechaDesde.getDate().toString().padStart(2, '0')}`;
this.reservationForm.controls['fecha_salida'].setValue(FechaFormateada)
this.reservationForm.controls['Total'].setValue((this.Total*(1-this.descuento))*this.reservationForm.controls['Numero_Pasajeros'].value)
this.reservationForm.get('email')?.enable();
  //Todo:Realizar peticion a backend para registrar reservacion.
  const formData = this.reservationForm.value;
  this.Http.post<ReservationResponse>(`${API_URL}/reserves`,formData)
  .subscribe(
    (data) => {
      this.Message.add({severity:data.summary,detail:data.message,summary:'Exito'})
      this.reservationForm.reset()
      this.reservationForm.controls['email'].setValue(localStorage.getItem('Useremail'))
      this.reservationForm.get('email')?.disable();
    },
    (error) => {
      this.Message.add({severity:'error',detail:error.error.message ,summary:'Error al hacer reservacion'})
    }
  );
}
pendientReservation(){
  const fechaDesdeOriginal: string = this.reservationForm.controls['fecha_salida'].value;
const fechaDesde: Date = new Date(fechaDesdeOriginal);
const FechaFormateada: string = `${fechaDesde.getFullYear()}-${(fechaDesde.getMonth() + 1).toString().padStart(2, '0')}-${fechaDesde.getDate().toString().padStart(2, '0')}`;
this.reservationForm.controls['fecha_salida'].setValue(FechaFormateada)
this.reservationForm.controls['Total'].setValue((this.Total*(1-this.descuento))*this.reservationForm.controls['Numero_Pasajeros'].value)
this.reservationForm.get('email')?.enable();
  //Todo:Realizar peticion a backend para registrar reservacion pendiente.
  const formData = this.reservationForm.value;
  this.Http.post<ReservationResponse>(`${API_URL}/reserves/pendient`,formData)
  .subscribe(
    (data) => {
      this.Message.add({severity:data.summary,detail:data.message+' unicamente contaras 24h para confirmarla',summary:'Exito'})
      this.reservationForm.reset()
      this.reservationForm.controls['email'].setValue(localStorage.getItem('Useremail'))
      this.reservationForm.get('email')?.disable();
    },
    (error) => {
      this.Message.add({severity:'error',detail:error.error.message ,summary:'Error al hacer reservacion'})
    }
  );
}
ConfirmTypeReserve() {
  this.confirmationService.confirm({
      message: '¿Pagar ahora?',
      header: 'Confirmacion de reservacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.ReservarBoletos()
      },
      reject: (type:ConfirmEventType) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.pendientReservation()
                  break;
          }
      }
  });
}
async Update(lista:string){
  const origenid=this.reservationForm.controls['Origen'].value
  const destinoid=this.reservationForm.controls['Destino'].value
  if (lista==='Origen') {
  this.estacionesDestinoFiltradas=this.Estaciones.filter(estacion=>{
    return estacion.id!=origenid
  })
  if (origenid&&destinoid) {
    this.CalculateTotal(origenid,destinoid)
  }
return
}
  this.estacionesOrigenFiltradas=this.Estaciones.filter(estacion=>{
    return estacion.id!=destinoid
  })
  if (origenid&&destinoid) {
    this.CalculateTotal(origenid,destinoid);
  }
}
CalculateTotal(origenid:number,destinoid:number){
  const TodoRecorrido=1100;
  const KmTotal=1554;
  const PriceKm=TodoRecorrido/KmTotal;
this.ReservationService.getPrice(origenid,destinoid).subscribe((distancia)=>{
  this.Total=distancia*PriceKm;
})
}
}
