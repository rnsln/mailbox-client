import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {StorageService} from '../../services/storage.service';
import {FormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {toastDanger} from '../../helpers/utils';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  form: any = {
    username: null,
    password: null
  }
  isLoggedIn= false
  isLoginFailed= false
  errorMessage = ''
  roles: string[] = []

  constructor(private authService : AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    if(this.storageService.isLoggedIn()){
      this.isLoggedIn = true
      this.roles = this.storageService.getUser().roles
    }
  }

  onSubmit(){
    const {username, password} = this.form

    this.authService.login(username, password).subscribe({
      next: ({token, user}) => {
        if(!token || !user)
          toastDanger('Could not log in, please try again!')

        this.storageService.saveUser(user)
        this.storageService.saveToken(token)
        this.isLoginFailed=false
        this.isLoggedIn=true
        this.roles=this.storageService.getUser().roles
        this.router.navigate(['/profile']).then(res => this.reloadPage())
      },
      error: err => {
        this.errorMessage = err.error.message
        this.isLoginFailed = true
      }
    })
  }

  reloadPage() {
    window.location.reload()
  }
}
