import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id: number;
  user: User |undefined;

  constructor(private userService: UserService, private avRoute: ActivatedRoute, private router: Router) 
  {
    this.userService=userService;
    this.id=0;
    if(localStorage.getItem('userId')!=null){
      this.id = +localStorage.getItem('userId')!;
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('login')=="true"){
      this.getUser(this.id);
    }else{
      this.router.navigate(['/login']);
    }
  }

  public getUser(id: number){
    this.userService.getUser(id).subscribe(
      (response: User) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public createDateString(paramDate: any){
    var date = String(paramDate).split('-') 
    var dd = date[2].substring(0,2);
    var mm = date[1]
    var yyyy= date[0]
    var dayStr = `${yyyy}. ${mm}. ${dd}.`
    return dayStr
  }

}
