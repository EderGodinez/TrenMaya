import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/env/env';

@Injectable({providedIn: 'root'})
export class ReservationService {
  constructor(private Http:HttpClient) { }
getPrice(origenid:number,destinoid:number):Observable<number>{
    return this.Http.get<number>(API_URL+`/station/distance?origen=${origenid}&destino=${destinoid}`);
}
}
