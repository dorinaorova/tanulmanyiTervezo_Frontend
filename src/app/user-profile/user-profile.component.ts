import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Semester } from '../models/semester';
import { Task } from '../models/task';
import { Subject } from '../models/subject';
import { User } from '../models/user';
import { SemesterService } from '../services/semester.service';
import { StudentService } from '../services/student.service';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

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
  tasks: Task[] | undefined;


  constructor(
    private userService: UserService,
    private studentService: StudentService,
    private taskService: TaskService,
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
      this.getTasks();
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
    var date = String(new Date(paramDate)).split(' ') 
    var dd = date[2].substring(0,2);
    var mm = date[1]
    var yyyy= date[3]
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

  getTasks(){
    this.taskService.findTaskForUser(this.id).subscribe(
      (response: Task[])=>{
        this.tasks=response;
      },(error: HttpErrorResponse)=>{
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
