import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Timetable } from "../models/timetable";

@Injectable({
    providedIn: 'root'
  })
export class TimetableService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

    public getDailyTimetable(id: number, day: number){
        return this.http.get<Timetable[]>(`${this.apiServerUrl}/timetable/finddaily/${id}/${day}`);
    }
}