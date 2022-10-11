import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Period } from '../models/period';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  today : Date
  todayStr: string | undefined
  periods: Period[] | undefined

  constructor() {
    this.today= new Date()
   }

  ngOnInit(): void {
    var dd = String(this.today.getDate()).padStart(2, '0');
    var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.today.getFullYear();
    var day = this.parseDayOfWeek(this.today.getDay());
    this.todayStr=`${mm}. ${dd}. - ${day}`
    console.warn(this.today)
  }

  nextDay(){
    this.today.setDate(this.today.getDate() +1)
    console.warn(this.today)
    this.ngOnInit()
  }

  previousDay(){
    this.today.setDate(this.today.getDate() -1)
    console.warn(this.today)
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

}
