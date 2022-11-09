import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppService } from './services/app.service';
import { AuthenticationService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tervezo_web';
  public login: boolean;

  constructor(private app: AppService, private http: HttpClient, private router: Router, private authService: AuthenticationService ){
    this.login=this.loggedIn();
  }

  ngOnInit(){
    if(localStorage.getItem("login")?.match("true")) {this.login =true;}
    else this.login = false;
  }

  logout(){
    this.authService.logout();
  }  

  loggedIn(): boolean{
    if(localStorage.getItem("login")?.match("true")) return true;
    else return false;
  }

  public admin(): boolean{
    return localStorage.getItem('userRole')=="admin";
  }


}
