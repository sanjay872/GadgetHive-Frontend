import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user:User=null;
  constructor(private loginService:LoginService) { 
  }

  ngOnInit() {
    this.loginService.userLogged.subscribe(res=>{
      this.user=res;
    })
  }

  logout(){
    this.loginService.logout();
  }

  loggedIn(){
    return this.user!=null;  
  }
}
