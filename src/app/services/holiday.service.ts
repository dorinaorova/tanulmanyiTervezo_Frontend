import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Holiday } from "../models/holiday";

@Injectable({
    providedIn: 'root'
  })
export class HolidayService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

    public addHoliday(data: Holiday){
        return this.http.post<Holiday>(`${this.apiServerUrl}/holiday/add`, data);
    }

    public getHolidays(){
        return this.http.get<Holiday[]>(`${this.apiServerUrl}/holiday/findall`);
    }

    public getHolidaysForSemester(id: number){
        return this.http.get<Holiday[]>(`${this.apiServerUrl}/holiday/findbydate/${id}`);
    }

    public delete(id: number){
        return this.http.delete(`${this.apiServerUrl}/holiday/delete/${id}`)
    }
}