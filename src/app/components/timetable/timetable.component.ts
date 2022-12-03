import { getLocaleDateFormat, getLocaleDayPeriods, Time } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { Period } from '../../models/period';
import { Subject } from '../../models/subject';
import { StudentService } from '../../services/student.service';
import { SubjectService } from '../../services/subject.service';
import { Observable } from "rxjs";
import { Timetable } from '../../models/timetable';
import { TimetableService } from '../../services/timetable.service';
import { HolidayService } from '../../services/holiday.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { DateconverterService } from 'src/app/services/dateconverter.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  today : Date
  todayStr: string | undefined
  day: String | undefined
  periods: Timetable[];
  subjects: Subject[] | undefined
  isHolidayResult: boolean = false

  period_Monday: Timetable[] | undefined;
  period_Tuesday: Timetable[] | undefined;
  period_Wednesday: Timetable[] | undefined;
  period_Thursday: Timetable[] | undefined;
  period_Friday: Timetable[] | undefined;

  constructor(private studentService: StudentService,
              private router: Router,
              private timetableService: TimetableService,
              private holidayService: HolidayService,
              private authService: AuthenticationService,
              private dateConverter: DateconverterService) {
    this.periods = [];
    this.today= new Date();
   }

  ngOnInit() {
    this.todayStr=this.dateConverter.createDateStringWithYear(this.today);
    this.getTimetable()   
    this.isHoliday()
    this.getMonday()
  }

  isHoliday(){
    this.holidayService.isHoliday(this.today.getTime()).subscribe(
      (result: boolean) =>
      {
        this.isHolidayResult=result;
      },
        (error: HttpErrorResponse)=>{
        alert(error.error);
      }
    )
  }


  currentDate() :boolean {
    var currentDate = new Date();
    if(currentDate.getDate==this.today.getDate) return true;
    return false
  }

  getMonday(){
    this.timetableService.getDailyTimetable(Number(localStorage.getItem('userId')), 1).subscribe(
      (response: Timetable[])=>{
          this.period_Monday=response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.error);
      }
    )
  }
  getTuesday(){
    this.timetableService.getDailyTimetable(Number(localStorage.getItem('userId')), 2).subscribe(
      (response: Timetable[])=>{
          this.period_Tuesday=response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.error);
      }
    )
  }
  getWednesday(){
    this.timetableService.getDailyTimetable(Number(localStorage.getItem('userId')), 3).subscribe(
      (response: Timetable[])=>{
          this.period_Wednesday=response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.error);
      }
    )
  }
  getThursday(){
    this.timetableService.getDailyTimetable(Number(localStorage.getItem('userId')), 4).subscribe(
      (response: Timetable[])=>{
          this.period_Thursday=response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.error);
      }
    )
  }
  getFriday(){
    this.timetableService.getDailyTimetable(Number(localStorage.getItem('userId')), 5).subscribe(
      (response: Timetable[])=>{
          this.period_Friday=response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.error);
      }
    )
  }

  parseDayOfWeek(num: number){
    switch(num){
      case 1:
        return 'Hétfő'
      case 2: 
        return 'Kedd'
      case 3: 
        return 'Szerda'
      case 4: 
        return'Csütörtök'
      case 5: 
        return'Péntek'
      case 6:
        return 'Szombat';
      case 7:
        return 'Vasárnap';
      default:
          return 'null'

    }
  }
  getTimetable(){
    this.getMonday();
    this.getTuesday();
    this.getWednesday();
    this.getThursday();
    this.getFriday();
  }

  admin(){
    return this.authService.isAdmin()
  }

}
