import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Semester } from '../models/semester';
import { Subject } from '../models/subject';
import { User } from '../models/user';
import { SemesterService } from '../services/semester.service';
import { StudentService } from '../services/student.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id: number;
  user: User |undefined;
  semester: Semester |undefined;
  subjects: Subject[] |undefined;


  constructor(
    private userService: UserService,
    private avRoute: ActivatedRoute,
    private studentService: StudentService,
    private semesterService: SemesterService,
    private router: Router) 
  {
    this.userService=userService;
    this.id=0;
    if(localStorage.getItem('userId')!=null){
      this.id = +localStorage.getItem('userId')!;
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('login')=="true"){
      this.getUser(this.id);
      this.getSemester();
    }else{
      this.router.navigate(['/login']);
    }
  }

  public getUser(id: number){
    this.userService.getUser(id).subscribe(
      (response: User) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public createDateString(paramDate: any){
    var date = String(paramDate).split('-') 
    var dd = date[2].substring(0,2);
    var mm = date[1]
    var yyyy= date[0]
    var dayStr = `${yyyy}. ${mm}. ${dd}.`
    return dayStr
  }

  admin(){
    return localStorage.getItem('userRole')=="admin"
  }

  public details(id: number){
    this.router.navigate(['/subjectdetails/', id])
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

  getSemester(){
    this.semesterService.getCurrent().subscribe(
      (response: Semester) =>{
        this.semester=response;
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
          this.getSubjects()
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
