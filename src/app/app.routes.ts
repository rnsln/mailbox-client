import { Routes } from '@angular/router';
import {AddUpdateUserComponent} from './components/add-update-user/add-update-user.component';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {LogoutComponent} from './components/logout/logout.component';
import {SendMessageComponent} from './components/send-message/send-message.component';
import {ReadMessageComponent} from './components/read-message/read-message.component';
import {MessagesComponent} from './components/messages/messages.component';
import {LOGGEDINGuard} from './loggedin.guard';
import {ISADMINGuard} from './isadmin.guard';

export const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'users', component: ListUsersComponent, canActivate:[ISADMINGuard]
  },
  {
    path: 'add_update_user', component: AddUpdateUserComponent, canActivate:[ISADMINGuard]
  },
  {
    path: 'add_update_user/:id', component: AddUpdateUserComponent, canActivate:[ISADMINGuard]
  },
  {
    path: 'inbox', component: MessagesComponent, data: {
      type: 'inbox'
    }, canActivate:[LOGGEDINGuard]
  },
  {
    path: 'outbox', component: MessagesComponent, data:{
      type:'outbox'
    }, canActivate:[LOGGEDINGuard]
  },
  {
    path: 'profile', component: ProfileComponent, canActivate:[LOGGEDINGuard]
  },
  {
    path: 'profile/:id', component: ProfileComponent, canActivate:[LOGGEDINGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'logout', component: LogoutComponent, canActivate:[LOGGEDINGuard]
  },
  {
    path: 'sendmessage', component: SendMessageComponent, canActivate:[LOGGEDINGuard]
  },
  {
    path: 'message/:id', component: ReadMessageComponent, canActivate:[LOGGEDINGuard]
  }
];
