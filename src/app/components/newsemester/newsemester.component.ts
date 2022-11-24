import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Semester } from 'src/app/models/semester';
import { SemesterService } from 'src/app/services/semester.service';

@Component({
  selector: 'app-newsemester',
  templateUrl: './newsemester.component.html',
  styleUrls: ['./newsemester.component.css']
})
export class NewsemesterComponent implements OnInit {

  id: number;
  semester: Semester | undefined

  constructor(private router: Router, private semesterService: SemesterService, private avRoute: ActivatedRoute) {
    const idParam= 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }
    else{ 
      this.id=-1;
    }
   }

  ngOnInit(): void {
    this.getSemester(this.id)
  }

  newSemesterForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
    current: new FormControl()
  })

  onSubmit(){
    var data: Semester={
      id: 0,
      name: this.newSemesterForm.value.name,
      start: new Date(this.newSemesterForm.value.start).getTime(),
      end: new Date(this.newSemesterForm.value.end).getTime(),
      current: this.newSemesterForm.value.current
    }
    if(this.newSemester()){
      if(this.newSemesterForm.value.current == '') data.current=false
      this.semesterService.addSemester(data).subscribe(
        (response: Semester)=>{
          alert("A félév sikeresen felvéve")
          this.router.navigate(['/semester'])
        }, 
        (error: HttpErrorResponse)=>{
          alert(error.message);
        }
      )
    }
    
    else{
      this.semesterService.updateSemester(this.id, data).subscribe(
        (response: Semester)=>{
          alert("A félév sikeresen Módosítva")
          this.router.navigate(['/semester'])
        }, 
        (error: HttpErrorResponse)=>{
          alert(error.message);
        }
      )
    }
  }

  get name(){
    return this.newSemesterForm.get('name')
  }

  get start(){
    return this.newSemesterForm.get('start')
  }

  get end(){
    return this.newSemesterForm.get('end')
  }

  back(){
    this.router.navigate(['/semester'])
  }

  newSemester(){
    if(this.id==-1) return true;
    else return false;
  }

  getSemester(id: number){
    this.semesterService.getSemester(id).subscribe(
      (result: Semester)=>{
        this.semester= result
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

}
