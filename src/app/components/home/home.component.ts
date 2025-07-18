import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {Toast} from 'bootstrap'
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  user?:User
  constructor(private storageService : StorageService, private router: Router) { }
  isLoggedIn:boolean = false
  isAdmin: boolean =false

  ngOnInit(): void {
    this.user = this.storageService.getUser()
    this.isLoggedIn=this.storageService.isLoggedIn()

    if(this.isLoggedIn){
      const user = this.storageService.getUser()

      this.isAdmin=user.roles.find((x:any)=> x.name=='admin')
    }
  }

  redirect(path:string){
    this.router.navigate([path])
  }
}
