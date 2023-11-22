import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/env/env';
import { Reservation } from '../interfaces/revervationobject.interface';

@Injectable({providedIn: 'root'})
export class ReservationService {
  constructor(private Http:HttpClient) { }
getPrice(origenid:number,destinoid:number):Observable<number>{
    return this.Http.get<number>(API_URL+`/station/distance?origen=${origenid}&destino=${destinoid}`);
}
getPendientReserves(email:string,userid:string):Observable<Reservation[]>{
return this.Http.get<Reservation[]>(`${API_URL}/reserves/pendient?email=${email}&id=${userid}`)
}
getReserves(email:string,userid:string):Observable<Reservation[]>{
  return this.Http.get<Reservation[]>(`${API_URL}/reserves/paid?email=${email}&id=${userid}`)
}
}
