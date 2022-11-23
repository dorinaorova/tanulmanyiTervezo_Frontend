import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Homework } from '../../models/homework';
import { Period } from '../../models/period';
import { Subject } from '../../models/subject';
import { ZH } from '../../models/zh';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-subject-update',
  templateUrl: './subject-update.component.html',
  styleUrls: ['./subject-update.component.css']
})
export class SubjectUpdateComponent implements OnInit {

  subject: Subject | undefined;
  id: number;

  constructor(private router: Router, private subjectService: SubjectService, private avRoute: ActivatedRoute) {
    const idParam= 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }
    else{ 
      this.id=-1;
    }
   }

  ngOnInit(): void {
    this.getSubject(this.id);    
  }

  onSubmit(data: any){
    if(this.newSubject()){
      this.subjectService.addSubject(data).subscribe(
        (response: Subject)=>{
          this.router.navigate(['/subjects']);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
    else{
      this.updateSubmit(data);
    }
  }

  newSubject() : boolean{
    if(this.id == -1) return true;
    else return false;
  }

  getSubject(id: number){
    this.subjectService.getSubject(id).subscribe(
      (response: Subject)=>{
        this.subject=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  

  updateSubmit(data: any){
    var subjname: string;
    if(this.subject?.name==undefined) subjname="";
    else{
      if(data.name=='') subjname=this.subject.name
      else subjname=data.name
    }

    var descr: string
    if(this.subject?.description==undefined) descr="";
    else{
      if(data.description=='') descr=this.subject.description
      else descr=data.description
    }

    const subj: Subject={
      id: this.id,
      name: subjname,
      description: descr,
      kredit: data.kredit
    }

    this.subjectService.updateSubject(subj, this.id).subscribe(
      (response: Subject)=>{
        this.router.navigate(['/subjects']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  onSubmitPeriod(data: any){
    this.subjectService.addPeriod(data, this.id).subscribe(
      (response: Period)=>{
        alert("Tanóra sikeresen felvéve")
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  onSubmitZh(data: any){
    var zh: ZH={
      id: 0,
      date: new Date(data.date).getTime(),
      maxPoints: data.maxPoints,
      countin: data.countin
    }
    this.subjectService.addZh(zh, this.id).subscribe(
      (response: ZH)=>{
        alert("ZH sikeresen felvéve")
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  onSubmitHomework(data: any){
    var hw: Homework={
      id:0,
      date: new Date(data.date).getTime(),
      maxPoints: data.maxPoints,
      description: data.description
    }
    this.subjectService.addHomework(hw, this.id).subscribe(
      (response: Homework)=>{
        alert("Házi feladat sikeresen felvéve")
      }, 
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  back(){
    if(this.newSubject()){
      this.router.navigate(['/subjects'])
    }
    else{
      this.router.navigate(['/subjectdetails/', this.id])
    }
  }

}
