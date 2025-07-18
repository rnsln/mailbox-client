import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {StorageService} from '../../services/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{

  constructor(private authService : AuthService, private storageService: StorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.logout()
  }

  logout(){
    this.authService.logout().subscribe({
      next: res=>{
        this.storageService.clean()

        this.router.navigate(['/home']).then(r => window.location.reload())
      },
      error: err=> {
        console.log('hey3')
        console.log(err)
      }
    })
  }
}
