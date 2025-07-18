import {Injectable} from '@angular/core';

const USER_KEY = 'auth-user'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }
  clean() {
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.removeItem('token')
  }

  public saveToken(token: any){
    window.sessionStorage.setItem('token', token)
  }

  public getToken(){
    return window.sessionStorage.getItem('token')
  }

  public saveUser(user: any){
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  public getUser(){
    const user = window.sessionStorage.getItem(USER_KEY)
    if(user){
      return JSON.parse(user)
    }
    return {}
  }

  public isLoggedIn(): boolean{
    const user = window.sessionStorage.getItem(USER_KEY)
    if(user)
      return true
    return false
  }
}
