import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Holiday } from '../models/holiday';
import { Semester } from '../models/semester';
import { Subject } from '../models/subject';
import { HolidayService } from '../services/holiday.service';
import { SemesterService } from '../services/semester.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-semester-details',
  templateUrl: './semester-details.component.html',
  styleUrls: ['./semester-details.component.css']
})
export class SemesterDetailsComponent implements OnInit {

  semester: Semester | undefined
  holidays: Holiday[] | undefined
  subjects: Subject[] | undefined
  constructor(private holidayService: HolidayService,
              private router: Router,
              private semesterService: SemesterService, 
              private studentService : StudentService)
    {
      if(localStorage.getItem('login')=="false"){
          this.router.navigate(["/login"])
      }
   }

  ngOnInit(): void {
    this.getSemester()    
  }

  getSemester(){
    this.semesterService.getCurrent().subscribe(
      (response: Semester) =>{
        this.semester=response;
        this.getHolidays();
        this.getSubjects()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  next(){
    this.semesterService.getNext(this.semester!.id).subscribe(
      (response: Semester) =>{
        if(response!=null){
          this.semester=response;
          this.getHolidays();
          this.getSubjects()
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  previous(){
    this.semesterService.getPrevious(this.semester!.id).subscribe(
      (response: Semester) =>{
        if(response!=null){
          this.semester=response;
          this.getHolidays();
          this.getSubjects()
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  current(){
    return this.semester?.current
  }

  getHolidays(){
    this.holidayService.getHolidaysForSemester(this.semester!.id).subscribe(
      (response: Holiday[]) =>{
        this.holidays=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  holidayslength(){
    return this.holidays?.length
  }

  public createDateString(paramDate: any){
    var date = String(new Date(paramDate)).split(' ') 
    var dd = date[2].substring(0,2);
    var mm = date[1]
    var dayStr = `${mm}. ${dd}.`
    return dayStr
  }

  public deleteHoliday(id: number){
    this.holidayService.delete(id).subscribe(
      (response: any) =>{
        this.ngOnInit()
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  newSemester(){
    this.router.navigate(['/newsemester'])
  }

  admin(){
    return localStorage.getItem('userRole')=="admin"
  }

  getSubjects(){
    this.studentService.getSubjectsForSemester(Number(localStorage.getItem('userId')) ,this.semester!.id).subscribe(
      (response: Subject[]) =>{
        this.subjects=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public details(id: number){
    this.router.navigate(['/subjectdetails/', id])
  }
}
