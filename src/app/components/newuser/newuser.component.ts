import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  user: User | undefined;
  newUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl(),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    neptun: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
  });

  constructor(private router: Router, private authService: AuthenticationService) {
   }

  ngOnInit(): void {
  }


  onSubmit(){
    var data: User={
      id: 0,
      name: this.newUserForm.value.name,
      birthDate: new Date(this.newUserForm.value.birthDate).getTime(),
      neptun: this.newUserForm.value.neptun,
      password: this.newUserForm.value.password,
      roles: "",
      email: this.newUserForm.value.email
    }
    this.authService.signUp(data).subscribe(
      (result) => {
        alert("Sikeres regisztráció!")
        this.router.navigate(['/login'])
      },
      (error: HttpErrorResponse)=>{
        alert(error.error)
      }
    )
  }

  get name(){
    return this.newUserForm.get('name')
  }

  get neptun(){
    return this.newUserForm.get('neptun')
  }

  get email(){
    return this.newUserForm.get('email')
  }
  get password(){
    return this.newUserForm.get('password')
  }

}
