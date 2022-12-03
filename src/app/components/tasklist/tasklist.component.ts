import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateconverterService } from 'src/app/services/dateconverter.service';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  tasks: Task[] | undefined
  done: boolean

  constructor(private router: Router, private service: TaskService, private dateConverter: DateconverterService) { 
    this.done=false
  }

  ngOnInit(): void {
    if(!this.done){
      this.getUndoneTasks()
    }
    else{
      this.getDoneTasks()
    }
    
  }

  public createDateString(paramDate: any){
    return this.dateConverter.createDateStringWithYear(paramDate);
  }

  newTask(){
    this.router.navigate(["/updatetask/-1"])
  }

  getUndoneTasks(){
    this.service.findUndone(Number(localStorage.getItem('userId'))).subscribe(
      (result: Task[])=>{
        this.tasks=result
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    )
  }

  getDoneTasks(){
    this.service.findDone(Number(localStorage.getItem('userId'))).subscribe(
      (result: Task[])=>{
        this.tasks=result
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    )
  }
  setTaskDone(id: number, task:Task){
    this.service.setDone(id, task).subscribe(
      (result)=>{
        this.ngOnInit()
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    )
  }

  updateTask(id: number){
    this.router.navigate(["/updatetask/", id])
  }

  deleteTask(id: number){
    this.service.deleteTask(id).subscribe(
      (result)=>{
        this.ngOnInit()
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    )
  }

  setDone(){
    this.done=true;
    this.ngOnInit()
  }
  setUndone(){
    this.done=false;
    this.ngOnInit()
  }

  expired(date: number){
    var today= new Date().getTime();
    if(date <= today) return true;
    else return false;
  }

}
