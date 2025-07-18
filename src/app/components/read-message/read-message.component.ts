import {Component, input, OnInit} from '@angular/core';
import {MessageService} from '../../services/message.service';
import {formatToShortDate} from '../../helpers/utils';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-read-message',
  imports: [
    DatePipe
  ],
  templateUrl: './read-message.component.html',
  styleUrl: './read-message.component.css'
})
export class ReadMessageComponent implements OnInit{
  id = input<String>()
  message: any = null

  constructor(private messageService : MessageService) {
  }

  ngOnInit(): void {
    let id = this.id()
    if(!id)
      return

    this.messageService.getMessage(id).subscribe({
      next: message => {
        this.message = message
      }
    })
  }

  protected readonly formatToShortDate = formatToShortDate;
}
