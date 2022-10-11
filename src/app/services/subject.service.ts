import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Period } from "../models/period";
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

    public getPeriodsForSubject(id: number){
        return this.http.get<Period[]>(`${this.apiServerUrl}/subject/findallperiods/${id}`)
    }

    public addPeriod(data: Period, id: number){
        return this.http.post<Period>(`${this.apiServerUrl}/subject/addperiod/${id}`, data)
    }

}