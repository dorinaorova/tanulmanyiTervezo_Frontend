import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {
  task: Task | undefined;
  id: number;
  taskDate: Date | undefined
  updateTaskForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(),
    date: new FormControl()
  });

  constructor(private router: Router, private avRoute: ActivatedRoute, private fb: FormBuilder, private taskService: TaskService) { 

    const idParam= 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }
    else{ 
      this.id=-1;
    }
  }

  ngOnInit(): void {
    if(!this.newTask()){
      this.getTask(this.id)
    }
  }

  onSubmit(data: any){
    
    var task: Task ={
      id: 0,
      name: data.name,
      description: data.description,
      date: new Date(data.date).getTime(),
      done: false
    }
    if(this.newTask()){
      this.taskService.addTask(task, Number(localStorage.getItem('userId'))).subscribe(
        (response)=>{
          console.warn(response)
          this.router.navigate(['/tasks']);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
    else{
      this.updateSubmit(task);
    }
  }

  newTask(){
    if(this.id == -1) return true;
    else return false;
  }

  back(){
    this.router.navigate(["/tasks"])
  }

  get name(){
    return this.updateTaskForm.get('name')
  }

  validForm(){
    return this.updateTaskForm.invalid
  }

  getTask(id: number){
    this.taskService.findTask(id).subscribe(
      (response: Task)=>{
        this.task=response
        this.taskDate= new Date(response.date)
      },        
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  updateSubmit(task: Task){
    this.taskService.updateTask(task, this.id).subscribe(
      (response)=>{
          alert("A feladat módosítása sikeres!")
          this.router.navigate(["/tasks"])
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

}
