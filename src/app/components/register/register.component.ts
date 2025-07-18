import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgClass, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {toastDanger, toastSuccess} from '../../helpers/utils';

@Component({
  selector: 'app-register',
  imports: [
    NgIf,
    FormsModule,
    NgClass
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: any = {
    username : null,
    email : null,
    password : null
  }

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(){
    const {username, email, password} = this.form

    this.authService.register(username, password, email).subscribe({
      next: data => {
        toastSuccess('User is created, please log in!')
        this.router.navigate(['login'])
      },
      error: ({error}) => {
        toastDanger(error? error.message:'User could not be created, please try again!')
      }
    })
  }
}
