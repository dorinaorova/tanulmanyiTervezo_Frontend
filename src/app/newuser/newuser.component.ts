import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
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
  newUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl(),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    neptun: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
  });

  constructor(private router: Router, private userService: UserService, private authService: AuthenticationService, private fb: FormBuilder) {
   }

  ngOnInit(): void {
  }


  onSubmit(){
    var data = this.newUserForm.value
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
