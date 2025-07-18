import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {NgIf} from '@angular/common';
import {formatToShortDate, toastSuccess} from '../../helpers/utils';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  changed = false
  currentUser:any
  constructor(private storageService: StorageService, private userService: UserService) { }

  ngOnInit() {
    this.currentUser= this.storageService.getUser()
    this.currentUser.birthdate = formatToShortDate(this.currentUser.birthdate)
  }

  updateUser(){
    this.userService.patch(this.currentUser.id, {
      ...this.currentUser
    }).subscribe({
      next: user => {
        this.storageService.saveUser(user)
        toastSuccess('User is updated successfully!')
        this.changed=false
      }
    })
  }

  protected readonly Object = Object;
  protected readonly console = console;
}
