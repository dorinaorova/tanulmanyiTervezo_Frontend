import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Semester } from "../models/semester";
import { Subject } from "../models/subject";

@Injectable({
    providedIn: 'root'
  })
export class StudentService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

    public getSubjectsForSemester(id: number, semesterid: number){
        return this.http.get<Subject[]>(`${this.apiServerUrl}/student/findbystudent/${semesterid}/${id}`);
    }

    public getSubjectsForCurrentSemester(id: number) : Observable <Subject[]>{
        return this.http.get<Subject[]>(`${this.apiServerUrl}/student/findbystudent/current/${id}`);
    }

    public addSubject(subject: Subject){
        return this.http.post<any>(`${this.apiServerUrl}/student/add/${localStorage.getItem('userId')}`, subject)
    }
}
