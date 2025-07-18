import {Component, input, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {provideRouter} from '@angular/router';
import {RoleModel} from '../../models/role.model';
import {formatToShortDate, toastDanger, toastSuccess} from '../../helpers/utils';

@Component({
  selector: 'app-add-update-user',
  imports: [
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './add-update-user.component.html',
  styleUrl: './add-update-user.component.css',
  providers: [DatePipe]
})
export class AddUpdateUserComponent implements OnInit{
  form = {
    id: '',
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    birthdate: new Date(),
    gender: '',
    city: '',
    admin: false
  }

  id = input<string>()

  constructor(private userService : UserService, private datePipe:DatePipe) { }

  ngOnInit() {
    if(!this.id())
      return

    this.userService.getOne(this.id()).subscribe({
      next: (data:User) => {
        let {username, email, name, lastname, birthdate, city, gender, roles} = data
        let admin = roles ? roles.filter((role) => role.name == 'admin').length>0 : false
        let id = this.id()
        this.form = {id: id ? id : '',
          username : username ? username : '',
          password: '',
          email: email ? email : '',
          firstname: name ? name : '',
          lastname: lastname ? lastname : '',
          birthdate: formatToShortDate(birthdate),
          city: city ? city : '',
          gender: gender ? gender : '',
          admin}
      },
      error: err => {
        toastDanger('Could not get user')
      }
    })
  }

  onSubmit() {
    let {id, username, password, email, firstname, lastname, birthdate, city, gender, admin} = this.form
    let userRM = new RoleModel(undefined, 'user')
    let adminRM = new RoleModel(undefined, 'admin')
    let user = new User(id, username, password, email, firstname, lastname, birthdate, city, gender, admin ? [userRM, adminRM] : [userRM])

    if(this.id()!=undefined){
      this.userService.update(user).subscribe({
        next: data => {
          toastSuccess("User " + this.form.username + " is saved successfully!")
        },
        error: err => {
          toastDanger(err.message ? err.message : 'Some error occurred, please try again')
        }
      })
    } else {
      this.userService.insertOne(user).subscribe({
        next: data => {
          toastSuccess("User " + this.form.username + " is saved successfully!")
        },
        error: err => {
          toastDanger(err.message ? err.message : 'Some error occurred, please try again')
        }
      })
    }
  }


}
