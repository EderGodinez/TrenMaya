import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserResponse } from '../interfaces/CreateUser.interface';
import { API_URL } from 'src/env/env';
import {UserInfo} from '../interfaces/UserInfo.interface'
import { Observable } from 'rxjs';
@Injectable({providedIn: 'root'})
export class RegisterService {
  constructor(private Http:HttpClient) { }
createAccount(UserInfo:UserInfo):Observable<CreateUserResponse>{
  return this.Http.post<CreateUserResponse>(`${API_URL}/users`,UserInfo)
}
}
