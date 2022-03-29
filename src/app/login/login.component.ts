import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userNamePattern:string="^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$";

  constructor(private loginService:LoginService,private route:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.loginService.loginUser(form.value);
    form.reset();
    this.route.navigate(['/product']);
  }


}
