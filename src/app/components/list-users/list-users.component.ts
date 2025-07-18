import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {formatToShortDate, toastSuccess} from '../../helpers/utils';
import {FormsModule} from '@angular/forms';
import {Modal} from 'bootstrap';

@Component({
  selector: 'app-list-users',
  imports: [
    FormsModule
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit {
  users: User[] = []
  listSize: number = 5
  page: number = 0
  count: number = 0
  totalPages : number = 0
  isChanged = false
  idToDelete = null
  deleteUserModal:undefined | Modal = undefined

  usernameSearch: string = ''
  emailSearch: string = ''
  nameSearch: string = ''
  lastnameSearch: string = ''

  orderProp = ''
  order = 'asc'

  setOrder(prop: string) {
    if(this.orderProp == prop)
      this.order = this.order=='asc' ? 'desc' : 'asc'
    else {
      this.orderProp = prop
      this.order = 'asc'
    }

    this.retrieveUsers()
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.retrieveUsers()
    this.deleteUserModal = new Modal('#deleteUserModal')
  }

  clear() {
    this.usernameSearch = this.emailSearch = this.nameSearch = this.lastnameSearch = ''
    this.retrieveUsers()
  }

  retrieveUsers() {
    if(this.isChanged)
      this.page=0

    const {usernameSearch, emailSearch, nameSearch, lastnameSearch, orderProp, order} = this

    this.userService.getAllFiltered({size: this.listSize, offset: this.page * this.listSize,usernameSearch, emailSearch, nameSearch, lastnameSearch, orderProp, order}).subscribe({
      next: ({count, users}) => {
        this.count = count
        this.totalPages = Math.ceil(this.count / this.listSize)
        this.users=users
        this.isChanged = false
      },
      error: e=> console.error(e)
    })
  }

  redirectToEdit(id: any) {
    this.router.navigate(['/add_update_user', id])
  }

  askToDelete(id: any){
    this.idToDelete = id
    if(this.deleteUserModal)
      this.deleteUserModal.show()
  }

  deleteUser(){
    if(!this.idToDelete)
      return

    this.userService.delete(this.idToDelete).subscribe({
      next: data => {
        toastSuccess('User is deleted successfully.')
        this.page = 0
        this.retrieveUsers()
        if(this.deleteUserModal)
          this.deleteUserModal.hide()
      },
      error: e => console.error(e)
    })
  }

  prev(){
    this.page--
    this.retrieveUsers()
  }

  next() {
    this.page++
    this.retrieveUsers()
  }

  protected readonly formatToShortDate = formatToShortDate;
  protected readonly Math = Math;
}
