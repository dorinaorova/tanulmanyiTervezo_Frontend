import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Homework } from "../models/homework";
import { Period } from "../models/period";
import { Subject } from "../models/subject";
import { ZH } from '../models/zh';

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

    public deletePeriod(id: number){
        return this.http.delete(`${this.apiServerUrl}/subject/deleteperiod/${id}`)
    }

    public getZhsForSubject(id:number){
        return this.http.get<ZH[]>(`${this.apiServerUrl}/subject/findallzhforsubject/${id}`)
    }

    public addZh(data: ZH, id: number){
        return this.http.post<ZH>(`${this.apiServerUrl}/subject/addzh/${id}`, data)
    }

    public deleteZh(id: number){
        return this.http.delete(`${this.apiServerUrl}/subject/deletezh/${id}`)
    }

    public getZhForSemester(userId: number, semesterId: number){
        return this.http.get<ZH[]>(`${this.apiServerUrl}/subject/findallzhforsemester/${semesterId}/${userId}`)
    }

    public getHomeworksForSubject(id:number){
        return this.http.get<Homework[]>(`${this.apiServerUrl}/subject/findallhomework/${id}`)
    }

    public addHomework(data: Homework, id: number){
        return this.http.post<Homework>(`${this.apiServerUrl}/subject/addhomework/${id}`, data)
    }

    public deleteHomework(id: number){
        return this.http.delete(`${this.apiServerUrl}/subject/deleteHomework/${id}`)
    }
}