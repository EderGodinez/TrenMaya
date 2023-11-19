import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/env/env';
import { ConfirmationService, MessageService ,ConfirmEventType } from 'primeng/api';
import {  ReservationResponse } from './interfaces/Reservation.interface';
import { CalculateDistance } from './interfaces/CalculateDistance.interface';
interface Estaciones{
  id:number
  Tramo:number
  nombre:string
  Estado:number
  tipo:number
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
  constructor(private FormBuilder:FormBuilder,private ValidatorService:ValidatorService,private Http:HttpClient,private Message:MessageService,private confirmationService: ConfirmationService){}
  ngOnInit(): void {
  }
  Total:number=0
  reservationForm:FormGroup=this.FormBuilder.group({
    email:["eder.godinez@gmail.com",[Validators.required,Validators.pattern(this.ValidatorService.emailPattern)]],
    ID_Usuario:[1,Validators.required],
    ID_Tren:[1,Validators.required],
    Origen:[,Validators.required],
    Destino:[,Validators.required],
    Numero_Pasajeros:[12,[Validators.required,Validators.max(100)]],
    fecha_salida:["",Validators.required]
  })
  EstacionesOrigen:Estaciones[]=[
    {id:1, Tramo:1, nombre:'Palenque', Estado:1,tipo: 1},
    {id:2, Tramo:1, nombre:'Boca del Cerro',Estado: 2,tipo: 1},
    {id:3, Tramo:1, nombre:'Tenosique', Estado:2, tipo:2},
    {id:4, Tramo:1, nombre:'El Triunfo',Estado: 2, tipo:1},
    {id:5, Tramo:1, nombre:'Candelaria', Estado:2,tipo: 2},
    {id:6, Tramo:2, nombre:'Escarcega',Estado: 3,tipo:1},
    {id:7, Tramo:2, nombre:'Carrillo Puerto', Estado:3,tipo: 2},
    {id:8, Tramo:2, nombre:'Edzna', Estado:3, tipo:1},
    {id:9, Tramo:2, nombre:'San Francisco de Campeche', Estado:3, tipo:1},
    {id:10,Tramo: 2,nombre: 'Tenabo',Estado: 3, tipo:2},
    {id:11,Tramo: 2,nombre: 'Hecelchakan',Estado: 3, tipo:2},
    {id:12,Tramo: 2,nombre: 'Calkini', Estado:3, tipo:2},
    {id:13,Tramo: 3,nombre: 'Maxcanu',Estado: 4, tipo:2},
    {id:14,Tramo: 3,nombre: 'Merida Aeropuerto',Estado: 4, tipo:1},
    {id:15,Tramo: 3,nombre: 'Teya', Estado:4, tipo:1},
    {id:16,Tramo: 3,nombre: 'Tixkokob', Estado:4, tipo:2},
    {id:17,Tramo: 3,nombre: 'Izamal', Estado:4, tipo:1},
    {id:18,Tramo: 4,nombre: 'Chichen Itza',Estado: 4,tipo: 1},
    {id:19,Tramo: 4,nombre: 'Valladolid',Estado: 4, tipo:1},
    {id:20,Tramo: 4,nombre: 'Xibalba',Estado: 4, tipo:2},
    {id:21,Tramo: 4,nombre: 'Nuevo Xcan',Estado: 5, tipo:1},
    {id:22,Tramo: 4,nombre: 'Leona Vicario',Estado: 4, tipo:2},
    {id:23,Tramo: 5,nombre: 'Cancun Aeropuerto',Estado: 5,tipo: 1},
    {id:24,Tramo: 5,nombre: 'Puerto Morelos', Estado:5, tipo:1},
    {id:25,Tramo: 5,nombre: 'Playa del Carmen', Estado:5, tipo:1},
    {id:26,Tramo: 5,nombre: 'Xcaret', Estado:5, tipo:2},
    {id:27,Tramo: 5,nombre: 'Puerto Aventuras', Estado:5, tipo:2},
    {id:28,Tramo: 5,nombre: 'Akumal',Estado: 5, tipo:2},
    {id:29,Tramo: 5,nombre: 'Tulum', Estado:5, tipo:1},
    {id:30,Tramo: 5,nombre: 'Quintana Roo Tulum Aeropuerto', Estado:5, tipo:2},
    {id:31,Tramo: 6,nombre: 'Felipe Carrillo Puerto',Estado: 5, tipo:1},
    {id:32,Tramo: 6,nombre: 'Limones(Othon P. Blanco)', Estado:5, tipo:2},
    {id:33,Tramo: 6,nombre: 'Bacalar',Estado: 5, tipo:1},
    {id:34,Tramo: 6,nombre: 'Chetumal',Estado: 5, tipo:1},
    {id:35,Tramo: 7,nombre: 'Xpujil', Estado:5, tipo:1},
    {id:36,Tramo: 7,nombre: 'Conhuas', Estado:5, tipo:2},
    {id:37,Tramo: 7,nombre: 'Centenario', Estado:5, tipo:2}

  ]
  estacionesOrigenFiltradas:Estaciones[]=this.EstacionesOrigen
  estacionesDestinoFiltradas:Estaciones[]=this.EstacionesOrigen
EstacionesDestino:Estaciones[]=[...this.EstacionesOrigen]
Horarios:Horario[]=[
  {id:1,hora:'6:00 AM'},
  {id:2,hora:'10:00 AM'},
  {id:3,hora:'2:00 PM'},
]
get Today(){
  return new Date()
}
distance:number=0;
ReservarBoletos(){
  if(!this.reservationForm.valid) return
  const fechaDesdeOriginal: string = this.reservationForm.controls['fecha_salida'].value;
const fechaDesde: Date = new Date(fechaDesdeOriginal);
const FechaFormateada: string = `${fechaDesde.getFullYear()}-${(fechaDesde.getMonth() + 1).toString().padStart(2, '0')}-${fechaDesde.getDate().toString().padStart(2, '0')}`;
this.reservationForm.controls['fecha_salida'].setValue(FechaFormateada)
  //Todo:Realizar peticion a backend para registrar reservacion.
  const formData = this.reservationForm.value;
  this.Http.post<ReservationResponse>(`${API_URL}/reserves`,formData)
  .subscribe(
    (data) => {
      this.Message.add({severity:data.summary,detail:data.message,summary:'Exito'})
      this.reservationForm.reset()
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
  //Todo:Realizar peticion a backend para registrar reservacion pendiente.
  const formData = this.reservationForm.value;
  this.Http.post<ReservationResponse>(`${API_URL}/reserves/pendient`,formData)
  .subscribe(
    (data) => {
      this.Message.add({severity:data.summary,detail:data.message+' unicamente contaras 24h para confirmarla',summary:'Exito'})
      this.reservationForm.reset()
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
  this.estacionesDestinoFiltradas=this.EstacionesDestino.filter(estacion=>{
    return estacion.id!=origenid
  })
  if (origenid&&destinoid) {
    const resp:number=await this.CalculateTotal(origenid,destinoid);
    this.Total=resp
  }
return
}
  this.estacionesOrigenFiltradas=this.EstacionesOrigen.filter(estacion=>{
    estacion.id!=destinoid
  })
  if (origenid&&destinoid) {
    const resp:number=await this.CalculateTotal(origenid,destinoid);
    this.Total=resp
  }
}
async CalculateTotal(origenid:number,destinoid:number):Promise<number>{
  const TodoRecorrido=1100;
  const KmTotal=1554;
  const PriceKm=TodoRecorrido/KmTotal;
await this.Http.get<number>(`${API_URL}/station/distance?origen=${origenid}&destino=${destinoid}`).subscribe(
  (data) => {
    this.distance=data
  },
  (error) => {
    console.error('Error'+error)
  }
)
console.log(this.distance)
return this.distance*PriceKm;
}
}
