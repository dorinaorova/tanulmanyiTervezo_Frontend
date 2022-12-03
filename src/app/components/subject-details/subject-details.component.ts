import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { DateconverterService } from 'src/app/services/dateconverter.service';
import { Homework } from '../../models/homework';
import { Period } from '../../models/period';
import { Subject } from '../../models/subject';
import { ZH } from '../../models/zh';
import { SubjectService } from '../../services/subject.service';

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

  constructor(private subjectService: SubjectService,
              private router: Router,
              private avRoute: ActivatedRoute,
              private authService: AuthenticationService,
              private dateConverter: DateconverterService) { 
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
      this.getSubject(this.id);
      this.getPeriods(this.id)
      this.getZhs(this.id)
      this.getHomeworks(this.id)
      
  }

  getSubject(id: number){
    this.subjectService.getSubject(id).subscribe(
      (response: Subject)=>{
       if(response==null){
        this.router.navigate(['/subjects'])
       }
       else{
        this.subject=response;
       }
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    )
  }
  
  getPeriods(id: number){
    this.subjectService.getPeriodsForSubject(id).subscribe(
      (response: Period[])=>{
        this.periods=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    )
  }

  getZhs(id: number){
    this.subjectService.getZhsForSubject(id).subscribe(
      (response: ZH[])=>{
        this.zhs=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    )
  }

  convertDay(day: number){
    return this.dateConverter.convertDayByNumber(day);
  }

  getHomeworks(id:number){
    this.subjectService.getHomeworksForSubject(id).subscribe(
      (response: Homework[])=>{
        this.homeworks=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    )
  }

  public createDateString(paramDate: any){
    return this.dateConverter.createDateStringWithYear(paramDate);
  }

  admin(){
    return this.authService.isAdmin();
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
        alert(error.error);
        
      }
    )
  }

  deleteZh(id: number){
    this.subjectService.deleteZh(id).subscribe(
      (result)=>{
        this.ngOnInit()
      },
      (error: HttpErrorResponse)=>{
        alert(error.error);
        
      }
    )
  }

  deletePeriod(id: number){
    this.subjectService.deletePeriod(id).subscribe(
      (result)=>{
        this.ngOnInit()
      },
      (error: HttpErrorResponse)=>{
        alert(error.error);
        
      }
    )
  }

  deleteHomework(id: number){
    this.subjectService.deleteHomework(id).subscribe(
      (result)=>{
        this.ngOnInit()
      },
      (error: HttpErrorResponse)=>{
        alert(error.error);
        
      }
    )
  }

}
