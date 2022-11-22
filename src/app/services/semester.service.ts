import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Semester } from "../models/semester";

@Injectable({
    providedIn: 'root'
  })
export class SemesterService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }
    
    public addSemester(data: Semester){
        return this.http.post<Semester>(`${this.apiServerUrl}/semester/add`, data);
    }

    public getCurrent(){
        return this.http.get<Semester>(`${this.apiServerUrl}/semester/findcurrent`)
    }

    public getNext(id:number){
        return this.http.get<Semester>(`${this.apiServerUrl}/semester/findnext/${id}`)
    }

    public getPrevious(id:number){
        return this.http.get<Semester>(`${this.apiServerUrl}/semester/findprevious/${id}`)
    }

    public getSemester(id: number){
        return this.http.get<Semester>(`${this.apiServerUrl}/semester/findbyid/${id}`)
    }

    public updateSemester(id: number, data: Semester){
        return this.http.put<Semester>(`${this.apiServerUrl}/semester/update/${id}`, data)
    }

    public setCurrent(id: number, data: Semester){
        return this.http.put<Semester>(`${this.apiServerUrl}/semester/setcurrent/${id}`, data)
    }
    

}