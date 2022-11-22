import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grade, GradeZHRequestModel, GradeHomeworkRequestModel } from '../models/grade';
import { Holiday } from '../models/holiday';
import { Homework } from '../models/homework';
import { Semester } from '../models/semester';
import { Subject } from '../models/subject';
import { ZH } from '../models/zh';
import { GradeService } from '../services/grades.service';
import { HolidayService } from '../services/holiday.service';
import { SemesterService } from '../services/semester.service';
import { StudentService } from '../services/student.service';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-semester-details',
  templateUrl: './semester-details.component.html',
  styleUrls: ['./semester-details.component.css']
})
export class SemesterDetailsComponent implements OnInit {

  semester: Semester | undefined
  holidays: Holiday[] | undefined
  subjects: Subject[] | undefined
  grades: Grade[] | undefined
  edit: boolean
  editline: number[]

  constructor(private holidayService: HolidayService,
              private router: Router,
              private semesterService: SemesterService, 
              private studentService : StudentService,
              private gradeService: GradeService)
    {
      if(localStorage.getItem('login')=="false"){
          this.router.navigate(["/login"])
      }
      this.edit=false;
      this.editline=[-1, -1];
   }

  ngOnInit(): void {
    this.getSemester()    
  }

  getSemester(){
    this.semesterService.getCurrent().subscribe(
      (response: Semester) =>{
        this.semester=response;
        this.getDatas();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  getDatas(){
    this.getHolidays();
    if(!this.admin()){
      this.getSubjects();
      this.getGrades();
    }
  }

  next(){
    this.semesterService.getNext(this.semester!.id).subscribe(
      (response: Semester) =>{
        if(response!=null){
          this.semester=response;
          this.getDatas();
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
          this.getDatas();
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
    var yyyy = date[3]
    var dayStr = `${yyyy}. ${mm}. ${dd}.`
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
    this.router.navigate(['/semesterupdate/-1'])
  }
  updateSemester(){
    this.router.navigate([`/semesterupdate/${this.semester!.id}`])
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

  getGrades(){
    this.gradeService.getGradesForUser(Number(localStorage.getItem('userId')) ,this.semester!.id).subscribe(
      (response: Grade[]) =>{
        this.grades=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public details(id: number){
    this.router.navigate(['/subjectdetails/', id])
  }


  editPoints(i: number, j: number){
    this.edit=true;
    this.editline=[i, j];
  }

  editLine(i: number, j: number){
    if(this.editline[0] == i && this.editline[1]==j) return true;
    return false;
  }

  onSubmitZH(data: any, gradeZh:ZH, i: number, j: number){

    this.edit=false;
    var p =0
    if(data.points!="") p= data.points
    if(data.points>gradeZh.maxPoints) {
      p= gradeZh.maxPoints
    }
    const grade : GradeZHRequestModel ={
      id: 0,
      user: null,
      zh: gradeZh,
      points: p,
    }

    if(this.grades![i].gradeZHList[j].id == 0){
      this.gradeService.addGradeZH(grade, Number(localStorage.getItem('userId'))).subscribe(
        (response) =>{
          this.ngOnInit();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
    else{
      this.gradeService.updateGradeZH(grade, this.grades![i].gradeZHList[j].id).subscribe(
        (response) =>{
          this.ngOnInit();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }

  }

  onSubmitHomework(data: any, gardeHomework:Homework, i: number, j: number){
    this.edit=false;
    var p =0
    if(data.points!="") p= data.points
    if(data.points>gardeHomework.maxPoints) {
      p= gardeHomework.maxPoints
    }

    const grade : GradeHomeworkRequestModel ={
      id: 0,
      user: null,
      homework: gardeHomework,
      points: p,
    }

    if(this.grades![i].gradeHomeworks[j].id == 0){
      this.gradeService.addGradeHomework(grade, Number(localStorage.getItem('userId'))).subscribe(
        (response) =>{
          this.ngOnInit();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
    else{
      this.gradeService.updateGradeHomework(grade, this.grades![i].gradeHomeworks[j].id).subscribe(
        (response) =>{
          this.ngOnInit();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  }

  getGradeForSubject(id: number){
    var returnValue=1;
    this.grades?.forEach(element =>{
      if(element.subjectId == id){
        var points=0;
        var maxPoints=0;
        if(element.gradeZHList!=null){
          element.gradeZHList.forEach(
            grade=>{
              if(grade.zh?.countin) {
                points+=grade.points
                maxPoints+=grade.zh.maxPoints
              }
            }
          )
        }
        var grade = (points/maxPoints)*100
        if(grade>=85) returnValue=5
        else if(grade>=70) returnValue=4
        else if(grade>=55) returnValue=3
        else if(grade >=40) returnValue=2
      }
      
    })
    return returnValue;
  }

  setCurrent(){
    this.semesterService.setCurrent(this.semester!.id, this.semester!).subscribe(
      (response)=>{
        this.ngOnInit()
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }

    )
  }
}
