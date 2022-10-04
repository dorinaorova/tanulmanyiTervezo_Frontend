import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from '../models/subject';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {

  subject: Subject | undefined;
  id: number;

  constructor(private subjectService: SubjectService, private router: Router, private avRoute: ActivatedRoute) { 
    const idParam= 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }
    else{ 
      this.id=0;
      router.navigate(['/subjects'])
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('login')=="true"){
      this.getSubject(this.id);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  getSubject(id: number){
    this.subjectService.getSubject(id).subscribe(
      (response: Subject)=>{
        this.subject=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  admin(){
    return localStorage.getItem('userRole')=="admin";
  }

  update(id: number){
    this.router.navigate(['/subjectupdate/', id])
  }

  delete(id:number){
    this.subjectService.deleteSubject(id).subscribe(
      (result)=>{
        this.router.navigate(['/subjects'])
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
        
      }
    )
    
  }

}
