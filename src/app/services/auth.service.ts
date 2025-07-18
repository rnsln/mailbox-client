import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';

const baseUrl = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any>{
    return this.http.post(
      baseUrl + 'signin',
      {
        username,
        password
      },
      httpOptions
    )
  }

  register(username:string, password:string, email:string): Observable<any>{
    return this.http.post(
      baseUrl + 'signup',
      {
        username,
        password,
        email
      },
      httpOptions
    )
  }

  logout(): Observable<any>{
    return this.http.post(
      baseUrl+'signout',
      {msg:'message'},
      httpOptions
    )
  }

  isadmin(){
    return this.http.get<{ admin: boolean }>(baseUrl+'admin', httpOptions).pipe(map(x => x.admin))
  }
}
