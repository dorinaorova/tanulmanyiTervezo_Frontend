import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Holiday } from '../models/holiday';
import { Semester } from '../models/semester';
import { HolidayService } from '../services/holiday.service';
import { SemesterService } from '../services/semester.service';

@Component({
  selector: 'app-semester-details',
  templateUrl: './semester-details.component.html',
  styleUrls: ['./semester-details.component.css']
})
export class SemesterDetailsComponent implements OnInit {

  semester: Semester | undefined
  holidays: Holiday[] | undefined
  constructor( private holidayService: HolidayService, private router: Router, private semesterService: SemesterService) {
    
   }

  ngOnInit(): void {
    this.getSemester()    
  }

  getSemester(){
    this.semesterService.getCurrent().subscribe(
      (response: Semester) =>{
        this.semester=response;
        this.getHolidays();
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
          this.getHolidays();5
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

  public createDateString(paramDate: any){
    var date = String(paramDate).split('-') 
    var dd = date[2].substring(0,2);
    var mm = date[1]
    var dayStr = `${mm}. ${dd}.`
    return dayStr
  }

  public admin(){
    if(localStorage.getItem("userRole")?.match("admin")) return true
    else return false
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
}
