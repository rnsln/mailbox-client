import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Message} from '../models/message.model';

const baseUrl = 'http://localhost:8080/api/messages/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient : HttpClient) { }

  sendMessage (receiverUsername:any, senderId:any, content:any, title:any, date : any) {
    return this.httpClient.post(baseUrl, {
      receiverUsername,
      senderId,
      content,
      title,
      date
    }, httpOptions)
  }

  getMessage (id : String) {
    return this.httpClient.get(baseUrl+id, httpOptions)
  }

  delete(id: string){
    return this.httpClient.delete(baseUrl+id, httpOptions)
  }
}
