import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {email: '', password: ''};

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthenticationService) {
    localStorage.clear()
   }

  ngOnInit(): void {
  }

  login(data: any){
    console.warn(data)
    this.authService.auth(data.email, data.password).subscribe(
      (response: any) => {
        console.warn(response)
        localStorage.setItem('userId', response.id.toString());
        if(response.role.includes("ADMIN")){
          localStorage.setItem('userRole', "admin");
        }
        else{
          localStorage.setItem('userRole', "user");
        }
        localStorage.setItem('token', response.accessToken.toString())
        
        localStorage.setItem('login', "true");
        this.router.navigate(['/profile']);
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    )
  }

}
