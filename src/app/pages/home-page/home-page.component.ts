import { Component } from '@angular/core';
import { Router } from '@angular/router';
interface Precios{
  cliente:string
  descuento:number
  icono:string
  description:string
}
@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent{
  constructor(private Router:Router){
  }
Precios:Precios[]=[
  {
    cliente:"locales",
    descuento:75,
    icono:"assets/locales.png",
    description:"Todo aquel usuario registrado y que sea parte de los estados Chiapas,Tabasco,Campeche,Yucatán,Quintana Roo con un documento que lo confirme."
  },
  {
    cliente:"nacionales",
    descuento:30,
    icono:"assets/Nacional.png",
    description:"Los cliente que cuenten con una documento oficial de ser Mexicanos se le otorgara un descuento por el 30% ya sea con una CURP o con un documento oficial."
  },
  {
    cliente:"Internacionales/no registrados",
    descuento:0,
    icono:"assets/internacional.png",
    description:"Todos los clientes que no cuenten con una cuenta creada o que sean fuera del pais se le cobrara una cuota completa de $1100.00 por recorrido completo"
  }
]
GoReservations(){
  this.Router.navigateByUrl('TrenMaya/Reservations')
}
}
