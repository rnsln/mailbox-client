import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {MessageService} from '../../services/message.service';
import {UserService} from '../../services/user.service';
import {StorageService} from '../../services/storage.service';
import {Message} from '../../models/message.model';
import {toastDanger, toastSuccess} from '../../helpers/utils';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {catchError, debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction} from 'rxjs';
import {User} from '../../models/user.model';
import {switchMap} from 'rxjs'

@Component({
  selector: 'app-send-message',
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    NgbTypeahead,
  ],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.css'
})
export class SendMessageComponent {
  search:OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap(term => this.userService.search(term).pipe(catchError(()=> of([]))))
  )

  form = {
    receiver : '',
    content : '',
    title: ''
  }

  constructor(private messageService : MessageService, private userService: UserService, private storageService: StorageService) {
  }

  errorMessage = ''
  isSendFailed = false

  onSubmit(){
    let {receiver, content, title} = this.form
    let sender = this.storageService.getUser()

    if(!sender)
      window.location.reload()

      this.messageService.sendMessage(receiver, sender.id, content, title, new Date()).subscribe({
        next: res => {
          console.log(res)
          toastSuccess("Message is sent successfully")
        },
        error: ({error}) => {
          this.isSendFailed = true
          toastDanger(error ? error.message : 'Something went wrong, please try sending the message again!')
        }
      })
  }
}
