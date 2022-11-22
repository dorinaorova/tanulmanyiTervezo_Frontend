import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Task } from "../models/task";

@Injectable({
    providedIn: 'root'
  })
export class TaskService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

    public addTask(task: Task, id:number){
        return this.http.post<Task>(`${this.apiServerUrl}/task/add/${id}`, task);
    }

    public updateTask(task: Task, id: number){
        return this.http.put<Task>(`${this.apiServerUrl}/task/update/${id}`, task)
    }

    public findTaskForUser(id: number){
        return this.http.get<Task[]>(`${this.apiServerUrl}/task/findallbyuser/${id}`);
    }

    public findTask(id: number){
        return this.http.get<Task>(`${this.apiServerUrl}/task/findbyid/${id}`);
    }

    public findDone(id: number){
        return this.http.get<Task[]>(`${this.apiServerUrl}/task/findallbyuser/done/${id}`);
    }

    public findUndone(id: number){
        return this.http.get<Task[]>(`${this.apiServerUrl}/task/findallbyuser/undone/${id}`);
    }

    public deleteTask(id: number){
        return this.http.delete(`${this.apiServerUrl}/task/delete/${id}`);
    }

    public setDone(id: number, data: any){
        return this.http.put<Task>(`${this.apiServerUrl}/task/setdone/${id}`, data);
    }
}