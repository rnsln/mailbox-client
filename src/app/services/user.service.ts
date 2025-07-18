import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../models/user.model';
import {Message} from '../models/message.model';

const baseUrl = 'http://localhost:8080/api/users';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getOne(id: any): Observable<User>{
    return this.http.get<User>(baseUrl+'/'+id)
  }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(baseUrl)
  }

  getAllFiltered(filter: any): Observable<{ count: number,users: User[] }>{
    return this.http.post<{ count: number,users: User[] }>(baseUrl+'/filtered', filter, httpOptions)
  }

  insertOne(user: User): Observable<User>{
    return this.http.post<User>(baseUrl, user, httpOptions)
  }

  update(user: User): Observable<User>{
    return this.http.put<User>(baseUrl+'/'+user.id, user, httpOptions)
  }

  delete(id: any): Observable<User>{
    return this.http.delete(baseUrl+'/'+id, httpOptions)
  }

  getOneByUsername(username: string){
    return this.http.get<User>(baseUrl+'/exists/'+username, httpOptions)
  }

  getMessages(type: 'inbox' | 'outbox', id: any, page:number, size:number){
    return this.http.post<{totalPages:number, count:number, messages: Message[]}>(baseUrl+'/'+type+'/' + id,{
      page,
      size
    }, httpOptions)
  }

  patch(id:string, prop:any){
    return this.http.patch(baseUrl+'/'+id, prop)
  }

  search(term: string){
    if(!term)
      return of([])
    return this.http.get<string[]>(baseUrl+'/search/'+term, httpOptions)
  }
}
