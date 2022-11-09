import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Semester } from '../models/semester';
import { SemesterService } from '../services/semester.service';

@Component({
  selector: 'app-newsemester',
  templateUrl: './newsemester.component.html',
  styleUrls: ['./newsemester.component.css']
})
export class NewsemesterComponent implements OnInit {

  constructor(private router: Router, private semesterService: SemesterService) {
    if(localStorage.getItem('userRole')!="admin"){
      this.router.navigate(["/profile"])
    }
    else if(localStorage.getItem('login')=="false"){
      this.router.navigate(["/login"])
    }
   }

  ngOnInit(): void {
  }

  newSemesterForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
    current: new FormControl()
  })

  onSubmit(){
    var data = this.newSemesterForm.value
    if(data.current == '') data.current=false
    this.semesterService.addSemester(data).subscribe(
      (response: Semester)=>{
        alert("A félév sikeresen felvéve")
        this.router.navigate(['/semester'])
      }, 
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  get name(){
    return this.newSemesterForm.get('name')
  }

  get start(){
    return this.newSemesterForm.get('start')
  }

  get end(){
    return this.newSemesterForm.get('end')
  }

  back(){
    this.router.navigate(['/semester'])
  }

}
