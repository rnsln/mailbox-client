import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {StorageService} from './services/storage.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: []
})
export class AppComponent implements OnInit{
  private roles:any[] = []
  isLoggedIn = false
  isAdmin = false
  title=''
  username?: string
  theme?: any

  constructor(private storageService:StorageService) { }

  ngOnInit(){
    this.isLoggedIn=this.storageService.isLoggedIn()
    this.theme = window.localStorage.getItem('theme')

    if(this.isLoggedIn){
      const user = this.storageService.getUser()
      this.roles = user.roles

      this.isAdmin=this.roles.find(x=> x.name=='admin')
      this.username=user.username
    }
  }

  changeTheme(){
    if(this.theme == 'dark')
      window.localStorage.setItem('theme', 'light')
    else
      window.localStorage.setItem('theme', 'dark')

    this.theme = window.localStorage.getItem('theme')
    document.body.setAttribute('data-bs-theme', this.theme)
  }

  protected readonly localStorage = localStorage;
}
