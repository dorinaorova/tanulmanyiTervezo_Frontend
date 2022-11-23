import { getLocaleDateFormat, getLocaleDayPeriods } from '@angular/common';
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

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  today : Date
  todayStr: string | undefined
  periods: Timetable[];
  subjects: Subject[] | undefined
  isHolidayResult: boolean = false

  constructor(private studentService: StudentService, private router: Router, private subjectService: SubjectService, private timetableService: TimetableService, private holidayService: HolidayService) {
    this.periods = [];
    this.today= new Date();
    if(localStorage.getItem('userRole')=="admin"){
      this.router.navigate(["/profile"])
    }
    else if(localStorage.getItem('login')=="false"){
      this.router.navigate(["/login"])
    }
    
   }

  ngOnInit() {
    var dd = String(this.today.getDate()).padStart(2, '0');
    var mm = String(this.today.getMonth() + 1).padStart(2, '0');
    var day = this.parseDayOfWeek(this.today.getDay());
    this.todayStr=`${mm}. ${dd}. - ${day}`
    this.getTimetable(day)   
    this.isHoliday()
  }

  isHoliday(){
    this.holidayService.isHoliday(this.today.getTime()).subscribe(
      (result: boolean) =>
      {
        this.isHolidayResult=result;
      },
        (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }


  nextDay(){
    this.today.setDate(this.today.getDate() +1)
    this.ngOnInit()
  }

  previousDay(){
    this.today.setDate(this.today.getDate() -1)
    this.ngOnInit()
  }

  currentDate() :boolean {
    var currentDate = new Date();
    if(currentDate.getDate==this.today.getDate) return true;
    return false
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
        return 'Szombat'
      case 0: 
        return 'Vasárnap'
      default:
          return 'null'

    }
  }
  getTimetable(day: string){
    this.timetableService.getDailyTimetable(Number(localStorage.getItem('userId')), day).subscribe(
      (response: Timetable[])=>{
        this.periods=response
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

}
