import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/env/env';
import { login } from '../interfaces/login.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenResponse } from '../interfaces/token.interface';
interface loginResponse{
  access_token:string
  message:string
}
@Injectable({providedIn: 'root'})
export class AuthService {
private userEmailSource = new BehaviorSubject<string>('');
userEmail$ = this.userEmailSource.asObservable();

  constructor(private http:HttpClient) { }
login(loginInfo:login):Observable<loginResponse>{
  return this.http.post<loginResponse>(`${API_URL}/users/login`,loginInfo)
}
getUserInfoByToken(token:string):Observable<TokenResponse>{
return this.http.get<TokenResponse>(`${API_URL}/users/info?userToken=${token}`)
}
validateToken(token:string): Observable<{message:string}> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<{message:string}>(`${API_URL}/users/validateToken`, { headers });
}
setUserEmail(email: string) {
  this.userEmailSource.next(email);
}
}
