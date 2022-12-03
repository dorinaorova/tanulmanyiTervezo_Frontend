import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Holiday } from '../../models/holiday';
import { HolidayService } from '../../services/holiday.service';

@Component({
  selector: 'app-holidayupdate',
  templateUrl: './newholiday.component.html',
  styleUrls: ['./newholiday.component.css']
})
export class NewHolidayComponent implements OnInit {

  constructor(private router: Router, private holidayService: HolidayService) { }

  ngOnInit(): void {
  }

  newHolidayForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl(''), 
    repeating: new FormControl('')
  });

  onSubmit(){
    var data = this.newHolidayForm.value
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
        alert(error.error);
      }
    )
  }

  get name(){
    return this.newHolidayForm.get('name')
  }

  get date(){
    return this.newHolidayForm.get('date')
  }

}
