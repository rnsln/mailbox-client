import {RoleModel} from './role.model';

export class User {
  constructor(public id?:any,
              public username?:string,
              public password?: string,
              public email?: string,
              public name?: string,
              public lastname?: string,
              public birthdate?: Date,
              public city?: string,
              public gender?: string,
              public roles?: RoleModel[],
              ) {}
}
