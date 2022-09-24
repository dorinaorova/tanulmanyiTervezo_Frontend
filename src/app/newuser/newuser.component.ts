import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthenticationService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  user: User | undefined;

  constructor(private router: Router, private userService: UserService, private authService: AuthenticationService) {
    this.userService=userService;
   }

  ngOnInit(): void {
  }
  onSubmit(data: any){
    this.userService.addUser(data).subscribe(
      (result) => {
        console.warn("result", result)
        
        this.authService.auth(data.email, data.password).subscribe(
          (response: User) =>{
            this.user = response;
            localStorage.setItem('userId', response.id.toString());
            localStorage.setItem('userRole', response.roles);
            localStorage.setItem('login', "true");
            this.router.navigate(['/profile']);
          }
        )
      }
    )
  }

}
