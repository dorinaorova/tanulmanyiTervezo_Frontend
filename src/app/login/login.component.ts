import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {email: '', password: ''};

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthenticationService) {
   }

  ngOnInit(): void {
  }

  login(data: any){
    this.authService.auth(data.email, data.password).subscribe(
      (response: User) => {
        this.user=response;
        console.warn("response", response)
        localStorage.setItem('userId', response.id.toString());
        if(response.roles.includes("ADMIN")){
          localStorage.setItem('userRole', "admin");
        }
        else{
          localStorage.setItem('userRole', "user");
        }
        
        localStorage.setItem('login', "true");
        this.router.navigate(['/profile']);
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
  }

}
