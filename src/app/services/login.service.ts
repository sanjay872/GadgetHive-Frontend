import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user:User=null;
  userLogged=new EventEmitter<User>();
  constructor(private route:Router) { }

  loginUser(_user:User){
    this.user=_user;
    this.userLogged.emit(_user);
  }

  logout(){
    this.user=null;
    this.userLogged.emit(null);
    this.route.navigate(['/login']);
  }

}
