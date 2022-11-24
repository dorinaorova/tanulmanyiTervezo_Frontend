import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Holiday } from '../../models/holiday';
import { HolidayService } from '../../services/holiday.service';

@Component({
  selector: 'app-holidayupdate',
  templateUrl: './holidayupdate.component.html',
  styleUrls: ['./holidayupdate.component.css']
})
export class HolidayupdateComponent implements OnInit {

  constructor(private router: Router, private holidayService: HolidayService) { }

  ngOnInit(): void {
  }

  onSubmitHoliday(data: any){
    var holiday: Holiday={
        id: 0,
        name: data.name,
        date: new Date(data.date).getTime(),
        description: data.description,
        repeating: data.repeating
    }
    this.holidayService.addHoliday(holiday).subscribe(
      (response: Holiday)=>{
        alert("Az ünnepnap sikeresen felvéve")
        this.router.navigate(['/semester']);
      }, 
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

}