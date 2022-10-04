import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from '../models/subject';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-subjectlist',
  templateUrl: './subjectlist.component.html',
  styleUrls: ['./subjectlist.component.css']
})
export class SubjectlistComponent implements OnInit {

  public subjects: Subject[] | undefined

  constructor(private service: SubjectService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('login') == "true"){
        this.getSubjects();
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  public getSubjects(){
    this.service.getSubjects().subscribe(
      (response: Subject[]) =>{
        this.subjects=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  admin(){
    return localStorage.getItem('userRole')=="admin";
  }

  public details(id: number){
    this.router.navigate(['/subjectdetails/', id])
  }

  public update(id: number){

  }

}
