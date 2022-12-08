import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ActivatedRoute, Router } from '@angular/router';
import { DateconverterService } from 'src/app/services/dateconverter.service';
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
  updateSubjectForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    kredit: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  constructor(private router: Router,
              private subjectService: SubjectService,
              private avRoute: ActivatedRoute,
              private dateConverter: DateconverterService) {
    const idParam= 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }
    else{ 
      this.id=-1;
    }
   }

  ngOnInit(): void {
    if(this.newSubject!){
      this.getSubject(this.id);
    }    
  }

  onSubmit(){
    var data = this.updateSubjectForm.value
    if(this.newSubject()){
      this.subjectService.addSubject(data).subscribe(
        (response: Subject)=>{
          console.warn(response)
          this.router.navigate(['/subjects']);
        },
        (error: HttpErrorResponse) => {
          alert(error);
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
        if(response==null){
          this.id=-1;
        }
        else{
        this.subject=response;
        this.updateSubjectForm.controls['name'].setValue(this.subject.name);
        this.updateSubjectForm.controls['kredit'].setValue(this.subject.kredit);
        this.updateSubjectForm.controls['description'].setValue(this.subject.description);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error);
        console.warn(error)
      }
    )
  }
  get name(){
    return this.updateSubjectForm.get('name')
  }

  get kredit(){
    return this.updateSubjectForm.get('kredit');
  }
  

  updateSubmit(data: any){
    console.warn(data)
    this.subjectService.updateSubject(data, this.id).subscribe(
      (response: Subject)=>{
        this.router.navigate(['/subjectdetails/', this.id])
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    )
  }

  onSubmitPeriod(data: any){
    var period: Period={
      id:0,
      day: this.convertDay(data.day),
      start: data.start,
      length: data.length,
      type: data.type
    }
    this.subjectService.addPeriod(period, this.id).subscribe(
      (response: Period)=>{
        alert("Tanóra sikeresen felvéve")
      },
      (error: HttpErrorResponse)=>{
        alert(error.error);
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
        alert(error.error);
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
        alert(error.error);
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
  convertDay(day: String){
    return this.dateConverter.convertDayByName(day);
  }

}
