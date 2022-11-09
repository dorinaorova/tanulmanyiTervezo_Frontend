import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  tasks: Task[] | undefined
  done: boolean

  constructor(private router: Router, private service: TaskService) { 
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
    var date = String(new Date(paramDate)).split(' ') 
    var dd = date[2].substring(0,2);
    var mm = date[1]
    var dayStr = `${mm}. ${dd}.`
    return dayStr
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
        alert(error.message);
      }
    )
  }

  getDoneTasks(){
    this.service.findDone(Number(localStorage.getItem('userId'))).subscribe(
      (result: Task[])=>{
        this.tasks=result
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  setTaskDone(id: number, task:Task){
    this.service.setDone(id, task).subscribe(
      (result)=>{
        this.ngOnInit()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
        alert(error.message);
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
