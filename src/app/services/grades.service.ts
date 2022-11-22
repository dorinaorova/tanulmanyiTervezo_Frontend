import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Grade, GradeHomeworkRequestModel, GradeZHRequestModel } from "../models/grade";

@Injectable({
    providedIn: 'root'
  })
export class GradeService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ 
    }
    
    public getGradesForUser(userId: number, semesterId: number){
        return this.http.get<Grade[]>(`${this.apiServerUrl}/grade/findallbyuser/${semesterId}/${userId}`);
    }

    public addGradeZH(grade: GradeZHRequestModel, userId: number){
        return this.http.post<GradeZHRequestModel>(`${this.apiServerUrl}/grade/addgrade/zh/${userId}`,grade);
    }

    public updateGradeZH(grade: GradeZHRequestModel, id: number){
        return this.http.put<GradeZHRequestModel>(`${this.apiServerUrl}/grade/updategrade/zh/${id}`,grade);
    }

    public addGradeHomework(grade: GradeHomeworkRequestModel, userId: number){
        return this.http.post<GradeHomeworkRequestModel>(`${this.apiServerUrl}/grade/addgrade/homework/${userId}`,grade);
    }

    public updateGradeHomework(grade: GradeHomeworkRequestModel, id: number){
        return this.http.put<GradeHomeworkRequestModel>(`${this.apiServerUrl}/grade/updategrade/homework/${id}`,grade);
    }

}