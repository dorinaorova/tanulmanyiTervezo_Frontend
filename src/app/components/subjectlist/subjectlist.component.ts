import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Subject } from '../../models/subject';
import { StudentService } from '../../services/student.service';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-subjectlist',
  templateUrl: './subjectlist.component.html',
  styleUrls: ['./subjectlist.component.css']
})
export class SubjectlistComponent implements OnInit {

  public subjects: Subject[] | undefined

  constructor(private service: SubjectService, private router: Router, private studentService: StudentService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  public getSubjects(){
    this.service.getSubjects().subscribe(
      (response: Subject[]) =>{
        this.subjects=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    )
  }
  admin(){
    return this.authService.isAdmin();
  }

  public details(id: number){
    this.router.navigate(['/subjectdetails/', id])
  }

  addSubject(subject: Subject){
    this.studentService.addSubject(subject).subscribe(
      (response: any)=>{
        alert("Tantárgy sikeresn felvéve!")
      },
      (error: HttpErrorResponse)=>{
        alert(error.error)
      }
      )
  }



}
