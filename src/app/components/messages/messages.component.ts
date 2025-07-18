import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {StorageService} from '../../services/storage.service';
import {formatToShortDate, toastDanger, toastSuccess} from '../../helpers/utils';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MessageService} from '../../services/message.service';
import {Modal} from 'bootstrap';

@Component({
  selector: 'app-outbox',
  imports: [
    FormsModule,
    DatePipe
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit{
  listSize = 5
  isChanged = false
  page = 0
  totalPages = 0
  totalCount = 0

  messages:any[] = []
  users:User[] = []
  @Input() type : 'inbox' | 'outbox' = 'inbox'

  idToDelete = ''
  deleteMessageModal:undefined | Modal = undefined

  constructor(private userService : UserService, private storageService : StorageService, private router : Router, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.retrieveMessages()
    this.deleteMessageModal = new Modal('#deleteMessageModal')
  }

  retrieveMessages(){
    let user: User = this.storageService.getUser()
    if(!user)
      window.location.reload()

    if(this.isChanged)
      this.page=0

    this.userService.getMessages(this.type, user.id, this.page, this.listSize).subscribe({
      next: ({totalPages, count, messages}) => {
        this.messages = messages
        this.totalPages = totalPages
        this.totalCount = count;
        this.isChanged=false
      },
      error: ({error}) => {
        toastDanger(error.message || 'Messages could not be loaded.')
      }
    })
  }

  protected readonly formatToShortDate = formatToShortDate;

  prev() {
    this.page--
    this.retrieveMessages()
  }

  next() {
    this.page++
    this.retrieveMessages()
  }

  readMore(id:string){
    this.router.navigate(['message', id])
  }

  askToDelete(id: any) {
    this.idToDelete = id
    if(this.deleteMessageModal)
      this.deleteMessageModal.show()
  }

  deleteMessage(){
    if(!this.idToDelete)
      return

    this.messageService.delete(this.idToDelete).subscribe({
      next: (data:any) => {
        toastSuccess('Message is deleted successfully.')
        this.page = 0
        this.retrieveMessages()
        if(this.deleteMessageModal)
          this.deleteMessageModal.hide()
      },
      error: e => console.error(e)
    })
  }
}
