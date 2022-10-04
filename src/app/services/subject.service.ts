import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Subject } from "../models/subject";

@Injectable({
    providedIn: 'root'
  })
export class SubjectService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

    public getSubjects(){
        return this.http.get<Subject[]>(`${this.apiServerUrl}/subject/findAll`);
    }

    public addSubject(data: Subject){
        return this.http.post<Subject>(`${this.apiServerUrl}/subject/add`, data);
    }

    public getSubject(id: number){
        return this.http.get<Subject>(`${this.apiServerUrl}/subject/findById/${id}`);
    }

    public updateSubject(data: Subject, id: number){
        return this.http.put<Subject>(`${this.apiServerUrl}/subject/update/${id}`, data);
    }
    
    public deleteSubject(id:number){
        return this.http.delete(`${this.apiServerUrl}/subject/delete/${id}`)
    }

}