import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Semester } from '../../models/semester';
import { Task } from '../../models/task';
import { Subject } from '../../models/subject';
import { User } from '../../models/user';
import { SemesterService } from '../../services/semester.service';
import { StudentService } from '../../services/student.service';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { DateconverterService } from 'src/app/services/dateconverter.service';

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
    private authService: AuthenticationService,
    private router: Router,
    private dateConverter: DateconverterService) 
  {
    this.userService=userService;
    this.id=0;
    if(localStorage.getItem('userId')!=null){
      this.id = +localStorage.getItem('userId')!;
    }
  }

  ngOnInit(): void {
      this.getUser(this.id);
      if(!this.admin()){
        this.getSemester();
        this.getTasks();
      }
  }

  public getUser(id: number){
    this.userService.getUser(id).subscribe(
      (response: User) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }


  public createDateString(paramDate: any){
    return this.dateConverter.createDateStringWithYear(paramDate)
  }

  admin(){
    return this.authService.isAdmin();
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
        alert(error.error);
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
        alert(error.error);
      }
    )
  }

  getTasks(){
    this.taskService.findTaskForUser(this.id).subscribe(
      (response: Task[])=>{
        this.tasks=response;
      },(error: HttpErrorResponse)=>{
        alert(error.error);
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
        alert(error.error);
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
        alert(error.error);
      }
    )
  }

}
