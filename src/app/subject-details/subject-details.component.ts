import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Homework } from '../models/homework';
import { Period } from '../models/period';
import { Subject } from '../models/subject';
import { ZH } from '../models/zh';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {

  subject: Subject | undefined;
  id: number;
  periods: Period[] | undefined;
  zhs: ZH[] |undefined;
  homeworks: Homework[] |undefined

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
      this.getPeriods(this.id)
      this.getZhs(this.id)
      this.getHomeworks(this.id)
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
  getPeriods(id: number){
    this.subjectService.getPeriodsForSubject(id).subscribe(
      (response: Period[])=>{
        this.periods=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  getZhs(id: number){
    this.subjectService.getZhsForSubject(id).subscribe(
      (response: ZH[])=>{
        this.zhs=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  getHomeworks(id:number){
    this.subjectService.getHomeworksForSubject(id).subscribe(
      (response: Homework[])=>{
        this.homeworks=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public createDateString(paramDate: any){
    var date = String(paramDate).split('-') 
    var dd = date[2].substring(0,2);
    var mm = date[1]
    var dayStr = `${mm}. ${dd}.`
    return dayStr
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
