import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.css']
})
export class UserupdateComponent implements OnInit {

  id: number;
  user: User |undefined;
  updateUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl(),
    neptun: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
  });

  constructor(private userService: UserService, private avRoute: ActivatedRoute, private router: Router) 
  {
    this.id=0;
    if(localStorage.getItem('userId')!=null){
      this.id = +localStorage.getItem('userId')!;
    }
  }

  ngOnInit(): void {
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

  public onSubmit(){
    var data: User={
      id:0,
      name: this.updateUserForm.value.name,
      email: this.updateUserForm.value.email,
      password: "",
      neptun: this.updateUserForm.value.neptun,
      birthDate: new Date(this.updateUserForm.value.birthDate).getTime(),
      roles: ""
    }
    console.warn(data)
    this.userService.updateUser(data, this.id ).subscribe(
      (result) => {
        alert("Adatok sikeresen módosítva!")
        this.router.navigate(['/profile']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
